const links = [
  { href: '#aulas', label: 'Aulas' },
  { href: '#horarios', label: 'Horários' },
  { href: '#helena', label: 'Instrutora' },
]

export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" fill="#f2b300" />
      <rect x="19" y="3" width="15" height="15" fill="#2c4fa3" />
      <path d="M3 34 L18 19 L18 34 Z" fill="#d63c3c" />
      <rect x="21" y="21" width="13" height="13" fill="#1d1b26" />
    </svg>
  )
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-gesso/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <Mark className="h-8 w-8" />
          <span className="text-xl font-medium tracking-tight">estúdio alma</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink/75 transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#experimental" className="btn-ink px-4 py-2.5 text-[0.9375rem]">
          Aula experimental
        </a>
      </div>
    </header>
  )
}
