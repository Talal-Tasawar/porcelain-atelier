import { put } from "@vercel/blob";
import crypto from "node:crypto";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function saveUploadedImage(file: File): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!ALLOWED_TYPES[file.type]) {
    return { ok: false, error: "Only JPEG, PNG, or WebP images are allowed." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Image must be 5MB or smaller." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Verify magic bytes match the declared type (defense against spoofed content-type).
  const signatures: Record<string, number[][]> = {
    "image/jpeg": [[0xff, 0xd8, 0xff]],
    "image/png": [[0x89, 0x50, 0x4e, 0x47]],
    "image/webp": [[0x52, 0x49, 0x46, 0x46]],
  };
  const sigs = signatures[file.type];
  const matches = sigs.some((sig) => sig.every((byte, i) => buffer[i] === byte));
  if (!matches) {
    return { ok: false, error: "File content does not match its declared image type." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { ok: false, error: "Image storage is not configured. Add a Blob store in your Vercel project." };
  }

  const ext = ALLOWED_TYPES[file.type];
  const filename = `${crypto.randomUUID()}.${ext}`;
  const blob = await put(`uploads/${filename}`, buffer, {
    access: "public",
    contentType: file.type,
  });

  return { ok: true, url: blob.url };
}
