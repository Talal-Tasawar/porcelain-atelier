import { NextRequest, NextResponse } from "next/server";
import { getProductImage } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const image = await getProductImage(params.id);
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const match = image.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return NextResponse.json({ error: "Invalid image" }, { status: 500 });

  const [, mime, base64] = match;
  return new NextResponse(Buffer.from(base64, "base64"), {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
    },
  });
}
