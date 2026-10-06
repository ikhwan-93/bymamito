import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAGIC_BYTES: [string, string, number[]][] = [
  ["image/jpeg", ".jpg", [0xff, 0xd8, 0xff]],
  ["image/png", ".png", [0x89, 0x50, 0x4e, 0x47]],
  ["image/gif", ".gif", [0x47, 0x49, 0x46, 0x38]],
  ["image/webp", ".webp", [0x52, 0x49, 0x46, 0x46]],
];

function detectImageType(bytes: Buffer): { mime: string; ext: string } | null {
  for (const [mime, ext, sig] of MAGIC_BYTES) {
    const match = sig.every((byte, i) => bytes[i] === byte);
    if (match) {
      if (mime === "image/webp") {
        const riffTag = bytes.toString("ascii", 8, 12);
        if (riffTag === "WEBP") return { mime, ext };
        continue;
      }
      return { mime, ext };
    }
  }
  return null;
}

function safeStem(originalName: string): string {
  const base = path.basename(originalName || "image");
  const safeName = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return (
    (safeName.includes(".") ? safeName.slice(0, safeName.lastIndexOf(".")) : safeName) ||
    "image"
  );
}

export async function saveUploadedImage(
  file: File,
): Promise<{ imageUrl?: string; error?: string }> {
  if (!ACCEPTED_MIME_TYPES.has(file.type)) {
    return { error: "Unsupported image type. Use JPEG, PNG, WebP, or GIF." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { error: "Image must be 5 MB or smaller." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = detectImageType(buffer);
  if (!detected || detected.mime !== file.type) {
    return { error: "Unsupported image type. Use JPEG, PNG, WebP, or GIF." };
  }

  const filename = `${Date.now()}-${safeStem(file.name)}${detected.ext}`;

  if (process.env.BLOB_STORE_ID) {
    try {
      const blob = await put(`uploads/${filename}`, buffer, {
        access: "public",
        contentType: detected.mime,
        storeId: process.env.BLOB_STORE_ID,
      });
      return { imageUrl: blob.url };
    } catch (err) {
      console.error("Failed to upload image to Blob", err);
      return { error: "Could not save image." };
    }
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    await mkdir(uploadsDir, { recursive: true });
    await writeFile(path.join(uploadsDir, filename), buffer);
  } catch (err) {
    console.error("Failed to save image", err);
    return { error: "Could not save image." };
  }

  return { imageUrl: `/uploads/${filename}` };
}
