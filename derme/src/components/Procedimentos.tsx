import { useState } from 'react'
import { procedimentos } from '../data/procedimentos'
import SkinLayerDiagram from './SkinLayerDiagram'
import ProcedureTimeline from './ProcedureTimeline'
import Reveal from './Reveal'

export default function Procedimentos() {
  const [selecionado, setSelecionado] = useState(procedimentos[0].id)
  const [indice, setIndice] = useState(0)
  const atual = procedimentos.find((p) => p.id === selecionado) ?? procedimentos[0]

  return (
    <section id="procedimentos" className="border-t border-linha bg-papel py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-clinico text-clinico">Catálogo clínico</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Cada procedimento, com a recuperação que ele de fato tem</h2>
          <p className="mt-3 max-w-2xl text-noturno/75">
            Escolha um procedimento e arraste a linha do tempo. Os dias e reações abaixo são as faixas típicas
            descritas na literatura dermatológica, não uma promessa fechada de resultado individual.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Procedimentos">
            {procedimentos.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === selecionado}
                onClick={() => {
                  setSelecionado(p.id)
                  setIndice(0)
                }}
                className={
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                  (p.id === selecionado
                    ? 'border-clinico bg-clinico text-papel'
                    : 'border-linha text-noturno/75 hover:border-clinico hover:text-clinico')
                }
              >
                {p.nome}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 grid gap-8 rounded-2xl border border-linha bg-white/60 p-6 sm:grid-cols-[1.1fr_1fr] sm:p-8">
            <div>
              <p className="dado-clinico text-derme">{atual.categoria}</p>
              <h3 className="mt-1 text-2xl">{atual.nome}</h3>
              <p className="mt-3 text-noturno/80">{atual.mecanismo}</p>
              <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="dado-clinico text-noturno/50">Protocolo</dt>
                  <dd className="mt-1">{atual.protocolo}</dd>
                </div>
                <div>
                  <dt className="dado-clinico text-noturno/50">Duração do resultado</dt>
                  <dd className="mt-1">{atual.duracaoResultado}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <SkinLayerDiagram camada={atual.camada} camadaLabel={atual.camadaLabel} marco={atual.marcos[indice]} />
              </div>
            </div>

            <div className="rounded-xl border border-linha bg-papel p-5">
              <p className="dado-clinico text-noturno/50">Linha do tempo de recuperação</p>
              <div className="mt-3">
                <ProcedureTimeline marcos={atual.marcos} key={atual.id} index={indice} onIndexChange={setIndice} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
