export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <span className="font-heading text-xl font-medium tracking-wide text-cream">Calibre</span>
      <nav className="flex gap-6 text-sm text-cream/75">
        <a href="#catalogo" className="transition-colors hover:text-brass">
          Modelos
        </a>
        <a href="#processo" className="hidden transition-colors hover:text-brass sm:inline">
          Como nasce
        </a>
        <a href="#contato" className="transition-colors hover:text-brass">
          Encomendar
        </a>
      </nav>
    </header>
  )
}
