"use client";

import { useState } from "react";
import { saveSettings } from "./actions";

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
}: {
  whatsappNumber: string;
  businessHours: string;
  aboutText: string;
  instagramUrl: string;
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

        <Field label="Business hours">
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
