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
    fields: "files(id,name,mimeType,parents)",
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
    a.name.localeCompare(b.name, "it", { numeric: true }),
  );
}

function toImage(file) {
  return {
    id: file.id,
    name: file.name,
    thumbSrc: `/api/gallery/file/${encodeURIComponent(file.id)}?mode=thumb`,
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

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
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

    const folders = await listAlbums(ROOT_ID);

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

    const onlyAlbumsWithPhotos = perFolder.filter(
      (album) => Array.isArray(album.photos) && album.photos.length > 0,
    );

    const allPhotos = uniqueById(
      onlyAlbumsWithPhotos.flatMap((album) => album.photos),
    );

    const albumList = [
      {
        id: "all",
        name: "Tutte",
        photos: allPhotos,
      },
      ...onlyAlbumsWithPhotos,
    ];

    return NextResponse.json(
      { albums: albumList },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
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
