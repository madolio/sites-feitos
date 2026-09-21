import { useMemo, useRef, useState } from 'react'
import { DENTES_SUPERIORES, DENTES_INFERIORES, INFO_POR_TIPO, type Dente } from '../data/dentes'
import { calcularArco, type PosicaoDente } from '../data/arco'
import Reveal from './Reveal'

function Fileira({
  posicoes,
  selecionado,
  onSelecionar,
  refsMapa,
}: {
  posicoes: PosicaoDente[]
  selecionado: string | null
  onSelecionar: (fdi: string) => void
  refsMapa: React.MutableRefObject<Record<string, HTMLButtonElement | null>>
}) {
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const proximo = e.key === 'ArrowLeft' ? i - 1 : i + 1
    const alvo = posicoes[proximo]
    if (alvo) refsMapa.current[alvo.dente.fdi]?.focus()
  }

  return (
    <>
      {posicoes.map((p, i) => {
        const ativo = selecionado === p.dente.fdi
        return (
          <button
            key={p.dente.fdi}
            ref={(el) => {
              refsMapa.current[p.dente.fdi] = el
            }}
            type="button"
            aria-pressed={ativo}
            aria-label={`${p.dente.nome}, dente ${p.dente.fdi}, arco ${p.dente.arco === 'superior' ? 'superior' : 'inferior'}`}
            onClick={() => onSelecionar(p.dente.fdi)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`group absolute flex items-center justify-center rounded-[40%] border-2 text-[0.6rem] font-mono transition-colors ${
              ativo
                ? 'z-10 border-esmalte bg-esmalte text-papel'
                : 'border-contorno/60 bg-papel text-tinta/70 hover:border-esmalte hover:text-esmalte'
            }`}
            style={{
              left: `${p.xPct}%`,
              top: `${p.yPct}%`,
              width: `${p.largura}px`,
              height: `${p.altura}px`,
              transform: `translate(-50%, -50%) rotate(${p.anguloDeg}deg)`,
            }}
          >
            <span style={{ transform: `rotate(${-p.anguloDeg}deg)` }}>{p.dente.fdi}</span>
          </button>
        )
      })}
    </>
  )
}

export default function ArcadaMapa() {
  const [selecionado, setSelecionado] = useState<string | null>('11')
  const refsMapa = useRef<Record<string, HTMLButtonElement | null>>({})

  const posSuperior = useMemo(() => calcularArco(DENTES_SUPERIORES, 'superior'), [])
  const posInferior = useMemo(() => calcularArco(DENTES_INFERIORES, 'inferior'), [])

  const dente: Dente | null = useMemo(() => {
    const todos = [...DENTES_SUPERIORES, ...DENTES_INFERIORES]
    return todos.find((d) => d.fdi === selecionado) ?? null
  }, [selecionado])

  const info = dente ? INFO_POR_TIPO[dente.tipo] : null

  return (
    <section id="arcada" className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <Reveal>
        <p className="rotulo-mono">O mapa da arcada</p>
        <h2 className="mt-2 text-4xl sm:text-5xl">Clique num dente. Veja o que fazemos nele.</h2>
        <p className="mt-4 max-w-2xl text-lg text-tinta/75">
          32 dentes, notação FDI (o padrão internacional de numeração odontológica).
          Cada um tem uma função anatômica diferente — e por isso, um conjunto diferente
          de procedimentos que fazem sentido nele. Navegue pelo teclado com Tab e as setas,
          ou clique direto no mapa.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
        <div className="flex flex-col justify-center">
          <div className="relative mx-auto aspect-[800/380] w-full max-w-3xl rounded-3xl border border-linha bg-white/50 p-2">
            <svg
              viewBox="0 0 800 380"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M 40 150 Q 400 40 760 150"
                fill="none"
                stroke="var(--color-contorno)"
                strokeWidth="1"
                strokeDasharray="2 6"
                opacity="0.5"
              />
              <path
                d="M 40 230 Q 400 340 760 230"
                fill="none"
                stroke="var(--color-contorno)"
                strokeWidth="1"
                strokeDasharray="2 6"
                opacity="0.5"
              />
              <line
                x1="400"
                y1="30"
                x2="400"
                y2="350"
                stroke="var(--color-contorno)"
                strokeWidth="1"
                strokeDasharray="1 5"
                opacity="0.35"
              />
            </svg>
            <Fileira
              posicoes={posSuperior}
              selecionado={selecionado}
              onSelecionar={setSelecionado}
              refsMapa={refsMapa}
            />
            <Fileira
              posicoes={posInferior}
              selecionado={selecionado}
              onSelecionar={setSelecionado}
              refsMapa={refsMapa}
            />
            <span className="rotulo-mono absolute left-3 top-3">arco superior</span>
            <span className="rotulo-mono absolute bottom-3 left-3">arco inferior</span>
          </div>
        </div>

        <div
          key={selecionado ?? 'vazio'}
          aria-live="polite"
          className="rounded-2xl border border-linha bg-white/60 p-6"
        >
          {dente && info ? (
            <>
              <p className="valor-mono text-sm">
                dente {dente.fdi} · {dente.arco === 'superior' ? 'superior' : 'inferior'}
              </p>
              <h3 className="mt-1 text-3xl">{dente.nome}</h3>
              <p className="mt-1 text-sm text-tinta/60">{info.titulo}</p>
              <p className="mt-4 text-tinta/80">{info.funcao}</p>

              <h4 className="mt-6 font-mono text-xs tracking-wide text-contorno uppercase">
                Procedimentos associados
              </h4>
              <ul className="mt-3 space-y-4">
                {info.procedimentos.map((proc) => (
                  <li key={proc.nome} className="border-l-2 border-esmalte/50 pl-4">
                    <p className="font-semibold">{proc.nome}</p>
                    <p className="mt-1 text-sm text-tinta/75">{proc.descricao}</p>
                    <p className="valor-mono mt-1 text-xs">{proc.duracao}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-tinta/60">Selecione um dente no mapa pra ver os detalhes.</p>
          )}
        </div>
      </Reveal>
    </section>
  )
}
