import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { projetos, type Projeto } from '../data/projetos'
import LivePreview from './LivePreview'
import Reveal from './Reveal'

// Lista mestre-detalhe: nomes à esquerda, e à direita fica sempre a MESMA
// moldura — vazia até você passar o mouse (ou tocar, no celular) num nome, aí
// carrega a prévia de verdade daquele site. A troca de hover tem um pequeno
// atraso (não muda a cada nome que o mouse atravessa rapidamente) pra não
// disparar um iframe novo a cada passada.
const HOVER_DELAY = 150

// A lista completa é grande demais pra home — aqui mostra só um recorte
// curado (`destaque: true` em projetos.ts), do mais novo pro mais antigo; a
// lista inteira fica em /projetos, pro link "Ver todos" no fim da seção.
const destacados = projetos.filter((p) => p.destaque).reverse()

export default function Trabalhos() {
  const [active, setActive] = useState<number | null>(null)
  const hoverTimeout = useRef<number | undefined>(undefined)
  const current = active !== null ? destacados[active] : null

  useEffect(() => () => window.clearTimeout(hoverTimeout.current), [])

  const scheduleActive = (i: number) => {
    window.clearTimeout(hoverTimeout.current)
    hoverTimeout.current = window.setTimeout(() => setActive(i), HOVER_DELAY)
  }

  const clearActive = () => {
    window.clearTimeout(hoverTimeout.current)
    setActive(null)
  }

  return (
    <section id="trabalhos" className="scroll-mt-20 bg-void py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-poster text-4xl tracking-tight text-white uppercase md:text-5xl">Trabalhos</h2>
          <p className="mt-3 max-w-md text-fog">
            Um portfólio de identidades visuais — cada site pensado do zero
            pro nicho que representa, sem reaproveitar a cara de nenhum dos
            outros.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16" onMouseLeave={clearActive}>
          <Reveal
            as="ul"
            stagger={0.06}
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {destacados.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  onMouseEnter={() => scheduleActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                  className="group flex w-full flex-col gap-1 py-5 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <span className="text-xl font-semibold text-white transition-colors group-hover:text-accent-hero">
                    {p.name}
                  </span>
                  <span className="text-sm text-fog sm:shrink-0">{p.category} · portfólio</span>
                </button>

                {/* No celular (sem hover), a prévia abre embaixo do item tocado. */}
                <div className={`overflow-hidden lg:hidden ${active === i ? 'pb-6' : ''}`}>
                  {active === i && (
                    <>
                      <LivePreview projeto={p} />
                      <ProjetoInfo projeto={p} compact />
                    </>
                  )}
                </div>
              </li>
            ))}
          </Reveal>

          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <LivePreview projeto={current} />
            <ProjetoInfo projeto={current} />
          </div>
        </div>

        <Reveal className="mt-10 text-center lg:text-left">
          <Link
            to="/projetos"
            className="font-semibold text-accent-hero underline decoration-accent-hero/30 underline-offset-4 transition-colors hover:decoration-accent-hero"
          >
            Ver todos os projetos numa página só
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// Altura reservada fixa (título + até 2 linhas de descrição + link) — assim a
// coluna da direita nunca muda de altura ao trocar de projeto ou sair do
// hover.
function ProjetoInfo({ projeto, compact = false }: { projeto: Projeto | null; compact?: boolean }) {
  return (
    <div className={`${compact ? 'mt-4' : 'mt-5'} ${compact ? '' : 'lg:min-h-[8.5rem]'}`}>
      <h3 className="text-lg font-semibold text-white">{projeto?.name ?? 'Nenhum site selecionado'}</h3>
      <p className="mt-1.5 line-clamp-2 text-fog">
        {projeto?.description ?? 'Passe o mouse num nome à esquerda pra ver o site aqui.'}
      </p>
      <a
        href={projeto?.url}
        target="_blank"
        rel="noreferrer"
        className={`mt-3 inline-block font-semibold text-accent-hero underline decoration-accent-hero/30 underline-offset-4 ${
          projeto?.url ? '' : 'pointer-events-none opacity-0'
        }`}
      >
        Abrir site completo
      </a>
    </div>
  )
}
