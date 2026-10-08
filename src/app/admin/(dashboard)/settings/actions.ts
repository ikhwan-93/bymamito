"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/image-upload";

type SettingsResult = { error?: string };

const SETTING_KEYS = [
  "whatsapp_number",
  "business_hours",
  "about_text",
  "about_title",
  "about_body",
  "about_hours",
  "instagram_url",
  "hero_image",
  "logo_image",
  "site_name",
  "footer_blurb",
  "font_pack",
  "logo_font",
  "color_paper",
  "color_cocoa",
  "color_caramel",
  "color_rose",
  "color_butter",
  "color_cream_line",
] as const;

const COLOR_KEYS = [
  "color_paper",
  "color_cocoa",
  "color_caramel",
  "color_rose",
  "color_butter",
  "color_cream_line",
] as const;

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

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
    about_title: String(formData.get("about_title") ?? "").trim(),
    about_body: String(formData.get("about_body") ?? "").trim(),
    about_hours: String(formData.get("about_hours") ?? "").trim(),
    instagram_url: String(formData.get("instagram_url") ?? "").trim(),
    hero_image: String(formData.get("hero_image") ?? "").trim(),
    logo_image: String(formData.get("logo_image") ?? "").trim(),
    site_name: String(formData.get("site_name") ?? "").trim(),
    footer_blurb: String(formData.get("footer_blurb") ?? "").trim(),
    font_pack: String(formData.get("font_pack") ?? "").trim(),
    logo_font: String(formData.get("logo_font") ?? "").trim(),
  };

  for (const key of COLOR_KEYS) {
    const raw = String(formData.get(key) ?? "").trim();
    if (raw && !HEX_RE.test(raw)) {
      return { error: "Colours must be a hex value like #c4874b." };
    }
    entries[key] = raw;
  }

  const heroFile = formData.get("hero_image_file");
  if (heroFile instanceof File && heroFile.size > 0) {
    const result = await saveUploadedImage(heroFile);
    if (result.error) return { error: result.error };
    entries.hero_image = result.imageUrl!;
  } else if (formData.get("remove_hero_image") === "on") {
    entries.hero_image = "";
  }

  const logoFile = formData.get("logo_image_file");
  if (logoFile instanceof File && logoFile.size > 0) {
    const result = await saveUploadedImage(logoFile);
    if (result.error) return { error: result.error };
    entries.logo_image = result.imageUrl!;
  } else if (formData.get("remove_logo_image") === "on") {
    entries.logo_image = "";
  }

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
  return {};}

function normalizeWhatsApp(value: string): string {
  return value.replace(/\D/g, "");
}
