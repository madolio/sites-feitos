import Reveal from './Reveal'
import { rotina } from '../data/rotina'

export default function RotinaDoDia() {
  return (
    <section id="rotina" className="border-b border-linha bg-papel-forte py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-ninho">a rotina, hora a hora</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">O dia do Ninho, do início ao fim</h2>
          <p className="mt-4 text-tinta/75">
            Rotina previsível é uma das ferramentas mais úteis da Educação Infantil: a criança
            sabe o que vem a seguir, e isso reduz ansiedade. Este é o roteiro real das nossas
            turmas.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 divide-y divide-linha border-y border-linha">
          {rotina.map((item) => (
            <div key={item.horario} className="flex gap-5 py-4">
              <span className="dado-ficha w-16 shrink-0 pt-0.5 text-tinta/60">{item.horario}</span>
              <div>
                <p className="font-semibold">{item.titulo}</p>
                <p className="mt-1 text-sm text-tinta/70">{item.descricao}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
