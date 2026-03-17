import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import SponsorsStrip from "@/components/SponsorsStrip";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const SITE_URL = "https://www.teampinnacorse.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Team Pinna Corse | Rally Team Sardegna",
    template: "%s | Team Pinna Corse",
  },
  description:
    "Team Pinna Corse: team rally in Sardegna. Gare, foto ufficiali, equipaggio, sponsor e news dal mondo motorsport.",
  keywords: [
    "Team Pinna Corse",
    "rally sardegna",
    "team rally italia",
    "motorsport sardegna",
    "gare rally",
    "foto rally",
    "sponsor rally",
    "team corse sardegna",
  ],
  applicationName: "Team Pinna Corse",
  authors: [{ name: "Team Pinna Corse" }],
  creator: "Team Pinna Corse",
  publisher: "Team Pinna Corse",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Team Pinna Corse",
    title: "Team Pinna Corse | Rally Team Sardegna",
    description:
      "Scopri Team Pinna Corse: rally, gare, foto ufficiali, partner e news.",
    images: [
      {
        url: "/foto/Homepage.png",
        width: 1200,
        height: 630,
        alt: "Team Pinna Corse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Pinna Corse | Rally Team Sardegna",
    description:
      "Rally, gare, foto ufficiali, partner e news del Team Pinna Corse.",
    images: ["/foto/Homepage.png"],
  },
  icons: {
    icon: "/foto/TPC-LOGO.png",
    shortcut: "/foto/TPC-LOGO.png",
    apple: "/foto/TPC-LOGO.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: "Team Pinna Corse",
    url: SITE_URL,
    logo: `${SITE_URL}/foto/TPC-LOGO.png`,
    image: `${SITE_URL}/foto/Homepage.png`,
    sport: "Rally",
    description:
      "Team Pinna Corse: team rally in Sardegna con gallery, partner, news e contenuti ufficiali.",
    sameAs: ["https://www.teampinnacorse.com"],
  };

  return (
    <html lang="it">
      <body className="rally-theme">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <SponsorsStrip />
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
