import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logoutAction } from "../actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await getSession();

  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:gap-8">
      <aside className="md:w-52 md:shrink-0">
        <div className="md:hidden">
          <details className="rounded-xl border border-cream-line bg-white">
            <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-cocoa">
              Admin menu
              <span aria-hidden="true">▾</span>
            </summary>
            <nav className="flex flex-col gap-1 border-t border-cream-line p-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-cocoa/70 transition-colors hover:bg-rose/40 hover:text-cocoa"
                >
                  {item.label}
                </Link>
              ))}
              <form action={logoutAction} className="mt-2">
                <button
                  type="submit"
                  className="w-full rounded-md border border-cream-line px-3 py-2.5 text-left text-sm font-medium text-cocoa/70 transition-colors hover:border-caramel hover:text-caramel"
                >
                  Log out
                </button>
              </form>
            </nav>
          </details>
        </div>

        <div className="hidden md:block">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-caramel">
            Admin
          </p>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-cocoa/70 transition-colors hover:bg-rose/40 hover:text-cocoa"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form action={logoutAction} className="mt-6">
            <button
              type="submit"
              className="rounded-md border border-cream-line px-3 py-2 text-sm font-medium text-cocoa/70 transition-colors hover:border-caramel hover:text-caramel"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
