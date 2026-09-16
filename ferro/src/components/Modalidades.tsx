import Reveal from './Reveal'

const modalidades = [
  {
    titulo: 'Musculação',
    texto: 'Séries e cargas ajustadas pelo seu 1RM, revisadas a cada 4 semanas.',
  },
  {
    titulo: 'Força',
    texto: 'Levantamento básico — agachamento, terra e supino — com progressão medida, não empírica.',
  },
  {
    titulo: 'Condicionamento',
    texto: 'Circuitos curtos e intensos com frequência cardíaca monitorada.',
  },
  {
    titulo: 'Avaliação física',
    texto: 'Composição corporal e mobilidade medidas antes de montar qualquer programa.',
  },
]

export default function Modalidades() {
  return (
    <section id="modalidades" className="border-b-2 border-preto bg-branco py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl">Modalidades</h2>
        </Reveal>

        <Reveal stagger={0.08} className="mt-10 grid gap-px overflow-hidden border-2 border-preto sm:grid-cols-2">
          {modalidades.map((item) => (
            <div key={item.titulo} className="group bg-branco p-6 transition-colors hover:bg-preto hover:text-branco">
              <h3 className="text-xl">{item.titulo}</h3>
              <p className="mt-2 text-fumo transition-colors group-hover:text-cinza">{item.texto}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
