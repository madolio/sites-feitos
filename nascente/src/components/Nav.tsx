import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendToWhatsApp } from '../demo'

const links = [
  { to: '/produtos', label: 'Produtos' },
  { to: '/#setores', label: 'Setores' },
  { to: '/#contato', label: 'Contato' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  const falarNoWhatsApp = () => {
    setOpen(false)
    sendToWhatsApp('Olá, Nascente! Quero saber mais sobre os equipamentos.')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-heading text-lg font-extrabold text-ink"
          style={{ fontStretch: '116%' }}
        >
          Nascente
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
          <button
            type="button"
            onClick={falarNoWhatsApp}
            className="hidden font-semibold text-ink transition-colors hover:text-accent sm:inline-block"
          >
            Falar no WhatsApp
          </button>

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
          <button type="button" onClick={falarNoWhatsApp} className="btn-primary mt-3">
            Falar no WhatsApp
          </button>
        </nav>
      )}
    </header>
  )
}
