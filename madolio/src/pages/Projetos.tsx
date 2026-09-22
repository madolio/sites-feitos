import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroPreview from '../components/HeroPreview'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { projetos, type Projeto, type Tag } from '../data/projetos'
import { buscarProjetos } from '../lib/busca'

// Com a lista passando de três dezenas de projetos, busca por texto sozinha
// não bastava pra navegar — o filtro por tag agrupa os nichos (cada
// `category` é um texto livre e específico demais pra virar filtro direto).
// Busca e tag combinam com AND.
const tags = Array.from(new Set(projetos.map((p) => p.tag))).sort((a, b) => a.localeCompare(b, 'pt-BR'))

export default function Projetos() {
  const [busca, setBusca] = useState('')
  const [tagAtiva, setTagAtiva] = useState<Tag | null>(null)

  const porRelevancia = useMemo(() => buscarProjetos(busca, projetos), [busca])

  const filtrados = useMemo(() => {
    const comFiltroDeTag = porRelevancia.filter((p) => !tagAtiva || p.tag === tagAtiva)
    // Sem busca nem filtro de tag, o visitante está só explorando — aí os
    // nichos com maior potencial comercial (`destaque: true`, decisão
    // interna de priorização) puxam a listagem pra frente, mas sem nenhuma
    // divisão ou rótulo visível: pro visitante é uma coleção única de
    // portfólio. Assim que ele pesquisa ou filtra por tag, a ordem passa a
    // ser só por relevância da busca.
    if (busca.trim() || tagAtiva) return comFiltroDeTag
    return [...comFiltroDeTag].sort((a, b) => Number(!!b.destaque) - Number(!!a.destaque))
  }, [porRelevancia, tagAtiva, busca])

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Projetos — Portfólio de sites de nicho | Madolio"
        description="Veja o portfólio da Madolio: sites para tratamento de água, confeitaria, pilates, hamburgueria, advocacia, SaaS, arquitetura e consultoria financeira — exemplos do que posso criar pro seu negócio."
        path="/projetos"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Link to="/" className="text-sm font-semibold text-ink/60 transition-colors hover:text-ink">
          ← madolio
        </Link>

        <Reveal className="mt-6">
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-ink md:text-5xl">
            O que eu posso criar pro seu negócio
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            Um portfólio de identidades visuais — cada um pensado do zero pro
            negócio que representa, sem reaproveitar a cara de nenhum dos
            outros.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex items-center justify-between gap-4">
          <label className="relative flex-1 sm:max-w-sm">
            <span className="sr-only">Buscar projeto por nome ou nicho</span>
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou nicho..."
              className="w-full rounded-full border-2 border-ink/15 bg-white px-5 py-2.5 text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none"
            />
          </label>
          <span className="shrink-0 text-sm text-ink/55">
            {filtrados.length} {filtrados.length === 1 ? 'projeto' : 'projetos'}
          </span>
        </Reveal>

        <Reveal className="mt-4 flex flex-wrap gap-2" aria-label="Filtrar por tipo de negócio">
          <button
            type="button"
            onClick={() => setTagAtiva(null)}
            aria-pressed={tagAtiva === null}
            className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors ${
              tagAtiva === null ? 'border-accent bg-accent text-white' : 'border-ink/15 text-ink/70 hover:border-ink/30'
            }`}
          >
            Todos
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTagAtiva((atual) => (atual === tag ? null : tag))}
              aria-pressed={tagAtiva === tag}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors ${
                tagAtiva === tag ? 'border-accent bg-accent text-white' : 'border-ink/15 text-ink/70 hover:border-ink/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </Reveal>

        {filtrados.length === 0 ? (
          <p className="mt-14 text-ink/60">
            {busca.trim() ? <>Nenhum projeto encontrado pra "{busca}".</> : 'Nenhum projeto encontrado com esse filtro.'}
          </p>
        ) : (
          <GradeProjetos projetos={filtrados} className="mt-10" />
        )}
      </div>
    </section>
  )
}

function GradeProjetos({ projetos, className = '' }: { projetos: Projeto[]; className?: string }) {
  return (
    <Reveal stagger={0.1} className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {projetos.map((project) => (
        <div key={project.name}>
          <a href={project.url} target="_blank" rel="noreferrer" className="block">
            <HeroPreview projeto={project} />
          </a>
          <div className="mt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
              <span className="text-sm text-ink/65">{project.category} · portfólio</span>
            </div>
            <p className="mt-2 text-ink/65">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4"
              >
                Ver site
              </a>
              {project.estudoDeCaso && (
                <Link
                  to={project.estudoDeCaso}
                  className="inline-block font-semibold text-ink/60 underline decoration-ink/25 underline-offset-4 hover:text-ink"
                >
                  Ver making of
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </Reveal>
  )
}
