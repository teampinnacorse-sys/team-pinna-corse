import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import SponsorsStrip from "@/components/SponsorsStrip";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata = {
  title: "Team Pinna Corse",
  description: "Sito ufficiale Team Pinna Corse",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="rally-theme">
        <Navbar />
        <main>{children}</main>
        <SponsorsStrip />
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
