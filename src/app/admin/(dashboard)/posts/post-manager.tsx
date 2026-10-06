"use client";

import { useState } from "react";
import { createPost, deletePost, updatePost } from "./actions";

type Post = {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  published: boolean;
  publishedAt: string;
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

export function PostManager({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-8 space-y-8">
      <AddPostForm />
      <PostList posts={posts} />
    </div>
  );
}

function AddPostForm() {
  const [error, setError] = useState<string>();

  return (
    <form
      action={async (formData) => {
        setError(undefined);
        const result = await createPost(formData);
        if (result.error) setError(result.error);
      }}
      className="rounded-2xl border border-cream-line bg-white p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-caramel">
        Add post
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <Field label="Title">
          <input name="title" required className={inputClass} />
        </Field>
        <Field label="Body">
          <textarea name="body" rows={5} className={inputClass} />
        </Field>
        <Field label="Image URL">
          <input name="imageUrl" type="url" className={inputClass} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-cocoa">
          <input
            name="published"
            type="checkbox"
            className="h-4 w-4 rounded border-cream-line accent-caramel"
          />
          Published
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 rounded-lg bg-caramel px-4 py-2 text-sm font-semibold text-white transition hover:bg-caramel/90"
      >
        Add
      </button>
      {error ? (
        <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
      ) : null}
    </form>
  );
}

function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-cream-line bg-white p-6 text-sm text-cocoa/60">
        No posts yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-cream-line rounded-2xl border border-cream-line bg-white">
      {posts.map((post) => (
        <PostRow key={post.id} post={post} />
      ))}
    </ul>
  );
}

function PostRow({ post }: { post: Post }) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string>();

  if (editing) {
    return (
      <li className="p-5">
        <EditPostForm
          post={post}
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
        <p className="font-medium text-cocoa">{post.title}</p>
        <p className="text-xs text-cocoa/50">
          {new Date(post.publishedAt).toLocaleDateString("en-MY", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <span
        className={`rounded-full border border-dashed px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
          post.published
            ? "border-caramel bg-butter text-caramel"
            : "border-cream-line bg-paper text-cocoa/50"
        }`}
      >
        {post.published ? "Published" : "Draft"}
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
            if (!confirm(`Delete "${post.title}"?`)) return;
            await deletePost(formData);
          }}
        >
          <input type="hidden" name="id" value={post.id} />
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

function EditPostForm({
  post,
  onError,
  onDone,
}: {
  post: Post;
  onError: (message: string) => void;
  onDone: () => void;
}) {
  return (
    <form
      action={async (formData) => {
        const result = await updatePost(formData);
        if (result.error) {
          onError(result.error);
        } else {
          onDone();
        }
      }}
      className="grid grid-cols-1 gap-4"
    >
      <input type="hidden" name="id" value={post.id} />
      <Field label="Title">
        <input name="title" required defaultValue={post.title} className={inputClass} />
      </Field>
      <Field label="Body">
        <textarea name="body" rows={5} defaultValue={post.body} className={inputClass} />
      </Field>
      <Field label="Image URL">
        <input name="imageUrl" type="url" defaultValue={post.imageUrl} className={inputClass} />
      </Field>
      <label className="flex items-center gap-2 text-sm text-cocoa">
        <input
          name="published"
          type="checkbox"
          defaultChecked={post.published}
          className="h-4 w-4 rounded border-cream-line accent-caramel"
        />
        Published
      </label>
      <div className="flex items-center gap-2">
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
