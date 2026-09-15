const modalidades = [
  {
    titulo: 'Musculação clássica',
    texto: 'Halteres e barras de verdade — sem máquina de tela touch, sem fila pra selfie.',
    rotate: '-rotate-1',
  },
  {
    titulo: 'Powerlifting',
    texto: 'Supino, agachamento e levantamento terra. Treino de força, do jeito antigo.',
    rotate: 'rotate-1',
  },
  {
    titulo: 'Cardio old school',
    texto: 'Corda, saco de areia, escada. Sem esteira com tela de streaming.',
    rotate: 'rotate-[-0.6deg]',
  },
  {
    titulo: 'Horário livre',
    texto: 'Sem turma marcada, sem playlist imposta — a trilha é a nossa.',
    rotate: 'rotate-[0.8deg]',
  },
]

// Cada modalidade é um cartaz xerocado, levemente torto, como se tivesse
// sido pregado à mão na parede do galpão.
export default function Modalidades() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl text-paper md:text-4xl">Modalidades</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {modalidades.map((item) => (
            <div key={item.titulo} className={`poster xerox-grain relative p-6 ${item.rotate}`}>
              <span className="tape" aria-hidden="true" />
              <h3 className="text-xl">{item.titulo}</h3>
              <p className="mt-2 text-chumbo">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
