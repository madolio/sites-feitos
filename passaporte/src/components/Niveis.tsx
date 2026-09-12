import { niveis } from '../data'
import NivelStamp from './NivelStamp'

export default function Niveis() {
  return (
    <section id="niveis" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl">Seis carimbos até a fluência</h2>
        <p className="mt-3 text-ink/75">
          O quadro comum europeu de referência (CEFR), do primeiro "oi" à
          fluência de quem nasceu falando.
        </p>

        <div className="mt-6 border-b border-line">
          {niveis.map((n, i) => (
            <NivelStamp key={n.sigla} nivel={n} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
