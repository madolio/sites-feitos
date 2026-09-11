export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="#ffe800" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="17" cy="18" r="17" fill="#ff48b0" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="23" cy="22" r="15" fill="none" stroke="#3255a4" strokeWidth="2.5" />
    </svg>
  )
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-blue bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <Mark className="h-9 w-9" />
          <span className="poster text-2xl text-blue">Sabor da Vila</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
          <a href="#cardapio" className="font-bold text-ink transition-colors hover:text-blue">
            Cardápio
          </a>
          <a href="#onde" className="font-bold text-ink transition-colors hover:text-blue">
            Onde e horário
          </a>
        </nav>

        <a href="#cardapio" className="btn-blue px-4 py-2 text-[0.9375rem]">
          Fazer pedido
        </a>
      </div>
    </header>
  )
}
