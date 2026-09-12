import { useState } from 'react'
import { projetos, type Projeto } from '../data/projetos'
import LivePreview from './LivePreview'
import Reveal from './Reveal'

// Lista mestre-detalhe reaproveitada na home (Trabalhos.tsx) e em /projetos —
// nomes à esquerda, prévia de verdade (LivePreview) à direita. Sem hover: só
// clique/toque troca o projeto ativo — e o primeiro da lista já vem
// selecionado, então sempre tem algo pra ver, sem precisar interagir.
export default function ProjectShowcase() {
  const [active, setActive] = useState(0)
  const current = projetos[active]

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <Reveal as="ul" stagger={0.06} className="divide-y divide-line border-y border-line">
        {projetos.map((p, i) => (
          <li key={p.name}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={active === i}
              className="group flex w-full flex-col gap-1 py-5 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span
                className={`text-xl font-semibold transition-colors ${active === i ? 'text-accent' : 'text-ink group-hover:text-accent'}`}
              >
                {p.name}
              </span>
              <span className="text-sm text-ink/65 sm:shrink-0">
                {p.category} · {p.real ? 'cliente real' : 'conceito'}
              </span>
            </button>

            {/* No celular, a prévia abre embaixo do item tocado (o primeiro já começa aberto). */}
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
  )
}

// Altura reservada fixa (título + até 2 linhas de descrição + link) — assim a
// coluna da direita não muda de altura ao trocar de projeto.
function ProjetoInfo({ projeto, compact = false }: { projeto: Projeto; compact?: boolean }) {
  return (
    <div className={`${compact ? 'mt-4' : 'mt-5'} ${compact ? '' : 'lg:min-h-[8.5rem]'}`}>
      <h3 className="text-lg font-semibold text-ink">{projeto.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-ink/70">{projeto.description}</p>
      {projeto.url && (
        <a
          href={projeto.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
        >
          Abrir site completo
        </a>
      )}
    </div>
  )
}
