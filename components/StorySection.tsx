"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "Handpicked, not mass-stocked",
    body: "Every piece is chosen for how it feels on a table, not just how it looks on a shelf.",
  },
  {
    title: "Personal, not automated",
    body: "No faceless checkout. You order, we confirm — a real conversation, every time.",
  },
  {
    title: "Delivered with care",
    body: "Fragile pieces packed properly, tracked personally until they reach your table.",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-6 py-28 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-clay-600">Our Story</p>
          <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-ink-900 sm:text-5xl">
            Crockery chosen the way you'd choose it yourself
          </h2>
          <p className="mt-6 max-w-lg text-ink-500">
            Porcelain Atelier began as a small collection for our own table — pieces we couldn't
            find anywhere else. Today we bring that same eye to every home we deliver to.
          </p>
        </motion.div>

        <div className="space-y-8">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex gap-5 border-b border-ink-900/10 pb-8"
            >
              <span className="font-display text-2xl text-clay-400">0{i + 1}</span>
              <div>
                <h3 className="font-display text-lg text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
