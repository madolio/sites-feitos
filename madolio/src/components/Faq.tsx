import { useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    q: 'Quanto tempo demora?',
    a: 'De 5 a 15 dias, do briefing à publicação — depende da complexidade do site e da rapidez em enviar os materiais.',
  },
  {
    q: 'O domínio é meu?',
    a: 'Sim. O site fica no seu próprio domínio, não numa conta que outra empresa controla.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'Metade no início, metade na entrega.',
  },
  {
    q: 'Tem revisão inclusa?',
    a: 'Sim, uma rodada de ajustes está incluída no preço.',
  },
  {
    q: 'E depois que o site estiver no ar?',
    a: 'Tem plano de manutenção disponível pra quem quiser — é só perguntar.',
  },
  {
    q: 'Quem faz o site, na prática?',
    a: 'Eu mesmo, do orçamento à entrega — sem repassar briefing pra terceiros.',
  },
]

// Gera o FAQPage schema.org direto da mesma lista que renderiza na tela —
// uma fonte só, sem risco do markup dizer uma coisa e o texto visível dizer
// outra (ver Agent-ready SEO: dados estruturados devem corroborar o
// conteúdo, nunca contradizer).
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: perguntas.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Reveal>
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">Perguntas frequentes</h2>
        </Reveal>

        <Reveal as="div" stagger={0.06} className="mt-12 divide-y divide-line border-y border-line">
          {perguntas.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-semibold text-ink">{item.q}</span>
                  <svg
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 shrink-0 text-ink/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                  >
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <p className="min-h-0 overflow-hidden pb-6 text-ink/70">{item.a}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
