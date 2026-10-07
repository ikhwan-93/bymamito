"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  destroySession,
  setSessionCookie,
  verifyAdminPassword,
  getSession,
} from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Invalid password." };
  }

  const valid = await verifyAdminPassword(password);

  if (!valid) {
    return { error: "Invalid password." };
  }

  const token = await createSession();
  await setSessionCookie(token);

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function changePasswordAction(
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  if (!(await getSession())) {
    return { error: "Unauthorized." };
  }

  const current = String(formData.get("current_password") ?? "");
  const next = String(formData.get("new_password") ?? "");
  const confirm = String(formData.get("confirm_password") ?? "");

  if (!current || !next || !confirm) {
    return { error: "Please fill in all fields." };
  }

  if (next.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }

  if (next !== confirm) {
    return { error: "New passwords do not match." };
  }

  const valid = await verifyAdminPassword(current);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  const hash = await bcrypt.hash(next, 10);
  await prisma.setting.upsert({
    where: { key: "admin_password_hash" },
    update: { value: hash },
    create: { key: "admin_password_hash", value: hash },
  });

  return { success: true };
}
