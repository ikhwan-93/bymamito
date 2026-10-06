"use client";

import { useState } from "react";
import { createProduct, deleteProduct, updateProduct } from "./actions";

type CategoryOption = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  available: boolean;
  sortOrder: number;
  categoryId: number;
  categoryName: string;
};

const inputClass =
  "w-full rounded-lg border border-cream-line bg-paper px-3 py-2 text-sm text-cocoa outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/20";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-cocoa/70">
        {label}
      </span>
      {children}
    </label>
  );
}

function toRM(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function ProductManager({
  products,
  categories,
}: {
  products: Product[];
  categories: CategoryOption[];
}) {
  return (
    <div className="mt-8 space-y-8">
      <AddProductForm categories={categories} />
      <ProductList products={products} categories={categories} />
    </div>
  );
}

function AddProductForm({ categories }: { categories: CategoryOption[] }) {
  const [error, setError] = useState<string>();

  if (categories.length === 0) {
    return (
      <p className="rounded-2xl border border-cream-line bg-white p-6 text-sm text-cocoa/60">
        Add a category first before creating products.
      </p>
    );
  }

  return (
    <form
      action={async (formData) => {
        setError(undefined);
        const result = await createProduct(formData);
        if (result.error) setError(result.error);
      }}
      className="rounded-2xl border border-cream-line bg-white p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-caramel">
        Add product
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" required className={inputClass} />
        </Field>
        <Field label="Price (RM)">
          <input
            name="price"
            required
            type="number"
            step="0.01"
            min="0.01"
            placeholder="45.00"
            className={inputClass}
          />
        </Field>
        <Field label="Category">
          <select name="categoryId" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sort order">
          <input
            name="sortOrder"
            type="number"
            defaultValue={0}
            className={inputClass}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea
              name="description"
              rows={3}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Image">
          <input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="block w-full text-sm text-cocoa/70 file:mr-3 file:rounded-lg file:border-0 file:bg-rose/40 file:px-3 file:py-2 file:text-sm file:font-medium file:text-cocoa"
          />
        </Field>
        <label className="flex items-center gap-2 self-end text-sm text-cocoa/80">
          <input
            name="available"
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-cream-line text-caramel"
          />
          Available
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 rounded-lg bg-caramel px-4 py-2 text-sm font-semibold text-white transition hover:bg-caramel/90"
      >
        Add product
      </button>
      {error ? (
        <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
      ) : null}
    </form>
  );
}

function ProductList({
  products,
  categories,
}: {
  products: Product[];
  categories: CategoryOption[];
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-cream-line bg-white p-6 text-sm text-cocoa/60">
        No products yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-cream-line rounded-2xl border border-cream-line bg-white">
      {products.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          categories={categories}
        />
      ))}
    </ul>
  );
}

function ProductRow({
  product,
  categories,
}: {
  product: Product;
  categories: CategoryOption[];
}) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string>();

  if (editing) {
    return (
      <li className="p-5">
        <EditProductForm
          product={product}
          categories={categories}
          onError={setError}
          onDone={() => {
            setEditing(false);
            setError(undefined);
          }}
        />
        {error ? (
          <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
        ) : null}
      </li>
    );
  }

  return (
    <li className="flex flex-wrap items-center gap-4 p-5">
      {product.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-14 w-14 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-rose/40 text-xs text-cocoa/40">
          No img
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-medium text-cocoa">{product.name}</p>
        <p className="text-xs text-cocoa/50">{product.categoryName}</p>
      </div>

      <span className="price-tag">RM {toRM(product.priceCents)}</span>

      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
          product.available
            ? "border border-dashed border-caramel bg-butter text-caramel"
            : "border border-cream-line bg-paper text-cocoa/40"
        }`}
      >
        {product.available ? "Available" : "Hidden"}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setEditing(true);
            setError(undefined);
          }}
          className="rounded-md border border-cream-line px-3 py-1.5 text-sm font-medium text-cocoa/70 transition hover:border-caramel hover:text-caramel"
        >
          Edit
        </button>
        <form
          action={async (formData) => {
            if (!confirm(`Delete "${product.name}"?`)) return;
            await deleteProduct(formData);
          }}
        >
          <input type="hidden" name="id" value={product.id} />
          <button
            type="submit"
            className="rounded-md border border-cream-line px-3 py-1.5 text-sm font-medium text-red-600 transition hover:border-red-400 hover:bg-red-50"
          >
            Delete
          </button>
        </form>
      </div>
    </li>
  );
}

function EditProductForm({
  product,
  categories,
  onError,
  onDone,
}: {
  product: Product;
  categories: CategoryOption[];
  onError: (message: string) => void;
  onDone: () => void;
}) {
  return (
    <form
      action={async (formData) => {
        const result = await updateProduct(formData);
        if (result.error) {
          onError(result.error);
        } else {
          onDone();
        }
      }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <input type="hidden" name="id" value={product.id} />
      <Field label="Name">
        <input
          name="name"
          required
          defaultValue={product.name}
          className={inputClass}
        />
      </Field>
      <Field label="Price (RM)">
        <input
          name="price"
          required
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={toRM(product.priceCents)}
          className={inputClass}
        />
      </Field>
      <Field label="Category">
        <select
          name="categoryId"
          required
          defaultValue={product.categoryId}
          className={inputClass}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Sort order">
        <input
          name="sortOrder"
          type="number"
          defaultValue={product.sortOrder}
          className={inputClass}
        />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Description">
          <textarea
            name="description"
            rows={3}
            defaultValue={product.description}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Replace image (optional)">
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="block w-full text-sm text-cocoa/70 file:mr-3 file:rounded-lg file:border-0 file:bg-rose/40 file:px-3 file:py-2 file:text-sm file:font-medium file:text-cocoa"
        />
      </Field>
      <label className="flex items-center gap-2 self-end text-sm text-cocoa/80">
        <input
          name="available"
          type="checkbox"
          defaultChecked={product.available}
          className="h-4 w-4 rounded border-cream-line text-caramel"
        />
        Available
      </label>
      <div className="flex items-center gap-2 sm:col-span-2">
        <button
          type="submit"
          className="rounded-lg bg-caramel px-4 py-2 text-sm font-semibold text-white transition hover:bg-caramel/90"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-lg border border-cream-line px-4 py-2 text-sm font-medium text-cocoa/70 transition hover:border-caramel hover:text-caramel"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
