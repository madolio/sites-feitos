import Reveal from './Reveal'
import SiteMock from './SiteMock'
import type { Projeto } from '../data/projetos'

// Grade de prévias reaproveitada na home (Trabalhos.tsx) e em /projetos —
// mesma apresentação nos dois lugares, por pedido do usuário. O Reveal fica
// aqui dentro (não no componente pai) pra que o stagger anime cada card, não
// o grid inteiro de uma vez.
export default function ProjectsGrid({ projetos }: { projetos: Projeto[] }) {
  return (
    <Reveal stagger={0.1} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {projetos.map((project) => {
        const Wrapper = project.url ? 'a' : 'div'
        return (
          <Wrapper
            key={project.name}
            {...(project.url ? { href: project.url, target: '_blank', rel: 'noreferrer' } : {})}
            className="block"
          >
            <SiteMock bg={project.bg} accent={project.accent} />
            <div className="mt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
                <span className="text-sm text-ink/65">
                  {project.category} · {project.real ? 'cliente real' : 'conceito'}
                </span>
              </div>
              <p className="mt-2 text-ink/65">{project.description}</p>
              {project.url && (
                <span className="mt-3 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4">
                  Ver site
                </span>
              )}
            </div>
          </Wrapper>
        )
      })}
    </Reveal>
  )
}
