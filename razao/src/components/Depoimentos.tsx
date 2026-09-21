import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Padaria do João',
    regime: 'Simples Nacional',
    texto:
      'A Razão me avisou do DAS três dias antes do vencimento, no mês que eu tinha esquecido por causa da correria da padaria. Salvou meu CNPJ de ficar inadimplente.',
  },
  {
    autor: 'Marcos T.',
    regime: 'MEI',
    texto:
      'Abri meu MEI sozinho pelo site do governo e travei em duas telas. O escritório terminou a formalização numa tarde e ainda me mostrou quando o DAS-MEI vence todo mês.',
  },
  {
    autor: 'Camila R.',
    regime: 'Profissional liberal',
    texto:
      'Nunca tinha declarado Carnê-Leão na vida. Eles organizaram os recibos dos meus pacientes dos últimos seis meses e explicaram o cálculo sem economês.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-linha bg-papel-forte/40 py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-fiscal text-selo">Quem já regularizou</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Casos reais de quem não perdeu o prazo</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.autor}
              className="relative rounded-lg border border-linha bg-papel p-5 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="dado-fiscal absolute top-4 right-4 rotate-6 rounded border-2 border-selo/50 px-2 py-0.5 text-selo/60"
              >
                confere
              </span>
              <blockquote className="pr-16 text-sm text-tinta/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="dado-fiscal mt-4 text-tinta/60">
                {d.autor} · {d.regime}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
