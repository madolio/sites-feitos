import { useRef, useState } from 'react'
import { vinhos } from '../data/vinhos'
import { sendToWhatsApp } from '../demo'
import { servir, taca } from '../estado'
import Vitrine from '../cena/Vitrine'

// O hero e o catálogo são a mesma seção: escolher um rótulo na lista não
// leva pra outro lugar da página, serve o vinho na MESMA taça 3D — a cena
// drena e enche de novo com a cor e a medida daquele rótulo (ver
// cena/Vitrine.tsx). Arrastar a taça pra girar continua funcionando o tempo
// todo, inclusive enquanto ela está sendo servida.
export default function Prova() {
  const [ativo, setAtivo] = useState(0)
  const vinhoAtivo = vinhos[ativo]

  const escolher = (i: number) => {
    setAtivo(i)
    servir(i, vinhos[i].cor, vinhos[i].nivel)
  }

  const ultimoX = useRef<number | null>(null)
  const ultimoT = useRef(0)

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    taca.arrastando = true
    ultimoX.current = e.clientX
    ultimoT.current = performance.now()
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!taca.arrastando || ultimoX.current === null) return
    const agora = performance.now()
    const dt = Math.max(0.001, (agora - ultimoT.current) / 1000)
    const dx = e.clientX - ultimoX.current
    const dAngulo = dx * 0.012
    taca.angulo += dAngulo
    taca.velocidade = dAngulo / dt
    ultimoX.current = e.clientX
    ultimoT.current = agora
  }

  const onUp = () => {
    taca.arrastando = false
    ultimoX.current = null
  }

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

      <div className="grid gap-10 px-6 pb-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-6 lg:pb-24">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div
            className="relative h-[62vh] min-h-[24rem] cursor-grab touch-none overflow-hidden rounded-2xl active:cursor-grabbing lg:h-[60vh]"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <Vitrine />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-dusk via-dusk/10 to-transparent pb-6 pt-16">
              <p className="px-1 text-center text-xs text-parchment/60">Arraste a taça pros lados pra girar</p>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-heading text-4xl leading-[1.05] font-medium text-parchment sm:text-[2.75rem]">
              Escolha o rótulo. A taça serve de verdade.
            </h1>
            <p className="mt-4 max-w-md text-parchment/80">
              Vinícola de altitude na Serra Catarinense. Cada nome na lista serve
              um vinho diferente na mesma taça, ao vivo — cor, medida e tudo —
              antes mesmo de você marcar a visita.
            </p>
            <button
              type="button"
              onClick={() => sendToWhatsApp(`Olá! Quero agendar uma degustação e experimentar o ${vinhoAtivo.nome}.`)}
              className="btn-primary mt-6"
            >
              Agendar uma degustação
            </button>
          </div>
        </div>

        <div className="lg:pt-2">
          <p className="text-sm font-semibold tracking-wide text-parchment/55">
            {vinhos.length} rótulos da casa — toque num nome pra servir
          </p>
          <ul className="mt-4 divide-y divide-parchment/10 border-y border-parchment/10">
            {vinhos.map((v, i) => {
              const selecionado = i === ativo
              return (
                <li key={v.nome}>
                  <button
                    type="button"
                    onClick={() => escolher(i)}
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
                        {v.uva}, {v.safra}
                      </span>
                      {selecionado && <span className="mt-2 block max-w-md text-parchment/75">{v.notas}</span>}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
