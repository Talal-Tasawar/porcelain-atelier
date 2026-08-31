"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/db";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-clay-100">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
          )}
          {!product.inStock && (
            <div className="absolute left-3 top-3 rounded-full bg-ink-900/80 px-3 py-1 text-xs text-white">
              Sold Out
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-display text-base text-ink-900 transition group-hover:text-clay-600">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-400">{product.category}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-clay-600">Rs {product.price.toLocaleString()}</p>
      </div>

      <button
        disabled={!product.inStock}
        onClick={() =>
          addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
        }
        className="mt-3 w-full rounded-full border border-ink-900/15 py-2.5 text-xs uppercase tracking-widest text-ink-700 transition hover:border-clay-500 hover:bg-clay-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink-700"
      >
        {product.inStock ? "Add to Selection" : "Unavailable"}
      </button>
    </motion.div>
  );
}
