import { projetos } from '../data'
import ProjetoPlan from './ProjetoPlan'
import Reveal from './Reveal'

export default function Projetos() {
  return (
    <section id="projetos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal as="h2" className="text-4xl md:text-5xl">Projetos</Reveal>

        <Reveal stagger={0.08} className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p, i) => (
            <article key={p.id}>
              <ProjetoPlan index={i} className="h-auto w-full" />
              <div className="dim-line mt-5">
                <span>{p.area} m²</span>
              </div>
              <h3 className="mt-3 text-2xl">{p.nome}</h3>
              <p className="mt-1 text-ink/75">
                {p.tipo} · {p.local} · {p.ano}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
