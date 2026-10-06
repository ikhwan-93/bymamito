"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  setSessionCookie,
  verifyAdminPassword,
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
