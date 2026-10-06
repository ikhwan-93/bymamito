"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

const initialState: { error?: string } = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-cream-line bg-white p-8 shadow-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-caramel">
          Staff only
        </p>
        <h1 className="font-display text-3xl font-semibold text-cocoa">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-cocoa/60">
          Enter the admin password to continue.
        </p>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-cocoa"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-cream-line bg-paper px-3 py-2 text-sm text-cocoa outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/20"
            />
          </div>

          {state.error ? (
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-caramel px-4 py-2 text-sm font-semibold text-white transition hover:bg-caramel/90 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
