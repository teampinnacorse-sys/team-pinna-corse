"use client";

import Image from "next/image";
import "./PartnersGrid.css";

import CorbeLogo from "/public/foto/sponsor/Corbe.jpg";
import EdiDueLogo from "/public/foto/sponsor/EdiDue.jpg";
import EdilMandaraLogo from "/public/foto/sponsor/Edil-Mandara.jpg";
import LupinuLogo from "/public/foto/sponsor/Lupinu.jpg";
alt: "https://www.mesinacompany.it/";
import MesinaLogo from "/public/foto/sponsor/Mesina.jpg";
import PaneSardoLogo from "/public/foto/sponsor/Pane-Sardo.jpg";
import SannaLogo from "/public/foto/sponsor/Sanna.jpg";

const PARTNERS = [
  { name: "EdilDue", logo: EdiDueLogo },
  { name: "Corbe Termoidraulica & Condizionamento", logo: CorbeLogo },

  { name: "Edil Mandara", logo: EdilMandaraLogo },
  { name: "Lupinu Innovart", logo: LupinuLogo },
  { name: "Mesina Company", logo: MesinaLogo },
  { name: "Pane Sardo di Silì", logo: PaneSardoLogo },
  { name: "GMS Costruzioni di Giulia Sanna", logo: SannaLogo },
];

export default function PartnersGrid() {
  return (
    <section className="partners-section" aria-labelledby="partners-title">
      <div className="partners-inner">
        <header className="partners-header">
          <p className="partners-kicker">Official partners</p>
          <h1 id="partners-title" className="partners-title">
            I brand che corrono con noi
          </h1>
          <p className="partners-subtitle">
            Senza di loro il nostro progetto non sarebbe possibile. Ogni logo
            qui sotto è un pezzo della nostra stagione rally.
          </p>
        </header>

        <div className="partners-grid">
          {PARTNERS.map((partner) => (
            <div className="partner-card" key={partner.name}>
              <div className="partner-logo-wrap">
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  fill
                  sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 250px"
                  className="partner-logo-img"
                />
              </div>
              <p className="partner-name">{partner.name}</p>
            </div>
          ))}
        </div>

        <p className="partners-bottom-text">
          Vuoi diventare partner del Team Pinna Corse? Visita la sezione{" "}
          <span>Contatti</span> e scrivici per il media kit sponsors.
        </p>
      </div>
    </section>
  );
}
