import Link from "next/link";
import { getSettings } from "@/lib/settings";

export default async function SiteFooter() {
  const settings = await getSettings();
  const instagramUrl = settings.instagram_url || "https://www.instagram.com/bymamito/";
  const hours = settings.business_hours || "Pre-order bakes, made fresh to order";
  const blurb =
    settings.footer_blurb ||
    "Homemade bakes from our kitchen in Wakaf Siku, Kota Bharu — pre-ordered, baked fresh, and boxed by hand.";

  return (
    <footer className="bg-cocoa text-paper">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 text-center md:grid-cols-3 md:text-left">
          <div>
            <p className="font-display text-2xl font-semibold">
              <span className="italic">B</span>ymamito
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
              {blurb}
            </p>
          </div>

          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-caramel">
              Visit &amp; order
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper/70">{hours}</p>
          </div>

          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-caramel">
              Explore
            </p>
            <div className="mt-3 flex flex-col gap-1.5 text-sm text-paper/70">
              <Link href="/menu" className="transition-colors hover:text-caramel">
                The menu
              </Link>
              <Link href="/posts" className="transition-colors hover:text-caramel">
                Notes &amp; news
              </Link>
              <Link href="/about" className="transition-colors hover:text-caramel">
                Our story
              </Link>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-caramel"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-paper/15 pt-6 text-xs text-paper/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Bymamito. Baked with patience.</p>
          <p className="divider-flourish text-caramel/70">
            <span className="font-display italic text-sm">by mamito</span>
          </p>
          <p>Orders via WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
