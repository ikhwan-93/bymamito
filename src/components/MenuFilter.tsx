"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

type FilterableProduct = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  available: boolean;
};

type FilterableCategory = {
  id: number;
  name: string;
  slug: string;
  products: FilterableProduct[];
};

export default function MenuFilter({
  categories,
}: {
  categories: FilterableCategory[];
}) {
  const [activeSlug, setActiveSlug] = useState<string>("all");

  const visible =
    activeSlug === "all"
      ? categories
      : categories.filter((c) => c.slug === activeSlug);

  return (
    <div>
      <div
        className="mb-12 flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter menu by category"
      >
        <FilterChip
          label="All"
          active={activeSlug === "all"}
          onClick={() => setActiveSlug("all")}
        />
        {categories.map((category) => (
          <FilterChip
            key={category.slug}
            label={category.name}
            active={activeSlug === category.slug}
            onClick={() => setActiveSlug(category.slug)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-16">
        {visible.map((category) => (
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

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-all ${
        active
          ? "border-cocoa bg-cocoa text-paper shadow-sm"
          : "border-cream-line bg-white text-cocoa/60 hover:border-caramel hover:text-caramel"
      }`}
    >
      {label}
    </button>
  );
}
