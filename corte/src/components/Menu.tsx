import { servicos } from '../data'

// Quadro de preços — como o quadro pendurado na parede de uma barbearia,
// não uma grade de cards com ícone.
export default function Menu() {
  return (
    <section id="menu" className="scroll-mt-16 border-t-2 border-ink bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl text-paper sm:text-4xl">Quadro de preços</h2>

        <ul className="ticket mt-12 divide-y divide-paper/20 border-y-2 border-paper/30">
          {servicos.map((s) => (
            <li key={s.name} className="flex items-baseline justify-between gap-4 py-4 font-body">
              <span className="font-semibold text-paper">
                {s.name} <span className="ticket font-normal text-paper/55">· {s.minutos}min</span>
              </span>
              <span className="flex-1 border-b border-dotted border-paper/25 translate-y-[-4px]" aria-hidden="true" />
              <span className="shrink-0 text-lg font-bold text-paper">R$ {s.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
