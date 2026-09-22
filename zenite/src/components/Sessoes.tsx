import { sessoes } from '../data/sessoes'

export default function Sessoes() {
  return (
    <section id="sessoes" className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Sessões e experiências</h2>
      <p className="mt-3 max-w-xl text-neblina">
        Seis formatos, cada um com o dado astronômico real por trás — não um passeio genérico de "observação de
        estrelas".
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sessoes.map((s) => (
          <article
            key={s.slug}
            className="flex flex-col rounded-2xl border border-latao-fundo/60 bg-cupula p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg text-marfim">{s.nome}</h3>
              <span className="shrink-0 text-xs text-neblina">{s.duracao}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-fosforo">{s.dado}</p>
            <p className="mt-3 flex-1 text-sm text-neblina">{s.detalhe}</p>
            <p className="mt-4 border-t border-latao-fundo/40 pt-3 text-xs text-latao">{s.publico}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
