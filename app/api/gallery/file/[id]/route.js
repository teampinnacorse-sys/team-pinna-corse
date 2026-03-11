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
    fields: "files(id,name,mimeType,parents,thumbnailLink)",
    ...params,
  };

  Object.entries(baseParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function gdriveList(params = {}) {
  const res = await fetch(buildDriveUrl(params), {
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Drive API error (${res.status}): ${txt}`);
  }

  return res.json();
}

async function listAlbums(rootId) {
  const q = [
    `'${rootId}' in parents`,
    "mimeType = 'application/vnd.google-apps.folder'",
    "trashed = false",
  ].join(" and ");

  const data = await gdriveList({ q });

  return (data.files || []).sort((a, b) =>
    a.name.localeCompare(b.name, "it", { numeric: true })
  );
}

function normalizeThumb(thumbnailLink, fileId) {
  if (thumbnailLink) {
    return thumbnailLink.replace(/=s\d+(-c)?$/, "=s1200");
  }

  return `/api/gallery/file/${encodeURIComponent(fileId)}?mode=thumb`;
}

function toImage(file) {
  return {
    id: file.id,
    name: file.name,
    thumbSrc: normalizeThumb(file.thumbnailLink, file.id),
    fullSrc: `/api/gallery/file/${encodeURIComponent(file.id)}?mode=full`,
  };
}

async function listImagesIn(folderId) {
  const q = [
    `'${folderId}' in parents`,
    "mimeType contains 'image/'",
    "trashed = false",
  ].join(" and ");

  const data = await gdriveList({ q });

  const files = (data.files || []).map(toImage);
  files.sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true }));
  return files;
}

async function listImagesInRoot(rootId) {
  const q = [
    `'${rootId}' in parents`,
    "mimeType contains 'image/'",
    "trashed = false",
  ].join(" and ");

  const data = await gdriveList({ q });

  const files = (data.files || []).map(toImage);
  files.sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true }));
  return files;
}

export async function GET() {
  try {
    if (!API_KEY || !ROOT_ID) {
      return NextResponse.json(
        {
          error:
            "Configura GOOGLE_API_KEY e DRIVE_ROOT_FOLDER_ID nelle variabili ambiente.",
        },
        { status: 500 }
      );
    }

    const [rootImages, folders] = await Promise.all([
      listImagesInRoot(ROOT_ID),
      listAlbums(ROOT_ID),
    ]);

    const albumList = [];

    if (rootImages.length) {
      albumList.push({
        id: ROOT_ID,
        name: "Tutte le foto",
        photos: rootImages,
      });
    }

    const perFolder = await Promise.all(
      folders.map(async (folder) => {
        const photos = await listImagesIn(folder.id);

        return {
          id: folder.id,
          name: folder.name,
          photos,
        };
      })
    );

    albumList.push(...perFolder);

    return NextResponse.json(
      {
        albums: albumList,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/gallery error:", error);

    return NextResponse.json(
      {
        error: error.message || "Errore interno durante il caricamento gallery.",
      },
      { status: 500 }
    );
  }
}