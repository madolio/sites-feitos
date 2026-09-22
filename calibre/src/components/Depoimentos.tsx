import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Marcelo A.',
    ocasiao: 'Peça sob encomenda',
    texto:
      'Encomendei o relógio pro dia do meu casamento e não esperava passar tanto tempo escolhendo o mostrador com o relojoeiro. Sentei com ele três vezes só pra decidir o tom do fundo.',
  },
  {
    autor: 'Beatriz N.',
    ocasiao: 'Revisão',
    texto:
      'Herdei o relógio do meu avô e levei pra revisão sem saber o que esperar. Voltou com um relatório de marcha detalhado, e o cuidado que recebeu me deixou surpresa.',
  },
  {
    autor: 'Thiago R.',
    ocasiao: 'Cronógrafo sob medida',
    texto:
      'Pedi uma peça com cronógrafo e o prazo passou de três meses. Quando abri a caixa, entendi por que demorou.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-20 border-b border-line px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-heading text-4xl font-medium text-cream sm:text-5xl">Quem já encomendou</h2>
          <p className="mt-3 max-w-md text-cream/65">
            Três relatos de peças que saíram da bancada.
          </p>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-14 grid gap-6 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.autor}
              className="rounded-lg border border-line bg-black/20 p-6 transition-colors hover:border-brass/40"
            >
              <blockquote className="text-cream/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 font-heading text-sm font-medium text-brass">
                {d.autor}
                <span className="ml-2 font-ui text-xs font-normal text-cream/50">{d.ocasiao}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
