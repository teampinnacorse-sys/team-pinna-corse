// components/AnalyticsScripts.jsx
"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function AnalyticsScripts() {
  // Se non abbiamo un ID, non montiamo nulla
  if (!GA_ID) return null;

  return (
    <>
      {/* Carica la libreria gtag.js di Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Inizializza GA4 con IP anonimizzato (GDPR friendly) */}
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', {
          anonymize_ip: true
        });
      `}</Script>
    </>
  );
}
