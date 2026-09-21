export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-papel/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="font-display text-xl font-semibold">
          Vazão Encanamentos
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#diagnostico" className="hidden hover:text-fluxo sm:inline">
            Diagnóstico de vazão
          </a>
          <a href="#servicos" className="hidden hover:text-fluxo sm:inline">
            Serviços
          </a>
          <a href="#faq" className="hidden hover:text-fluxo sm:inline">
            Dúvidas
          </a>
          <a href="#contato" className="btn-emergencia px-4 py-2 text-sm">
            Emergência agora
          </a>
        </nav>
      </div>
    </header>
  )
}
