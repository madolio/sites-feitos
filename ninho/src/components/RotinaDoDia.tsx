import Reveal from './Reveal'
import { rotina } from '../data/rotina'

export default function RotinaDoDia() {
  return (
    <section id="rotina" className="border-b border-linha bg-papel-forte py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-ninho">a rotina, hora a hora</p>
          <h2 className="mt-2 max-w-2xl text-3xl sm:text-4xl">O dia do Ninho, do início ao fim</h2>
          <p className="mt-4 max-w-xl text-tinta/75">
            Rotina previsível é uma das ferramentas mais úteis da Educação Infantil: a criança
            sabe o que vem a seguir, e isso reduz ansiedade. Este é o roteiro real das nossas
            turmas.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-[1.05fr_0.95fr] sm:items-start">
          <Reveal delay={0.05} className="divide-y divide-linha border-y border-linha">
            {rotina.map((item) => (
              <div key={item.horario} className="flex gap-5 py-4">
                <span className="dado-ficha w-16 shrink-0 pt-0.5 text-tinta/60">
                  {item.horario}
                </span>
                <div>
                  <p className="font-semibold">{item.titulo}</p>
                  <p className="mt-1 text-sm text-tinta/70">{item.descricao}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="sm:sticky sm:top-24">
            <figure className="overflow-hidden rounded-[1.75rem_0.75rem_1.75rem_0.75rem] border border-linha shadow-sm sm:-rotate-1">
              <img
                src="https://images.pexels.com/photos/8088235/pexels-photo-8088235.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Sala de atividades de uma escola de educação infantil, vazia, com mesinhas e cadeiras de madeira baixinhas, estante organizada com brinquedos e um tapete verde no chão"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
