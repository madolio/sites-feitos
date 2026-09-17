import Reveal from './Reveal'

const phases = [
  {
    tminus: 'T-03',
    title: 'Primeiro contato',
    description: 'Você explica a situação por WhatsApp ou e-mail — sem custo.',
  },
  {
    tminus: 'T-02',
    title: 'Análise do caso',
    description: 'Avaliamos os documentos e os riscos envolvidos antes de propor caminho.',
  },
  {
    tminus: 'T-01',
    title: 'Proposta e escopo',
    description: 'Você recebe o plano de ação e o valor, sem letra pequena.',
  },
  {
    tminus: 'T-00',
    title: 'Execução e acompanhamento',
    description: 'A gente conduz o caso e te mantém informado em cada etapa.',
  },
]

// Substitui `Route.tsx` (trajeto de trem) — a numeração continua legítima
// porque o atendimento é de fato sequencial, mas agora lê como uma sequência
// de lançamento: contagem regressiva T-03 → T-00, cada fase com seu código
// em monoespaçada (dado real de ordem, não rótulo decorativo).
export default function Sequence() {
  return (
    <section id="atendimento" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-3xl text-ink md:text-4xl">Sequência de atendimento</h2>
        </Reveal>

        {/* Desktop: linha horizontal com marcadores de fase */}
        <div className="relative mt-20 hidden md:block">
          <div className="absolute inset-x-0 top-[9px] h-px bg-line" aria-hidden="true" />
          <Reveal as="div" stagger={0.12} className="relative grid grid-cols-4 gap-6">
            {phases.map((phase) => (
              <div key={phase.tminus} className="relative pt-9 text-center">
                <span
                  className="readout absolute top-0 left-1/2 -translate-x-1/2 bg-paper px-1.5 text-xs text-precision"
                  aria-hidden="true"
                >
                  {phase.tminus}
                </span>
                <h3 className="font-heading text-lg text-ink">{phase.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{phase.description}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Celular: linha vertical */}
        <Reveal
          as="div"
          stagger={0.1}
          className="mt-14 space-y-8 border-l border-line pl-8 md:hidden"
        >
          {phases.map((phase) => (
            <div key={phase.tminus} className="relative">
              <span
                className="readout absolute top-0.5 -left-[2.6rem] text-xs text-precision"
                aria-hidden="true"
              >
                {phase.tminus}
              </span>
              <h3 className="font-heading text-lg text-ink">{phase.title}</h3>
              <p className="mt-1 text-ink/70">{phase.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
