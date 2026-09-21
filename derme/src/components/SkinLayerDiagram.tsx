import type { Camada } from '../data/procedimentos'

type LayerDef = {
  key: Camada
  label: string
  sub: string
  y: number
  height: number
  color: string
}

// Espessuras relativas aproximadas de um corte transversal de pele real:
// epiderme é a camada mais fina (~0,1mm), derme é bem mais espessa
// (~1-4mm), hipoderme (tecido subcutâneo) varia e o músculo fica abaixo
// de tudo. As proporções aqui são ilustrativas do corte, não escala real.
const LAYERS: LayerDef[] = [
  { key: 'epiderme', label: 'Epiderme', sub: 'camada córnea e viva, ~0,1mm', y: 0, height: 34, color: 'var(--color-epiderme)' },
  { key: 'derme-papilar', label: 'Derme papilar', sub: 'colágeno e vasos superficiais', y: 34, height: 40, color: 'var(--color-derme)' },
  { key: 'derme', label: 'Derme reticular', sub: 'colágeno e elastina densos', y: 74, height: 66, color: 'var(--color-derme)' },
  { key: 'musculo', label: 'Hipoderme/músculo', sub: 'gordura subcutânea e tecido muscular', y: 140, height: 60, color: 'var(--color-hipoderme)' },
]

function isActive(layerKey: Camada, camada: Camada) {
  if (camada === 'derme-papilar') return layerKey === 'epiderme' || layerKey === 'derme-papilar'
  if (camada === 'derme') return layerKey === 'derme-papilar' || layerKey === 'derme'
  return layerKey === camada
}

export default function SkinLayerDiagram({ camada, camadaLabel }: { camada: Camada; camadaLabel: string }) {
  return (
    <figure className="rounded-xl border border-linha bg-white p-4">
      <svg viewBox="0 0 440 210" role="img" aria-labelledby="corte-titulo" className="w-full">
        <title id="corte-titulo">Corte transversal da pele destacando: {camadaLabel}</title>
        {LAYERS.map((layer) => {
          const active = isActive(layer.key, camada)
          return (
            <g key={layer.key}>
              <rect
                x={110}
                y={layer.y}
                width={330}
                height={layer.height}
                fill={layer.color}
                opacity={active ? 1 : 0.28}
                stroke="var(--color-noturno)"
                strokeOpacity={active ? 0.5 : 0.15}
              />
              <text
                x={100}
                y={layer.y + layer.height / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className="font-dado"
                fontSize="9"
                fill={active ? 'var(--color-noturno)' : 'var(--color-noturno)'}
                opacity={active ? 1 : 0.4}
              >
                {layer.label}
              </text>
            </g>
          )
        })}
        {/* Linhas de folículo capilar, só decoração estrutural discreta */}
        <line x1={190} y1={0} x2={190} y2={140} stroke="var(--color-noturno)" strokeOpacity={0.12} strokeWidth={2} />
        <line x1={320} y1={0} x2={320} y2={140} stroke="var(--color-noturno)" strokeOpacity={0.12} strokeWidth={2} />
      </svg>
      <figcaption className="mt-3 text-sm text-noturno/75">
        <span className="dado-clinico text-derme">Camada tratada:</span> {camadaLabel}
      </figcaption>
    </figure>
  )
}
