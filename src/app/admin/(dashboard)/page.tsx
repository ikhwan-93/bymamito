import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [productCount, postCount, categoryCount] = await Promise.all([
    prisma.product.count(),
    prisma.post.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount },
    { label: "Posts", value: postCount },
    { label: "Categories", value: categoryCount },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-cocoa">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-cocoa/60">
        Overview of your bakery content.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-cream-line bg-white p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-caramel">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-4xl font-semibold text-cocoa">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
