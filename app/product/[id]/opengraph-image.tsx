import { getProduct } from "@/lib/db";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64"
);

export default async function ProductOGImage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  const match = product?.image.match(/^data:(image\/\w+);base64,(.+)$/);
  if (match) {
    const [, mime, base64] = match;
    return new Response(Buffer.from(base64, "base64"), {
      headers: { "Content-Type": mime },
    });
  }

  return new Response(FALLBACK_PNG, { headers: { "Content-Type": "image/png" } });
}
