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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-white shadow-[0_1px_2px_rgb(46_32_22/0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgb(46_32_22/0.28)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-5xl font-semibold italic text-cocoa/40">
              {initial}
            </span>
          </div>
        )}

        {!available && (
          <span className="absolute left-3 top-3 rounded-full bg-cocoa/85 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-paper">
            Sold out today
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-cocoa">
          {name}
        </h3>

        {description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-cocoa/60">
            {description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
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
