import Reveal from './Reveal'
import { depoimentos } from '../data/depoimentos'

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-linha bg-oficina-forte py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-oficina text-aco">ficha de saída</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Quem já passou pela oficina</h2>
        </Reveal>

        <Reveal as="ul" stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((dep) => (
            <li
              key={dep.nome}
              className="flex flex-col rounded-md border border-linha bg-white p-5"
            >
              <p className="dado-oficina text-aco">{dep.servico}</p>
              <p className="mt-3 flex-1 text-sm text-chumbo/80 normal-case">
                &ldquo;{dep.texto}&rdquo;
              </p>
              <p className="dado-oficina mt-4 border-t border-linha pt-3 text-aco">{dep.nome}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
