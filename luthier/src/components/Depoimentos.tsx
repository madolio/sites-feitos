import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Ricardo M.',
    servico: 'Regulagem de ação · violão de aço',
    texto:
      'Levei meu violão pra regulagem de ação e voltou com a oitavação certa pela primeira vez em anos. A ficha técnica que veio junto trazia a bitola nova e o comprimento de escala, não só "ajustado".',
  },
  {
    autor: 'Juliana P.',
    servico: 'Restauro · violão dos anos 80',
    texto:
      'O leque harmônico do violão do meu avô tinha descolado. Recuperaram a estrutura e o verniz original ficou quase intacto. O instrumento voltou a soar do jeito que eu lembrava.',
  },
  {
    autor: 'Fernando A.',
    servico: 'Encomenda · violão clássico, tampo em cedro',
    texto:
      'Antes de fechar, ouvi amostra tocada ao vivo do cedro e do abeto na própria oficina. Escolhi cedro pelo timbre mais quente. Chegou em 70 dias, dentro da faixa combinada.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-t border-neblina/15 bg-painel/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="rotulo-mono">registro da bancada</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl sm:text-5xl">
            Quem já passou pela oficina.
          </h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.autor}
              className="relative rounded-2xl border border-neblina/25 bg-grafite p-6"
            >
              <span
                aria-hidden="true"
                className="rotulo-mono absolute top-5 right-5 text-cobre/70"
              >
                ok
              </span>
              <blockquote className="pr-8 text-sm text-osso/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="rotulo-mono mt-5 text-neblina">
                {d.autor} · {d.servico}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
