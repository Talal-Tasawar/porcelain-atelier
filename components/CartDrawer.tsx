"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, setQty, total, clear } = useCart();

  const checkoutLink = buildWhatsAppOrderLink(
    items.map((i) => ({ name: i.name, qty: i.qty, price: i.price }))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-clay-50 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-5">
              <h2 className="font-display text-xl">Your Selection</h2>
              <button onClick={close} className="text-ink-500 transition hover:text-ink-900" aria-label="Close cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-16 text-center text-sm text-ink-400">Your cart is empty.</p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <motion.li
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-clay-100">
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-ink-900">{item.name}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-ink-400 transition hover:text-clay-600"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="h-6 w-6 rounded-full border border-ink-900/15 text-sm transition hover:border-clay-400"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="h-6 w-6 rounded-full border border-ink-900/15 text-sm transition hover:border-clay-400"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm text-clay-600">Rs {(item.price * item.qty).toLocaleString()}</p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink-900/10 px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-ink-500">Subtotal</span>
                  <span className="font-display text-lg">Rs {total.toLocaleString()}</span>
                </div>
                <a
                  href={checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setTimeout(clear, 400)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-105 active:scale-[0.98]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.845 9.845 0 0012.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.14-4.88-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.53.72 1.79.85.26.13.44.19.5.3.07.11.07.63-.17 1.31z" />
                  </svg>
                  Checkout on WhatsApp
                </a>
                <p className="mt-3 text-center text-xs text-ink-400">
                  You'll confirm final price &amp; delivery details in chat.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
