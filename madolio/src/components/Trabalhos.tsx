import { projetos } from '../data/projetos'
import ProjectsGrid from './ProjectsGrid'
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
          <ProjectsGrid projetos={projetos} />
        </div>
      </div>
    </section>
  )
}
