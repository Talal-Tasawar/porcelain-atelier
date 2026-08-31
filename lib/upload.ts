const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 1.5 * 1024 * 1024; // 1.5MB — kept small since images are stored as base64 in the database

export async function saveUploadedImage(file: File): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!ALLOWED_TYPES[file.type]) {
    return { ok: false, error: "Only JPEG, PNG, or WebP images are allowed." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Image must be 1.5MB or smaller." };
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

  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
  return { ok: true, url: dataUrl };
}
