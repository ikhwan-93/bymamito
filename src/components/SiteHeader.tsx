import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-cocoa"
        >
          Bymamito
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cocoa/70 transition-colors hover:text-caramel"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          data-testid="cart-button"
          aria-label="Cart"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-line text-cocoa transition-colors hover:border-caramel hover:text-caramel"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M6 7h12l1 13H5L6 7Z" />
            <path d="M9 10V6a3 3 0 0 1 6 0v4" />
          </svg>
        </button>
      </div>
    </header>
  );
}
