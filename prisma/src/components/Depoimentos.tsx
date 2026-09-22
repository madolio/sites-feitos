import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Rafael M.',
    peca: 'Anel de noivado, esmeralda de família',
    texto:
      'Pedi um anel de noivado com a esmeralda que era da minha avó, reengastada num aro novo. Chegou três dias antes do prazo combinado, e o laudo de avaliação já veio pronto pro seguro.',
  },
  {
    autor: 'Beatriz A.',
    peca: 'Anel de noivado sob medida',
    texto:
      'Desenhei o anel junto com eles numa videochamada, ajustando o engaste até ficar do jeito que eu via na cabeça. O diamante veio com o laudo completo dos 4 Cs, sem eu precisar pedir.',
  },
  {
    autor: 'Thiago L.',
    peca: 'Reforma de pulseira de família',
    texto:
      'Levei uma pulseira de família pra reformar: trocaram o fecho e ajustaram duas pedras soltas. Cobraram só a mão de obra, como tinham avisado desde o orçamento.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-t border-fio px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal as="h2" className="font-display text-3xl sm:text-4xl">
          Peças que já saíram daqui
        </Reveal>
        <Reveal delay={0.08} as="p" className="mt-3 max-w-md text-fumo">
          Encomendas reais, contadas por quem recebeu a peça pronta.
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-2xl border border-fio bg-carvao p-6">
              <blockquote className="text-sm text-marfim/90">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 text-xs text-fumo">
                <span className="text-acento">{d.autor}</span> · {d.peca}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
