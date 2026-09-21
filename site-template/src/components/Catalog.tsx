import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { catalog } from '../data/catalog'
import Reveal from './Reveal'

gsap.registerPlugin(useGSAP)

// O wildcard da página: um catálogo de fichas navegável de verdade, não
// decorativo. Cada área de atuação tem número de chamada (CDU) e estante,
// como um catálogo de biblioteca real — clicar num índice "puxa" a ficha
// correspondente pra leitura, com uma animação medida de gaveta abrindo,
// não um crossfade genérico.
export default function Catalog() {
  const [selected, setSelected] = useState(0)
  const detailRef = useRef<HTMLDivElement>(null)
  const entry = catalog[selected]

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          detailRef.current,
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' },
        )
      })
    },
    { dependencies: [selected], scope: detailRef },
  )

  return (
    <section id="acervo" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="catalog-code text-xs tracking-[0.14em] text-accent-light uppercase">
            Catálogo do acervo
          </p>
          <h2 className="mt-3 text-3xl text-paper md:text-4xl">Áreas de atuação</h2>
          <p className="mt-4 max-w-xl text-paper/70">
            Cada área é uma ficha catalográfica própria, organizada pelo
            mesmo esquema de classificação usado em bibliotecas jurídicas —
            escolha uma pra ler os detalhes.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid gap-8 md:grid-cols-[minmax(0,15rem)_1fr]">
          <nav aria-label="Índice do acervo" className="flex flex-col gap-1 md:border-r md:border-paper/15 md:pr-6">
            {catalog.map((item, i) => {
              const active = i === selected
              return (
                <button
                  key={item.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(i)}
                  className={`flex flex-col items-start gap-1 border-l-2 px-4 py-3 text-left transition-colors ${
                    active
                      ? 'border-accent bg-paper/[0.06] text-paper'
                      : 'border-transparent text-paper/60 hover:border-paper/30 hover:text-paper/85'
                  }`}
                >
                  <span className="catalog-code text-[0.6875rem] tracking-tight text-accent-light">
                    {item.callNumber}
                  </span>
                  <span className="font-heading text-base">{item.title}</span>
                </button>
              )
            })}
          </nav>

          <div ref={detailRef} className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-paper/15 pb-4">
              <h3 className="font-heading text-2xl text-paper">{entry.title}</h3>
              <span className="catalog-code text-xs text-paper/55">{entry.shelf}</span>
            </div>

            <p className="mt-4 text-paper/75">{entry.scope}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  Etapas típicas
                </p>
                <ol className="mt-3 space-y-3">
                  {entry.timeline.map((step, i) => (
                    <li key={step.step} className="flex gap-3">
                      <span className="catalog-code shrink-0 text-xs text-accent-light">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-paper">{step.step}</p>
                        <p className="text-sm text-paper/65">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  Documentos necessários
                </p>
                <ul className="mt-3 space-y-2">
                  {entry.documents.map((doc) => (
                    <li key={doc} className="flex gap-2 text-sm text-paper/75">
                      <span className="text-accent-light" aria-hidden="true">
                        —
                      </span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
