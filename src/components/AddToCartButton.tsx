"use client";

type AddToCartButtonProps = {
  id: number;
  name: string;
  priceCents: number;
};

export default function AddToCartButton({
  id,
  name,
  priceCents,
}: AddToCartButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        console.log("Add to cart (stub)", { id, name, priceCents });
      }}
      className="inline-flex items-center justify-center rounded-full bg-caramel px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-cocoa"
    >
      Add to order
    </button>
  );
}
