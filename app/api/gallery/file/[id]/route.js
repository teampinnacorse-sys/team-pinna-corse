import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

function buildUrl(path = "", params = {}) {
  const url = new URL(`${DRIVE_API}${path}`);

  const baseParams = {
    key: API_KEY,
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    ...params,
  };

  Object.entries(baseParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Drive request failed (${response.status}): ${text}`);
  }

  return response.json();
}

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const mode = req.nextUrl.searchParams.get("mode") || "full";

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Manca GOOGLE_API_KEY." },
        { status: 500 },
      );
    }

    if (!id) {
      return NextResponse.json({ error: "ID file mancante." }, { status: 400 });
    }

    const meta = await fetchJson(
      buildUrl(`/${encodeURIComponent(id)}`, {
        fields: "id,name,mimeType,trashed,thumbnailLink",
      }),
    );

    if (meta.trashed) {
      return NextResponse.json(
        { error: "File eliminato da Google Drive." },
        { status: 404 },
      );
    }

    if (!meta.mimeType?.startsWith("image/")) {
      return NextResponse.json(
        { error: "Il file richiesto non è un'immagine." },
        { status: 400 },
      );
    }

    if (mode === "thumb" && meta.thumbnailLink) {
      const thumbUrl = meta.thumbnailLink.replace(/=s\d+(-c)?$/, "=s1600");
      const thumbRes = await fetch(thumbUrl, { cache: "no-store" });

      if (thumbRes.ok) {
        const contentType =
          thumbRes.headers.get("content-type") || "image/jpeg";
        const buffer = await thumbRes.arrayBuffer();

        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=60, stale-while-revalidate=60",
          },
        });
      }
    }

    const mediaResponse = await fetch(
      buildUrl(`/${encodeURIComponent(id)}`, { alt: "media" }),
      { cache: "no-store" },
    );

    if (!mediaResponse.ok) {
      const text = await mediaResponse.text();
      return NextResponse.json(
        { error: `Drive media error (${mediaResponse.status}): ${text}` },
        { status: mediaResponse.status },
      );
    }

    const contentType =
      mediaResponse.headers.get("content-type") ||
      meta.mimeType ||
      "image/jpeg";

    const buffer = await mediaResponse.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=60, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("GET /api/gallery/file/[id] error:", error);

    return NextResponse.json(
      { error: error?.message || "Errore interno nel recupero immagine." },
      { status: 500 },
    );
  }
}
