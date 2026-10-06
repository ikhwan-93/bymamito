"use client";

import { useCart } from "./CartProvider";
import { formatRM } from "@/lib/format";
import { whatsappLink } from "@/lib/wa";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  whatsappNumber: string;
};

export default function CartDrawer({
  open,
  onClose,
  whatsappNumber,
}: CartDrawerProps) {
  const { items, totalCents, remove, setQty, clear } = useCart();

  const message =
    "Hello Bymamito! I'd like to order:\n\n" +
    items
      .map((i) => `${i.qty}x ${i.name} — ${formatRM(i.qty * i.priceCents)}`)
      .join("\n") +
    "\n\nTotal: " +
    formatRM(totalCents);

  const orderHref = whatsappLink(whatsappNumber, message);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-cocoa/40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream-line px-6 py-4">
          <h2 className="font-display text-xl font-semibold text-cocoa">
            Your order
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-cocoa/70 transition-colors hover:text-cocoa"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-cocoa/60">
              Your cart is empty.
            </p>
          ) : (
            <ul className="divide-y divide-cream-line">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-cream-line bg-rose">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-display text-xl font-semibold text-cocoa/40">
                          {item.name.trim().charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-cocoa">
                      {item.name}
                    </p>
                    <span className="price-tag mt-1">
                      {formatRM(item.priceCents)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-line text-cocoa transition-colors hover:border-caramel hover:text-caramel"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-cocoa">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-line text-cocoa transition-colors hover:border-caramel hover:text-caramel"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-20 text-right">
                    <p className="text-sm font-semibold text-cocoa">
                      {formatRM(item.qty * item.priceCents)}
                    </p>
                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="text-xs text-cocoa/50 underline-offset-2 transition-colors hover:text-caramel hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-cream-line px-6 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-cocoa/70">Total</span>
              <span className="font-display text-lg font-semibold text-cocoa">
                {formatRM(totalCents)}
              </span>
            </div>

            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full bg-caramel px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-cocoa"
            >
              Order via WhatsApp
            </a>

            <button
              type="button"
              onClick={clear}
              className="mt-2 w-full text-center text-xs text-cocoa/50 transition-colors hover:text-cocoa"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
