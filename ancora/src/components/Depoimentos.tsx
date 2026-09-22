import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Marina T.',
    contexto: 'Cliente há 2 anos',
    texto:
      'Cheguei achando que precisava de dinheiro sobrando pra ter consultor. O diagnóstico mostrou que dava pra começar só organizando o que eu já tinha em três bancos diferentes.',
  },
  {
    autor: 'Renato F.',
    contexto: 'Planejamento sucessório',
    texto:
      'A gente adiou a holding por anos por achar complicado. A Âncora separou em etapas com prazo e hoje já está registrada, sem eu ter entendido metade dos termos jurídicos sozinho.',
  },
  {
    autor: 'Camila D.',
    contexto: 'Gestão de carteira',
    texto:
      'Na revisão trimestral eles apontaram que 40% da minha carteira estava parado em um fundo com taxa alta sem eu ter percebido. Realoquei na semana seguinte.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal>
          <p className="mono text-brass">Quem já fez o diagnóstico</p>
          <h2 className="mt-2 max-w-xl text-3xl md:text-4xl">Casos de quem organizou o patrimônio com a gente</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-sm border border-line bg-paper p-5">
              <blockquote className="text-sm text-indigo/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mono mt-4 text-indigo/60">
                {d.autor} · {d.contexto}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
