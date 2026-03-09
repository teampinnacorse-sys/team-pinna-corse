import "../styles/globals.css";
import "@/components/Navbar.css";

import Navbar from "@/components/Navbar";
import SponsorsStrip from "@/components/SponsorsStrip";
import Footer from "@/components/Footer";

import { cookies } from "next/headers";
import CookieBanner, { COOKIE_NAME } from "@/components/CookieBanner";
import AnalyticsScripts from "@/components/AnalyticsScripts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://team-pinna-corse.vercel.app";

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
    "team rally",
    "sponsor rally",
    "gare rally",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title: "Team Pinna Corse",
    description:
      "Scopri il Team Pinna Corse: eventi, risultati, foto ufficiali e sponsor.",
    siteName: "Team Pinna Corse",
    images: [
      {
        url: "/foto/TPC-LOGO.png",
        width: 1200,
        height: 630,
        alt: "Team Pinna Corse Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Team Pinna Corse",
    description:
      "Team Pinna Corse - rally team ufficiale. News, eventi e gallery.",
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
      "Team Pinna Corse – squadra rally impegnata in competizioni nazionali.",
  };

  return (
    <html lang="it">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />

        <AnalyticsScripts enabled={analyticsAllowed} />
        <Navbar />
        <main>{children}</main>
        <SponsorsStrip />
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
