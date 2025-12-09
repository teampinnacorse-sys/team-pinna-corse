// app/partners/page.jsx
import PartnersGrid from "@/components/PartnersGrid";

export const metadata = {
  title: "Partners | HAP Rally Team",
  description:
    "Scopri tutti i partner e sponsor che supportano il Team Pinna Corse e HAP Rally Team.",
};

export default function PartnersPage() {
  return (
    <main className="partners-page">
      <PartnersGrid />
    </main>
  );
}
