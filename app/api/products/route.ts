import { NextRequest, NextResponse } from "next/server";
import { listProducts, toPublicProduct } from "@/lib/db";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const products = await listProducts();
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const filtered = category && category !== "all" ? products.filter((p) => p.category === category) : products;
  return NextResponse.json(filtered.map(toPublicProduct));
}
