import { formatRM } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    description: string;
    priceCents: number;
    imageUrl: string;
    available: boolean;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, description, priceCents, imageUrl, available } = product;
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-rose/40 transition-transform hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-rose">
            <span className="font-display text-5xl font-semibold text-cocoa/40">
              {initial}
            </span>
          </div>
        )}

        {!available && (
          <span className="absolute left-3 top-3 rounded-full bg-cocoa/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-paper">
            Unavailable
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl font-semibold text-cocoa">
          {name}
        </h3>

        {description && (
          <p className="line-clamp-2 text-sm text-cocoa/70">{description}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="price-tag">{formatRM(priceCents)}</span>

          {available && (
            <AddToCartButton
              id={id}
              name={name}
              priceCents={priceCents}
              imageUrl={imageUrl}
            />
          )}
        </div>
      </div>
    </article>
  );
}
