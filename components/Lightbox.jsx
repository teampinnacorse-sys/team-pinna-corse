"use client";

/**
 * Props:
 * - albums: [{ id, name, photos: [{ id, name, fullSrc, thumbSrc }] }]
 * - state: { albumIdx: number, photoIdx: number }
 * - onClose: () => void
 * - onPrev: () => void
 * - onNext: () => void
 */
export default function Lightbox({ albums, state, onClose, onPrev, onNext }) {
  const album = albums?.[state?.albumIdx];
  const photo = album?.photos?.[state?.photoIdx];

  if (!photo) return null;

  return (
    <div
      className="lb-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="lb-shell" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose} type="button">
          ✕
        </button>

        <button className="lb-nav lb-prev" onClick={onPrev} type="button">
          ‹
        </button>

        <div className="lb-stage">
          <img className="lb-image" src={photo.fullSrc} alt={photo.name} />
          {photo.name ? <div className="lb-caption">{photo.name}</div> : null}
        </div>

        <button className="lb-nav lb-next" onClick={onNext} type="button">
          ›
        </button>
      </div>
    </div>
  );
}
