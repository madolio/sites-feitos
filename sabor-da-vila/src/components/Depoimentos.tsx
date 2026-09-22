import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata M.',
    texto:
      'Pedi o Duplo bacon numa sexta cheia e achei que ia demorar. Chegou em 35 minutos, ainda quente, com o pão sequinho por fora. Virou pedido fixo aqui de casa.',
  },
  {
    autor: 'Diego S.',
    texto:
      'Falei que meu filho não come cebola de jeito nenhum e o Vila clássico chegou certinho, sem reclamação, sem cobrar nada a mais por isso.',
  },
  {
    autor: 'Bianca A.',
    texto:
      'Fechei 20 Veggie da feira pro aniversário da minha sogra e sobrou zero. Combinaram tudo pelo WhatsApp em dois dias.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-36 border-t-[6px] border-blue bg-pink/10 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="poster text-blue">
          <span className="riso-type text-6xl md:text-8xl">
            <span>Depoimentos</span>
            <span className="riso-pink" aria-hidden="true">
              Depoimentos
            </span>
          </span>
        </h2>

        <Reveal as="div" className="mt-10 grid gap-6 sm:grid-cols-3" stagger={0.08}>
          {depoimentos.map((d) => (
            <figure key={d.autor} className="picote border-2 border-blue bg-paper p-5 pb-7">
              <blockquote className="text-ink/85">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="poster mt-4 text-lg text-blue">{d.autor}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
