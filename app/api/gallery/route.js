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
    fields: "nextPageToken, files(id,name,mimeType,parents,thumbnailLink)",
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

async function listImagesIn(folderId) {
  const q = [
    `'${folderId}' in parents`,
    "mimeType contains 'image/'",
    "trashed = false",
  ].join(" and ");

  const files = await gdriveListAll({ q });

  return files
    .filter((f) => f.mimeType?.startsWith("image/"))
    .map(toImage)
    .sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true }));
}

async function listImagesInRoot(rootId) {
  const q = [
    `'${rootId}' in parents`,
    "mimeType contains 'image/'",
    "trashed = false",
  ].join(" and ");

  const files = await gdriveListAll({ q });

  return files
    .filter((f) => f.mimeType?.startsWith("image/"))
    .map(toImage)
    .sort((a, b) => a.name.localeCompare(b.name, "it", { numeric: true }));
}

export async function GET() {
  try {
    const [rootImages, folders] = await Promise.all([
      listImagesInRoot(ROOT_ID),
      listAlbums(ROOT_ID),
    ]);

    const perFolder = await Promise.all(
      folders.map(async (folder) => {
        const photos = await listImagesIn(folder.id);
        return {
          id: folder.id,
          name: folder.name,
          photos,
        };
      }),
    );

    return NextResponse.json(
      {
        albums: [
          ...(rootImages.length
            ? [{ id: ROOT_ID, name: "Tutte le foto", photos: rootImages }]
            : []),
          ...perFolder,
        ],
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Errore gallery" }, { status: 500 });
  }
}
