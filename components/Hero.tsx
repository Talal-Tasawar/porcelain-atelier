"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-noise">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-clay-200/50 blur-3xl" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-28 text-center lg:py-40">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-clay-600"
        >
          Fine Crockery &amp; Tableware
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-display text-5xl leading-tight text-ink-900 sm:text-6xl lg:text-7xl"
        >
          Tables set with{" "}
          <span className="shimmer-text bg-[length:200%_auto] animate-shimmer">quiet elegance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-balance text-base text-ink-500 sm:text-lg"
        >
          Hand-selected porcelain, stoneware, and glassware — curated for every gathering,
          delivered with care, ordered in a single message.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/shop"
            className="rounded-full bg-ink-900 px-8 py-3.5 text-sm uppercase tracking-widest text-white transition hover:bg-clay-600"
          >
            Explore the Shop
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-ink-900/15 px-8 py-3.5 text-sm uppercase tracking-widest text-ink-700 transition hover:border-clay-500"
          >
            Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
