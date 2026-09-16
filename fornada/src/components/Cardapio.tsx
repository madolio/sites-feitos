import Reveal from './Reveal'

const itens = [
  { nome: 'Pão de fermentação natural', texto: 'Casca crocante, miolo úmido, 24h de fermentação lenta.' },
  { nome: 'Croissant', texto: 'Manteiga de verdade, folhado na hora, sem margarina.' },
  { nome: 'Focaccia do dia', texto: 'Recheio muda toda semana, sempre com azeite bom.' },
  { nome: 'Pão de forma integral', texto: 'Sem açúcar escondido, sem conservante.' },
]

export default function Cardapio() {
  return (
    <section id="cardapio" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal as="h2" className="text-3xl md:text-4xl">
          Cardápio
        </Reveal>

        <Reveal as="div" className="mt-10 grid gap-6 sm:grid-cols-2" stagger={0.08}>
          {itens.map((item) => (
            <div key={item.nome} className="rounded-2xl border-2 border-crosta/15 p-6">
              <h3 className="text-xl">{item.nome}</h3>
              <p className="mt-2 text-crosta/70">{item.texto}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
