import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Cook & CO",
  description: "Reach Cook & CO directly on WhatsApp for orders, questions, or delivery details.",
};

const NUMBERS = [
  { label: "+92 302 0501672", href: "https://wa.me/923020501672" },
  { label: "+92 314 5239507", href: "https://wa.me/923145239507" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-clay-600">Get in Touch</p>
      <h1 className="mt-3 font-display text-4xl text-ink-900 sm:text-5xl">Contact Us</h1>
      <p className="mt-6 max-w-xl text-ink-500">
        We don't use email forms or call centers — every order and question is handled
        personally over WhatsApp. Message either number below and we'll get back to you directly.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {NUMBERS.map((n) => (
          <a
            key={n.href}
            href={n.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-white px-6 py-5 shadow-sm transition hover:border-[#25D366] hover:shadow-md"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.79 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.845 9.845 0 0012.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.14-4.88-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.4.74-2.09 1-2.38.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.53.72 1.79.85.26.13.44.19.5.3.07.11.07.63-.17 1.31z" />
            </svg>
            <span className="font-medium text-ink-900">{n.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
