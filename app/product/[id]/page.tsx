import type { Metadata } from "next";
import { getProduct, listProducts, toPublicProduct } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return {};

  const description = product.description.length > 160 ? `${product.description.slice(0, 157)}...` : product.description;

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      type: "website",
      images: [{ url: `/product/${product.id}/opengraph-image` }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const all = await listProducts();
  const related = all
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
    .map(toPublicProduct);

  return <ProductDetail product={toPublicProduct(product)} related={related} />;
}
