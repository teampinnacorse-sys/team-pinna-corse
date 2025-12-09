// components/CookieBanner.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./CookieBanner.css";

export const COOKIE_NAME = "tpc_cookie_consent";

function readConsentFromDocument() {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]));
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const existing = readConsentFromDocument();
    // Se non è mai stato espresso il consenso, mostriamo il banner
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (analyticsAllowed) => {
    if (typeof document === "undefined") return;

    const value = encodeURIComponent(
      JSON.stringify({ analytics: analyticsAllowed })
    );

    // cookie valido 6 mesi, su tutto il sito
    document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${
      60 * 60 * 24 * 180
    }; SameSite=Lax`;

    setVisible(false);

    // molto importante: forza il refresh dei Server Components
    router.refresh();
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <h3 className="cookie-banner__title">Preferenze cookie</h3>
        <p className="cookie-banner__text">
          Utilizziamo cookie tecnici per il corretto funzionamento del sito e,
          solo se acconsenti, cookie di analisi (Google Analytics) per
          statistiche anonime sulle visite, utili a mostrare agli sponsor
          l&apos;interesse per il progetto <strong>Team Pinna Corse</strong>.
        </p>
        <p className="cookie-banner__links">
          Puoi leggere maggiori dettagli nella nostra{" "}
          <a href="/cookie-policy">Cookie Policy</a> e{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </div>

      <div className="cookie-banner__actions">
        <button
          className="cookie-banner__button cookie-banner__button--secondary"
          type="button"
          onClick={() => saveConsent(false)}
        >
          Solo cookie necessari
        </button>
        <button
          className="cookie-banner__button cookie-banner__button--primary"
          type="button"
          onClick={() => saveConsent(true)}
        >
          Accetta cookie di analytics
        </button>
      </div>
    </div>
  );
}
