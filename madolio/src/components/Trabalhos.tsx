import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projetos } from '../data/projetos'
import Reveal from './Reveal'
import SiteMock from './SiteMock'
import SketchToSite from './SketchToSite'

// A vitrine de trabalhos não é uma grade de cards (formato que se repete em
// praticamente toda seção "portfólio" por aí) — é uma lista mestre-detalhe,
// como o menu de um site de agência de verdade: os nomes ficam à esquerda,
// e o preview muda ao lado conforme você passa o mouse ou navega pelo
// teclado. Sem hover (celular), cada nome abre o preview embaixo dele.
export default function Trabalhos() {
  const [active, setActive] = useState<number | null>(null)
  const current = active !== null ? projetos[active] : null

  return (
    <section id="trabalhos" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">Trabalhos</h2>
          <p className="mt-3 max-w-md text-ink/65">
            A NBJ Systems é cliente real. Os outros são conceitos — cada um
            pensado do zero pro nicho que representa.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal
            as="ul"
            stagger={0.06}
            className="divide-y divide-line border-y border-line"
            onMouseLeave={() => setActive(null)}
          >
            {projetos.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                  className="group flex w-full flex-col gap-1 py-5 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <span className="text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                    {p.name}
                  </span>
                  <span className="text-sm text-ink/65 sm:shrink-0">
                    {p.category} · {p.real ? 'cliente real' : 'conceito'}
                  </span>
                </button>

                {/* No celular (sem hover), o preview abre embaixo do item tocado. */}
                <div className={`overflow-hidden lg:hidden ${active === i ? 'pb-6' : ''}`}>
                  {active === i && <ProjetoPreview projeto={p} compact />}
                </div>
              </li>
            ))}
          </Reveal>

          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            {current ? (
              <ProjetoPreview projeto={current} />
            ) : (
              <div>
                <SketchToSite />
                <p className="mt-5 text-center text-ink/60">
                  Passe o mouse num nome pra ver o site.
                </p>
              </div>
            )}
          </div>
        </div>

        <Reveal className="mt-10 text-center lg:text-left">
          <Link
            to="/projetos"
            className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Ver todos os projetos com mais detalhes
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function ProjetoPreview({ projeto, compact = false }: { projeto: (typeof projetos)[number]; compact?: boolean }) {
  return (
    <div>
      <SiteMock bg={projeto.bg} accent={projeto.accent} />
      <div className={compact ? 'mt-4' : 'mt-5'}>
        <h3 className="text-lg font-semibold text-ink">{projeto.name}</h3>
        <p className="mt-1.5 text-ink/70">{projeto.description}</p>
        {projeto.url && (
          <a
            href={projeto.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
          >
            Ver site
          </a>
        )}
      </div>
    </div>
  )
}
