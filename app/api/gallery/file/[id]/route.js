import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

function buildMetaUrl(fileId) {
  const url = new URL(`${DRIVE_API}/${encodeURIComponent(fileId)}`);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("supportsAllDrives", "true");
  url.searchParams.set("fields", "id,name,mimeType,trashed,parents");
  return url.toString();
}

function buildMediaUrl(fileId) {
  const url = new URL(`${DRIVE_API}/${encodeURIComponent(fileId)}`);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("alt", "media");
  url.searchParams.set("supportsAllDrives", "true");
  return url.toString();
}

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const mode = req.nextUrl.searchParams.get("mode") || "full";

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Manca GOOGLE_API_KEY nelle variabili ambiente." },
        { status: 500 },
      );
    }

    if (!id) {
      return NextResponse.json({ error: "ID file mancante." }, { status: 400 });
    }

    const metaRes = await fetch(buildMetaUrl(id), { cache: "no-store" });

    if (!metaRes.ok) {
      const txt = await metaRes.text();
      return NextResponse.json(
        { error: `Drive meta error (${metaRes.status}): ${txt}` },
        { status: metaRes.status },
      );
    }

    const meta = await metaRes.json();

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

    const mediaRes = await fetch(buildMediaUrl(id), {
      cache: "no-store",
    });

    if (!mediaRes.ok) {
      const txt = await mediaRes.text();
      return NextResponse.json(
        { error: `Drive file error (${mediaRes.status}): ${txt}` },
        { status: mediaRes.status },
      );
    }

    const contentType =
      mediaRes.headers.get("content-type") || meta.mimeType || "image/jpeg";

    const arrayBuffer = await mediaRes.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          mode === "thumb"
            ? "public, max-age=60, stale-while-revalidate=60"
            : "public, max-age=60, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("GET /api/gallery/file/[id] error:", error);

    return NextResponse.json(
      { error: error.message || "Errore interno nel recupero immagine." },
      { status: 500 },
    );
  }
}
