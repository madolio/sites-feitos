export function TopoSimples() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5">
      <span className="font-display text-lg tracking-wide text-marfim">Lúmen</span>
      <nav className="hidden gap-6 text-sm text-fumo sm:flex">
        <a href="#catalogo" className="hover:text-acento">
          Catálogo
        </a>
        <a href="#calculadora" className="hover:text-acento">
          Calculadora
        </a>
        <a href="#processo" className="hover:text-acento">
          Processo
        </a>
        <a href="#contato" className="hover:text-acento">
          Contato
        </a>
      </nav>
    </header>
  )
}
