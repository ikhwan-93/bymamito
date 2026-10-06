import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import ProductCard from "@/components/ProductCard";

const ORDER_STEPS = [
  {
    title: "Browse the menu",
    body: "Poke around the display case and pick the bakes you can't stop thinking about.",
  },
  {
    title: "Add to your order",
    body: "Tap the items you fancy and they'll be tucked into your order as you go.",
  },
  {
    title: "Check out on WhatsApp",
    body: "Send us your order in a single message and we'll confirm it by hand, then bake it fresh.",
  },
];

export default async function Home() {
  const [settings, products] = await Promise.all([
    getSettings(),
    prisma.product.findMany({
      where: { available: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
  ]);

  const aboutText = settings.about_text ?? "";
  const instagramUrl = settings.instagram_url ?? "";
  const heroImage = settings.hero_image ?? "";
  const hasProducts = products.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-cream-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(42rem 22rem at 82% -8%, var(--color-butter) 0%, transparent 65%), radial-gradient(36rem 20rem at -10% 30%, var(--color-rose) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div className="rise-in">
            <p className="eyebrow">Freshly baked, made to order</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-cocoa md:text-6xl">
              Homemade bakes with{" "}
              <em className="text-caramel">the good butter</em>.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa/70">
              Cakes, cookies, and pastries from a home kitchen in your
              neighbourhood — baked in small batches, boxed by hand, and ordered
              with a single WhatsApp message.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/menu"
                className="rounded-full bg-cocoa px-7 py-3.5 text-sm font-semibold text-paper shadow-sm transition-all hover:bg-caramel"
              >
                See the menu
              </Link>
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-cocoa/70 underline decoration-caramel/60 underline-offset-4 transition-colors hover:text-caramel"
                >
                  Follow along on Instagram
                </a>
              )}
            </div>
          </div>

          <div className="relative rise-in-late">
            <div className="keyline arch-frame bg-rose/50">
              {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImage}
                  alt="Fresh bakes by Bymamito"
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center">
                  <span className="font-display text-[10rem] font-semibold italic leading-none text-cocoa/15">
                    B
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-cream-line bg-butter px-6 py-2.5 text-center shadow-sm">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-caramel">
                Baked fresh · every single order
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-b border-cream-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-center">
            <p className="eyebrow">Freshly baked</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-cocoa md:text-4xl">
              Bakes we&apos;re proud of
            </h2>
            <p className="divider-flourish mt-5 font-display text-sm italic text-caramel/80">
              from the oven
            </p>
          </div>

          {hasProducts ? (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-cream-line bg-rose/30 px-6 py-12 text-center">
              <p className="font-display text-xl font-semibold text-cocoa">
                The oven&apos;s still warming up
              </p>
              <p className="mt-2 text-cocoa/70">
                Our first bakes are almost ready — check back soon.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-block rounded-full border border-cocoa/20 px-7 py-3 text-sm font-semibold text-cocoa transition-colors hover:border-caramel hover:text-caramel"
            >
              View the full menu
            </Link>
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="border-b border-cream-line bg-rose/25">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-cocoa md:text-4xl">
              From craving to kitchen in three steps
            </h2>
          </div>

          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {ORDER_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative flex flex-col items-center gap-3 rounded-2xl border border-cream-line bg-paper px-7 py-9 text-center shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-caramel/40 bg-butter font-display text-xl font-semibold text-caramel">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-semibold text-cocoa">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-cocoa/70">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About teaser */}
      {aboutText && (
        <section className="border-b border-cream-line">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
            <p className="eyebrow justify-center">About Bymamito</p>
            <p className="mt-6 font-display text-2xl italic leading-snug text-cocoa md:text-[1.75rem]">
              “{aboutText}”
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block text-sm font-medium text-cocoa/70 underline decoration-caramel/60 underline-offset-4 transition-colors hover:text-caramel"
            >
              Read our story
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
