import { NextRequest, NextResponse } from "next/server";
import { createProduct, listProducts } from "@/lib/db";
import { productSchema } from "@/lib/validation";

// Auth for this route is enforced by middleware.ts (matches /api/admin/:path*).

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await listProducts());
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const product = await createProduct(parsed.data);
  return NextResponse.json(product, { status: 201 });
}
