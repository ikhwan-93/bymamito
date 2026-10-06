"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  body: z.string().trim().default(""),
  imageUrl: z.string().trim().default(""),
  published: z.boolean().default(false),
});

type PostInput = z.infer<typeof postSchema>;

type PostResult = { error?: string };

function parsePost(formData: FormData): {
  data?: PostInput;
  error?: string;
} {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: first?.message ?? "Invalid input." };
  }

  return { data: parsed.data };
}

export async function createPost(formData: FormData): Promise<PostResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const { data, error } = parsePost(formData);
  if (error || !data) return { error };

  await prisma.post.create({
    data: {
      title: data.title,
      body: data.body,
      imageUrl: data.imageUrl,
      published: data.published,
    },
  });

  revalidatePath("/posts");
  revalidatePath("/admin/posts");
  return {};
}

export async function updatePost(formData: FormData): Promise<PostResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return { error: "Invalid post." };

  const { data, error } = parsePost(formData);
  if (error || !data) return { error };

  await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      body: data.body,
      imageUrl: data.imageUrl,
      published: data.published,
    },
  });

  revalidatePath("/posts");
  revalidatePath("/admin/posts");
  return {};
}

export async function deletePost(formData: FormData): Promise<PostResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return { error: "Invalid post." };

  try {
    await prisma.post.delete({ where: { id } });
  } catch (err) {
    if (isNotFoundError(err)) return { error: "Post not found." };
    throw err;
  }

  revalidatePath("/posts");
  revalidatePath("/admin/posts");
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
