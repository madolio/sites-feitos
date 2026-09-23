export default function Header() {
  return (
    <header className="sticky top-0 z-20">
      <div className="border-b border-tinta/10 bg-tinta text-papel/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-1.5 sm:px-8">
          <span className="dado-vazao text-papel/60">Caxias do Sul, RS</span>
          <div className="hidden items-center gap-1.5 sm:flex">
            <a href="#contato" className="dado-vazao hover:text-papel">
              problema
            </a>
            <span aria-hidden="true" className="dado-vazao text-papel/40">
              →
            </span>
            <a href="#diagnostico" className="dado-vazao hover:text-papel">
              diagnóstico
            </a>
            <span aria-hidden="true" className="dado-vazao text-papel/40">
              →
            </span>
            <a href="#servicos" className="dado-vazao hover:text-papel">
              solução
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-linha bg-papel/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#topo" className="font-display text-xl font-semibold whitespace-nowrap">
            Vazão <span className="hidden sm:inline">Encanamentos</span>
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
      </div>
    </header>
  )
}
