// app/privacy-policy/page.jsx
import styles from "./PrivacyPolicy.module.css";

export const metadata = {
  title: "Privacy Policy | Team Pinna Corse",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>
          Informativa ai sensi del Regolamento UE 2016/679 (GDPR)
        </p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.intro}>
          La presente informativa descrive le modalità con cui{" "}
          <strong>Team Pinna Corse</strong> tratta i dati personali degli utenti
          che visitano il sito o inviano richieste tramite i moduli di contatto.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Titolare del trattamento</h2>
        <p className={styles.paragraph}>
          <strong>Team Pinna Corse</strong>
          <br />
          Email:{" "}
          <a href="mailto:teampinnacorse@gmail.com">teampinnacorse@gmail.com</a>
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Tipologie di dati trattati</h2>

        <h3 className={styles.subTitle}>2.1 Dati di navigazione</h3>
        <p className={styles.paragraph}>
          I sistemi informatici e le procedure software preposte al
          funzionamento del sito acquisiscono alcuni dati la cui trasmissione è
          implicita nell&apos;uso dei protocolli di comunicazione di Internet
          (es. indirizzo IP anonimizzato, tipo di browser, pagine visitate, data
          e ora dell&apos;accesso, ecc.). Tali dati sono utilizzati
          esclusivamente per fini statistici anonimi e per garantire il corretto
          funzionamento e la sicurezza del sito.
        </p>

        <h3 className={styles.subTitle}>2.2 Cookie e strumenti di analisi</h3>
        <p className={styles.paragraph}>
          Il sito utilizza cookie tecnici e, solo previo consenso, cookie di
          analisi tramite Google Analytics. Per maggiori dettagli consulta la{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>

        <h3 className={styles.subTitle}>
          2.3 Dati forniti volontariamente dall&apos;utente
        </h3>
        <p className={styles.paragraph}>
          L&apos;invio facoltativo e volontario di messaggi tramite il modulo di
          contatto comporta l&apos;acquisizione dei dati inseriti (es. nome,
          email, eventuale numero di telefono, nome dell&apos;azienda, contenuto
          del messaggio), utilizzati esclusivamente per rispondere alle
          richieste.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          3. Finalità e basi giuridiche del trattamento
        </h2>

        <h3 className={styles.subTitle}>
          a) Risposta alle richieste inviate tramite form
        </h3>
        <p className={styles.paragraph}>
          I dati inseriti nel modulo di contatto sono trattati al solo scopo di
          rispondere alle richieste dell&apos;utente (es. informazioni,
          sponsorizzazioni, collaborazioni).
        </p>
        <p className={styles.paragraph}>
          Base giuridica: <strong>art. 6(1)(b) GDPR</strong> – esecuzione di
          misure precontrattuali su richiesta dell&apos;interessato.
        </p>

        <h3 className={styles.subTitle}>
          b) Analisi del traffico e miglioramento del sito
        </h3>
        <p className={styles.paragraph}>
          I dati raccolti tramite Google Analytics vengono utilizzati per
          ottenere statistiche aggregate e anonime sull&apos;utilizzo del sito,
          migliorare i contenuti e fornire agli sponsor dati sul numero di
          visitatori.
        </p>
        <p className={styles.paragraph}>
          Base giuridica: <strong>art. 6(1)(a) GDPR</strong> – consenso
          dell&apos;interessato, espresso tramite il banner cookie.
        </p>

        <h3 className={styles.subTitle}>c) Sicurezza del sito</h3>
        <p className={styles.paragraph}>
          Alcuni dati tecnici possono essere utilizzati per monitorare il
          corretto funzionamento del sito e prevenire attività fraudolente o
          dannose.
        </p>
        <p className={styles.paragraph}>
          Base giuridica: <strong>art. 6(1)(f) GDPR</strong> – legittimo
          interesse del Titolare.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Modalità del trattamento</h2>
        <p className={styles.paragraph}>
          I dati sono trattati con strumenti informatici e telematici, adottando
          misure di sicurezza adeguate per proteggerli da accessi non
          autorizzati, divulgazione, modifica o distruzione. I dati non sono
          oggetto di processi decisionali automatizzati né di profilazione.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Conservazione dei dati</h2>
        <ul className={styles.list}>
          <li>
            Dati del form di contatto: fino a <strong>24 mesi</strong> dalla
            ricezione della richiesta.
          </li>
          <li>
            Dati tecnici e log di sicurezza: fino a <strong>12 mesi</strong>.
          </li>
          <li>
            Cookie e dati di Analytics: secondo i tempi indicati nella{" "}
            <a href="/cookie-policy">Cookie Policy</a>.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Destinatari dei dati</h2>
        <p className={styles.paragraph}>I dati possono essere trattati da:</p>
        <ul className={styles.list}>
          <li>il Titolare e gli eventuali collaboratori autorizzati;</li>
          <li>fornitori di servizi IT (es. hosting, manutenzione del sito);</li>
          <li>
            Google Ireland Ltd., in qualità di fornitore di Google Analytics,
            per i soli dati di navigazione anonimi.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          7. Trasferimento dei dati verso Paesi extra UE
        </h2>
        <p className={styles.paragraph}>
          Alcuni servizi (es. Google Analytics) possono comportare trasferimenti
          di dati verso Paesi extra UE, in particolare gli Stati Uniti. Tali
          trasferimenti avvengono nel rispetto delle disposizioni del GDPR e,
          ove applicabile, del Data Privacy Framework UE–USA. I dati raccolti
          sono comunque trattati in forma aggregata e non consentono
          l&apos;identificazione diretta dell&apos;utente.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          8. Diritti dell&apos;interessato
        </h2>
        <p className={styles.paragraph}>
          L&apos;utente può esercitare in qualsiasi momento i diritti previsti
          dagli artt. 15–22 GDPR, tra cui:
        </p>
        <ul className={styles.list}>
          <li>accesso ai dati personali;</li>
          <li>rettifica o aggiornamento;</li>
          <li>cancellazione (diritto all&apos;oblio);</li>
          <li>limitazione del trattamento;</li>
          <li>opposizione al trattamento;</li>
          <li>portabilità dei dati;</li>
          <li>
            revoca del consenso prestato, senza pregiudicare la liceità del
            trattamento basata sul consenso prima della revoca.
          </li>
        </ul>
        <p className={styles.paragraph}>
          Le richieste possono essere inviate a:{" "}
          <a href="mailto:teampinnacorse@gmail.com">teampinnacorse@gmail.com</a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          9. Reclami all&apos;Autorità di controllo
        </h2>
        <p className={styles.paragraph}>
          Qualora l&apos;utente ritenga che il trattamento dei propri dati
          personali violi la normativa vigente, ha il diritto di proporre
          reclamo all&apos;Autorità di controllo competente del proprio Paese
          dell&apos;UE.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          10. Modifiche a questa Privacy Policy
        </h2>
        <p className={styles.paragraph}>
          Il Titolare si riserva il diritto di aggiornare la presente
          informativa in qualsiasi momento. Le modifiche saranno pubblicate su
          questa pagina e, ove necessario, comunicate agli utenti.
        </p>
        <p className={styles.update}>Ultimo aggiornamento: Gennaio 2025</p>
      </section>
    </main>
  );
}
