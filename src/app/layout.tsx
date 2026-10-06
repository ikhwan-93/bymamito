import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CartProvider } from "@/components/CartProvider";
import { getSetting } from "@/lib/settings";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bymamito — Homemade Bakery",
  description: "Handmade cakes, cookies, and pastries, made to order.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const whatsappNumber = await getSetting("whatsapp_number");

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader whatsappNumber={whatsappNumber} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
