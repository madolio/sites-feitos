import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Marina L.',
    contexto: 'Aniversário de 7 anos',
    codigo: 'DA 202',
    texto:
      'Encomendei o bolo da festa da minha filha com quatro dias de antecedência. Chegou redondinho, com o recheio de ninho com morango que ela escolheu, e os docinhos vieram combinando com a decoração.',
  },
  {
    autor: 'Fernando A.',
    contexto: 'Casamento, dois andares',
    codigo: 'DA 204',
    texto:
      'Fechamos o bolo do casamento com dois meses de antecedência: pistache embaixo, frutas vermelhas em cima. No dia, o sabor bateu exatamente com o que provamos antes de assinar o pedido.',
  },
  {
    autor: 'Renata S.',
    contexto: 'Confraternização de fim de ano',
    codigo: 'Docinhos',
    texto:
      'Pedi 120 docinhos pra empresa com uma semana de antecedência. Chegaram separados por sabor, já prontos pra servir, e sem atraso na entrega.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-24 border-t border-line bg-frosting/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <h2 className="display text-5xl md:text-7xl">Quem já encomendou</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-xl border border-line bg-card p-6 shadow-sm">
              <span className="mb-4 block text-xs font-semibold tabular-nums text-ink/50">{d.codigo}</span>
              <blockquote className="text-ink/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm text-ink/65">
                <span className="font-semibold text-ink">{d.autor}</span> · {d.contexto}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
