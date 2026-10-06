export default function SiteFooter() {
  return (
    <footer className="border-t border-cream-line bg-paper text-cocoa">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-lg font-semibold text-cocoa">
          Bymamito
        </p>

        <p className="text-sm text-cocoa/70">Open daily, 9am - 6pm</p>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/bymamito/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-cocoa/70 transition-colors hover:text-caramel"
          >
            Instagram
          </a>
          <span className="text-sm text-cocoa/50">
            © {new Date().getFullYear()} Bymamito
          </span>
        </div>
      </div>
    </footer>
  );
}
