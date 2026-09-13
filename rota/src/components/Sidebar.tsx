import { useState } from 'react'
import { navItems } from '../data/painel'
import { sendToWhatsApp } from '../demo'
import Icone from './Icone'

// O esqueleto inteiro do site: barra lateral fixa + painel principal — não é
// uma página institucional, é a própria tela do software (a "screenshot" é
// o produto, não uma seção isolada dela). No mobile vira uma barra superior
// fina com um drawer que desliza por cima do conteúdo.
export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const conteudoNav = (
    <>
      <div className="flex items-center gap-2 px-5 pt-6 pb-8">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent-hero" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 18V12a6 6 0 0 1 6-6h2a6 6 0 0 0 6-6" />
          <circle cx="4" cy="18" r="2" fill="currentColor" stroke="none" />
          <circle cx="18" cy="0" r="2" fill="currentColor" stroke="none" />
        </svg>
        <span className="text-lg font-bold text-white">Rota</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const ativo = item.id === 'painel'
          return (
            <div
              key={item.id}
              aria-current={ativo}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                ativo ? 'bg-white/10 text-white' : 'text-white/50'
              }`}
            >
              <Icone tipo={item.icone} className="h-[18px] w-[18px] shrink-0" />
              {item.label}
              {!ativo && <span className="ml-auto text-[0.65rem] text-white/30">em breve</span>}
            </div>
          )
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá, Rota! Quero uma demonstração do painel pro meu negócio.')}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hero hover:text-sidebar"
        >
          Falar no WhatsApp
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop: coluna fixa de verdade, sempre visível */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-sidebar lg:flex">
        {conteudoNav}
      </aside>

      {/* Mobile: barra fina + drawer */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-sidebar px-4 py-3 lg:hidden">
        <span className="text-lg font-bold text-white">Rota</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-sidebar">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="ml-auto mt-4 mr-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/70"
            >
              ✕
            </button>
            {conteudoNav}
          </aside>
        </div>
      )}
    </>
  )
}
