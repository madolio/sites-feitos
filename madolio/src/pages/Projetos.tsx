import { Link } from 'react-router-dom'
import HeroPreview from '../components/HeroPreview'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { projetos } from '../data/projetos'

export default function Projetos() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Projetos — Sites e mockups de nicho | Madolio"
        description="Veja o redesign do site institucional da NBJ Systems e mockups de sites para confeitaria, pilates, hamburgueria, advocacia, SaaS, arquitetura e consultoria financeira — exemplos do que a Madolio pode criar pro seu negócio."
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
            Da NBJ Systems a mockups de nicho — cada um pensado do zero pro
            negócio que representa, sem reaproveitar a cara de nenhum dos
            outros.
          </p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <HeroPreview projeto={project} />
              <div className="mt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
                  <span className="text-sm text-ink/65">
                    {project.category} · {project.real ? 'cliente' : 'mockup'}
                  </span>
                </div>
                <p className="mt-2 text-ink/65">{project.description}</p>
                <span className="mt-3 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4">
                  Ver site
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
