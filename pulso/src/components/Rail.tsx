import { useEffect, useState } from 'react'

export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 4 A12 12 0 0 1 28 16" fill="none" stroke="#e8482f" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

const marks = [
  { id: 'inicio', label: '0M' },
  { id: 'programas', label: '25M' },
  { id: 'resultados', label: '60M' },
  { id: 'agendar', label: '100M' },
]

// Substitui a nav horizontal por uma raia de pista de verdade: uma faixa fixa
// à esquerda com as marcações de distância, como as placas pintadas no chão
// de uma pista de atletismo — a marcação atual acende conforme você "corre"
// (rola) a página. No celular, vira uma barra fina no topo (sem espaço pra
// raia inteira), só com a marca e o CTA.
export default function Rail() {
  const [activeId, setActiveId] = useState('inicio')

  useEffect(() => {
    const sections = marks.map((m) => document.getElementById(m.id)).filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* Desktop: raia fixa à esquerda */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-16 flex-col items-center border-r-4 border-track bg-chalk lg:flex">
        <a href="#inicio" className="py-5">
          <Mark className="h-8 w-8" />
        </a>

        <nav aria-label="Seções" className="relative flex flex-1 flex-col items-center justify-between py-6">
          <div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2 bg-line" aria-hidden="true" />
          {marks.map((mark) => {
            const active = activeId === mark.id
            return (
              <a
                key={mark.id}
                href={`#${mark.id}`}
                aria-current={active ? 'true' : undefined}
                className="rail-mark relative z-10 flex items-center gap-2 py-2 text-xs font-bold tracking-widest"
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors ${active ? 'bg-lane' : 'bg-track'}`}
                  aria-hidden="true"
                />
                <span className={active ? 'text-lane-ink' : 'text-track/50'}>{mark.label}</span>
              </a>
            )
          })}
        </nav>
      </header>

      {/* Celular/tablet: barra fina no topo */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b-4 border-track bg-chalk px-5 py-3 lg:hidden">
        <a href="#inicio" className="flex items-center gap-2">
          <Mark className="h-8 w-8" />
          <span className="font-display text-lg tracking-wide">Pulso</span>
        </a>
        <a href="#agendar" className="btn-lane px-4 py-2 text-sm">
          Aula grátis
        </a>
      </header>
    </>
  )
}
