import Link from "next/link";
import CartTrigger from "./CartTrigger";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/posts", label: "Notes" },
  { href: "/about", label: "About" },
];

export default function SiteHeader({
  whatsappNumber,
  logoImage,
}: {
  whatsappNumber: string;
  logoImage?: string;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-cream-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="font-display text-[1.35rem] font-semibold tracking-tight text-cocoa"
        >
          {logoImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoImage}
              alt="Bymamito"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <>
              <span className="italic">B</span>ymamito
            </>
          )}
        </Link>

        <nav className="hidden items-center gap-7 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-cocoa/70 transition-colors hover:text-caramel"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-caramel transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-caramel/50 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-caramel transition-colors hover:bg-caramel hover:text-paper md:inline-flex"
          >
            Order
          </a>
          <CartTrigger whatsappNumber={whatsappNumber} />
        </div>
      </div>

      <nav className="flex items-center justify-center gap-6 border-t border-cream-line/70 py-2 sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-cocoa/70"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
