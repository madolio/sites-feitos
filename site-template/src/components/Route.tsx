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

// Antes: lista vertical numerada, igual a praticamente qualquer seção "como
// funciona" por aí. Como o processo é de fato sequencial (isso legitima
// numerar), a numeração virou um trajeto de trem de verdade — uma linha
// horizontal com paradas no desktop, vertical no celular — em vez de uma
// lista de cards.
export default function Route() {
  return (
    <section id="atendimento" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-3xl text-ink md:text-4xl">O trajeto do atendimento</h2>
        </Reveal>

        {/* Desktop: linha horizontal com paradas */}
        <div className="relative mt-20 hidden md:block">
          <div className="absolute inset-x-0 top-[5px] h-px bg-line" aria-hidden="true" />
          <Reveal as="div" stagger={0.12} className="relative grid grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.title} className="relative pt-7 text-center">
                <span className="rivet absolute top-0 left-1/2 -translate-x-1/2" aria-hidden="true" />
                <h3 className="font-heading text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{step.description}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Celular: linha vertical */}
        <Reveal
          as="div"
          stagger={0.1}
          className="mt-14 space-y-8 border-l border-line pl-7 md:hidden"
        >
          {steps.map((step) => (
            <div key={step.title} className="relative">
              <span className="rivet absolute top-1.5 -left-[1.845rem]" aria-hidden="true" />
              <h3 className="font-heading text-lg text-ink">{step.title}</h3>
              <p className="mt-1 text-ink/70">{step.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
