import { processo } from '../data/conteudo'

export default function Processo() {
  return (
    <section id="processo" className="bg-surface px-6 py-20 sm:px-10 lg:pl-16">
      <div className="mx-auto max-w-6xl">
        <p className="rotulo-mao">{processo.rotulo}</p>
        <h2 className="mt-2 max-w-2xl text-3xl text-foreground sm:text-4xl">{processo.title}</h2>
        {processo.intro && <p className="mt-3 max-w-2xl text-muted">{processo.intro}</p>}

        {/* Quantidade livre de etapas: o grid se ajusta */}
        <ol className="mt-12 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr))]">
          {processo.etapas.map((etapa, i) => (
            <li key={etapa.carimbo}>
              <span className="inline-block -rotate-3 rounded-sm border-2 border-accent-text px-3 py-1.5 text-xs font-bold tracking-wider text-accent-text">
                {String(i + 1).padStart(2, '0')} · {etapa.carimbo}
              </span>
              <h3 className="mt-4 text-lg text-foreground">{etapa.titulo}</h3>
              <p className="mt-2 text-sm text-muted">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
