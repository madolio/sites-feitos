export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="3" y="8" width="26" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="16" r="5" fill="none" stroke="#d98c2b" strokeWidth="2" />
      <circle cx="12" cy="16" r="1.6" fill="currentColor" />
    </svg>
  )
}

// Barra fixa fina, com as perfurações do filme em cima e embaixo — em vez de
// uma barra de nav comum, é a "tira de filme" segurando a página.
export default function FilmBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink">
      <div className="sprockets h-2.5" aria-hidden="true" />
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5 text-paper">
          <Mark className="h-7 w-7" />
          <span className="font-display text-lg">Revelar</span>
        </a>
        <a href="#contato" className="btn-amber px-4 py-2 text-sm">
          Pedir orçamento
        </a>
      </div>
      <div className="sprockets h-2.5" aria-hidden="true" />
    </header>
  )
}
