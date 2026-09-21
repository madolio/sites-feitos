export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-papel/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="font-display text-xl">
          Razão Contábil
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#calendario" className="hover:text-selo">
            Calendário fiscal
          </a>
          <a href="#servicos" className="hidden hover:text-selo sm:inline">
            Serviços
          </a>
          <a href="#contato" className="btn-selo px-4 py-2 text-sm">
            Falar com a equipe
          </a>
        </nav>
      </div>
    </header>
  )
}
