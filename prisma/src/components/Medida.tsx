import { useState } from 'react'
import { CampoNumero } from './CampoNumero'
import Reveal from './Reveal'

// circunferência = π × diâmetro — geometria pura, não uma tabela decorada.
// O "aro" brasileiro exibido é a aproximação que a própria joalheria usa
// (aro ≈ diâmetro em mm − 11,6), marcada como estimativa: a medida exata
// sempre depende do anelímetro físico na hora da prova.
function circunferenciaParaAro(circunferenciaMm: number) {
  const diametro = circunferenciaMm / Math.PI
  const aro = Math.round(diametro - 11.6)
  return { diametro, aro }
}

export default function Medida() {
  const [circunferencia, setCircunferencia] = useState(54)
  const { diametro, aro } = circunferenciaParaAro(circunferencia)

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <Reveal as="h2" className="font-display text-3xl sm:text-4xl">
        Qual é o seu aro?
      </Reveal>
      <Reveal delay={0.08} as="p" className="mt-3 max-w-lg text-fumo">
        Meça a circunferência do dedo com um fio ou uma tira de papel (em milímetros) — o diâmetro e o aro vêm de
        geometria pura (circunferência ÷ π), não de uma tabela chutada.
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <CampoNumero
          label="Circunferência do dedo (mm)"
          value={circunferencia}
          onChange={setCircunferencia}
          min={30}
          max={90}
          step={0.5}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-fio bg-carvao p-5">
            <p className="text-xs text-fumo">Diâmetro</p>
            <p className="tabular font-display text-3xl">{diametro.toFixed(1)} mm</p>
          </div>
          <div className="rounded-2xl border border-acento bg-carvao p-5">
            <p className="text-xs text-fumo">Aro (BR) — estimativa</p>
            <p className="tabular font-display text-3xl text-acento">{aro}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05} as="p" className="mt-6 max-w-lg text-sm text-fumo">
        Pedimos a medida exata só na hora de fechar o pedido — com anelímetro de verdade, sem depender só da
        calculadora.
      </Reveal>
    </section>
  )
}
