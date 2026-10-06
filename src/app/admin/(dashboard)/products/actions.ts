"use server";

import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAGIC_BYTES: { mime: string; ext: string; signatures: number[][] }[] = [
  { mime: "image/jpeg", ext: ".jpg", signatures: [[0xff, 0xd8, 0xff]] },
  {
    mime: "image/png",
    ext: ".png",
    signatures: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  },
  {
    mime: "image/webp",
    ext: ".webp",
    signatures: [
      [0x52, 0x49, 0x46, 0x46],
      [0x57, 0x45, 0x42, 0x50],
    ],
  },
  { mime: "image/gif", ext: ".gif", signatures: [[0x47, 0x49, 0x46, 0x38]] },
];

function detectImageType(bytes: Uint8Array): { mime: string; ext: string } | null {
  for (const entry of MAGIC_BYTES) {
    for (const sig of entry.signatures) {
      if (sig.length > bytes.length) continue;
      let match = true;
      for (let i = 0; i < sig.length; i++) {
        if (bytes[i] !== sig[i]) {
          match = false;
          break;
        }
      }
      if (match) return { mime: entry.mime, ext: entry.ext };
    }
  }
  return null;
}

const productSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  description: z.string().trim().default(""),
  price: z
    .string()
    .trim()
    .min(1, "Price is required.")
    .refine((value) => {
      const num = Number(value);
      return Number.isFinite(num) && num > 0;
    }, "Price must be a positive number."),
  categoryId: z.coerce.number().int("Category is required."),
  available: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

type ProductInput = z.infer<typeof productSchema>;

type ProductResult = { error?: string };

function parseProduct(formData: FormData): {
  data?: ProductInput;
  error?: string;
} {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") ?? "",
    price: formData.get("price"),
    categoryId: formData.get("categoryId") ?? "",
    available: formData.get("available") === "on",
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message ?? "Invalid input." };
  }

  return { data: parsed.data };
}

function toCents(price: string): number {
  return Math.round(parseFloat(price) * 100);
}

async function saveImage(file: File): Promise<{ imageUrl?: string; error?: string }> {
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

export async function createProduct(formData: FormData): Promise<ProductResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const { data, error } = parseProduct(formData);
  if (error || !data) return { error };

  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });
  if (!category) return { error: "Selected category does not exist." };

  let imageUrl = "";
  const imageFile = formData.get("image");
  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    const result = await saveImage(imageFile);
    if (result.error) return { error: result.error };
    imageUrl = result.imageUrl!;
  }

  await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceCents: toCents(data.price),
      imageUrl,
      available: data.available,
      sortOrder: data.sortOrder,
      categoryId: data.categoryId,
    },
  });

  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return {};
}

export async function updateProduct(formData: FormData): Promise<ProductResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return { error: "Invalid product." };

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return { error: "Product not found." };

  const { data, error } = parseProduct(formData);
  if (error || !data) return { error };

  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });
  if (!category) return { error: "Selected category does not exist." };

  let imageUrl = existing.imageUrl;
  const imageFile = formData.get("image");
  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    const result = await saveImage(imageFile);
    if (result.error) return { error: result.error };
    imageUrl = result.imageUrl!;
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceCents: toCents(data.price),
      imageUrl,
      available: data.available,
      sortOrder: data.sortOrder,
      categoryId: data.categoryId,
    },
  });

  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return {};
}

export async function deleteProduct(formData: FormData): Promise<ProductResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return { error: "Invalid product." };

  try {
    await prisma.product.delete({ where: { id } });
  } catch (err) {
    if (isNotFoundError(err)) return { error: "Product not found." };
    throw err;
  }

  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return {};
}

function isNotFoundError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2025"
  );
}
