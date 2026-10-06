"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
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
const EMPTY: CartItem[] = [];

function parseItems(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
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

let cachedItems: CartItem[] | null = null;
const listeners = new Set<() => void>();

function getItems(): CartItem[] {
  if (cachedItems === null) {
    cachedItems =
      typeof window === "undefined"
        ? EMPTY
        : parseItems(window.localStorage.getItem(STORAGE_KEY));
  }
  return cachedItems;
}

function commitItems(next: CartItem[]) {
  cachedItems = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getItems, () => EMPTY);

  const value = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (item) => {
      const prev = getItems();
      const existing = prev.find((i) => i.id === item.id);
      commitItems(
        existing
          ? prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
          : [...prev, { ...item, qty: 1 }],
      );
    };

    const remove: CartContextValue["remove"] = (id) => {
      commitItems(getItems().filter((i) => i.id !== id));
    };

    const setQty: CartContextValue["setQty"] = (id, qty) => {
      if (qty <= 0) {
        remove(id);
        return;
      }
      commitItems(getItems().map((i) => (i.id === id ? { ...i, qty } : i)));
    };

    const clear: CartContextValue["clear"] = () => {
      commitItems([]);
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
