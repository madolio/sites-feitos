const modalidades = [
  {
    titulo: 'Musculação clássica',
    texto: 'Halteres e barras de verdade — sem máquina de tela touch, sem fila pra selfie.',
  },
  {
    titulo: 'Powerlifting',
    texto: 'Supino, agachamento e levantamento terra. Treino de força, do jeito antigo.',
  },
  {
    titulo: 'Cardio old school',
    texto: 'Corda, saco de areia, escada. Sem esteira com tela de streaming.',
  },
  {
    titulo: 'Horário livre',
    texto: 'Sem turma marcada, sem playlist imposta — a trilha é a nossa.',
  },
]

export default function Modalidades() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl md:text-4xl">Modalidades</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {modalidades.map((item) => (
            <div key={item.titulo} className="border-2 border-ink p-6">
              <h3 className="text-xl">{item.titulo}</h3>
              <p className="mt-2 text-chumbo">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
