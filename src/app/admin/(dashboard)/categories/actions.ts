"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const categorySchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only.",
    ),
  sortOrder: z.coerce.number().int().default(0),
});

type CategoryInput = z.infer<typeof categorySchema>;

type CategoryResult = { error?: string };

function parseCategory(formData: FormData): {
  data?: CategoryInput;
  error?: string;
} {
  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message ?? "Invalid input." };
  }

  return { data: parsed.data };
}

export async function createCategory(formData: FormData): Promise<CategoryResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const { data, error } = parseCategory(formData);
  if (error || !data) return { error };

  try {
    await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        sortOrder: data.sortOrder,
      },
    });
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return { error: `The slug "${data.slug}" is already in use.` };
    }
    throw err;
  }

  revalidatePath("/menu");
  revalidatePath("/admin/categories");
  return {};
}

export async function updateCategory(formData: FormData): Promise<CategoryResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return { error: "Invalid category." };

  const { data, error } = parseCategory(formData);
  if (error || !data) return { error };

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        sortOrder: data.sortOrder,
      },
    });
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return { error: `The slug "${data.slug}" is already in use.` };
    }
    throw err;
  }

  revalidatePath("/menu");
  revalidatePath("/admin/categories");
  return {};
}

export async function deleteCategory(formData: FormData): Promise<CategoryResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return { error: "Invalid category." };

  try {
    await prisma.category.delete({ where: { id } });
  } catch (err) {
    if (isNotFoundError(err)) return { error: "Category not found." };
    throw err;
  }

  revalidatePath("/menu");
  revalidatePath("/admin/categories");
  return {};
}

function isUniqueConstraintError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2002"
  );
}

function isNotFoundError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "P2025"
  );
}
