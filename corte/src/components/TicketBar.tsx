import { useEffect, useState } from 'react'
import { START_TICKET } from '../data'

// Mini-poste de barbeiro — listras diagonais vermelho/branco/azul dentro de
// uma cápsula, no lugar do ícone genérico de envelope da versão anterior.
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <clipPath id="poste-clip">
          <rect x="10" y="4" width="12" height="24" rx="6" />
        </clipPath>
      </defs>
      <rect x="10" y="4" width="12" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g clipPath="url(#poste-clip)">
        <rect x="8" y="2" width="16" height="28" fill="#fafaf7" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={-4 + i * 8} y="0" width="4" height="32" fill={i % 2 === 0 ? '#c8202f' : '#1d4e89'} transform="skewX(-25)" />
        ))}
      </g>
      <rect x="10" y="4" width="12" height="24" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
          <span className="text-lg font-bold text-vermelho">Nº {ticket}</span>
        </div>

        <a href="#agendar" className="btn-vermelho px-4 py-2 text-sm">
          Marcar horário
        </a>
      </div>
    </header>
  )
}
