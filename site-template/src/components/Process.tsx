import GateArrow from './GateArrow'
import Reveal from './Reveal'

const steps = [
  {
    title: 'Primeiro contato',
    description: 'Você explica a situação por WhatsApp ou e-mail — sem custo.',
  },
  {
    title: 'Análise do caso',
    description: 'Avaliamos os documentos e os riscos envolvidos antes de propor caminho.',
  },
  {
    title: 'Proposta e escopo',
    description: 'Você recebe o plano de ação e o valor, sem letra pequena.',
  },
  {
    title: 'Execução e acompanhamento',
    description: 'A gente conduz o caso e te mantém informado em cada etapa.',
  },
]

export default function Process() {
  return (
    <section id="atendimento" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-3xl text-ink md:text-4xl">Como funciona o atendimento</h2>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 space-y-0">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-5 border-b border-line py-6 last:border-b-0">
              <span className="font-heading text-xl text-accent-hover">{i + 1}</span>
              <div className="flex-1">
                <h3 className="font-heading text-lg text-ink">{step.title}</h3>
                <p className="mt-1 text-ink/70">{step.description}</p>
              </div>
              {i < steps.length - 1 && <GateArrow className="mt-1 h-4 w-4 shrink-0 text-ink/25" />}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
