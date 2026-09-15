const recordes = [
  { movimento: 'Supino reto', peso: '180kg', ano: '1994' },
  { movimento: 'Agachamento livre', peso: '240kg', ano: '2003' },
  { movimento: 'Levantamento terra', peso: '260kg', ano: '2011' },
  { movimento: 'Rosca direta', peso: '52kg', ano: '1998' },
]

// O "esqueleto" próprio deste conceito: um quadro de recordes envelhecido,
// pregado na parede, em vez de uma seção genérica de "diferenciais" — a
// relíquia física da academia é o próprio conteúdo.
export default function Recordes() {
  return (
    <section id="recordes" className="relative bg-ink py-16 text-paper md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl md:text-4xl">Recordes da casa</h2>
        <p className="mt-3 text-paper/60">Placar pregado na parede desde sempre. Ninguém apaga.</p>

        <div className="xerox-grain relative mt-10 border-2 border-paper/30 bg-ink/40 p-6 sm:p-8">
          <span className="tape" aria-hidden="true" />
          <ul className="divide-y divide-paper/15">
            {recordes.map((r) => (
              <li key={r.movimento} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <span className="text-lg">{r.movimento}</span>
                <span className="flex items-baseline gap-3">
                  <span className="tally text-2xl text-[color:var(--color-steel-bright)]">{r.peso}</span>
                  <span className="text-sm text-paper/50">{r.ano}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
