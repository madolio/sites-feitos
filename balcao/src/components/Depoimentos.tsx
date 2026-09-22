import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Marina T.',
    contexto: 'pediu o combo smash pro almoço',
    texto:
      'Pedi pelo WhatsApp às 12h20, no maior corre do trabalho, e o combo smash já tava pronto quando cheguei 15 minutos depois. A batata ainda tava quente.',
  },
  {
    autor: 'Diego A.',
    contexto: 'encomendou 10 lanches pra reunião',
    texto:
      'Avisei um dia antes que precisava de 10 lanches pra reunião da equipe. Chegou tudo junto, embalado por pessoa, sem ninguém esperando o do lado terminar de comer.',
  },
  {
    autor: 'Renata P.',
    contexto: 'wrap sem glúten',
    texto:
      'Perguntei se dava pra tirar o pão do wrap de frango por causa da glúten e trocaram pra alface na hora, sem cobrar nada a mais.',
  },
]

export default function Depoimentos() {
  return (
    <section id="clientes" className="border-t border-line bg-card py-16">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold text-leaf">Quem já pediu</p>
          <h2 className="mt-2 max-w-xl text-2xl sm:text-3xl">Relato de quem levou pra casa</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-8 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-lg border border-line bg-cream p-5">
              <blockquote className="text-sm text-ink/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-ink">
                {d.autor}
                <span className="block font-normal text-ink/60">{d.contexto}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
