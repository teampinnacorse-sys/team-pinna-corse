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
          throw new Error(
            data?.error || "Errore durante il caricamento gallery.",
          );
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

  const allAlbum = useMemo(
    () => albums.find((a) => a.id === "all") || null,
    [albums],
  );

  const photosToShow = useMemo(() => {
    if (!albums.length) return [];

    if (activeId === "all") {
      return allAlbum?.photos || [];
    }

    const found = albums.find((a) => a.id === activeId);
    return found?.photos || [];
  }, [albums, activeId, allAlbum]);

  const currentAlbumName = useMemo(() => {
    if (activeId === "all") return "Tutte le foto";
    return albums.find((a) => a.id === activeId)?.name || "";
  }, [albums, activeId]);

  const lightboxAlbum = useMemo(
    () => ({
      id: activeId,
      name: currentAlbumName,
      photos: photosToShow,
    }),
    [activeId, currentAlbumName, photosToShow],
  );

  const totalCount = allAlbum?.photos?.length || 0;

  const openLightbox = (idx) => {
    setLightbox({
      open: true,
      photoIdx: idx,
    });
  };

  return (
    <section className="gd-wrap">
      <div className="gd-head">
        <h1 className="gd-title">Galleria</h1>
      </div>

      <div className="gd-toolbar" role="tablist" aria-label="Filtra album">
        <button
          className={`gd-chip ${activeId === "all" ? "is-active" : ""}`}
          onClick={() => setActiveId("all")}
          title="Mostra tutte le foto"
          type="button"
        >
          Tutte <span>{totalCount}</span>
        </button>

        {albums
          .filter((al) => al.id !== "all")
          .map((al) => (
            <button
              key={al.id}
              className={`gd-chip ${activeId === al.id ? "is-active" : ""}`}
              onClick={() => setActiveId(al.id)}
              title={al.name}
              type="button"
            >
              {al.name} <span>{al.photos.length}</span>
            </button>
          ))}
      </div>

      {loading && (
        <div className="gd-grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="gd-skeleton" />
          ))}
        </div>
      )}

      {!!err && (
        <div className="gd-error">
          <strong>Errore:</strong> {err}
        </div>
      )}

      {!loading && !err && photosToShow.length > 0 && (
        <div className="gd-grid">
          {photosToShow.map((ph, idx) => (
            <button
              key={ph.id}
              className="gd-card"
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
          albums={[lightboxAlbum]}
          state={{ albumIdx: 0, photoIdx: lightbox.photoIdx }}
          onClose={() => setLightbox((s) => ({ ...s, open: false }))}
          onPrev={() =>
            setLightbox((s) => {
              const len = lightboxAlbum.photos.length;
              const prev = (s.photoIdx - 1 + len) % len;
              return { ...s, photoIdx: prev };
            })
          }
          onNext={() =>
            setLightbox((s) => {
              const len = lightboxAlbum.photos.length;
              const next = (s.photoIdx + 1) % len;
              return { ...s, photoIdx: next };
            })
          }
        />
      )}
    </section>
  );
}
