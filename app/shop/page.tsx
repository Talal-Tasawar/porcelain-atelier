import type { Metadata } from "next";
import ShopPageClient from "@/components/ShopPageClient";

export const metadata: Metadata = {
  title: "Shop All Pieces",
  description: "Browse our full collection of porcelain, stoneware, and glassware — order directly on WhatsApp.",
};

export default function ShopPage() {
  return <ShopPageClient />;
}
