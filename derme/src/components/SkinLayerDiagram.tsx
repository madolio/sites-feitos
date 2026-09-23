import type { Camada, Marco } from '../data/procedimentos'
import { FASE_COR, FASE_LABEL } from './ProcedureTimeline'

type LayerDef = {
  key: Camada
  label: string
  y: number
  height: number
  color: string
}

// Espessuras relativas aproximadas de um corte transversal de pele real:
// epiderme é a camada mais fina (~0,1mm), derme é bem mais espessa
// (~1-4mm), hipoderme (tecido subcutâneo) varia e o músculo fica abaixo
// de tudo. As proporções aqui são ilustrativas do corte, não escala real.
const LAYERS: LayerDef[] = [
  { key: 'epiderme', label: 'Epiderme', y: 0, height: 34, color: 'var(--color-epiderme)' },
  { key: 'derme-papilar', label: 'Derme papilar', y: 34, height: 40, color: 'var(--color-derme)' },
  { key: 'derme', label: 'Derme reticular', y: 74, height: 66, color: 'var(--color-derme)' },
  { key: 'musculo', label: 'Hipoderme/músculo', y: 140, height: 60, color: 'var(--color-hipoderme)' },
]

function isActive(layerKey: Camada, camada: Camada) {
  if (camada === 'derme-papilar') return layerKey === 'epiderme' || layerKey === 'derme-papilar'
  if (camada === 'derme') return layerKey === 'derme-papilar' || layerKey === 'derme'
  return layerKey === camada
}

// O que o corte mostra em cada fase do tratamento. São quatro sinais, todos
// de 0 a 1, e é a diferença entre eles ao longo do arraste que faz a pele
// "mudar" diante de quem usa o controle:
//   inflamacao: vermelhidão/edema nas camadas tratadas
//   crosta:     descamação ou crosta na superfície (só se a epiderme é tratada)
//   fibras:     colágeno novo organizado na derme
//   brilho:     epiderme renovada, mais luminosa
const ESTADO: Record<Marco['fase'], { inflamacao: number; crosta: number; fibras: number; brilho: number }> = {
  procedimento: { inflamacao: 0.7, crosta: 0, fibras: 0, brilho: 0 },
  reacao: { inflamacao: 0.5, crosta: 0.85, fibras: 0.1, brilho: 0 },
  recuperacao: { inflamacao: 0.18, crosta: 0.25, fibras: 0.55, brilho: 0.35 },
  resultado: { inflamacao: 0, crosta: 0, fibras: 1, brilho: 1 },
}

// Fibras de colágeno: traços curvos curtos espalhados pela derme.
const FIBRAS = Array.from({ length: 9 }, (_, i) => {
  const x = 132 + i * 34
  const y = 84 + (i % 3) * 20
  return `M${x} ${y} q8 -6 16 0 t16 0`
})

const TRANSICAO = { transition: 'opacity 600ms ease, fill 600ms ease' } as const

export default function SkinLayerDiagram({
  camada,
  camadaLabel,
  marco,
}: {
  camada: Camada
  camadaLabel: string
  // Sem marco o diagrama fica no estado neutro de antes (só destaca a camada).
  marco?: Marco
}) {
  const estado = marco ? ESTADO[marco.fase] : null
  const epidermeTratada = isActive('epiderme', camada)

  return (
    <figure className="rounded-xl border border-linha bg-white p-4">
      <svg viewBox="0 0 440 210" role="img" aria-labelledby="corte-titulo" className="w-full">
        <title id="corte-titulo">
          Corte transversal da pele destacando: {camadaLabel}
          {marco ? `. Estado no dia ${marco.dia}: ${FASE_LABEL[marco.fase]}` : ''}
        </title>
        {LAYERS.map((layer) => {
          const active = isActive(layer.key, camada)
          const derme = layer.key === 'derme' || layer.key === 'derme-papilar'
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
              {estado && active && (
                <>
                  {/* Vermelhidão sobre a camada tratada */}
                  <rect
                    x={110}
                    y={layer.y}
                    width={330}
                    height={layer.height}
                    fill="var(--color-alerta)"
                    opacity={estado.inflamacao * 0.7}
                    className="motion-reduce:!transition-none"
                    style={TRANSICAO}
                  />
                  {/* Brilho da camada renovada */}
                  <rect
                    x={110}
                    y={layer.y}
                    width={330}
                    height={layer.height}
                    fill="#fff"
                    opacity={estado.brilho * 0.22}
                    className="motion-reduce:!transition-none"
                    style={TRANSICAO}
                  />
                </>
              )}
              {estado && active && derme && (
                <path
                  d={FIBRAS.filter((_, i) => (layer.key === 'derme-papilar' ? i % 3 === 0 : i % 3 !== 0)).join(' ')}
                  fill="none"
                  stroke="var(--color-clinico)"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  opacity={estado.fibras}
                  className="motion-reduce:!transition-none"
                  style={TRANSICAO}
                />
              )}
              <text
                x={100}
                y={layer.y + layer.height / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className="font-dado"
                fontSize="9"
                fill="var(--color-noturno)"
                opacity={active ? 1 : 0.4}
              >
                {layer.label}
              </text>
            </g>
          )
        })}

        {/* Crosta/descamação na superfície, só quando a epiderme é tratada */}
        {estado && epidermeTratada && (
          <rect
            x={110}
            y={0}
            width={330}
            height={9}
            fill="#6f3524"
            opacity={estado.crosta * 0.75}
            className="motion-reduce:!transition-none"
            style={TRANSICAO}
          />
        )}
        {/* Linha luminosa da epiderme nova no resultado */}
        {estado && epidermeTratada && (
          <rect
            x={110}
            y={0}
            width={330}
            height={4}
            fill="var(--color-clinico)"
            opacity={estado.brilho * 0.55}
            className="motion-reduce:!transition-none"
            style={TRANSICAO}
          />
        )}

        {/* Linhas de folículo capilar, só decoração estrutural discreta */}
        <line x1={190} y1={0} x2={190} y2={140} stroke="var(--color-noturno)" strokeOpacity={0.12} strokeWidth={2} />
        <line x1={320} y1={0} x2={320} y2={140} stroke="var(--color-noturno)" strokeOpacity={0.12} strokeWidth={2} />
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 text-sm text-noturno/75">
        <span>
          <span className="dado-clinico text-derme">Camada tratada:</span> {camadaLabel}
        </span>
        {marco && (
          <span className="dado-clinico" style={{ color: FASE_COR[marco.fase] }}>
            dia {marco.dia} · {FASE_LABEL[marco.fase]}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
