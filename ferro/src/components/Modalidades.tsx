const modalidades = [
  {
    titulo: 'Musculação',
    texto: 'Aparelhos e pesos livres, sem fila — ficha de treino montada com o instrutor.',
  },
  {
    titulo: 'Funcional',
    texto: 'Aulas em grupo pequeno, treino variado, sem repetir a mesma sequência toda semana.',
  },
  {
    titulo: 'Alongamento e mobilidade',
    texto: 'Pra quem treina pesado e não pode negligenciar a recuperação.',
  },
  {
    titulo: 'Horário livre',
    texto: 'Sem turma marcada — treina quando encaixa na sua semana.',
  },
]

export default function Modalidades() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl md:text-4xl">Modalidades</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {modalidades.map((item) => (
            <div key={item.titulo} className="border-2 border-iron p-6">
              <h3 className="text-xl">{item.titulo}</h3>
              <p className="mt-2 text-iron/70">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
