// app/layout.js

// CSS globali
import "../styles/globals.css";
import "@/components/Navbar.css";

// Componenti globali
import Navbar from "@/components/Navbar";
import SponsorsStrip from "@/components/SponsorsStrip";
import Footer from "@/components/Footer";

// Componenti GDPR
import { cookies } from "next/headers";
import CookieBanner, { COOKIE_NAME } from "@/components/CookieBanner";
import AnalyticsScripts from "@/components/AnalyticsScripts";

export const metadata = {
  title: "Team Pinna Corse",
  description:
    "Sito ufficiale del Team Pinna Corse. News, eventi, rally, foto e contatti.",
};

// ⬇⬇⬇  NOTA: funzione async + await cookies()
export default async function RootLayout({ children }) {
  const cookieStore = await cookies(); // ✅ ora è async
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
