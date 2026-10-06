import { prisma } from "@/lib/prisma";
import MenuFilter from "@/components/MenuFilter";

export const metadata = {
  title: "Menu — Bymamito",
  description: "Browse our homemade cakes, cookies, and pastries.",
};

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      products: {
        where: { available: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  const hasItems = categories.some((c) => c.products.length > 0);

  if (!hasItems) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <p className="eyebrow justify-center">The menu</p>
        <p className="mt-5 font-display text-3xl font-semibold text-cocoa">
          Nothing on the menu yet
        </p>
        <p className="mt-3 text-cocoa/70">
          Check back soon — fresh bakes are on the way.
        </p>
      </div>
    );
  }

  const visibleCategories = categories
    .filter((c) => c.products.length > 0)
    .map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      products: c.products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        priceCents: p.priceCents,
        imageUrl: p.imageUrl,
        available: p.available,
      })),
    }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="eyebrow justify-center">Freshly baked</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-cocoa sm:text-5xl">
          The Menu
        </h1>
        <p className="divider-flourish mt-5 font-display text-sm italic text-caramel/80">
          baked to order
        </p>
      </header>

      <div className="mt-12">
        <MenuFilter categories={visibleCategories} />
      </div>
    </div>
  );
}
