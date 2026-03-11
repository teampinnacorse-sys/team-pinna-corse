"use client";

import { useEffect, useMemo, useState } from "react";
import "./GalleryDrive.css";
import Lightbox from "@/components/Lightbox";

export default function GalleryDrive() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [activeId, setActiveId] = useState("all");
  const [lightbox, setLightbox] = useState({
    open: false,
    albumIdx: 0,
    photoIdx: 0,
  });

  useEffect(() => {
    let stop = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch("/api/gallery", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Errore durante il caricamento gallery.");
        }

        if (!stop) {
          setAlbums(Array.isArray(data.albums) ? data.albums : []);
        }
      } catch (e) {
        console.error("Errore fetch gallery:", e);
        if (!stop) {
          setErr(e.message || String(e));
        }
      } finally {
        if (!stop) {
          setLoading(false);
        }
      }
    })();

    return () => {
      stop = true;
    };
  }, []);

  const photosToShow = useMemo(() => {
    if (!albums.length) return [];

    if (activeId === "all") {
      return albums.flatMap((a) => a.photos);
    }

    const found = albums.find((a) => a.id === activeId);
    return found ? found.photos : [];
  }, [albums, activeId]);

  const lbAlbums = useMemo(
    () => [
      {
        id: activeId,
        name:
          activeId === "all"
            ? "Tutte le foto"
            : albums.find((a) => a.id === activeId)?.name || "",
        photos: photosToShow,
      },
    ],
    [albums, activeId, photosToShow]
  );

  const openLightbox = (idx) =>
    setLightbox({
      open: true,
      albumIdx: 0,
      photoIdx: idx,
    });

  const totalCount = albums.reduce((n, a) => n + a.photos.length, 0);

  return (
    <section className="gd-wrap">
      <h1 className="gd-title">Galleria</h1>

      <div className="gd-tabs">
        <button
          className={`gd-tab ${activeId === "all" ? "is-active" : ""}`}
          onClick={() => setActiveId("all")}
          title="Mostra tutte le foto"
          type="button"
        >
          Tutte <span>{totalCount}</span>
        </button>

        {albums.map((al) => (
          <button
            key={al.id}
            className={`gd-tab ${activeId === al.id ? "is-active" : ""}`}
            onClick={() => setActiveId(al.id)}
            title={al.name}
            type="button"
          >
            {al.name} <span>{al.photos.length}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="gd-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="gd-skeleton" />
          ))}
        </div>
      )}

      {!!err && <div className="gd-error">Errore: {err}</div>}

      {!loading && !err && photosToShow.length > 0 && (
        <div className="gd-grid">
          {photosToShow.map((ph, idx) => (
            <button
              key={ph.id}
              className="gd-item"
              onClick={() => openLightbox(idx)}
              aria-label={`Apri ${ph.name}`}
              title={ph.name}
              type="button"
            >
              <img
                src={ph.thumbSrc}
                alt={ph.name}
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
                className="gd-m-img"
              />
            </button>
          ))}
        </div>
      )}

      {!loading && !err && photosToShow.length === 0 && (
        <div className="gd-empty">Nessuna foto trovata.</div>
      )}

      {lightbox.open && (
        <Lightbox
          albums={lbAlbums}
          albumIdx={lightbox.albumIdx}
          photoIdx={lightbox.photoIdx}
          onClose={() => setLightbox((s) => ({ ...s, open: false }))}
          onPrev={() =>
            setLightbox((s) => {
              const album = lbAlbums[0];
              const prev =
                (s.photoIdx - 1 + album.photos.length) % album.photos.length;
              return { ...s, photoIdx: prev };
            })
          }
          onNext={() =>
            setLightbox((s) => {
              const album = lbAlbums[0];
              const next = (s.photoIdx + 1) % album.photos.length;
              return { ...s, photoIdx: next };
            })
          }
        />
      )}
    </section>
  );
}