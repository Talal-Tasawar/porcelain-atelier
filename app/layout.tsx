import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import SiteChrome from "@/components/SiteChrome";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cook-and-co.vercel.app";
const title = "Cook & CO — Fine Crockery & Tableware";
const description =
  "Handpicked porcelain, stoneware, and glassware for tables that tell a story. Order directly on WhatsApp — no account needed.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s — Cook & CO" },
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Cook & CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-clay-50 text-ink-900 antialiased">
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
