export default function Header() {
  return (
    <header className="sticky top-3 z-20 px-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-linha/70 bg-papel/90 px-5 py-3 shadow-sm backdrop-blur sm:px-7">
        <a href="#topo" className="font-display text-xl italic">
          Estúdio Pelagem
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#guia" className="hidden hover:text-pelo sm:inline">
            Guia de pelagem
          </a>
          <a href="#servicos" className="hidden hover:text-pelo sm:inline">
            Serviços
          </a>
          <a href="#faq" className="hidden hover:text-pelo sm:inline">
            Dúvidas
          </a>
          <a href="#contato" className="btn-agua px-4 py-2 text-sm">
            Agendar
          </a>
        </nav>
      </div>
    </header>
  )
}
