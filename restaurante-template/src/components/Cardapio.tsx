import { cardapio, rotulos } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Cardapio() {
  const legenda = Object.entries(cardapio.legenda)

  return (
    <section id="cardapio" className="tema-claro py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{cardapio.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={cardapio.title} />
          </h2>
          <p className="mt-5 text-lg text-muted">{cardapio.intro}</p>
          {legenda.length > 0 && (
            <ul aria-label={rotulos.cardapio.marcas} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {legenda.map(([chave, texto]) => (
                <li key={chave} className="flex items-center gap-2">
                  <span aria-hidden="true" className="rounded border border-border px-1.5 text-xs font-semibold text-accent">
                    {chave}
                  </span>
                  {texto}
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-14 lg:grid-cols-2">
          {cardapio.categorias.map((cat) => (
            <Reveal key={cat.nome} className="min-w-0">
              <h3 className="border-b border-foreground pb-3 text-3xl">{cat.nome}</h3>
              {cat.nota && <p className="mt-3 text-sm text-muted">{cat.nota}</p>}
              <ul className="mt-2 divide-y divide-border">
                {cat.itens.map((item) => (
                  <li key={item.nome} className="py-4">
                    <div className="flex items-baseline gap-3">
                      <h4 className="min-w-0 text-xl leading-snug">
                        {item.nome}
                        {item.marcas?.map((m) => (
                          <span key={m} className="ml-2 inline-block align-middle">
                            <span aria-hidden="true" className="rounded border border-border px-1.5 text-[0.6875rem] font-semibold text-accent">
                              {m}
                            </span>
                            <span className="sr-only"> {cardapio.legenda[m] ?? m}</span>
                          </span>
                        ))}
                      </h4>
                      {item.preco && (
                        <>
                          <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-0.2em] self-end max-sm:hidden border-b border-dotted border-foreground/40" />
                          <span className="max-w-[9rem] ml-auto shrink-0 text-right font-display text-xl tabular-nums">{item.preco}</span>
                        </>
                      )}
                    </div>
                    <p className="mt-1 max-w-md text-muted">{item.descricao}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {cardapio.nota && <p className="mt-12 text-sm text-muted">{cardapio.nota}</p>}
      </div>
    </section>
  )
}
