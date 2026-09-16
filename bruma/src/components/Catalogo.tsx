import { fragancias } from '../data/fragancias'

export default function Catalogo() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Nosso catálogo</h2>
      <p className="mt-3 max-w-lg text-fumo">
        Cada fragrância mostra a concentração real de óleo essencial — é ela que decide quanto tempo o perfume
        dura, não o preço do frasco.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fragancias.map((f) => (
          <div key={f.id} className="rounded-2xl border border-fio bg-carvao p-6">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl">{f.nome}</h3>
              <span className="text-xs text-fumo">{f.tipo}</span>
            </div>

            <div className="mt-4 flex gap-6 text-sm">
              <div>
                <p className="text-fumo">Concentração</p>
                <p className="text-marfim">{f.concentracao}</p>
              </div>
              <div>
                <p className="text-fumo">Duração</p>
                <p className="text-marfim">{f.duracao}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-semibold text-acento">Topo</p>
                <p className="mt-1 text-fumo">{f.topo.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold text-acento">Coração</p>
                <p className="mt-1 text-fumo">{f.coracao.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold text-acento">Fundo</p>
                <p className="mt-1 text-fumo">{f.fundo.join(', ')}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-fumo">{f.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
