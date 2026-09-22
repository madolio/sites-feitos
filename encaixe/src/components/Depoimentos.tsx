import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Rafael M.',
    peca: 'Blazer de lã fria',
    texto:
      'Nunca tinha feito prova de roupa na vida. Na primeira, o ombro esquerdo ainda puxava um pouco. Ajustaram ali na hora e na entrega o blazer caiu certo dos dois lados.',
  },
  {
    autor: 'Beatriz S.',
    peca: 'Colete de tweed',
    texto:
      'Levei um tecido comprado em viagem, achando que ia dar problema. Conferiram a largura do rolo antes de cortar e sobrou pano até pra um ajuste futuro, se eu engordar ou emagrecer.',
  },
  {
    autor: 'Diego A.',
    peca: 'Calça de linho, corte slim',
    texto:
      'Pedi corte slim sem saber bem o que era. No figurino que me mostraram deu pra entender antes de cortar o tecido, e não depois de já estar pronto e sem volta.',
  },
]

export default function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="scroll-mt-24 border-b border-line bg-paper-deep/50 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="rotulo text-fio">Quem já vestiu</p>
          <h2 className="mt-2 max-w-xl font-heading text-3xl font-medium text-ink sm:text-4xl">
            Peças entregues, não promessas
          </h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="relative border border-line bg-paper p-5">
              <span
                aria-hidden="true"
                className="rotulo absolute top-4 right-4 rotate-6 border-2 border-fio/50 px-2 py-0.5 text-fio/60"
              >
                entregue
              </span>
              <blockquote className="pr-16 text-sm text-ink/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="rotulo mt-4 text-ink/60">
                {d.autor} · {d.peca}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
