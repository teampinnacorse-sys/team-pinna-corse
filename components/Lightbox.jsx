"use client";

export default function Lightbox({ albums, state, onClose, onPrev, onNext }) {
  const album = albums?.[state?.albumIdx];
  const photo = album?.photos?.[state?.photoIdx];

  if (!photo) return null;

  return (
    <div
      className="lb-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="lb-shell" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lb-close" onClick={onClose}>
          ✕
        </button>

        <button type="button" className="lb-nav lb-prev" onClick={onPrev}>
          ‹
        </button>

        <div className="lb-stage">
          <img className="lb-image" src={photo.fullSrc} alt={photo.name} />
          {photo.name ? <div className="lb-caption">{photo.name}</div> : null}
        </div>

        <button type="button" className="lb-nav lb-next" onClick={onNext}>
          ›
        </button>
      </div>
    </div>
  );
}
