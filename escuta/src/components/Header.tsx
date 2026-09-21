export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-papel/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="font-display text-xl italic">
          Escuta Psicologia
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#ficha" className="hidden hover:text-acolhe sm:inline">
            Como funciona
          </a>
          <a href="#faq" className="hidden hover:text-acolhe sm:inline">
            Dúvidas
          </a>
          <a href="#contato" className="btn-quieto px-4 py-2 text-sm">
            Agendar conversa
          </a>
        </nav>
      </div>
    </header>
  )
}
