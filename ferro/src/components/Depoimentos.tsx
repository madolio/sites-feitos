import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Bruno C.',
    contexto: 'agachamento, 8 meses',
    texto:
      'Entrei achando que sabia minha carga de agachamento. A avaliação mostrou que eu treinava 15kg abaixo do que aguentava. Em 8 meses de progressão medida, meu 1RM subiu de 90kg pra 128kg.',
  },
  {
    autor: 'Larissa F.',
    contexto: 'condicionamento',
    texto:
      'Troquei academia de esteira genérica por aqui depois de duas lesões de joelho. A avaliação de mobilidade pegou uma assimetria que ninguém tinha me falado antes, e o treino mudou completamente por causa disso.',
  },
  {
    autor: 'Thiago R.',
    contexto: 'levantamento básico',
    texto:
      'Uso a calculadora de 1RM antes de cada ciclo pra montar meus percentuais de treino. Parece bobagem, mas parar de treinar no achismo foi o que mais mudou meu resultado nos últimos dois anos.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b-2 border-preto bg-preto py-16 text-branco md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="rotulo text-lima">Resultado medido</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Quem trocou o chute pelo dado</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-px overflow-hidden border-2 border-branco/20 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="bg-preto p-6">
              <blockquote className="text-sm text-cinza">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="rotulo mt-4 text-lima">
                {d.autor} · {d.contexto}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
