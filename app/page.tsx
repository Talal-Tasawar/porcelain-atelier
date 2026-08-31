import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import StorySection from "@/components/StorySection";
import ProductCard from "@/components/ProductCard";
import { listProducts, toPublicProduct } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const all = (await listProducts()).map(toPublicProduct);
  const featured = all.filter((p) => p.featured).slice(0, 8);
  const fallback = featured.length > 0 ? featured : all.slice(0, 8);

  return (
    <>
      <Hero />
      <CategoryStrip />

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-clay-600">Curated Picks</p>
            <h2 className="mt-3 font-display text-4xl text-ink-900">Featured This Season</h2>
          </div>
          <Link href="/shop" className="text-sm text-clay-600 underline-offset-4 hover:underline">
            View all pieces →
          </Link>
        </div>

        {fallback.length === 0 ? (
          <p className="text-ink-400">
            No products yet — add your first piece from the{" "}
            <Link href="/admin/login" className="underline">admin panel</Link>.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {fallback.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <StorySection />
    </>
  );
}
