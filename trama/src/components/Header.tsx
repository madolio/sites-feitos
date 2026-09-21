export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-cru/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="font-display text-xl italic">
          Trama
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#etiqueta" className="hover:text-jeans">
            Como cuidar
          </a>
          <a href="#vitrine" className="hidden hover:text-jeans sm:inline">
            O que temos
          </a>
          <a href="#contato" className="btn-jeans px-4 py-2 text-sm">
            Falar no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
