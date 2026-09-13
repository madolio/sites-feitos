import { useState } from 'react'
import type { Sala } from '../data/casos'

// O esqueleto inteiro do site: a planta baixa é a navegação. Sem scroll
// controlando nada — você clica no cômodo, o conteúdo troca. Mesma escala de
// viewBox em todos os casos (0 0 480 320), só a subdivisão das salas muda.
export default function Planta({
  salas,
  ativa,
  onSelect,
}: {
  salas: Sala[]
  ativa: string
  onSelect: (id: string) => void
}) {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <svg viewBox="0 0 480 320" className="h-auto w-full" role="group" aria-label="Planta baixa — clique num cômodo para ver os detalhes">
      {salas.map((sala) => {
        const selecionada = sala.id === ativa
        const destacada = selecionada || sala.id === hover
        return (
          <g
            key={sala.id}
            onMouseEnter={() => setHover(sala.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect(sala.id)}
            role="button"
            tabIndex={0}
            aria-pressed={selecionada}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(sala.id)
              }
            }}
            className="cursor-pointer focus:outline-none"
          >
            <rect
              x={sala.rect.x}
              y={sala.rect.y}
              width={sala.rect.w}
              height={sala.rect.h}
              fill={selecionada ? 'var(--color-pine)' : destacada ? 'var(--color-panel)' : 'var(--color-paper)'}
              fillOpacity={selecionada ? 0.12 : 1}
              stroke="var(--color-ink)"
              strokeWidth={selecionada ? 2.5 : 1.5}
              className="transition-colors"
            />
            <text
              x={sala.rect.x + sala.rect.w / 2}
              y={sala.rect.y + sala.rect.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none font-display select-none"
              fontSize="18"
              fill="var(--color-ink)"
            >
              {sala.nome}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
