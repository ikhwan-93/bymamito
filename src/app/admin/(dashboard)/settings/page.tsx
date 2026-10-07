import { getSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";
import { ChangePasswordForm } from "./change-password-form";

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
        key={`${settings.font_pack ?? ""}-${settings.logo_font ?? ""}`}
        whatsappNumber={settings.whatsapp_number ?? ""}
        businessHours={settings.business_hours ?? ""}
        aboutText={settings.about_text ?? ""}
        aboutTitle={settings.about_title ?? ""}
        aboutBody={settings.about_body ?? ""}
        aboutHours={settings.about_hours ?? ""}
        instagramUrl={settings.instagram_url ?? ""}
        heroImage={settings.hero_image ?? ""}
        logoImage={settings.logo_image ?? ""}
        footerBlurb={settings.footer_blurb ?? ""}
        fontPack={settings.font_pack ?? ""}
        logoFont={settings.logo_font ?? ""}
        colorPaper={settings.color_paper ?? ""}
        colorCocoa={settings.color_cocoa ?? ""}
        colorCaramel={settings.color_caramel ?? ""}
        colorRose={settings.color_rose ?? ""}
        colorButter={settings.color_butter ?? ""}
        colorCreamLine={settings.color_cream_line ?? ""}
      />

      <div className="mt-8 max-w-2xl rounded-2xl border border-cream-line bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-cocoa">
          Change password
        </h2>
        <p className="mt-1 text-sm text-cocoa/60">
          Update the admin password. You&apos;ll need your current password.
        </p>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
