import { getSettings } from "@/lib/settings";

export default async function AboutPage() {
  const settings = await getSettings();
  const aboutText = settings.about_text ?? "";
  const businessHours = settings.business_hours ?? "";
  const instagramUrl = settings.instagram_url ?? "";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
        About Bymamito
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-cocoa md:text-5xl">
        Baked at home, shared with you.
      </h1>

      <div className="mt-8 space-y-6 text-lg leading-relaxed text-cocoa/80">
        {aboutText ? (
          <p>{aboutText}</p>
        ) : (
          <p>
            Bymamito is a small home bakery where every cake, cookie, and pastry
            is mixed, shaped, and boxed by hand — in small batches, only after
            you order.
          </p>
        )}
      </div>

      <div className="mt-12 grid gap-8 border-t border-cream-line pt-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-cocoa">
            Opening hours
          </h2>
          <p className="mt-2 text-cocoa/70">
            {businessHours || "Open daily, 9am - 6pm"}
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-cocoa">
            Follow along
          </h2>
          {instagramUrl ? (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-cocoa/70 underline decoration-caramel/60 underline-offset-4 transition-colors hover:text-caramel"
            >
              @bymamito on Instagram
            </a>
          ) : (
            <p className="mt-2 text-cocoa/70">Find us on Instagram soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
