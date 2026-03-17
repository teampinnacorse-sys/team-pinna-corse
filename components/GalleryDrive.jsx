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
    let cancelled = false;

    async function load() {
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

        if (!cancelled) {
          setAlbums(Array.isArray(data?.albums) ? data.albums : []);
        }
      } catch (error) {
        console.error("Errore fetch gallery:", error);
        if (!cancelled) {
          setErr(error?.message || "Errore sconosciuto.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const allAlbum = useMemo(
    () => albums.find((album) => album.id === "all") || null,
    [albums],
  );

  const photosToShow = useMemo(() => {
    if (!albums.length) return [];

    if (activeId === "all") {
      return Array.isArray(allAlbum?.photos) ? allAlbum.photos : [];
    }

    const selected = albums.find((album) => album.id === activeId);
    return Array.isArray(selected?.photos) ? selected.photos : [];
  }, [albums, activeId, allAlbum]);

  const currentAlbumName = useMemo(() => {
    if (activeId === "all") return "Tutte le foto";
    return albums.find((album) => album.id === activeId)?.name || "";
  }, [albums, activeId]);

  const totalCount = Array.isArray(allAlbum?.photos)
    ? allAlbum.photos.length
    : 0;

  const lightboxAlbum = useMemo(
    () => ({
      id: activeId,
      name: currentAlbumName,
      photos: photosToShow,
    }),
    [activeId, currentAlbumName, photosToShow],
  );

  function openLightbox(index) {
    setLightbox({
      open: true,
      photoIdx: index,
    });
  }

  function closeLightbox() {
    setLightbox((prev) => ({ ...prev, open: false }));
  }

  function prevLightbox() {
    setLightbox((prev) => {
      const total = lightboxAlbum.photos.length;
      if (!total) return prev;
      return {
        ...prev,
        photoIdx: (prev.photoIdx - 1 + total) % total,
      };
    });
  }

  function nextLightbox() {
    setLightbox((prev) => {
      const total = lightboxAlbum.photos.length;
      if (!total) return prev;
      return {
        ...prev,
        photoIdx: (prev.photoIdx + 1) % total,
      };
    });
  }

  return (
    <section className="gd-wrap">
      <div className="gd-head">
        <h1 className="gd-title">Galleria</h1>
      </div>

      <div className="gd-toolbar" role="tablist" aria-label="Filtra album">
        <button
          type="button"
          className={`gd-chip ${activeId === "all" ? "is-active" : ""}`}
          onClick={() => setActiveId("all")}
          title="Mostra tutte le foto"
        >
          Tutte <span>{totalCount}</span>
        </button>

        {albums
          .filter((album) => album.id !== "all")
          .map((album) => (
            <button
              key={album.id}
              type="button"
              className={`gd-chip ${activeId === album.id ? "is-active" : ""}`}
              onClick={() => setActiveId(album.id)}
              title={album.name}
            >
              {album.name}{" "}
              <span>
                {Array.isArray(album.photos) ? album.photos.length : 0}
              </span>
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

      {!loading && !!err && (
        <div className="gd-error">
          <strong>Errore:</strong> {err}
        </div>
      )}

      {!loading && !err && photosToShow.length > 0 && (
        <div className="gd-grid">
          {photosToShow.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="gd-card"
              onClick={() => openLightbox(index)}
              aria-label={`Apri ${photo.name}`}
              title={photo.name}
            >
              <img
                src={photo.thumbSrc}
                alt={`Team Pinna Corse - ${photo.name}`}
                loading="lazy"
                className="gd-m-img"
                style={{ opacity: 1 }}
                onError={(e) => {
                  console.log("IMG FAIL", photo?.id, photo?.thumbSrc);
                }}
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
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </section>
  );
}
