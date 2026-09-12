import { useEffect, useState } from 'react'
import { START_TICKET } from '../data'

export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M6 8 H26 V24 H6 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 8 L16 16 L26 8" fill="none" stroke="#146b62" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

// Substitui a nav horizontal por um painel de senha de atendimento de
// verdade — o número "atendendo agora" sobe sozinho de tempos em tempos,
// como o painel de uma padaria ou farmácia, em vez de uma barra com links.
export default function TicketBar() {
  const [ticket, setTicket] = useState(START_TICKET)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setTicket((t) => t + 1), 9000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <Mark className="h-7 w-7 text-ink" />
          <span className="font-display text-lg">Corte</span>
        </a>

        <div aria-live="polite" className="ticket hidden items-baseline gap-2 text-sm sm:flex">
          <span className="text-ink/55">atendendo agora</span>
          <span className="text-lg font-bold text-teal">Nº {ticket}</span>
        </div>

        <a href="#agendar" className="btn-teal px-4 py-2 text-sm">
          Marcar horário
        </a>
      </div>
    </header>
  )
}
