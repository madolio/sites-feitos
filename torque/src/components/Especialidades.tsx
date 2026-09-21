import Reveal from './Reveal'
import { especialidades } from '../data/especialidades'

export default function Especialidades() {
  return (
    <section id="servicos" className="border-b border-linha py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-oficina text-aco">o que fazemos</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Serviços</h2>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.08}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {especialidades.map((esp) => (
            <li key={esp.nome} className="rounded-md border border-linha bg-white p-5">
              <p className="font-display text-lg">{esp.nome}</p>
              <p className="mt-2 text-sm text-chumbo/70 normal-case">{esp.descricao}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
