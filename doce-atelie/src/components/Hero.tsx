import { useState, type Dispatch, type SetStateAction } from 'react'
import { recheios } from '../data'
import { MAX_RECHEIOS, type Order } from '../order'
import FanDeck from './FanDeck'
import Reveal from './Reveal'

type HeroProps = {
  order: Order
  setOrder: Dispatch<SetStateAction<Order>>
}

export default function Hero({ order, setOrder }: HeroProps) {
  const [selected, setSelected] = useState(recheios[0].id)
  const flavor = recheios.find((r) => r.id === selected) ?? recheios[0]
  const inOrder = order.recheios.includes(selected)
  const full = order.recheios.length >= MAX_RECHEIOS

  const useInCake = () => {
    if (!inOrder && !full) {
      setOrder((o) => ({ ...o, recheios: [...o.recheios, selected] }))
    }
    document.getElementById('encomenda')?.scrollIntoView()
  }

  return (
    <section id="sabores" className="scroll-mt-24 overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
        <Reveal y={18} stagger={0.12}>
          <h1 className="display text-[3.2rem] sm:text-7xl lg:text-[5.6rem]">
            Escolha o recheio como quem escolhe uma cor.
          </h1>
          <p className="mt-7 max-w-md text-lg text-ink/75">
            Bolos e docinhos sob encomenda na Vila Mariana. Você monta o bolo
            pela cartela, a gente confirma pelo WhatsApp e entrega pronto pra
            festa.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#encomenda" className="btn-cherry">
              Montar meu bolo
            </a>
            <a href="#prazos" className="link">
              Ver prazos de encomenda
            </a>
          </div>
        </Reveal>

        <div>
          <FanDeck flavors={recheios} selected={selected} onSelect={setSelected} />
          <p className="mt-1 text-center text-sm text-ink/65">Toque numa tira pra ver o recheio.</p>

          <div
            aria-live="polite"
            className="mx-auto mt-6 flex max-w-md flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-line pt-5"
          >
            <div className="min-w-0 flex-[1_1_15rem]">
              <p className="text-sm font-semibold tabular-nums text-ink/65">{flavor.code}</p>
              <p className="display mt-1 text-3xl">{flavor.name}</p>
              <p className="mt-2 text-ink/70">{flavor.description}</p>
            </div>
            <button type="button" onClick={useInCake} className="btn-outline shrink-0">
              {inOrder ? 'Já está no seu bolo' : full ? 'Ver meu bolo' : 'Usar no meu bolo'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
