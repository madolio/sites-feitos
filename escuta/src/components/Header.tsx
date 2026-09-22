export default function Header() {
  return (
    <header className="bg-transparent">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-between sm:gap-0 sm:px-8 sm:py-6 sm:text-left">
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
          <a href="#contato" className="link-sutil">
            Agendar conversa
          </a>
        </nav>
      </div>
    </header>
  )
}
