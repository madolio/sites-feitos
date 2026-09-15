import { useState } from 'react'
import { programas } from '../data'

// Marcos acumulados da barra (0, 25, 60, 85, 100) — usados tanto pra
// desenhar os segmentos quanto pra posicionar o ponto de batimento.
const marcos = [0, 25, 60, 85, 100]
const widths = marcos.slice(1).map((m, i) => `${m - marcos[i]}%`)
const colors = ['bg-lane', 'bg-track', 'bg-lane/60', 'bg-track/60']

// A barra de distância deixou de ser decoração: agora é um seletor de
// verdade — clicar num programa move um ponto que "bate" (pulse-beat, ver
// index.css) na posição correspondente, ligando a metáfora de pista à
// métrica de batimento que dá nome ao site.
export default function Programas() {
  const [ativo, setAtivo] = useState(0)
  const posicao = marcos[ativo + 1]

  return (
    <section id="programas" className="scroll-mt-16 border-t-4 border-track py-20 md:py-28 lg:pl-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl sm:text-5xl">A pista do seu treino</h2>
        <p className="mt-4 max-w-md text-lg text-track/70">
          Quatro trechos, na ordem em que o corpo evolui — não pula etapa.
          Toque em um pra ver onde ele fica na pista.
        </p>

        {/* Barra de distância com o ponto de batimento */}
        <div className="relative mt-14">
          <div className="flex h-4 overflow-hidden rounded-full border-2 border-track">
            {programas.map((p, i) => (
              <div key={p.id} className={colors[i]} style={{ width: widths[i] }} aria-hidden="true" />
            ))}
          </div>
          <span
            aria-hidden="true"
            className="pulse-beat absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-chalk bg-lane-ink shadow-[0_0_0_3px_rgba(23,22,20,0.15)] transition-[left] duration-500 ease-out"
            style={{ left: `${posicao}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs font-bold tracking-widest text-track/50">
          <span>0M</span>
          <span>100M</span>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {programas.map((p, i) => {
            const selecionado = ativo === i
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setAtivo(i)}
                aria-pressed={selecionado}
                className={`group border-t-2 pt-5 text-left transition-colors ${
                  selecionado ? 'border-lane-ink' : 'border-track hover:border-lane-ink/50'
                }`}
              >
                <p className="stopwatch text-sm text-lane-ink">{p.distance}</p>
                <h3 className="mt-1 flex items-baseline gap-2 text-2xl">
                  {p.name}
                  <span
                    className={`text-base transition-all ${
                      selecionado ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                    }`}
                  >
                    →
                  </span>
                </h3>
                <p className="mt-2 text-track/70">{p.text}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
