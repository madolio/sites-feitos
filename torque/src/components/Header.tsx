// Fita de sinalização de 4px no topo — a mesma faixa laranja/amarela do
// chão de galpão, aqui como acabamento do cabeçalho, não decoração solta.
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-oficina/90 backdrop-blur">
      <div aria-hidden="true" className="faixa-listrada h-1 w-full" />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="font-display text-xl tracking-wide uppercase whitespace-nowrap">
          Torque <span className="hidden text-sinal sm:inline">Auto Mecânica</span>
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#painel" className="hidden hover:text-aco sm:inline">
            Painel de revisão
          </a>
          <a href="#servicos" className="hidden hover:text-aco sm:inline">
            Serviços
          </a>
          <a href="#contato" className="btn-aco px-4 py-2 text-sm normal-case">
            Agendar horário
          </a>
        </nav>
      </div>
    </header>
  )
}
