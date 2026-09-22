import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Camila V.',
    pet: 'Nino',
    texto:
      'A carteirinha do Nino ficou perdida numa mudança e eles reconstruíram o histórico de vacina inteiro só com a data que eu lembrava. Isso me poupou de vacinar tudo de novo sem necessidade.',
  },
  {
    autor: 'Fábio R.',
    pet: 'Mel',
    texto:
      'Levei a Mel achando que era só banho e o veterinário notou um caroço que eu nem tinha visto. Encaminhou pra exame na hora e pegou cedo — hoje ela está bem.',
  },
  {
    autor: 'Juliana T.',
    pet: 'Thor',
    texto:
      'Ligaram no dia seguinte à vacina do Thor só pra confirmar que ele não tinha reação. Nunca uma clínica tinha feito esse retorno sem eu pedir.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-24 border-t border-line bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal as="h2" className="text-3xl text-paper sm:text-4xl">
          Ficha de quem já passou por aqui
        </Reveal>

        <Reveal as="div" delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="relative rounded-lg border border-paper/20 bg-paper/5 p-5">
              <span
                aria-hidden="true"
                className="stamp stamp-tilt absolute top-4 right-4 flex h-12 w-12 items-center justify-center text-center text-[0.55rem] leading-tight font-bold text-accent uppercase"
              >
                em dia
              </span>
              <blockquote className="pr-14 text-sm text-paper/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-paper/70">
                {d.autor} · tutor(a) do {d.pet}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
