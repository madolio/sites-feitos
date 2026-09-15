const fornadas = [
  { hora: '06h30', item: 'Pão de fermentação natural', status: 'Saindo agora' },
  { hora: '09h00', item: 'Croissant e folhados', status: 'A caminho' },
  { hora: '13h00', item: 'Baguete e focaccia', status: 'A caminho' },
  { hora: '17h00', item: 'Pão de forma do dia seguinte', status: 'Fermentando' },
]

// O "esqueleto" próprio deste conceito: em vez de uma lista genérica de
// diferenciais, o quadro de horários de forno é o próprio conteúdo — como
// se fosse escrito a giz na parede da padaria.
export default function FornadaDoDia() {
  return (
    <section id="fornada-do-dia" className="bg-crosta py-16 text-farinha md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl md:text-4xl">Fornada do dia</h2>
        <p className="mt-3 text-farinha/70">Atualizado toda manhã — o que sai, e quando.</p>

        <ul className="mt-10 divide-y divide-farinha/15 border-y border-farinha/15">
          {fornadas.map((f) => (
            <li key={f.hora} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <span className="tally text-lg text-trigo">{f.hora}</span>
              <span className="flex-1 px-4">{f.item}</span>
              <span className="text-sm text-farinha/60">{f.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
