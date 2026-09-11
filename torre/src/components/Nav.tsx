export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="#35d6c9" strokeWidth="1.4" opacity="0.5" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#35d6c9" strokeWidth="1.4" opacity="0.7" />
      <path d="M16 16 L16 4 A12 12 0 0 1 25 9 Z" fill="#35d6c9" opacity="0.5" />
      <circle cx="16" cy="16" r="2.2" fill="#f2a93a" />
    </svg>
  )
}

const links = [
  { href: '#produto', label: 'Produto' },
  { href: '#planos', label: 'Planos' },
  { href: '#depoimentos', label: 'Clientes' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-deck/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <Mark className="h-7 w-7" />
          <span className="text-lg font-medium tracking-tight">Torre</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink-dim transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#planos" className="btn-amber px-4 py-2 text-[0.9375rem]">
          Testar grátis
        </a>
      </div>
    </header>
  )
}
