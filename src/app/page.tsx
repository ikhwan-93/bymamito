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
  const hasProducts = products.length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-cream-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              Freshly baked, made to order
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-cocoa md:text-6xl">
              Homemade bakes with the good butter.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cocoa/70">
              Cakes, cookies, and pastries from a home kitchen in your
              neighbourhood — baked in small batches, boxed by hand, and ordered
              with a single WhatsApp message.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-caramel px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-cocoa"
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

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-cream-line bg-rose/50">
              <div className="flex aspect-[4/3] w-full items-center justify-center">
                <span className="font-display text-[10rem] font-semibold leading-none text-cocoa/15">
                  B
                </span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-6 rounded-2xl border border-cream-line bg-butter px-5 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-caramel">
                Baked fresh
              </p>
              <p className="mt-0.5 font-display text-lg font-semibold text-cocoa">
                Every single order
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-b border-cream-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
                Freshly baked
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-cocoa md:text-4xl">
                Bakes we&apos;re proud of
              </h2>
            </div>
            <Link
              href="/menu"
              className="hidden shrink-0 text-sm font-medium text-cocoa/70 underline decoration-caramel/60 underline-offset-4 transition-colors hover:text-caramel sm:inline"
            >
              View the full menu
            </Link>
          </div>

          {hasProducts ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-cream-line bg-rose/30 px-6 py-12 text-center">
              <p className="font-display text-xl font-semibold text-cocoa">
                The oven&apos;s still warming up
              </p>
              <p className="mt-2 text-cocoa/70">
                Our first bakes are almost ready — check back soon.
              </p>
            </div>
          )}

          <Link
            href="/menu"
            className="mt-8 inline-block text-sm font-medium text-cocoa/70 underline decoration-caramel/60 underline-offset-4 transition-colors hover:text-caramel sm:hidden"
          >
            View the full menu
          </Link>
        </div>
      </section>

      {/* How to order */}
      <section className="border-b border-cream-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-cocoa md:text-4xl">
            From craving to kitchen in three steps
          </h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {ORDER_STEPS.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3">
                <span className="font-display text-4xl font-semibold text-caramel">
                  {String(i + 1).padStart(2, "0")}
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
          <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              About Bymamito
            </p>
            <p className="mt-5 font-display text-2xl leading-snug text-cocoa md:text-3xl">
              {aboutText}
            </p>
            <Link
              href="/about"
              className="mt-7 inline-block text-sm font-medium text-cocoa/70 underline decoration-caramel/60 underline-offset-4 transition-colors hover:text-caramel"
            >
              Read our story
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
