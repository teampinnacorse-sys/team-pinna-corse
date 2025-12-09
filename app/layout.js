// app/layout.js

// CSS globali
import "../styles/globals.css";
import "@/components/Navbar.css";

// Componenti globali
import Navbar from "@/components/Navbar";
import SponsorsStrip from "@/components/SponsorsStrip";
import Footer from "@/components/Footer";

// Componenti GDPR / Analytics
import { cookies } from "next/headers";
import CookieBanner, { COOKIE_NAME } from "@/components/CookieBanner";
import AnalyticsScripts from "@/components/AnalyticsScripts";

// Dominio del sito (puoi cambiarlo se usi un dominio custom)
const SITE_URL = "https://team-pinna-corse.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Team Pinna Corse ",
    template: "%s | Team Pinna Corse",
  },
  description:
    "Sito ufficiale del Team Pinna Corse: news, eventi rally, foto ufficiali, team e informazioni per sponsor.",
  keywords: [
    "Team Pinna Corse",
    "HAP Rally Team",
    "rally",
    "motorsport",
    "sponsor rally",
    "gare",
    "fotografia rally",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Team Pinna Corse | HAP Rally Team",
    description:
      "Scopri il Team Pinna Corse: news, eventi, foto ufficiali, risultati e spazio dedicato agli sponsor.",
    siteName: "Team Pinna Corse",
    images: [
      {
        url: "/foto/TPC-LOGO.png", // immagine OG richiesta
        width: 1200,
        height: 630,
        alt: "Team Pinna Corse – Logo Ufficiale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Pinna Corse ",
    description:
      "Sito ufficiale del Team Pinna Corse. News, eventi rally, foto ufficiali e spazio dedicato agli sponsor.",
    images: ["/foto/TPC-LOGO.png"],
  },
  icons: {
    icon: "/foto/favicon.ico",
  },
};

// ⬇⬇⬇ QUESTO È IL DEFAULT EXPORT CHE DEVE ESISTERE PER FORZA
export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const consentCookie = cookieStore.get(COOKIE_NAME);

  let analyticsAllowed = false;

  if (consentCookie) {
    try {
      const parsed = JSON.parse(consentCookie.value);
      analyticsAllowed = !!parsed.analytics;
    } catch {
      analyticsAllowed = false;
    }
  }

  return (
    <html lang="it">
      <body className="rally-theme">
        {/* NAVBAR */}
        <Navbar />

        {/* Google Analytics SOLO se accettato */}
        {analyticsAllowed && <AnalyticsScripts />}

        {/* CONTENUTO PAGINA */}
        <main>{children}</main>

        {/* STRISCIA SPONSOR */}
        <SponsorsStrip />

        {/* FOOTER + link legali + impostazioni cookie */}
        <Footer />

        {/* COOKIE BANNER (sempre in fondo al body) */}
        <CookieBanner />
      </body>
    </html>
  );
}
