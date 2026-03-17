import "./StatsStrip.css";

const stats = [
  { value: "1600 cc", label: "CILINDRATA" },
  { value: "500+", label: "ORE DI MESSA A PUNTO" },
  { value: "400+", label: "PNEUMATICI CONSUMATI" },
  { value: "20.000+", label: "KM DI SPECIALI PERCORSI" },
];

function StatCard({ value, label }) {
  return (
    <article className="stats-card">
      <div className="stats-value">{value}</div>
      <div className="stats-label">{label}</div>
    </article>
  );
}

export default function StatsStrip() {
  return (
    <section className="stats-strip section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((item) => (
            <StatCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
