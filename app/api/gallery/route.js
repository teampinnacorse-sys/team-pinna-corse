import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;
const ROOT_ID = process.env.DRIVE_ROOT_FOLDER_ID;
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

function buildDriveUrl(params = {}) {
  const url = new URL(DRIVE_API);

  const baseParams = {
    key: API_KEY,
    spaces: "drive",
    includeItemsFromAllDrives: "true",
    supportsAllDrives: "true",
    pageSize: "1000",
    fields:
      "nextPageToken,files(id,name,mimeType,parents,trashed,thumbnailLink,webViewLink,webContentLink)",
    ...params,
  };

  Object.entries(baseParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function gdriveListAll(params = {}) {
  let allFiles = [];
  let pageToken = null;

  do {
    const res = await fetch(
      buildDriveUrl({
        ...params,
        pageToken: pageToken || undefined,
      }),
      { cache: "no-store" },
    );

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Drive API error (${res.status}): ${txt}`);
    }

    const data = await res.json();
    allFiles.push(...(data.files || []));
    pageToken = data.nextPageToken || null;
  } while (pageToken);

  return allFiles;
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function normalizeThumb(thumbnailLink, fileId) {
  if (thumbnailLink) {
    return thumbnailLink.replace(/=s\d+(-c)?$/, "=s1600");
  }
  return `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}=w1600`;
}

function buildFullUrl(file) {
  return (
    file.webContentLink ||
    `https://drive.google.com/uc?export=view&id=${encodeURIComponent(file.id)}`
  );
}

function toImage(file, albumId, albumName) {
  return {
    id: file.id,
    name: file.name,
    mimeType: file.mimeType,
    albumId,
    albumName,
    thumbSrc: normalizeThumb(file.thumbnailLink, file.id),
    fullSrc: buildFullUrl(file),
  };
}

async function listAlbums(rootId) {
  const q = [
    `'${rootId}' in parents`,
    "mimeType = 'application/vnd.google-apps.folder'",
    "trashed = false",
  ].join(" and ");

  const files = await gdriveListAll({ q });

  return files.sort((a, b) =>
    a.name.localeCompare(b.name, "it", { numeric: true }),
  );
}

async function listImagesIn(folderId, folderName) {
  const q = [
    `'${folderId}' in parents`,
    "mimeType contains 'image/'",
    "trashed = false",
  ].join(" and ");

  const files = await gdriveListAll({ q });

  return uniqueById(
    files
      .filter((file) => file.mimeType?.startsWith("image/") && !file.trashed)
      .map((file) => toImage(file, folderId, folderName))
      .sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true })),
  );
}

async function listRootImages(rootId) {
  const q = [
    `'${rootId}' in parents`,
    "mimeType contains 'image/'",
    "trashed = false",
  ].join(" and ");

  const files = await gdriveListAll({ q });

  return uniqueById(
    files
      .filter((file) => file.mimeType?.startsWith("image/") && !file.trashed)
      .map((file) => toImage(file, "root", "Tutte"))
      .sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true })),
  );
}

export async function GET() {
  try {
    if (!API_KEY || !ROOT_ID) {
      return NextResponse.json(
        {
          error:
            "Configura GOOGLE_API_KEY e DRIVE_ROOT_FOLDER_ID nelle variabili ambiente.",
        },
        { status: 500 },
      );
    }

    const [folders, rootImages] = await Promise.all([
      listAlbums(ROOT_ID),
      listRootImages(ROOT_ID),
    ]);

    const perFolder = await Promise.all(
      folders.map(async (folder) => {
        const photos = await listImagesIn(folder.id, folder.name);
        return {
          id: folder.id,
          name: folder.name,
          photos,
        };
      }),
    );

    const onlyAlbumsWithPhotos = perFolder.filter(
      (album) => Array.isArray(album.photos) && album.photos.length > 0,
    );

    const allPhotos = uniqueById([
      ...rootImages,
      ...onlyAlbumsWithPhotos.flatMap((album) => album.photos),
    ]);

    return NextResponse.json(
      {
        rootId: ROOT_ID,
        albums: [
          {
            id: "all",
            name: "Tutte",
            photos: allPhotos,
          },
          ...onlyAlbumsWithPhotos,
        ],
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/gallery error:", error);

    return NextResponse.json(
      {
        error:
          error.message || "Errore interno durante il caricamento gallery.",
      },
      { status: 500 },
    );
  }
}
