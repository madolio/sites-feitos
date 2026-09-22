import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata M.',
    detalhe: 'encomendou o bolo do aniversário de 1 ano da filha',
    texto:
      'Pedi um bolo de cenoura com cobertura de chocolate pro aniversário da minha filha e chegou exatamente como combinamos no WhatsApp. Vieram buscar comigo na hora certa, sem enrolação.',
  },
  {
    autor: 'Diego A.',
    detalhe: 'passa toda terça de manhã',
    texto:
      'Trabalho perto e paro toda terça às 6h40 pra pegar o pão de fermentação natural ainda quente. Já experimentei em outras padarias da região e a casca daqui não se compara.',
  },
  {
    autor: 'Beatriz S.',
    detalhe: 'encomendou 40 pães pra um evento da empresa',
    texto:
      'Precisava de pão de forma integral pra um café da manhã de empresa com 40 pessoas. Avisei com três dias de antecedência e chegou tudo fresco, embalado por tipo, sem sobra e sem falta.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-crosta py-16 text-farinha md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal as="h2" className="text-3xl md:text-4xl">
          Quem já provou
        </Reveal>

        <Reveal as="div" delay={0.05} stagger={0.08} className="mt-10 grid gap-6 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-2xl border-2 border-farinha/15 p-6">
              <blockquote className="text-farinha/85">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="tally mt-4 text-sm text-trigo">
                {d.autor} · {d.detalhe}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
