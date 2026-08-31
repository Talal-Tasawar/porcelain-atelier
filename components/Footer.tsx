import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-900/10 bg-ink-950 text-clay-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl">
              Cook <span className="text-clay-400">&amp; CO</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-clay-200/70">
              Fine crockery and tableware, chosen piece by piece. Every order is confirmed
              personally over WhatsApp — no checkout forms, no fuss.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-clay-300/60">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-clay-200/80">
              <li><Link href="/shop" className="transition hover:text-clay-300">Shop All</Link></li>
              <li><Link href="/#categories" className="transition hover:text-clay-300">Collections</Link></li>
              <li><Link href="/about" className="transition hover:text-clay-300">Our Story</Link></li>
              <li><Link href="/contact" className="transition hover:text-clay-300">Contact</Link></li>
              <li><Link href="/admin/login" className="transition hover:text-clay-300">Admin</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest text-clay-300/60">Reach Us</p>
            <ul className="mt-4 space-y-2 text-sm text-clay-200/80">
              <li>
                <a href="https://wa.me/923020501672" target="_blank" rel="noopener noreferrer" className="transition hover:text-clay-300">
                  +92 302 0501672
                </a>
              </li>
              <li>
                <a href="https://wa.me/923145239507" target="_blank" rel="noopener noreferrer" className="transition hover:text-clay-300">
                  +92 314 5239507
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-clay-300/50 md:flex-row">
          <p>© {new Date().getFullYear()} Cook &amp; CO. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>
              Website by{" "}
              <a
                href="https://hashbrownstudios.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay-300/80 underline-offset-4 transition hover:text-clay-200 hover:underline"
              >
                HASHBROWN STUDIOS
              </a>
            </span>
            <a
              href="https://www.instagram.com/hashbrown.studios1?utm_source=qr&igsi=dTB1cnhxa2tmdHZq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hashbrown Studios on Instagram"
              className="text-clay-300/60 transition hover:text-clay-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
