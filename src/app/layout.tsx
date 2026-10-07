import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CartProvider } from "@/components/CartProvider";
import { getSettings } from "@/lib/settings";
import {
  getFontPack,
  getLogoFont,
  DEFAULT_FONT_PACK,
  DEFAULT_LOGO_FONT,
  ALL_FONT_CLASSES,
} from "@/lib/font-packs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bymamito — Homemade Bakery",
  description: "Handmade cakes, cookies, and pastries, made to order.",
};

const DEFAULT_COLORS: Record<string, string> = {
  paper: "#fbf7f2",
  cocoa: "#2e2016",
  caramel: "#c4874b",
  rose: "#e7c4b4",
  butter: "#f6e7c8",
  "cream-line": "#e9ddcc",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const whatsappNumber = settings.whatsapp_number ?? "";

  const fontPack = getFontPack(settings.font_pack ?? DEFAULT_FONT_PACK);
  const logoFont = getLogoFont(settings.logo_font ?? DEFAULT_LOGO_FONT);

  const colorVars: Record<string, string> = {};
  for (const [name, fallback] of Object.entries(DEFAULT_COLORS)) {
    const key = `color_${name.replace("-", "_")}`;
    const value = (settings[key] ?? "").trim();
    colorVars[`--color-${name}`] = value || fallback;
  }

  const themeVars: Record<string, string> = {
    ...colorVars,
    "--font-display": fontPack.displayVar,
    "--font-body": fontPack.bodyVar,
    "--font-logo": logoFont.varRef,
  };

  return (
    <html
      lang="en"
      className={`${ALL_FONT_CLASSES} h-full antialiased`}
      style={themeVars}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader
            whatsappNumber={whatsappNumber}
            logoImage={settings.logo_image || undefined}
          />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
