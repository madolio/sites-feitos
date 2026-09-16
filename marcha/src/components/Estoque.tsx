import { estoque } from '../data/estoque'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

const formatoPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function Estoque() {
  return (
    <section id="estoque" className="bg-carvao px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Estoque</p>
          <h2 className="mt-3 text-3xl text-marfim sm:text-4xl">Cinco unidades, todas com ficha real</h2>
        </Reveal>

        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {estoque.map((c) => (
            <article key={c.id} className="overflow-hidden rounded-lg border border-fio bg-preto">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={c.foto} alt={c.categoria} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-marfim">{c.nome}</h3>
                  <span className="text-sm text-fumo">{c.ano}</span>
                </div>
                <p className="text-sm text-fumo">{c.categoria}</p>
                <dl className="tabular mt-3 grid grid-cols-2 gap-2 text-xs text-fumo">
                  <div>
                    <dt className="uppercase">Potência</dt>
                    <dd className="text-marfim">{c.potencia}</dd>
                  </div>
                  <div>
                    <dt className="uppercase">Aceleração</dt>
                    <dd className="text-marfim">{c.aceleracao}</dd>
                  </div>
                </dl>
                <p className="tabular mt-4 text-xl text-acento">{formatoPreco.format(c.preco)}</p>
                <button
                  type="button"
                  onClick={() => sendToWhatsApp(`Olá! Quero saber mais sobre o ${c.nome} (${formatoPreco.format(c.preco)}).`)}
                  className="btn-contorno mt-4 w-full"
                >
                  Perguntar sobre esse
                </button>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
