import Link from "next/link";
import CartTrigger from "./CartTrigger";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export default function SiteHeader({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
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

        <CartTrigger whatsappNumber={whatsappNumber} />
      </div>
    </header>
  );
}
