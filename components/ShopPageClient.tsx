"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/db";

export default function ShopPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(
    () => (category === "all" ? products : products.filter((p) => p.category === category)),
    [products, category]
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-clay-600">The Collection</p>
        <h1 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">Shop All Pieces</h1>
      </motion.div>

      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition ${
              category === cat
                ? "border-ink-900 bg-ink-900 text-white"
                : "border-ink-900/15 text-ink-600 hover:border-clay-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-clay-100" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-ink-400">No products found in this collection yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
