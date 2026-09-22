import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Marina T.',
    situacao: 'comprou em Pinheiros',
    texto:
      'Vi o anúncio CH-0876 numa sexta-feira e visitei no sábado de manhã. Fechei proposta na segunda. Nunca pensei que ia ser tão rápido achar um studio decente perto do trabalho.',
  },
  {
    autor: 'Eduardo P.',
    situacao: 'alugou em Vila Mariana',
    texto:
      'Não tinha fiador e fiquei com medo de travar tudo. Me indicaram o seguro-fiança e resolveram em três dias.',
  },
  {
    autor: 'Camila S.',
    situacao: 'vendeu em Cotia',
    texto:
      'Publicaram meu terreno na quinta e já tinha duas visitas marcadas pro fim de semana. Vendi em duas semanas, sem drama de comissão escondida.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-line bg-ink/[0.03] py-14">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-xs tracking-[0.2em] text-ink/65 uppercase">Quem já fechou negócio</p>
          <h2 className="mt-2 max-w-xl text-3xl">Compradores, inquilinos e vendedores da última leva</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-8 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="border border-line bg-paper p-5">
              <blockquote className="text-sm text-ink/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 text-xs tracking-[0.1em] text-ink/65 uppercase">
                {d.autor} &middot; {d.situacao}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
