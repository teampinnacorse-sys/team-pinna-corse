// app/cookie-policy/page.jsx
import styles from "./CookiePolicy.module.css";

export const metadata = {
  title: "Cookie Policy | Team Pinna Corse",
  description:
    "Informativa sui cookie utilizzati dal sito ufficiale Team Pinna Corse, nel rispetto del GDPR e della Direttiva ePrivacy.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>
          Informativa sull&apos;uso dei cookie (Reg. UE 2016/679 e Direttiva
          ePrivacy)
        </p>
        <h1 className={styles.title}>Cookie Policy</h1>
        <p className={styles.intro}>
          La presente Cookie Policy descrive come il sito{" "}
          <strong>Team Pinna Corse</strong> utilizza cookie e tecnologie simili
          per offrire una migliore esperienza di navigazione e raccogliere
          statistiche anonime sulle visite.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Cosa sono i cookie</h2>
        <p className={styles.paragraph}>
          I cookie sono piccoli file di testo che i siti visitati inviano al
          dispositivo dell&apos;utente, dove vengono memorizzati per essere poi
          ritrasmessi agli stessi siti alla visita successiva. I cookie
          consentono, tra le altre cose, di tenere traccia delle preferenze
          dell&apos;utente e di analizzare l&apos;utilizzo del sito in forma
          aggregata.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          2. Tipologie di cookie utilizzati
        </h2>

        <h3 className={styles.subTitle}>2.1 Cookie tecnici (necessari)</h3>
        <p className={styles.paragraph}>
          Sono indispensabili per il corretto funzionamento del sito e non
          richiedono il consenso dell&apos;utente. Tra questi rientra il cookie
          che memorizza la scelta sui consensi{" "}
          <code className={styles.code}>tpc_cookie_consent</code>.
        </p>

        <h3 className={styles.subTitle}>
          2.2 Cookie di analisi (Google Analytics)
        </h3>
        <p className={styles.paragraph}>
          Utilizziamo Google Analytics per raccogliere dati statistici aggregati
          e anonimi sulle visite al sito (numero di visitatori, pagine più
          viste, provenienza geografica approssimativa, ecc.). Questi cookie
          vengono installati solo se l&apos;utente fornisce il proprio consenso
          tramite il banner.
        </p>
        <p className={styles.paragraph}>
          È attiva l&apos;anonimizzazione dell&apos;indirizzo IP e i dati sono
          utilizzati esclusivamente per analizzare le performance del sito e
          mostrare agli sponsor l&apos;interesse generato dal progetto.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Dettaglio dei cookie</h2>
        <ul className={styles.list}>
          <li>
            <strong>tpc_cookie_consent</strong> – cookie tecnico, durata: 6
            mesi, memorizza la scelta dell&apos;utente in merito ai cookie di
            analytics.
          </li>
          <li>
            <strong>Cookie Google Analytics</strong> – cookie di analisi,
            installati solo previa accettazione, con durata tipica fino a 24
            mesi.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          4. Come viene richiesto il consenso
        </h2>
        <p className={styles.paragraph}>
          Al primo accesso viene mostrato un banner che consente all&apos;utente
          di:
        </p>
        <ul className={styles.list}>
          <li>accettare i cookie di analytics;</li>
          <li>rifiutare i cookie di analytics;</li>
          <li>consultare la presente Cookie Policy.</li>
        </ul>
        <p className={styles.paragraph}>
          I cookie di analisi vengono attivati solo dopo esplicita accettazione.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          5. Come modificare o revocare il consenso
        </h2>
        <p className={styles.paragraph}>
          È possibile modificare la scelta sui cookie in qualsiasi momento
          cliccando su <strong>&quot;Impostazioni cookie&quot;</strong> nel
          footer del sito o cancellando il cookie{" "}
          <code className={styles.code}>tpc_cookie_consent</code> dalle
          impostazioni del browser.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          6. Gestione dei cookie tramite browser
        </h2>
        <p className={styles.paragraph}>
          L&apos;utente può gestire, eliminare o bloccare i cookie anche tramite
          le impostazioni del proprio browser (Chrome, Firefox, Safari, Edge,
          ecc.). La disattivazione dei cookie tecnici potrebbe compromettere il
          corretto funzionamento del sito.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Titolare del trattamento</h2>
        <p className={styles.paragraph}>
          <strong>Team Pinna Corse</strong>
          <br />
          Email:{" "}
          <a href="mailto:teampinnacorse@gmail.com" className={styles.link}>
            teampinnacorse@gmail.com
          </a>
        </p>
        <p className={styles.update}>Ultimo aggiornamento: Gennaio 2025</p>
      </section>
    </main>
  );
}
