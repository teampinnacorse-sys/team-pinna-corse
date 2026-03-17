"use client";

import Image from "next/image";
import "./PartnersGrid.css";

import CorbeLogo from "/public/foto/sponsor/Corbe.jpg";
import EdiDueLogo from "/public/foto/sponsor/EdiDue.jpg";
import EdilMandaraLogo from "/public/foto/sponsor/Edil-Mandara.jpg";
import LupinuLogo from "/public/foto/sponsor/Lupinu.jpg";
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
    <section className="partners-grid section">
      <div className="container">
        <h2>Official partners</h2>
        <p>I brand che corrono con noi.</p>

        <div className="grid grid--3">
          {PARTNERS.map((partner) => (
            <article key={partner.name} className="partner-card">
              <Image
                src={partner.logo}
                alt={`Logo partner ${partner.name}`}
                width={600}
                height={400}
              />
              <h3>{partner.name}</h3>
            </article>
          ))}
        </div>

        <p>
          Vuoi diventare partner del Team Pinna Corse? Visita la sezione
          Contatti e scrivici per il media kit sponsor.
        </p>
      </div>
    </section>
  );
}
