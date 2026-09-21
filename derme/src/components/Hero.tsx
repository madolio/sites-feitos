import { procedimentos } from '../data/procedimentos'
import ProcedureTimeline from './ProcedureTimeline'
import SkinLayerDiagram from './SkinLayerDiagram'

const destaque = procedimentos.find((p) => p.id === 'peeling-medio')!

export default function Hero() {
  return (
    <section className="border-b border-linha bg-papel">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="dado-clinico text-clinico">Cútis Dermatologia, Curitiba, PR</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
            O resultado de cada procedimento, documentado dia a dia
          </h1>
          <p className="mt-5 max-w-lg text-lg text-noturno/80">
            Cada procedimento do nosso catálogo vem com a linha do tempo real de recuperação e a camada de pele que
            ele efetivamente trata. Arraste ao lado e veja o que muda entre o dia 0 e o dia 60 de um peeling médio.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#procedimentos" className="btn-clinico">
              Ver todos os procedimentos
            </a>
            <a href="#contato" className="btn-outline">
              Agendar avaliação
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-linha bg-white/70 p-5 sm:p-6">
          <p className="dado-clinico text-derme">{destaque.nome}</p>
          <div className="mt-4">
            <ProcedureTimeline marcos={destaque.marcos} compact />
          </div>
          <div className="mt-5">
            <SkinLayerDiagram camada={destaque.camada} camadaLabel={destaque.camadaLabel} />
          </div>
        </div>
      </div>
    </section>
  )
}
