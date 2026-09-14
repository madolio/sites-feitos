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
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <Reveal>
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">Perguntas frequentes</h2>
        </Reveal>

        <Reveal as="dl" stagger={0.06} className="mt-12 divide-y divide-line border-y border-line">
          {perguntas.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-ink/70">{item.a}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
