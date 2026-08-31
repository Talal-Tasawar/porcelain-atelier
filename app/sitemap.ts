import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://cook-and-co.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await listProducts();
    productPages = products.map((p) => ({
      url: `${base}/product/${p.id}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Database unavailable at build time — sitemap still returns static pages.
  }

  return [...staticPages, ...productPages];
}
