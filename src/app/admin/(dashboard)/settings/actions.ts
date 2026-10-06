"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type SettingsResult = { error?: string };

const SETTING_KEYS = [
  "whatsapp_number",
  "business_hours",
  "about_text",
  "instagram_url",
] as const;

export async function saveSettings(formData: FormData): Promise<SettingsResult> {
  if (!(await getSession())) return { error: "Unauthorized." };

  const whatsappNumber = normalizeWhatsApp(
    String(formData.get("whatsapp_number") ?? ""),
  );

  if (whatsappNumber === "") {
    return { error: "WhatsApp number must contain digits." };
  }

  const entries: Record<string, string> = {
    whatsapp_number: whatsappNumber,
    business_hours: String(formData.get("business_hours") ?? "").trim(),
    about_text: String(formData.get("about_text") ?? "").trim(),
    instagram_url: String(formData.get("instagram_url") ?? "").trim(),
  };

  try {
    for (const key of SETTING_KEYS) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: entries[key] },
        create: { key, value: entries[key] },
      });
    }
  } catch (err) {
    console.error("Failed to save settings", err);
    return { error: "Something went wrong saving settings." };
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/menu");
  revalidatePath("/admin/settings");
  return {};
}

function normalizeWhatsApp(value: string): string {
  return value.replace(/\D/g, "");
}
