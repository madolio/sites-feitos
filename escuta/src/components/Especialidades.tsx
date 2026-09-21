import Reveal from './Reveal'
import { especialidades } from '../data/especialidades'

export default function Especialidades() {
  return (
    <section id="especialidades" className="border-b border-linha bg-papel-forte/60">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-quieto">o que trazem as pessoas que chegam aqui</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Questões concretas, não "bem-estar" genérico</h2>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2">
          {especialidades.map((esp) => (
            <div key={esp.nome} className="rounded-xl border border-linha bg-papel p-6">
              <h3 className="text-xl">{esp.nome}</h3>
              <p className="mt-2 text-sm text-tinta/75">{esp.descricao}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
