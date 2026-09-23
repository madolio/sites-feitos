import { niveis } from '../data'
import NivelStamp from './NivelStamp'
import CartaoEmbarque from './CartaoEmbarque'
import Reveal from './Reveal'

export default function Niveis() {
  return (
    <section id="niveis" className="scroll-mt-16 py-20 md:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:grid lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
      <div>
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Seis carimbos até a fluência</h2>
          <p className="mt-3 text-ink/75">
            O quadro comum europeu de referência (CEFR), do primeiro "oi" à
            fluência de quem nasceu falando.
          </p>
        </Reveal>

        <div className="mt-6 border-b border-line">
          {niveis.map((n, i) => (
            <NivelStamp key={n.sigla} nivel={n} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-10 lg:sticky lg:top-24 lg:mt-0">
        <CartaoEmbarque />
      </div>
      </div>
    </section>
  )
}
