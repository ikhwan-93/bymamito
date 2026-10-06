"use server";

import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

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

  const originalName = file.name || "image";
  const base = path.basename(originalName);
  const safeName = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  const ext = path.extname(safeName).toLowerCase() || ".img";
  const stem = safeName.slice(0, safeName.length - ext.length) || "image";
  const filename = `${Date.now()}-${stem}${ext}`;

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), Buffer.from(await file.arrayBuffer()));

  return { imageUrl: `/uploads/${filename}` };
}

export async function createProduct(formData: FormData): Promise<ProductResult> {
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
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return { error: "Invalid product." };

  await prisma.product.delete({ where: { id } });

  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return {};
}
