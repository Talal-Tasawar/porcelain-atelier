import { NextRequest, NextResponse } from "next/server";
import { getProduct, toPublicProduct } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toPublicProduct(product));
}
