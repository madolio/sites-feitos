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
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">Como funciona o atendimento</h2>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 space-y-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-6">
              <span className="font-heading text-2xl text-accent/50">{i + 1}</span>
              <div className="border-l border-line pl-6">
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-ink/70">{step.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
