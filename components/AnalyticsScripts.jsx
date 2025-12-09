// components/AnalyticsScripts.jsx
"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function AnalyticsScripts() {
  if (!GA_ID) return null;

  return (
    <>
      {/* Carica la libreria gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Inizializza Google Analytics con IP anonimizzato */}
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
