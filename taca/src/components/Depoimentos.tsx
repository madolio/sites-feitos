import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata A.',
    ocasiao: 'aniversário de casamento',
    texto:
      'Fizemos a degustação guiada pela roda de aromas e foi a primeira vez que entendi o que significa "cítrico e mineral" numa taça. O guia deixou provar o mesmo rótulo antes e depois do carvalho pra sentir a diferença.',
  },
  {
    autor: 'Diego M.',
    ocasiao: 'visita em grupo',
    texto:
      'Chegamos oito pessoas sem reserva num sábado e não tinha vaga na sala — mas eles reorganizaram pra área externa coberta na hora e ainda saiu tudo dentro do horário previsto. Vinho do talhão mais alto surpreendeu todo mundo.',
  },
  {
    autor: 'Camila S.',
    ocasiao: 'compra pra presentear',
    texto:
      'Pedi uma caixa de seis pra mandar pro meu pai em outro estado. Chegou em cinco dias, embalada certinha, sem nenhuma garrafa trincada. Ele já perguntou se dá pra assinar uma remessa recorrente.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-line py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="font-heading text-sm tracking-wide text-garnet uppercase">Quem já visitou</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Relatos de quem subiu até a vinícola</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-lg border border-line bg-parchment-deep/40 p-5">
              <blockquote className="text-sm text-ink/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 font-heading text-xs tracking-wide text-ink/60 uppercase">
                {d.autor} · {d.ocasiao}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
