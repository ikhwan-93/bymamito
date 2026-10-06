"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/image-upload";

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
    const result = await saveUploadedImage(imageFile);
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
    const result = await saveUploadedImage(imageFile);
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
