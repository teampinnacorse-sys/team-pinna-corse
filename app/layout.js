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

const SITE_URL = "https://team-pinna-corse.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Team Pinna Corse",
    template: "%s | Team Pinna Corse",
  },
  description:
    "Sito ufficiale del Team Pinna Corse: news, eventi rally, foto ufficiali, team e informazioni per sponsor.",
  keywords: [
    "Team Pinna Corse",
    "rally",
    "motorsport",
    "sponsor rally",
    "gare",
    "fotografia rally",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Team Pinna Corse",
    description:
      "Scopri il Team Pinna Corse: news, eventi, foto ufficiali, risultati e spazio dedicato agli sponsor.",
    siteName: "Team Pinna Corse",
    images: [
      {
        url: "/foto/TPC-LOGO.png",
        width: 1200,
        height: 630,
        alt: "Team Pinna Corse – Logo ufficiale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Pinna Corse",
    description:
      "Sito ufficiale del Team Pinna Corse. News, eventi rally, foto ufficiali e spazio dedicato agli sponsor.",
    images: ["/foto/TPC-LOGO.png"],
  },
  icons: {
    icon: "/foto/TPC-LOGO.png",
    shortcut: "/foto/TPC-LOGO.png",
    apple: "/foto/TPC-LOGO.png",
  },
};

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

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: "Team Pinna Corse",
    url: SITE_URL,
    logo: `${SITE_URL}/foto/TPC-LOGO.png`,
    sport: "Rally",
    description:
      "Team Pinna Corse – squadra rally che partecipa a competizioni ufficiali con piloti, navigatori e staff dedicati.",
  };

  return (
    <html lang="it">
      <body className="rally-theme">
        {/* Structured Data per SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />

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

        {/* COOKIE BANNER */}
        <CookieBanner />
      </body>
    </html>
  );
}
