// components/CookieBanner.jsx
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./CookieBanner.css";

export const COOKIE_NAME = "tpc_cookie_consent";
const COOKIE_VERSION = "1.0";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const existing = Cookies.get(COOKIE_NAME);
    if (!existing) {
      setOpen(true);
      return;
    }

    try {
      const parsed = JSON.parse(existing);
      if (parsed.version !== COOKIE_VERSION) {
        // se aggiorni la policy, puoi forzare nuovo consenso
        setOpen(true);
      }
    } catch {
      // cookie rotto → richiedo nuovo consenso
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const handleChoice = (analyticsAllowed) => {
    const value = JSON.stringify({
      necessary: true,
      analytics: analyticsAllowed,
      version: COOKIE_VERSION,
      timestamp: new Date().toISOString(),
    });

    Cookies.set(COOKIE_NAME, value, { expires: 180 }); // ~6 mesi

    setOpen(false);
    // reload per rileggere il consenso lato server e caricare GA se accettato
    window.location.reload();
  };

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <h3 className="cookie-banner__title">Usiamo i cookie</h3>
        <p className="cookie-banner__text">
          Questo sito utilizza cookie tecnici necessari al funzionamento e, solo
          previo tuo consenso, cookie di analisi (Google Analytics) per ottenere
          statistiche anonime sulle visite. I dati sono usati solo per capire
          quante persone visitano il sito e valutare l&apos;interesse degli
          sponsor.
        </p>
        <a href="/cookie-policy" className="cookie-banner__link">
          Leggi la Cookie Policy
        </a>
      </div>

      <div className="cookie-banner__actions">
        <button
          type="button"
          className="cookie-btn cookie-btn--ghost"
          onClick={() => handleChoice(false)}
        >
          Rifiuta Analytics
        </button>
        <button
          type="button"
          className="cookie-btn cookie-btn--primary"
          onClick={() => handleChoice(true)}
        >
          Accetta Analytics
        </button>
      </div>
    </div>
  );
}
