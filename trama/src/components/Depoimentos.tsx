import Reveal from './Reveal'
import { depoimentos } from '../data/depoimentos'

/** Prova social no vocabulário visual da própria Trama: cada depoimento é
 * uma etiqueta pendurada (hang-tag), com o tecido da peça do cliente no
 * lugar do costume selo de estrelas genérico. */
export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-linha bg-cartao/60 py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-etiqueta text-ferrugem">quem já passou no balcão</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Peça errada na máquina, uma vez só</h2>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-10 grid gap-6 sm:grid-cols-3">
          {depoimentos.map((dep) => (
            <figure
              key={dep.nome}
              className="relative rounded-sm border border-linha bg-cru p-6 pt-8"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 left-6 h-6 w-4 rounded-b-full border border-linha border-t-0 bg-cru"
              />
              <p className="dado-etiqueta text-mostarda">{dep.tecido}</p>
              <blockquote className="mt-3 text-sm leading-relaxed text-carvao/80">
                {dep.texto}
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-carvao">{dep.nome}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
