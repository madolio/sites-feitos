import Reveal from './Reveal'
import { especialidades } from '../data/especialidades'

export default function Especialidades() {
  return (
    <section id="especialidades" className="relative overflow-hidden border-b border-linha bg-papel-forte/60">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full text-quieto/10"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 40 H1000" />
          <path d="M0 130 H1000" />
          <path d="M0 220 H1000" />
          <path d="M0 310 H1000" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-quieto">o que trazem as pessoas que chegam aqui</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Questões concretas, não "bem-estar" genérico</h2>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-10 divide-y divide-linha border-y border-linha">
          {especialidades.map((esp, i) => (
            <div
              key={esp.nome}
              className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="dado-ficha shrink-0 text-quieto sm:w-14">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="border-l-2 border-transparent pl-5 transition-colors duration-300 group-hover:border-acolhe sm:pl-6">
                <h3 className="text-xl">{esp.nome}</h3>
                <p className="mt-2 max-w-2xl text-sm text-tinta/75">{esp.descricao}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
