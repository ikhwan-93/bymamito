import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

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

      <div className="flex flex-col gap-16">
        {categories
          .filter((c) => c.products.length > 0)
          .map((category) => (
            <section key={category.id}>
              <div className="mb-6 flex items-baseline gap-3">
                <h2 className="font-display text-2xl font-semibold text-cocoa">
                  {category.name}
                </h2>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cocoa/40">
                  {category.products.length}{" "}
                  {category.products.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
