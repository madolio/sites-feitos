import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroPreview from '../components/HeroPreview'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { projetos } from '../data/projetos'

// Com a lista passando de duas dezenas de projetos, uma grade sem filtro
// virou rolagem longa demais pra achar um nicho específico — a busca
// filtra ao vivo por nome ou categoria (client-side, a lista é pequena,
// não precisa de nada além de um .includes()).
export default function Projetos() {
  const [busca, setBusca] = useState('')

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return projetos
    return projetos.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(termo))
  }, [busca])

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

        {filtrados.length === 0 ? (
          <p className="mt-14 text-ink/60">Nenhum projeto encontrado pra "{busca}".</p>
        ) : (
          <Reveal stagger={0.1} className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((project) => (
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
        )}
      </div>
    </section>
  )
}
