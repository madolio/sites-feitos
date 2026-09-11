import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PHONE_PRIMARY, PHONE_PRIMARY_HREF } from '../constants'

const links = [
  { to: '/produtos', label: 'Produtos' },
  { to: '/#setores', label: 'Setores' },
  { to: '/#contato', label: 'Contato' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
          <img src="/images/logo.png" alt="NBJ Systems" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[0.9375rem] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_PRIMARY_HREF}
            className="hidden font-semibold text-ink tabular-nums transition-colors hover:text-accent sm:inline-block"
          >
            {PHONE_PRIMARY}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-ink/15 text-ink md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              className="h-5 w-5"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-ink/10 bg-white px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="py-2.5 font-medium text-ink/75 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a href={PHONE_PRIMARY_HREF} className="btn-primary mt-3">
            Ligar {PHONE_PRIMARY}
          </a>
        </nav>
      )}
    </header>
  )
}
