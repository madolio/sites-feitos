import Sticker from './Sticker'

// O bolo cresce com o pacote — não é decoração solta, é a mesma lógica de
// "quanto maior a festa, maior o bolo" que qualquer buffet infantil de
// verdade segue. Mini = 1 camada e 1 vela. Completa = 2 camadas, 2 velas.
// Show = 3 camadas, 3 velas e confete estourando ao redor (usa o mesmo
// vocabulário de forma do Sticker — nunca um objeto novo, sem contorno).
const CORES: Record<string, string> = {
  sky: 'var(--color-sky)',
  ember: 'var(--color-ember)',
  mint: 'var(--color-mint)',
}

export default function Bolo({ camadas, color }: { camadas: 1 | 2 | 3; color: 'sky' | 'ember' | 'mint' }) {
  const corPreenchimento = CORES[color]
  const larguraBase = 34
  const alturaCamada = 12
  const y0 = 62

  return (
    <div className="relative h-20 w-20 shrink-0">
      {camadas === 3 && (
        <>
          <Sticker shape="star" color="sun" rotate={-12} className="absolute -top-1 -left-2 h-4 w-4" />
          <Sticker shape="star" color="lavender" rotate={18} className="absolute -top-2 right-0 h-3 w-3" />
        </>
      )}

      <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
        <ellipse cx="40" cy="70" rx="26" ry="4" fill="var(--color-carbon)" opacity="0.12" />

        {Array.from({ length: camadas }).map((_, i) => {
          const largura = larguraBase - i * 7
          const x = 40 - largura / 2
          const y = y0 - (i + 1) * alturaCamada
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={largura}
              height={alturaCamada}
              rx="3"
              fill={corPreenchimento}
              stroke="var(--color-carbon)"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          )
        })}

        {Array.from({ length: camadas }).map((_, i) => {
          const topoY = y0 - camadas * alturaCamada
          const x = 40 - 10 + i * 10
          return (
            <g key={`vela-${i}`}>
              <line x1={x} y1={topoY} x2={x} y2={topoY - 10} stroke="var(--color-carbon)" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d={`M${x} ${topoY - 10} q-3 -4 0 -7 q3 3 0 7`}
                fill="var(--color-ember)"
                stroke="var(--color-carbon)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
