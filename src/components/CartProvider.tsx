"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  priceCents: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  totalCents: number;
  add: (item: { id: number; name: string; priceCents: number }) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "bymamito-cart";

function loadInitialItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item &&
        typeof item.id === "number" &&
        typeof item.name === "string" &&
        typeof item.priceCents === "number" &&
        typeof item.qty === "number" &&
        item.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadInitialItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write failures (private mode, quota, etc.)
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (item) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
    };

    const remove: CartContextValue["remove"] = (id) => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const setQty: CartContextValue["setQty"] = (id, qty) => {
      if (qty <= 0) {
        remove(id);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i)),
      );
    };

    const clear: CartContextValue["clear"] = () => {
      setItems([]);
    };

    const totalCents = items.reduce((sum, i) => sum + i.qty * i.priceCents, 0);

    return { items, totalCents, add, remove, setQty, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
