import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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

  const originalName = file.name || "image";
  const base = path.basename(originalName);
  const safeName = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  const stem =
    (safeName.includes(".") ? safeName.slice(0, safeName.lastIndexOf(".")) : safeName) ||
    "image";
  const filename = `${Date.now()}-${stem}${detected.ext}`;

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
