const etapas = [
  {
    titulo: 'Adaptação escotópica',
    texto:
      'Chegada ainda com luz do dia e 20 a 30 minutos de olho no escuro antes do primeiro alvo — é o tempo real que a retina leva pra recuperar sensibilidade máxima à luz fraca. Nenhuma luz branca é usada depois disso, só lanterna vermelha.',
  },
  {
    titulo: 'Escolha do alvo pela fase da Lua',
    texto:
      'Em lua cheia, o céu fica claro demais pra nebulosas e aglomerados fracos — a sessão foca em Lua, planetas e estrelas duplas. Perto da lua nova, entram os alvos de céu profundo. O calendário é consultado antes de cada sessão, não decidido na hora.',
  },
  {
    titulo: 'Foco assistido na ocular',
    texto:
      'Cada visitante gira a roda de foco com orientação — é o mesmo gesto de girar que a página faz na seção anterior. O monitor ajusta o alinhamento (colimação) sempre que o telescópio muda de alvo.',
  },
  {
    titulo: 'Registro opcional',
    texto:
      'Quem quiser pode encostar o celular na ocular (afocal) pra registrar Lua e planetas — funciona bem porque são alvos brilhantes. Nebulosas fracas pedem câmera dedicada, oferecida só no workshop de astrofotografia.',
  },
]

export default function Processo() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Como funciona uma sessão</h2>

      <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {etapas.map((e, i) => (
          <li key={e.titulo} className="flex gap-4">
            <span className="font-display text-2xl text-latao">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="font-display text-lg text-marfim">{e.titulo}</h3>
              <p className="mt-2 text-sm text-neblina">{e.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
