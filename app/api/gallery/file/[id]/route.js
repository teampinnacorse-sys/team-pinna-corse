import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";

function buildMediaUrl(fileId) {
  const url = new URL(`${DRIVE_API}/${encodeURIComponent(fileId)}`);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("alt", "media");
  url.searchParams.set("supportsAllDrives", "true");
  return url.toString();
}

export async function GET(req, { params }) {
  try {
    const id = params?.id;
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

    const res = await fetch(buildMediaUrl(id), {
      cache: "no-store",
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json(
        { error: `Drive file error (${res.status}): ${txt}` },
        { status: res.status },
      );
    }

    const contentType =
      res.headers.get("content-type") || "application/octet-stream";

    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          mode === "thumb"
            ? "public, max-age=300, stale-while-revalidate=300"
            : "public, max-age=300, stale-while-revalidate=300",
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
