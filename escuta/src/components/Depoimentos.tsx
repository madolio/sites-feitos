import Reveal from './Reveal'
import { depoimentos } from '../data/depoimentos'

export default function Depoimentos() {
  return (
    <section className="border-b border-linha bg-tinta py-20 text-papel">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-quieto">quem já passou por aqui</p>
          <h2 className="mt-2 max-w-lg text-3xl text-papel sm:text-4xl">Relatos ilustrativos, não copiados de lugar nenhum</h2>
          <p className="mt-3 max-w-xl text-sm text-papel/60">
            Depoimentos fictícios, escritos pra este conceito de site: não correspondem a pacientes
            reais.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid gap-8 sm:grid-cols-3" stagger={0.08}>
          {depoimentos.map((d) => (
            <div key={d.autor}>
              <p className="text-papel/90">"{d.texto}"</p>
              <p className="mt-3 text-sm font-bold tracking-wide text-quieto uppercase">{d.autor}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
