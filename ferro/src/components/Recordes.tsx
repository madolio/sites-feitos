import Reveal from './Reveal'

const recordes = [
  { movimento: 'Supino reto', peso: '180kg' },
  { movimento: 'Agachamento livre', peso: '240kg' },
  { movimento: 'Levantamento terra', peso: '260kg' },
  { movimento: 'Rosca direta', peso: '52kg' },
]

// Recordes da casa — antes um "quadro pregado na parede" (vibe old
// school), agora uma faixa de estatísticas limpa, no mesmo espírito
// clínico/orientado a dado do resto do site.
export default function Recordes() {
  return (
    <section className="border-b-2 border-preto bg-preto py-16 text-branco md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl text-branco md:text-4xl">Recordes da casa</h2>
          <p className="mt-3 text-cinza">Os maiores números já levantados aqui dentro.</p>
        </Reveal>

        <Reveal stagger={0.08} className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {recordes.map((r) => (
            <div key={r.movimento}>
              <p className="tabular text-4xl font-bold text-lima">{r.peso}</p>
              <p className="mt-1.5 text-sm text-cinza">{r.movimento}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
