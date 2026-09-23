import { useState } from 'react'
import type { Marco } from '../data/procedimentos'

export const FASE_COR: Record<Marco['fase'], string> = {
  procedimento: 'var(--color-derme)',
  reacao: 'var(--color-alerta)',
  recuperacao: '#9a8f78',
  resultado: 'var(--color-clinico)',
}

export const FASE_LABEL: Record<Marco['fase'], string> = {
  procedimento: 'Procedimento',
  reacao: 'Reação esperada',
  recuperacao: 'Recuperação',
  resultado: 'Resultado',
}

export default function ProcedureTimeline({
  marcos,
  compact = false,
  titleAs = 'h4',
  index: indexControlado,
  onIndexChange,
}: {
  marcos: Marco[]
  compact?: boolean
  titleAs?: 'h2' | 'h3' | 'h4'
  // Com index/onIndexChange vindos do pai, o controle de dias e o diagrama da
  // pele andam juntos. Sem eles, o componente continua funcionando sozinho.
  index?: number
  onIndexChange?: (i: number) => void
}) {
  const [indexInterno, setIndexInterno] = useState(0)
  const index = indexControlado ?? indexInterno
  const setIndex = onIndexChange ?? setIndexInterno
  const atual = marcos[index]
  const max = marcos.length - 1
  const Titulo = titleAs

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="dado-clinico" style={{ color: FASE_COR[atual.fase] }}>
          {FASE_LABEL[atual.fase]}
        </p>
        <p className="dado-clinico text-noturno/60">
          Dia {atual.dia === 0 ? '0 (procedimento)' : atual.dia}
        </p>
      </div>

      <Titulo className={compact ? 'mt-1 text-lg' : 'mt-1 text-xl'}>{atual.titulo}</Titulo>
      <p className={compact ? 'mt-1 text-sm text-noturno/75' : 'mt-2 text-noturno/75'}>{atual.descricao}</p>

      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        aria-label="Arraste para ver o dia da recuperação"
        className="mt-4 w-full accent-clinico"
        style={{ accentColor: 'var(--color-clinico)' }}
      />

      <div className="mt-2 flex flex-wrap gap-2">
        {marcos.map((m, i) => (
          <button
            key={m.dia}
            type="button"
            onClick={() => setIndex(i)}
            className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
            style={{
              borderColor: i === index ? FASE_COR[m.fase] : 'var(--color-linha)',
              color: i === index ? FASE_COR[m.fase] : 'var(--color-noturno)',
              backgroundColor: i === index ? 'color-mix(in srgb, ' + FASE_COR[m.fase] + ' 12%, transparent)' : 'transparent',
            }}
          >
            dia {m.dia}
          </button>
        ))}
      </div>
    </div>
  )
}
