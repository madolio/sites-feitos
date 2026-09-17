import { brl, cardapio, type Item } from '../data'
import Reveal from './Reveal'

type CardapioProps = {
  qty: Record<string, number>
  change: (id: string, delta: number) => void
}

export default function Cardapio({ qty, change }: CardapioProps) {
  return (
    <section id="cardapio" className="scroll-mt-36 border-t-[6px] border-blue py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="poster text-blue">
            <span className="riso-type text-6xl md:text-8xl">
              <span>Cardápio</span>
              <span className="riso-pink" aria-hidden="true">
                Cardápio
              </span>
            </span>
          </h2>
          <p className="max-w-sm text-lg font-medium">
            Toque no + pra montar a comanda. No fim, ela vira uma mensagem
            pronta pro WhatsApp.
          </p>
        </div>

        <Reveal className="mt-10 bg-pink/15 p-5 sm:p-6">
          <p className="poster text-2xl text-blue sm:text-3xl">Terça do smash</p>
          <p className="mt-1 text-lg font-medium">
            Dois Smash da Vila e uma fritas grande por R$ 49. Só às terças, no
            balcão ou na entrega.
          </p>
        </Reveal>

        <Reveal as="div" className="mt-12 grid gap-x-14 gap-y-14 md:grid-cols-2" stagger={0.08}>
          {cardapio.map((cat) => (
            <div key={cat.id}>
              <h3 className="poster text-4xl text-blue">{cat.name}</h3>
              {cat.note && <p className="mt-2 text-ink/80">{cat.note}</p>}
              <ul className="mt-5">
                {cat.items.map((item) => (
                  <MenuItem key={item.id} item={item} count={qty[item.id] ?? 0} change={change} />
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function MenuItem({ item, count, change }: { item: Item; count: number; change: (id: string, d: number) => void }) {
  return (
    <li className="menu-item group flex items-start justify-between gap-5 border-t-[3px] border-blue/80 py-5">
      <div className="min-w-0">
        {/* O nome usa o mesmo truque de registro desalinhado do título (riso-type),
            só que a segunda camada fica invisível em repouso e só "sai fora de
            registro" no hover/foco — o cartaz balançando quando alguém para pra
            olhar o item, em vez de um hover genérico de escurecer o fundo. */}
        <h4 className="riso-type text-xl leading-tight font-bold">
          <span>{item.name}</span>
          <span className="menu-item-ghost text-pink" aria-hidden="true" style={{ mixBlendMode: 'multiply' }}>
            {item.name}
          </span>
        </h4>
        <p className="mt-1 text-ink/80">{item.description}</p>
        <p className="poster mt-2 text-lg text-blue">{brl(item.price)}</p>
      </div>

      {count === 0 ? (
        <button
          type="button"
          onClick={() => change(item.id, 1)}
          aria-label={`Adicionar ${item.name}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue text-3xl leading-none text-paper transition-transform hover:rotate-12 active:scale-90 motion-reduce:transition-none"
        >
          +
        </button>
      ) : (
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-yellow p-1" role="group" aria-label={`Quantidade de ${item.name}`}>
          <button
            type="button"
            onClick={() => change(item.id, -1)}
            aria-label={`Tirar um ${item.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none text-blue hover:bg-blue/10"
          >
            −
          </button>
          <span className="poster w-6 text-center text-lg text-blue" aria-live="polite">
            {count}
          </span>
          <button
            type="button"
            onClick={() => change(item.id, 1)}
            aria-label={`Adicionar mais um ${item.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-2xl leading-none text-paper"
          >
            +
          </button>
        </div>
      )}
    </li>
  )
}
