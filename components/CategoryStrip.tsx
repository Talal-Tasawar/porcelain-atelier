"use client";

import { motion } from "framer-motion";

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
  const looped = [...CATEGORIES, ...CATEGORIES];

  return (
    <section id="categories" className="overflow-hidden border-y border-ink-900/10 bg-ink-950 py-5">
      <motion.div className="flex w-max gap-14 whitespace-nowrap animate-marquee">
        {looped.map((cat, i) => (
          <span key={i} className="font-display text-lg text-clay-100/70 tracking-wide">
            {cat}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
