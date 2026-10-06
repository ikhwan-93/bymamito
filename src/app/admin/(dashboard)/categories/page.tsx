import { prisma } from "@/lib/prisma";
import { CategoryManager } from "./category-manager";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cocoa">
        Categories
      </h1>
      <p className="mt-2 text-sm text-cocoa/60">
        Organize your products into categories.
      </p>

      <CategoryManager
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          sortOrder: c.sortOrder,
          productCount: c._count.products,
        }))}
      />
    </div>
  );
}
