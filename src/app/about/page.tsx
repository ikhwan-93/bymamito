import { getSettings } from "@/lib/settings";

export default async function AboutPage() {
  const settings = await getSettings();
  const aboutText = settings.about_text ?? "";
  const businessHours = settings.business_hours ?? "";
  const instagramUrl = settings.instagram_url ?? "";

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="text-center">
        <p className="eyebrow justify-center">About Bymamito</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-cocoa md:text-5xl">
          Baked at home, <em className="text-caramel">shared with you</em>.
        </h1>
        <p className="divider-flourish mt-6 font-display text-sm italic text-caramel/80">
          our story
        </p>
      </header>

      <div className="mt-12 space-y-6 text-lg leading-relaxed text-cocoa/80">
        {aboutText ? (
          <p className="first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-caramel first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9]">
            {aboutText}
          </p>
        ) : (
          <p>
            Bymamito is a small home bakery where every cake, cookie, and pastry
            is mixed, shaped, and boxed by hand — in small batches, only after
            you order.
          </p>
        )}
      </div>

      <div className="mt-14 grid gap-10 border-t border-cream-line pt-10 sm:grid-cols-2">
        <div className="rounded-2xl border border-cream-line bg-white p-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-caramel">
            Pre-orders &amp; hours
          </p>
          <p className="mt-3 leading-relaxed text-cocoa/70">
            {businessHours || "Open daily, 9am - 6pm"}
          </p>
        </div>

        <div className="rounded-2xl border border-cream-line bg-white p-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-caramel">
            Follow along
          </p>
          {instagramUrl ? (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-cocoa/70 underline decoration-caramel/60 underline-offset-4 transition-colors hover:text-caramel"
            >
              @bymamito on Instagram
            </a>
          ) : (
            <p className="mt-3 text-cocoa/70">Find us on Instagram soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
