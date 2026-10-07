"use client";

import { useState } from "react";
import { saveSettings } from "./actions";
import { FONT_PACKS } from "@/lib/font-packs";

const inputClass =
  "w-full rounded-lg border border-cream-line bg-paper px-3 py-2 text-sm text-cocoa outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-cocoa/70">
        {label}
      </span>
      {children}
    </label>
  );
}

export function SettingsForm({
  whatsappNumber,
  businessHours,
  aboutText,
  instagramUrl,
  heroImage,
  footerBlurb,
  fontPack,
  colorPaper,
  colorCocoa,
  colorCaramel,
  colorRose,
  colorButter,
  colorCreamLine,
}: {
  whatsappNumber: string;
  businessHours: string;
  aboutText: string;
  instagramUrl: string;
  heroImage: string;
  footerBlurb: string;
  fontPack: string;
  colorPaper: string;
  colorCocoa: string;
  colorCaramel: string;
  colorRose: string;
  colorButter: string;
  colorCreamLine: string;
}) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  return (
    <form
      action={async (formData) => {
        setError(undefined);
        setSuccess(false);
        const result = await saveSettings(formData);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccess(true);
        }
      }}
      className="mt-8 max-w-2xl space-y-6 rounded-2xl border border-cream-line bg-white p-6"
    >
      <div className="grid grid-cols-1 gap-4">
        <Field label="Homepage hero image">
          <input type="hidden" name="hero_image" value={heroImage} />
          <div className="flex items-start gap-4">
            <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-cream-line bg-rose/50">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImage}
                  alt="Current hero"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-2xl font-semibold text-cocoa/30">
                    B
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                name="hero_image_file"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="block w-full text-sm text-cocoa/70 file:mr-3 file:rounded-lg file:border-0 file:bg-caramel file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-caramel/90"
              />
              <p className="text-xs text-cocoa/50">
                Shown on the homepage hero. JPG/PNG/WebP/GIF, up to 5 MB.
                Leave empty to keep the current image.
              </p>
              {heroImage ? (
                <label className="flex items-center gap-2 text-xs text-cocoa/60">
                  <input type="checkbox" name="remove_hero_image" />
                  Remove image (revert to the monogram)
                </label>
              ) : null}
            </div>
          </div>
        </Field>

        <Field label="WhatsApp number (digits only)">
          <input
            name="whatsapp_number"
            type="tel"
            required
            defaultValue={whatsappNumber}
            className={inputClass}
            inputMode="numeric"
          />
        </Field>

        <Field label="Business hours (footer 'Visit & order' + about page)">
          <input
            name="business_hours"
            defaultValue={businessHours}
            className={inputClass}
          />
        </Field>

        <Field label="Instagram URL">
          <input
            name="instagram_url"
            type="url"
            defaultValue={instagramUrl}
            className={inputClass}
          />
        </Field>

        <Field label="About text">
          <textarea
            name="about_text"
            defaultValue={aboutText}
            rows={4}
            className={inputClass}
          />
        </Field>

        <Field label="Footer blurb (brand description in footer)">
          <textarea
            name="footer_blurb"
            defaultValue={footerBlurb}
            rows={3}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="border-t border-cream-line pt-6">
        <h2 className="font-display text-lg font-semibold text-cocoa">
          Typography
        </h2>
        <p className="mt-1 text-sm text-cocoa/60">
          Pick a font pairing — each sample is shown in its own typeface.
        </p>
        <div className="mt-4 space-y-2">
          {FONT_PACKS.map((pack) => {
            const selected = pack.id === fontPack;
            return (
              <label
                key={pack.id}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3 transition ${
                  selected
                    ? "border-caramel bg-butter/50 ring-2 ring-caramel/20"
                    : "border-cream-line bg-paper hover:border-caramel/50"
                }`}
              >
                <input
                  type="radio"
                  name="font_pack"
                  value={pack.id}
                  defaultChecked={selected}
                  className="sr-only"
                />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className="truncate text-lg leading-tight text-cocoa"
                    style={{ fontFamily: pack.displayVar }}
                  >
                    {pack.display}
                  </span>
                  <span
                    className="truncate text-sm text-cocoa/70"
                    style={{ fontFamily: pack.bodyVar }}
                  >
                    {pack.body} — {pack.description}
                  </span>
                </span>
                {selected ? (
                  <span className="shrink-0 font-display text-caramel">✓</span>
                ) : null}
              </label>
            );
          })}
        </div>
      </div>

      <div className="border-t border-cream-line pt-6">
        <h2 className="font-display text-lg font-semibold text-cocoa">
          Layout colours
        </h2>
        <p className="mt-1 text-sm text-cocoa/60">
          Leave a field empty to keep the default colour.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <ColorField label="Paper (background)" name="color_paper" value={colorPaper} />
          <ColorField label="Cocoa (text)" name="color_cocoa" value={colorCocoa} />
          <ColorField label="Caramel (accent)" name="color_caramel" value={colorCaramel} />
          <ColorField label="Rose (surface)" name="color_rose" value={colorRose} />
          <ColorField label="Butter (highlight)" name="color_butter" value={colorButter} />
          <ColorField label="Cream line (border)" name="color_cream_line" value={colorCreamLine} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-lg bg-caramel px-4 py-2 text-sm font-semibold text-white transition hover:bg-caramel/90"
        >
          Save settings
        </button>

        {error ? (
          <p className="text-sm font-medium text-red-600">{error}</p>
        ) : null}
        {success ? (
          <p className="text-sm font-medium text-green-700">
            Settings saved.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function ColorField({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value: string;
}) {
  const [text, setText] = useState(value);
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-cocoa/70">
        {label}
      </span>
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(text) ? text : "#000000"}
          onChange={(e) => setText(e.target.value)}
          className="h-9 w-11 shrink-0 cursor-pointer rounded border border-cream-line bg-paper p-0.5"
        />
        <input
          type="text"
          name={name}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="#000000"
          className={inputClass}
        />
      </span>
    </label>
  );
}
