export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 28 V6 H20 V28 M4 16 H20 M26 6 V28" fill="none" stroke="#22201b" strokeWidth="1.6" />
      <circle cx="26" cy="6" r="2.2" fill="#c9962d" />
    </svg>
  )
}

const links = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#processo', label: 'Processo' },
  { href: '#estudio', label: 'Estúdio' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <Mark className="h-7 w-7" />
          <span className="font-serif text-xl">Traço</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Seções">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink/75 transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contato" className="btn-ink px-4 py-2 text-[0.9375rem]">
          Falar com o estúdio
        </a>
      </div>
    </header>
  )
}
