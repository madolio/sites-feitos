import { useState } from 'react'
import { FIRM_NAME, PHONE_DISPLAY, PHONE_HREF } from '../config/site'

const links = [
  { href: '#atuacao', label: 'Áreas de atuação' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#contato', label: 'Contato' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 font-heading text-lg text-ink">
          <span className="rivet" aria-hidden="true" />
          {FIRM_NAME}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.9375rem] text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden text-[0.9375rem] font-semibold tabular-nums text-ink transition-colors hover:text-accent-hover sm:inline-block"
          >
            {PHONE_DISPLAY}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center border border-line text-ink md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="h-5 w-5"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-line bg-paper px-6 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[0.9375rem] text-ink/75 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a href={PHONE_HREF} className="mt-2 py-2.5 text-[0.9375rem] font-semibold text-ink">
            {PHONE_DISPLAY}
          </a>
        </nav>
      )}
    </header>
  )
}
