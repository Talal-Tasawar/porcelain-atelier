"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addItem } = useCart();

  const buyNowLink = buildWhatsAppOrderLink([{ name: product.name, qty: 1, price: product.price }]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square overflow-hidden rounded-3xl bg-clay-100"
        >
          {product.image && (
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-clay-600">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-2xl text-clay-600">Rs {product.price.toLocaleString()}</p>
          <p className="mt-6 max-w-lg whitespace-pre-line text-ink-500">{product.description}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              disabled={!product.inStock}
              onClick={() =>
                addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
              }
              className="rounded-full border border-ink-900 px-8 py-3.5 text-sm uppercase tracking-widest text-ink-900 transition hover:bg-ink-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to Selection
            </button>
            <a
              href={buyNowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-105"
            >
              Order Now on WhatsApp
            </a>
          </div>

          {!product.inStock && (
            <p className="mt-4 text-sm text-clay-600">This piece is currently sold out.</p>
          )}
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="mt-28">
          <h2 className="mb-10 font-display text-3xl text-ink-900">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
