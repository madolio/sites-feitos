import { gemas, type Gema } from '../data/gemas'
import Reveal from './Reveal'

export default function Catalogo({
  gema,
  onEscolher,
}: {
  gema: Gema
  onEscolher: (g: Gema) => void
}) {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <Reveal as="h2" className="font-display text-3xl sm:text-4xl">
        Escolha a gema
      </Reveal>
      <Reveal delay={0.08} as="p" className="mt-3 max-w-lg text-fumo">
        Índice de refração (IOR) e dispersão são valores reais de tabela gemológica — não decoração. Toque numa
        pedra e veja a vitrine acima girar com a física dela.
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gemas.map((g, i) => {
          const ativa = g.id === gema.id
          return (
            <Reveal
              key={g.id}
              as="button"
              delay={i * 0.05}
              y={16}
              type="button"
              onClick={() => onEscolher(g)}
              className={`rounded-2xl border p-5 text-left transition ${
                ativa ? 'border-acento bg-carvao' : 'border-fio bg-carvao/50 hover:border-acento/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: g.cor, boxShadow: `0 0 12px ${g.cor}` }}
                />
                <span className="font-display text-xl">{g.nome}</span>
              </div>
              <p className="mt-2 text-xs text-fumo">{g.formula}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-fumo">IOR</p>
                  <p className="tabular text-marfim">{g.ior.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-fumo">Dispersão</p>
                  <p className="tabular text-marfim">{g.dispersao.toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-fumo">Dureza</p>
                  <p className="text-marfim">{g.dureza}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-fumo">{g.descricao}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
