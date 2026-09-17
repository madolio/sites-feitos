export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-vidro/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="font-display text-xl italic">
          Estufa Cheia
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#especies" className="hover:text-musgo">
            Catálogo
          </a>
          <a href="#processo" className="hidden hover:text-musgo sm:inline">
            Como funciona
          </a>
          <a href="#encomenda" className="btn-musgo px-4 py-2 text-sm">
            Encomendar
          </a>
        </nav>
      </div>
    </header>
  )
}
