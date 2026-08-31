const CATEGORIES = [
  "Dinner Sets",
  "Tea & Coffee",
  "Serveware",
  "Bowls",
  "Glassware",
  "Cutlery",
  "Gift Sets",
  "Decor",
];

export default function CategoryStrip() {
  return (
    <section id="categories" className="border-y border-ink-900/10 bg-ink-950 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-6">
        {CATEGORIES.map((cat) => (
          <span key={cat} className="font-display text-lg tracking-wide text-clay-100/70">
            {cat}
          </span>
        ))}
      </div>
    </section>
  );
}
