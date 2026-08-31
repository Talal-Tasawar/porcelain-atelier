"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { count, open } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-clay-50/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="font-display text-xl tracking-wide text-ink-900">
          Porcelain <span className="text-clay-500">Atelier</span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm tracking-wide text-ink-700 md:flex">
          <Link href="/shop" className="transition hover:text-clay-600">
            Shop
          </Link>
          <Link href="/#categories" className="transition hover:text-clay-600">
            Collections
          </Link>
          <Link href="/#story" className="transition hover:text-clay-600">
            Our Story
          </Link>
          <Link href="/#contact" className="transition hover:text-clay-600">
            Contact
          </Link>
        </nav>

        <button
          onClick={open}
          className="group relative flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm shadow-sm transition hover:border-clay-400 hover:shadow-md"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          Cart
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-clay-500 text-xs text-white"
            >
              {count}
            </motion.span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
