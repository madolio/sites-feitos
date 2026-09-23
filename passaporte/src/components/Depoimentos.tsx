import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Marina T.',
    idioma: 'Inglês',
    nivel: 'C1',
    detalhe: 'C1 em 18 meses',
    texto:
      'Troquei três vezes de horário sem perder nenhuma reposição, e cheguei no C1 já sabendo defender uma apresentação em inglês no trabalho.',
  },
  {
    autor: 'Diego F.',
    idioma: 'Alemão',
    nivel: 'B1',
    detalhe: 'B1 em 7 meses',
    texto:
      'O professor corrigia minha pronúncia toda aula, não só quando eu errava feio. Depois de sete meses parei de traduzir na cabeça antes de falar.',
  },
  {
    autor: 'Helena Q.',
    idioma: 'Espanhol',
    nivel: 'B2',
    detalhe: 'Preparo DELE',
    texto:
      'Fiz o simulado de DELE três semanas antes da prova oficial e passei o B2 com folga. Sem o simulado eu teria ido no escuro.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-16 border-t border-line bg-paper py-20 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="stamp-number text-sm tracking-widest text-teal uppercase">Vistos aprovados</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Quem já carimbou o próprio passaporte</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-6 sm:grid-cols-3">
          {depoimentos.map((d, i) => (
            <figure
              key={d.autor}
              className="relative rounded-sm border-2 border-dashed border-ink/25 p-5"
            >
              <span
                aria-hidden="true"
                className="stamp-number absolute top-4 right-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-teal text-xs font-bold text-teal"
                style={{ transform: `rotate(${i % 2 === 0 ? -8 : 6}deg)` }}
              >
                {d.nivel}
              </span>
              <blockquote className="pr-14 text-sm text-ink/85">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="stamp-number mt-4 text-xs tracking-widest text-ink/60 uppercase">
                {d.autor} · {d.idioma} · {d.detalhe}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
