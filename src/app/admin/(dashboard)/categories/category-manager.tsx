"use client";

import { useState } from "react";
import { createCategory, deleteCategory, updateCategory } from "./actions";

type Category = {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  productCount: number;
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

export function CategoryManager({ categories }: { categories: Category[] }) {
  return (
    <div className="mt-8 space-y-8">
      <AddCategoryForm />
      <CategoryList categories={categories} />
    </div>
  );
}

function AddCategoryForm() {
  const [error, setError] = useState<string>();

  return (
    <form
      action={async (formData) => {
        setError(undefined);
        const result = await createCategory(formData);
        if (result.error) setError(result.error);
      }}
      className="rounded-2xl border border-cream-line bg-white p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-caramel">
        Add category
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_8rem_auto] sm:items-end">
        <Field label="Name">
          <input name="name" required className={inputClass} />
        </Field>
        <Field label="Slug">
          <input name="slug" required className={inputClass} />
        </Field>
        <Field label="Sort order">
          <input
            name="sortOrder"
            type="number"
            defaultValue={0}
            className={inputClass}
          />
        </Field>
        <button
          type="submit"
          className="rounded-lg bg-caramel px-4 py-2 text-sm font-semibold text-white transition hover:bg-caramel/90"
        >
          Add
        </button>
      </div>
      {error ? (
        <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
      ) : null}
    </form>
  );
}

function CategoryList({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return (
      <p className="rounded-2xl border border-cream-line bg-white p-6 text-sm text-cocoa/60">
        No categories yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-cream-line rounded-2xl border border-cream-line bg-white">
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </ul>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string>();

  if (editing) {
    return (
      <li className="p-5">
        <EditCategoryForm
          category={category}
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
      <div className="min-w-0 flex-1">
        <p className="font-medium text-cocoa">{category.name}</p>
        <p className="text-xs text-cocoa/50">/{category.slug}</p>
      </div>

      <span className="rounded-full border border-dashed border-caramel bg-butter px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-caramel">
        {category.productCount} {category.productCount === 1 ? "item" : "items"}
      </span>

      <span className="w-20 text-xs text-cocoa/50">
        Sort {category.sortOrder}
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
            if (!confirm(`Delete "${category.name}" and its products?`)) return;
            await deleteCategory(formData);
          }}
        >
          <input type="hidden" name="id" value={category.id} />
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

function EditCategoryForm({
  category,
  onError,
  onDone,
}: {
  category: Category;
  onError: (message: string) => void;
  onDone: () => void;
}) {
  return (
    <form
      action={async (formData) => {
        const result = await updateCategory(formData);
        if (result.error) {
          onError(result.error);
        } else {
          onDone();
        }
      }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_8rem_auto_auto] sm:items-end"
    >
      <input type="hidden" name="id" value={category.id} />
      <Field label="Name">
        <input name="name" required defaultValue={category.name} className={inputClass} />
      </Field>
      <Field label="Slug">
        <input name="slug" required defaultValue={category.slug} className={inputClass} />
      </Field>
      <Field label="Sort order">
        <input
          name="sortOrder"
          type="number"
          defaultValue={category.sortOrder}
          className={inputClass}
        />
      </Field>
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
    </form>
  );
}
