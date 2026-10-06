import { prisma } from "@/lib/prisma";
import { ProductManager } from "./ProductForm";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: { category: { select: { name: true } } },
    }),
    prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cocoa">
        Products
      </h1>
      <p className="mt-2 text-sm text-cocoa/60">
        Manage your baked goods, prices, and photos.
      </p>

      <ProductManager
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          priceCents: p.priceCents,
          imageUrl: p.imageUrl,
          available: p.available,
          sortOrder: p.sortOrder,
          categoryId: p.categoryId,
          categoryName: p.category.name,
        }))}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </div>
  );
}
