"use client";
import Image from "next/image";
import "./SponsorsStrip.css";

/**
 * Banner Sponsor – striscia responsive con scorrimento e hover stop.
 * I loghi sono in /public/foto/sponsor.
 * Puoi regolare opzionalmente "scale" per zoomare di più singoli loghi.
 */
const SPONSORS = [
  {
    src: "/foto/sponsor/EdiDue.jpg",
    alt: "EdiDue di Pinna & Acquas",
    href: "#",
    scale: 1.2, // il foglio con 4 loghi ha testo piccolo
  },
  {
    src: "/foto/sponsor/Edil-Mandara.jpg",
    alt: "Edil Mandaa",
    href: "#",
    scale: 1.05,
  },
  {
    src: "/foto/sponsor/Lupinu.jpg",
    alt: "Lupinu Innovart",
    href: "#",
    scale: 1.1,
  },
  {
    src: "/foto/sponsor/Mesina.jpg",
    alt: "Autotrasporti Autogru Mesina Company",
    href: "#",
    scale: 1.1,
  },
  {
    src: "/foto/sponsor/Pane-Sardo.jpg",
    alt: "Pane Sardo di Silì",
    href: "#",
    scale: 1.25, // più zoom perché è molto verticale
  },
  {
    src: "/foto/sponsor/Sanna.jpg",
    alt: "GMS Costruzioni di Giulia Sanna",
    href: "#",
    scale: 1.25, // tanto bianco intorno → zoom
  },
  {
    src: "/foto/sponsor/Corbe.jpg",
    alt: "Corbe Termoidraulica Condizionamento",
    href: "#",
    scale: 1.15,
  },
];

export default function SponsorsStrip() {
  // Duplico la lista per effetto “marquee” continuo
  const items = [...SPONSORS, ...SPONSORS];

  return (
    <section className="sponsors">
      <div className="sponsors__inner" aria-label="Sponsor banner">
        <div className="sponsors__track">
          {items.map((sp, i) => (
            <a
              className="sponsor"
              href={sp.href || "#"}
              key={`${sp.src}-${i}`}
              target={sp.href && sp.href !== "#" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              aria-label={sp.alt}
            >
              <div className="sponsor__imgwrap">
                <Image
                  src={sp.src}
                  alt={sp.alt}
                  fill
                  sizes="250px"
                  className="sponsor__img"
                  style={{
                    transform: `scale(${sp.scale || 1})`,
                  }}
                  priority={i < 6} // priorità ai primi
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
