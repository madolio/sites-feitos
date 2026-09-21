import { depoimentos } from '../data/depoimentos'
import Reveal from './Reveal'

export default function Depoimentos() {
  return (
    <section className="border-b border-linha bg-marfim px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="rotulo-mono">Quem já passou pela cadeira</p>
          <h2 className="mt-2 text-4xl">O que as clientes contam depois</h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Reveal
              key={d.id}
              delay={i * 0.05}
              className="flex flex-col rounded-2xl border border-linha bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="mb-4 inline-block h-2 w-10 rounded-full bg-coral"
              />
              <p className="grow text-tinta/80">&ldquo;{d.texto}&rdquo;</p>
              <div className="mt-5 border-t border-linha pt-4">
                <p className="font-semibold text-tinta">{d.nome}</p>
                <p className="valor-mono text-xs">{d.tecnica}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
