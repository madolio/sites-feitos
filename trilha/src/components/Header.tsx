// Borda tracejada de linha de contorno topográfica (não a borda sólida do
// padrão genérico) + um marco de trilha (ponto) antes do nome, como um
// waypoint num mapa.
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-dashed border-contorno/50 bg-papel">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="flex items-center gap-2.5 font-display text-xl italic">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-trilha" />
          Vereda Fisioterapia
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#trilha" className="hover:text-contorno">
            Sua trilha
          </a>
          <a href="#especialidades" className="hidden hover:text-contorno sm:inline">
            Especialidades
          </a>
          <a href="#contato" className="btn-contorno px-4 py-2 text-sm">
            Agendar avaliação
          </a>
        </nav>
      </div>
    </header>
  )
}
