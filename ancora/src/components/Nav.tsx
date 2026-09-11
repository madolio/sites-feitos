export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="9" r="3.2" fill="none" stroke="#ab8a53" strokeWidth="1.6" />
      <path
        d="M16 12.5 V26 M8 19 a8 8 0 0 0 16 0 M4 19 h6 M22 19 h6"
        fill="none"
        stroke="#241b3a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#equipe', label: 'Equipe' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <Mark className="h-7 w-7" />
          <span className="font-serif text-xl">Âncora</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Seções">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-indigo/75 transition-colors hover:text-indigo">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contato" className="btn-brass px-4 py-2 text-[0.9375rem]">
          Agendar diagnóstico
        </a>
      </div>
    </header>
  )
}
