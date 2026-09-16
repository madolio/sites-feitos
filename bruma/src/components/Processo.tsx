const etapas = [
  { titulo: 'Conversa olfativa', texto: 'Contamos memórias e preferências — não escolhemos num catálogo de amostras.' },
  { titulo: 'Composição', texto: 'Montamos a pirâmide (topo, coração, fundo) e testamos a concentração certa.' },
  { titulo: 'Maceração', texto: 'A mistura descansa semanas pra os óleos se estabilizarem antes do engarrafamento.' },
  { titulo: 'Entrega', texto: 'Frasco numerado, com a ficha de composição da sua fragrância.' },
]

export default function Processo() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Da conversa ao frasco</h2>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map((e, i) => (
          <div key={e.titulo} className="rounded-2xl border border-fio bg-carvao/50 p-5">
            <p className="font-display text-3xl text-acento">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 font-display text-xl">{e.titulo}</h3>
            <p className="mt-2 text-sm text-fumo">{e.texto}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
