import { useRef, useState } from 'react'
import { vinhos } from '../data/vinhos'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

// A roda de aromas é uma ferramenta real de sommelier, não uma metáfora
// inventada — cada fatia é uma categoria de aroma que já está escrita na
// nota de degustação de algum rótulo da casa (ver `aromas` em
// data/vinhos.ts). Clicar numa fatia filtra quais rótulos têm aquele
// aroma, no lugar de listar os quatro de uma vez.
const categorias = ['Fruta escura', 'Cítrico', 'Mineral', 'Torrado', 'Amadeirado', 'Especiado']

const RAIO = 90
const CENTRO = 100

function pontoNoCirculo(angulo: number, raio: number) {
  const rad = ((angulo - 90) * Math.PI) / 180
  return { x: CENTRO + Math.cos(rad) * raio, y: CENTRO + Math.sin(rad) * raio }
}

function fatia(inicio: number, fim: number) {
  const p1 = pontoNoCirculo(inicio, RAIO)
  const p2 = pontoNoCirculo(fim, RAIO)
  return `M${CENTRO},${CENTRO} L${p1.x},${p1.y} A${RAIO},${RAIO} 0 0 1 ${p2.x},${p2.y} Z`
}

export default function RodaAromas() {
  const [selecionada, setSelecionada] = useState<string | null>(null)
  // Rotulo em foco: acende na roda os aromas dele. Mouse: pairar. Toque: tocar
  // no rotulo alterna (nao existe hover no celular).
  const [emFoco, setEmFoco] = useState<string | null>(null)
  const ponteiro = useRef<string>('mouse')
  const passo = 360 / categorias.length

  const vinhosFiltrados = selecionada ? vinhos.filter((v) => v.aromas.includes(selecionada)) : vinhos

  return (
    <section id="prova" className="scroll-mt-0 border-b border-line bg-dusk px-6 py-16 text-parchment sm:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <span className="font-heading text-xl font-medium">Taça</span>

        <Reveal className="mt-8 max-w-xl">
          <h1 className="font-heading text-4xl leading-[1.08] font-medium sm:text-5xl">
            Vinícola de altitude na Serra Catarinense.
          </h1>
          <p className="mt-4 text-parchment/80">
            Toque numa fatia da roda de aromas pra ver qual rótulo da casa
            entrega aquele gosto — é a mesma roda que a gente usa na
            degustação, não uma ilustração decorativa.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-[auto_1fr] md:items-start">
          <div className="mx-auto w-full max-w-[19rem]">
            <svg viewBox="0 0 200 200" className="h-auto w-full">
              {categorias.map((cat, i) => {
                const inicio = i * passo
                const fim = inicio + passo
                const meio = pontoNoCirculo(inicio + passo / 2, RAIO * 0.62)
                const ativa = selecionada === cat
                const destacada = !!emFoco && (vinhos.find((v) => v.nome === emFoco)?.aromas.includes(cat) ?? false)
                const alvo = pontoNoCirculo(inicio + passo / 2, 3.2)
                return (
                  <g
                    key={cat}
                    className="fatia-aroma"
                    data-destacada={destacada || undefined}
                    style={{ '--dx': `${alvo.x - CENTRO}px`, '--dy': `${alvo.y - CENTRO}px` } as React.CSSProperties}
                    role="button"
                    tabIndex={0}
                    aria-pressed={ativa}
                    aria-label={`Filtrar rotulos por aroma: ${cat}`}
                    onClick={() => setSelecionada(ativa ? null : cat)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelecionada(ativa ? null : cat)
                      }
                    }}
                  >
                    <path
                      d={fatia(inicio, fim)}
                      fill={ativa ? 'var(--color-garnet)' : 'var(--color-sage)'}
                      fillOpacity={ativa ? 1 : destacada ? 0.95 : selecionada ? 0.18 : 0.55}
                      stroke="var(--color-dusk)"
                      strokeWidth={1.5}
                      className="cursor-pointer transition-[fill-opacity] duration-200"
                    />
                    <text
                      x={meio.x}
                      y={meio.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={9}
                      fontFamily="var(--font-ui)"
                      fontWeight={ativa ? 700 : 500}
                      fill={ativa ? 'var(--color-parchment)' : 'var(--color-dusk)'}
                      className="pointer-events-none select-none"
                    >
                      {cat}
                    </text>
                  </g>
                )
              })}
              <circle cx={CENTRO} cy={CENTRO} r={RAIO * 0.2} fill="var(--color-dusk)" />
            </svg>
            {selecionada && (
              <button
                type="button"
                onClick={() => setSelecionada(null)}
                className="mx-auto mt-4 block text-sm text-parchment/60 underline underline-offset-4 hover:text-parchment"
              >
                Ver todos os rótulos
              </button>
            )}
          </div>

          <Reveal
            as="ul"
            stagger={0.08}
            className="divide-y divide-parchment/10 border-y border-parchment/10"
          >
            {vinhosFiltrados.map((v) => (
              <li
                key={v.nome}
                className="rotulo group relative flex cursor-default flex-wrap items-start justify-between gap-4 py-5"
                data-em-foco={emFoco === v.nome || undefined}
                onPointerDown={(e) => {
                  ponteiro.current = e.pointerType
                }}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setEmFoco(v.nome)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setEmFoco(null)}
                onClick={() => {
                  if (ponteiro.current !== 'mouse') setEmFoco((atual) => (atual === v.nome ? null : v.nome))
                }}
              >
                <span aria-hidden="true" className="rotulo-linha" />
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="h-3 w-3 shrink-0 rounded-full border border-parchment/30" style={{ backgroundColor: v.cor }} />
                    <span className="font-heading text-2xl font-medium italic">{v.nome}</span>
                  </div>
                  <p className="mt-1 text-sm text-parchment/55">
                    {v.uva}, {v.safra} · {v.altitude} m de altitude
                  </p>
                  <p className="mt-2 max-w-md text-parchment/75">{v.notas}</p>
                  <div className="mt-2 flex gap-2">
                    {v.aromas.map((a) => (
                      <span key={a} className="rounded-full border border-parchment/20 px-2.5 py-0.5 text-xs text-parchment/70">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="shrink-0 text-sm font-semibold text-garnet-light">{v.aPartirDe}</span>
              </li>
            ))}
          </Reveal>
        </div>

        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero agendar uma degustação na Taça.')}
          className="btn-primary mt-10"
        >
          Agendar uma degustação
        </button>
      </div>
    </section>
  )
}
