import { sessoes } from '../data/sessoes'

// Um glifo por formato de sessao: as seis cartas eram identicas, sem nada que
// dissesse de relance o que cada uma observa. Sao tracos simples, na mesma
// linha do resto do site (latao, sem preenchimento).
function Glifo({ slug }: { slug: string }) {
  const comum = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0 text-latao" aria-hidden="true" {...comum}>
      {slug === 'lua' && (
        <>
          <path d="M22 5a11 11 0 1 0 5 20 9 9 0 0 1-5-20z" />
          <circle cx="13" cy="16" r="1.4" />
          <circle cx="17" cy="22" r="1" />
        </>
      )}
      {slug === 'ceu-profundo' && (
        <>
          {[[16, 15, 1.4], [12, 12, 1], [20, 12, 1], [11, 18, 1], [21, 19, 1.1], [16, 21, 1], [15, 9, 0.9], [8, 15, 0.8], [24, 15, 0.8]].map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="currentColor" stroke="none" />
          ))}
          <circle cx="16" cy="16" r="11.5" strokeDasharray="1 3" />
        </>
      )}
      {(slug === 'eta-aquaridas' || slug === 'geminidas') && (
        <>
          <path d="M5 27 L23 9" />
          <path d="M9 27 L20 16" opacity="0.6" />
          <path d="M5 21 L14 12" opacity="0.6" />
          <circle cx="25" cy="7" r="2.4" fill="currentColor" stroke="none" />
        </>
      )}
      {slug === 'infantil' && (
        <>
          <circle cx="16" cy="16" r="6" />
          <ellipse cx="16" cy="16" rx="13" ry="4" transform="rotate(-20 16 16)" />
        </>
      )}
      {slug === 'aluguel' && (
        <>
          <path d="M6 12 L20 7 L22 12 L8 17 Z" />
          <path d="M14 15 L10 27 M14 15 L18 27 M14 15 L14 27" />
          <path d="M20 7 L26 5" />
        </>
      )}
    </svg>
  )
}

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
            className="flex flex-col rounded-2xl border border-latao-fundo/60 bg-cupula p-6 transition-colors hover:border-latao"
          >
            <div className="flex items-start gap-3">
              <Glifo slug={s.slug} />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg text-marfim">{s.nome}</h3>
                <span className="mt-0.5 block text-xs text-neblina">{s.duracao}</span>
              </div>
            </div>
            <p className="mt-3 text-[0.95rem] font-medium text-fosforo">{s.dado}</p>
            <p className="mt-3 flex-1 text-sm text-neblina">{s.detalhe}</p>
            <p className="mt-4 border-t border-latao-fundo/40 pt-3 text-xs text-latao">{s.publico}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
