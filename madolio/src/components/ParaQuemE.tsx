import Reveal from './Reveal'

const fazSentido = [
  'Você já tem um negócio rodando e precisa de presença profissional rápida.',
  'Você quer parar de perder cliente porque "não tem site".',
  'Você prefere resolver tudo direto com uma pessoa, sem repassar briefing pra agência.',
]

const naoFazSentido = [
  'Você precisa de loja virtual com catálogo grande e carrinho de compras.',
  'Você quer atualizar o conteúdo sozinho todo dia — o site é sob medida, não um builder.',
  'Você está procurando o mais barato do mercado, não o mais bem feito.',
]

export default function ParaQuemE() {
  return (
    <section className="bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">
            Pra quem é — e pra quem não é
          </h2>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-poster text-sm tracking-wider text-accent uppercase">Faz sentido se</h3>
            <ul className="mt-4 space-y-3">
              {fazSentido.map((item) => (
                <li key={item} className="flex gap-3 text-ink/80">
                  <span className="text-accent">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:border-l md:border-line md:pl-16">
            <h3 className="font-poster text-sm tracking-wider text-ink/50 uppercase">Não faz sentido se</h3>
            <ul className="mt-4 space-y-3">
              {naoFazSentido.map((item) => (
                <li key={item} className="flex gap-3 text-ink/60">
                  <span className="text-ink/40">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
