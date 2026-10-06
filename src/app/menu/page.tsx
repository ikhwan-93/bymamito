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
        <p className="font-display text-3xl font-semibold text-cocoa">
          Nothing on the menu yet
        </p>
        <p className="mt-2 text-cocoa/70">
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
      <header className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
          Freshly baked
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold text-cocoa sm:text-5xl">
          The Menu
        </h1>
      </header>

      <MenuFilter categories={visibleCategories} />
    </div>
  );
}
