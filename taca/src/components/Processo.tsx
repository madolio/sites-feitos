import { etapas } from '../data/processo'
import Reveal from './Reveal'

export default function Processo() {
  return (
    <section id="processo" className="scroll-mt-20 border-b border-line px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-heading text-4xl font-medium text-ink sm:text-5xl">Da parreira à taça</h2>
          <p className="mt-3 max-w-md text-ink/65">Seis etapas, sempre nessa ordem — a última é a única que você termina.</p>
        </Reveal>

        <Reveal as="ol" stagger={0.08} className="mt-14 border-l border-line pl-8">
          {etapas.map((e, i) => (
            <li key={e.numero} className={`relative ${i > 0 ? 'mt-10' : ''}`}>
              <span className="absolute top-1 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-garnet" />
              <span className="font-heading text-sm text-sage">{e.numero}</span>
              <h3 className="mt-1 font-heading text-2xl font-medium text-ink">{e.titulo}</h3>
              <p className="mt-2 max-w-md text-ink/70">{e.descricao}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
