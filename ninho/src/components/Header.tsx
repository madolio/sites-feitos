export default function Header() {
  return (
    <header className="sticky top-3 z-20 px-4 sm:top-4 sm:px-6">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-linha bg-papel/90 px-5 py-3 shadow-sm backdrop-blur sm:px-6">
        <a href="#topo" className="font-display text-base italic sm:text-xl">
          Ninho Educação Infantil
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#marcos" className="hidden hover:text-ninho sm:inline">
            Desenvolvimento
          </a>
          <a href="#rotina" className="hidden hover:text-ninho sm:inline">
            Rotina
          </a>
          <a href="#faq" className="hidden hover:text-ninho sm:inline">
            Dúvidas
          </a>
          <a href="#contato" className="btn-broto whitespace-nowrap px-4 py-2 text-sm">
            Agendar visita
          </a>
        </nav>
      </div>
    </header>
  )
}
