import { Link } from 'react-router-dom'
import ProjectShowcase from './ProjectShowcase'
import Reveal from './Reveal'

export default function Trabalhos() {
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

        <div className="mt-12">
          <ProjectShowcase />
        </div>

        <Reveal className="mt-10 text-center lg:text-left">
          <Link
            to="/projetos"
            className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Ver todos os projetos numa página só
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
