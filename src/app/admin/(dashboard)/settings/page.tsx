import { getSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cocoa">
        Settings
      </h1>
      <p className="mt-2 text-sm text-cocoa/60">
        Update your bakery&apos;s contact details and info shown across the site.
      </p>

      <SettingsForm
        whatsappNumber={settings.whatsapp_number ?? ""}
        businessHours={settings.business_hours ?? ""}
        aboutText={settings.about_text ?? ""}
        instagramUrl={settings.instagram_url ?? ""}
        heroImage={settings.hero_image ?? ""}
      />
    </div>
  );
}
