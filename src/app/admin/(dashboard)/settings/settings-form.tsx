"use client";

import { useState } from "react";
import { saveSettings } from "./actions";
import { FONT_PACKS, LOGO_FONTS } from "@/lib/font-packs";

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
  aboutTitle,
  aboutBody,
  aboutHours,
  instagramUrl,
  heroImage,
  logoImage,
  footerBlurb,
  fontPack,
  logoFont,
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
  aboutTitle: string;
  aboutBody: string;
  aboutHours: string;
  instagramUrl: string;
  heroImage: string;
  logoImage: string;
  footerBlurb: string;
  fontPack: string;
  logoFont: string;
  colorPaper: string;
  colorCocoa: string;
  colorCaramel: string;
  colorRose: string;
  colorButter: string;
  colorCreamLine: string;
}) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [fontPackValue, setFontPackValue] = useState(
    fontPack || FONT_PACKS[0].id,
  );
  const [logoFontValue, setLogoFontValue] = useState(
    logoFont || LOGO_FONTS[0].id,
  );

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

        <Field label="Site logo (top-left)">
          <input type="hidden" name="logo_image" value={logoImage} />
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-cream-line bg-rose/50">
              {logoImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoImage}
                  alt="Current logo"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="font-display text-2xl font-semibold text-cocoa/30">
                  B
                </span>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <input
                name="logo_image_file"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="block w-full text-sm text-cocoa/70 file:mr-3 file:rounded-lg file:border-0 file:bg-caramel file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-caramel/90"
              />
              <p className="text-xs text-cocoa/50">
                Replaces the &quot;Bymamito&quot; text in the top-left. PNG with
                a transparent background works best. Leave empty to keep the
                text logo.
              </p>
              {logoImage ? (
                <label className="flex items-center gap-2 text-xs text-cocoa/60">
                  <input type="checkbox" name="remove_logo_image" />
                  Remove logo (revert to the text wordmark)
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

        <Field label="Business hours (footer 'Visit & order')">
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

        <Field label="Homepage teaser (about section on home page)">
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
          About page
        </h2>
        <p className="mt-1 text-sm text-cocoa/60">
          Text shown only on the About page.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <Field label="About page heading">
            <input
              name="about_title"
              defaultValue={aboutTitle}
              placeholder="Baked at home, shared with you."
              className={inputClass}
            />
          </Field>

          <Field label="About page body">
            <textarea
              name="about_body"
              defaultValue={aboutBody}
              rows={5}
              className={inputClass}
            />
          </Field>

          <Field label="Pre-orders &amp; hours (About page card)">
            <input
              name="about_hours"
              defaultValue={aboutHours}
              placeholder="Open daily, 9am - 6pm"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="border-t border-cream-line pt-6">
        <h2 className="font-display text-lg font-semibold text-cocoa">
          Typography
        </h2>
        <p className="mt-1 text-sm text-cocoa/60">
          Pick a font pairing for headings and body text across the site.
        </p>
        <div className="mt-4">
          <Field label="Font pack">
            <select
              name="font_pack"
              value={fontPackValue}
              onChange={(e) => setFontPackValue(e.target.value)}
              className={inputClass}
            >
              {FONT_PACKS.map((pack) => (
                <option
                  key={pack.id}
                  value={pack.id}
                  style={{ fontFamily: pack.bodyVar }}
                >
                  {pack.label} — {pack.description}
                </option>
              ))}
            </select>
          </Field>

          <div className="mt-4">
            <Field label="Logo font (wordmark, independent of the pack)">
              <select
                name="logo_font"
                value={logoFontValue}
                onChange={(e) => setLogoFontValue(e.target.value)}
                className={inputClass}
              >
                {LOGO_FONTS.map((font) => (
                  <option
                    key={font.id}
                    value={font.id}
                    style={{ fontFamily: font.varRef }}
                  >
                    {font.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
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
