import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Marina T.',
    contexto: 'canal no molar',
    texto:
      'Adiei o canal por meses com medo de doer. Fez em duas sessões, sem dor nenhuma na hora nem depois. Só fiquei com um pouco de sensibilidade no dia seguinte, que passou com o remédio que ela passou.',
  },
  {
    autor: 'Eduardo S.',
    contexto: 'avaliação de siso',
    texto:
      'Achei que ia precisar arrancar os quatro sisos porque foi isso que ouvi a vida toda. A radiografia mostrou que só um estava impactado. Os outros três ficaram, sem drama nenhum.',
  },
  {
    autor: 'Renata A.',
    contexto: 'orçamento de implante',
    texto:
      'Pedi pra ver o valor antes de qualquer coisa, e recebi por escrito, dente por dente, antes de decidir. Parcelei em 6x e não apareceu nenhuma cobrança fora do combinado no meio do tratamento.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-linha bg-white/40 py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="rotulo-mono">Quem já passou pela clínica</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Relatos de pacientes da Meridiana</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="relative rounded-lg border border-linha bg-papel p-5 shadow-sm">
              <span aria-hidden="true" className="rotulo-mono absolute top-4 right-4 rotate-6 text-esmalte/60">
                relato
              </span>
              <blockquote className="pr-14 text-sm text-tinta/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="rotulo-mono mt-4">
                {d.autor} · {d.contexto}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
