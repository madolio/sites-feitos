import { useState } from 'react'
import { casos } from '../data/casos'
import DetalheSala from './DetalheSala'
import Planta from './Planta'
import Seletor from './Seletor'

// Uma coluna só, sem scroll controlando nada: a planta é grande e central,
// o detalhe do cômodo aparece embaixo dela quando você clica. Trocar de
// caso reseta o cômodo selecionado pro primeiro da nova planta.
export default function Explorador() {
  const [casoIndex, setCasoIndex] = useState(0)
  const [salaId, setSalaId] = useState(casos[0].salas[0].id)

  const caso = casos[casoIndex]
  const sala = caso.salas.find((s) => s.id === salaId) ?? caso.salas[0]

  const selecionarCaso = (i: number) => {
    setCasoIndex(i)
    setSalaId(casos[i].salas[0].id)
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-24 sm:px-10 lg:pt-32">
      <p className="max-w-md text-lg text-ink/75">
        Clique num cômodo da planta pra ver o material e a decisão de projeto
        por trás dele.
      </p>

      <div className="mt-8">
        <Seletor casos={casos} ativo={casoIndex} onSelect={selecionarCaso} />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-panel p-6 sm:p-10">
        <Planta salas={caso.salas} ativa={salaId} onSelect={setSalaId} />
      </div>

      <div className="mt-8">
        <DetalheSala caso={caso} sala={sala} />
      </div>
    </main>
  )
}
