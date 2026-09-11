import { useState } from 'react'
import { BUSINESS_NAME, WHATSAPP_URL } from '../config/site'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          onClick={() => setOpen(false)}
          className="font-heading text-xl font-extrabold text-ink"
        >
          {BUSINESS_NAME}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#beneficios"
            className="text-sm font-medium text-ink/70 transition hover:text-ink"
          >
            Benefícios
          </a>
          <a
            href="#contato"
            className="text-sm font-medium text-ink/70 transition hover:text-ink"
          >
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover sm:inline-block"
          >
            Peça orçamento
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
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
        <nav className="flex flex-col border-t border-line bg-white px-6 py-4 md:hidden">
          <a
            href="#beneficios"
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-medium text-ink/70 transition hover:text-ink"
          >
            Benefícios
          </a>
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-medium text-ink/70 transition hover:text-ink"
          >
            Contato
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Peça orçamento
          </a>
        </nav>
      )}
    </header>
  )
}
