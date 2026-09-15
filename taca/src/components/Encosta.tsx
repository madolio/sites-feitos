import { useState } from 'react'
import { vinhos } from '../data/vinhos'
import { sendToWhatsApp } from '../demo'

// A crista do morro é um único traçado, reaproveitado com um deslocamento em
// Y pra desenhar as curvas de nível abaixo dela (as "carreiras" plantadas
// acompanhando a encosta — técnica real de vinhedo de altitude, não só
// enfeite). Os quatro rótulos ficam ancorados nos MESMOS pontos que formam
// a curva, então o marcador de cada um já nasce em cima da crista, na
// altitude certa.
const crista = [
  { x: -20, y: 410 },
  { x: 110, y: 390, cx1: 40, cy1: 405, cx2: 80, cy2: 398 },
  { x: 430, y: 300, cx1: 220, cy1: 368, cx2: 330, cy2: 330 },
  { x: 760, y: 210, cx1: 540, cy1: 268, cx2: 650, cy2: 240 },
  { x: 1060, y: 140, cx1: 860, cy1: 185, cx2: 960, cy2: 160 },
  { x: 1220, y: 108, cx1: 1110, cy1: 130, cx2: 1160, cy2: 118 },
]

function caminhoCrista(deslocY = 0) {
  let d = `M${crista[0].x},${crista[0].y + deslocY}`
  for (let i = 1; i < crista.length; i++) {
    const s = crista[i]
    d += ` C${s.cx1},${(s.cy1 ?? 0) + deslocY} ${s.cx2},${(s.cy2 ?? 0) + deslocY} ${s.x},${s.y + deslocY}`
  }
  return d
}

const caminhoTerreno = `${caminhoCrista(0)} L1220,480 L-20,480 Z`
const carreiras = [34, 70, 110, 155, 205]

// Pontos onde cada rótulo fica ancorado na crista — na mesma ordem de
// `vinhos`, do talhão mais baixo pro mais alto.
const pontos = [
  { x: 110, y: 390 },
  { x: 430, y: 300 },
  { x: 760, y: 210 },
  { x: 1060, y: 140 },
]

const grade = [
  { metros: 1000, y: 371 },
  { metros: 1100, y: 275 },
  { metros: 1200, y: 179 },
]

export default function Encosta() {
  const [ativo, setAtivo] = useState(0)
  const vinhoAtivo = vinhos[ativo]

  return (
    <section id="prova" className="scroll-mt-0 bg-dusk">
      <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-heading text-xl font-medium text-parchment">Taça</span>
        <nav className="flex gap-6 text-sm text-parchment/80">
          <a href="#prova" className="transition-colors hover:text-parchment">
            Prova
          </a>
          <a href="#processo" className="hidden transition-colors hover:text-parchment sm:inline">
            Como nasce
          </a>
          <a href="#contato" className="transition-colors hover:text-parchment">
            Visitar
          </a>
        </nav>
      </header>

      <div className="px-6 pb-16 sm:px-10 lg:pb-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl leading-[1.08] font-medium text-parchment sm:text-5xl">
            Vinícola de altitude na Serra Catarinense.
          </h1>
          <p className="mt-4 max-w-lg text-parchment/80">
            Cada talhão fica numa cota diferente da encosta — e isso muda o vinho que sai dele. Toque num marcador
            pra ver qual rótulo vem de qual altitude.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-parchment/10 bg-black/15 p-3 sm:p-5">
          <div className="relative w-full" style={{ aspectRatio: '1200 / 480' }}>
            <svg viewBox="0 0 1200 480" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="neblina" cx="0.7" cy="0.28" r="0.55">
                  <stop offset="0%" stopColor="var(--color-mist)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--color-mist)" stopOpacity="0" />
                </radialGradient>
                <clipPath id="recorteTerreno">
                  <path d={caminhoTerreno} />
                </clipPath>
              </defs>

              {grade.map((g) => (
                <g key={g.metros}>
                  <line x1="0" y1={g.y} x2="1200" y2={g.y} stroke="var(--color-parchment)" strokeOpacity="0.12" strokeDasharray="2 8" />
                  <text x="14" y={g.y - 8} fontSize="20" fill="var(--color-parchment)" fillOpacity="0.4" fontFamily="var(--font-ui)">
                    {g.metros} m
                  </text>
                </g>
              ))}

              <path d={caminhoTerreno} fill="var(--color-soil)" />

              <g clipPath="url(#recorteTerreno)">
                {carreiras.map((d) => (
                  <path key={d} d={caminhoCrista(d)} fill="none" stroke="var(--color-soil-light)" strokeWidth="2" strokeOpacity="0.6" />
                ))}
              </g>

              <ellipse cx="850" cy="140" rx="430" ry="190" fill="url(#neblina)" className="neblina-deriva" />

              <path d={caminhoCrista(0)} fill="none" stroke="var(--color-parchment)" strokeOpacity="0.5" strokeWidth="2" />
            </svg>

            {vinhos.map((v, i) => {
              const p = pontos[i]
              const selecionado = i === ativo
              return (
                <button
                  key={v.nome}
                  type="button"
                  aria-pressed={selecionado}
                  onClick={() => setAtivo(i)}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                  style={{ left: `${(p.x / 1200) * 100}%`, top: `${(p.y / 480) * 100}%` }}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full border-2 transition-transform group-hover:scale-110 ${selecionado ? 'scale-125 border-parchment' : 'border-parchment/50'}`}
                    style={{ backgroundColor: v.cor }}
                  />
                  <span
                    className={`hidden rounded-full px-2 py-0.5 font-ui text-xs whitespace-nowrap transition-colors sm:block ${selecionado ? 'bg-parchment text-dusk' : 'bg-dusk/70 text-parchment/70 group-hover:text-parchment'}`}
                  >
                    {v.altitude} m
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-parchment/55">
            {vinhos.length} rótulos da casa — um por talhão
          </p>
          <ul className="mt-4 divide-y divide-parchment/10 border-y border-parchment/10">
            {vinhos.map((v, i) => {
              const selecionado = i === ativo
              return (
                <li key={v.nome}>
                  <button
                    type="button"
                    onClick={() => setAtivo(i)}
                    aria-pressed={selecionado}
                    className={`group flex w-full items-start gap-4 py-5 text-left transition-colors ${selecionado ? 'text-parchment' : 'text-parchment/60 hover:text-parchment/90'}`}
                  >
                    <span
                      className="mt-2 h-3 w-3 shrink-0 rounded-full border border-parchment/30 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: selecionado ? v.cor : 'transparent' }}
                    />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className="font-heading text-2xl font-medium italic">{v.nome}</span>
                        <span className="text-sm font-semibold text-garnet-light">{v.aPartirDe}</span>
                      </span>
                      <span className="mt-0.5 block text-sm text-parchment/55">
                        {v.uva}, {v.safra} — {v.altitude} m de altitude
                      </span>
                      {selecionado && (
                        <span key={v.nome} className="notas-entrar mt-2 block max-w-md text-parchment/75">
                          {v.notas}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={() => sendToWhatsApp(`Olá! Quero agendar uma degustação e experimentar o ${vinhoAtivo.nome}.`)}
            className="btn-primary mt-8"
          >
            Agendar uma degustação
          </button>
        </div>
      </div>
    </section>
  )
}
