const links = [
  { href: '#sabores', label: 'Sabores' },
  { href: '#encomenda', label: 'Encomenda' },
  { href: '#docinhos', label: 'Docinhos' },
  { href: '#prazos', label: 'Prazos' },
]

export function FanMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g transform="translate(14 27)">
        <rect x="-3" y="-24" width="6" height="24" rx="1.2" fill="#f5c93a" transform="rotate(-24)" />
        <rect x="-3" y="-24" width="6" height="24" rx="1.2" fill="#a2bb6f" transform="rotate(4)" />
        <rect x="-3" y="-24" width="6" height="24" rx="1.2" fill="#c4213a" transform="rotate(32)" />
        <circle r="2.2" fill="#33190f" />
      </g>
    </svg>
  )
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <a href="#sabores" className="flex items-center gap-2.5">
          <FanMark className="h-8 w-8" />
          <span className="display text-2xl">Doce Ateliê</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Seções">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="font-medium text-ink/70 transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#encomenda" className="btn-cherry px-4 py-2.5 text-[0.9375rem]">
          Montar meu bolo
        </a>
      </div>
    </header>
  )
}
