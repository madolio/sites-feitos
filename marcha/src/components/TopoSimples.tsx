export function TopoSimples() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5">
      <span className="font-display text-lg tracking-wide text-marfim">Marcha</span>
      <nav className="hidden gap-6 text-sm text-marfim/70 sm:flex">
        <a href="#estoque" className="hover:text-acento">
          Estoque
        </a>
        <a href="#financiamento" className="hover:text-acento">
          Financiamento
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
