import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY;

function buildMetadataUrl(id) {
  const safeId = encodeURIComponent(id);
  const url = new URL(`https://www.googleapis.com/drive/v3/files/${safeId}`);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("fields", "id,name,mimeType,thumbnailLink");
  return url.toString();
}

function buildMediaUrl(id) {
  const safeId = encodeURIComponent(id);
  const url = new URL(`https://www.googleapis.com/drive/v3/files/${safeId}`);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("alt", "media");
  return url.toString();
}

export async function GET(request, context) {
  try {
    if (!API_KEY) {
      return new NextResponse("GOOGLE_API_KEY mancante.", { status: 500 });
    }

    const id = context?.params?.id;

    if (!id) {
      return new NextResponse("ID file mancante.", { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "full";

    if (mode === "thumb") {
      const metaRes = await fetch(buildMetadataUrl(id), {
        cache: "no-store",
      });

      if (!metaRes.ok) {
        const txt = await metaRes.text();
        return new NextResponse(
          `Drive metadata error (${metaRes.status}): ${txt}`,
          {
            status: metaRes.status,
          },
        );
      }

      const meta = await metaRes.json();

      if (meta?.thumbnailLink) {
        const thumbUrl = meta.thumbnailLink.replace(/=s\d+(-c)?$/, "=s800");

        const thumbRes = await fetch(thumbUrl, {
          cache: "no-store",
        });

        if (thumbRes.ok) {
          const contentType =
            thumbRes.headers.get("content-type") || "image/jpeg";
          const arrayBuffer = await thumbRes.arrayBuffer();

          return new NextResponse(arrayBuffer, {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
          });
        }
      }
    }

    const mediaRes = await fetch(buildMediaUrl(id), {
      cache: "no-store",
    });

    if (!mediaRes.ok) {
      const txt = await mediaRes.text();
      return new NextResponse(`Drive file error (${mediaRes.status}): ${txt}`, {
        status: mediaRes.status,
      });
    }

    const contentType =
      mediaRes.headers.get("content-type") || "application/octet-stream";

    const arrayBuffer = await mediaRes.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("GET /api/gallery/file/[id] error:", error);
    return new NextResponse("Errore interno nel proxy immagine.", {
      status: 500,
    });
  }
}
