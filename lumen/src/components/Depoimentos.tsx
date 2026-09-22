import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata M.',
    projeto: 'Apartamento, 70m²',
    texto:
      'Troquei uma sala com uma lâmpada só no meio por três camadas de luz. À noite parece outro apartamento, e o cálculo de lux bateu certinho com o que eles tinham prometido.',
  },
  {
    autor: 'Thiago S.',
    projeto: 'Loja de roupas',
    texto:
      'A vitrine antiga ofuscava quem passava na rua. Reposicionaram os spots e mudaram o ângulo de feixe, e agora dá pra ver a roupa sem apertar o olho de fora.',
  },
  {
    autor: 'Beatriz C.',
    projeto: 'Casa, reforma completa',
    texto:
      'Demorou cinco semanas como combinado, com uma visita a mais porque pedi pra mudar a cor de um ambiente no meio do processo. Não cobraram nada extra por isso.',
  },
]

export function Depoimentos() {
  return (
    <section id="depoimentos" className="border-t border-fio bg-noite px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Quem já iluminou</p>
          <h2 className="mt-3 max-w-xl text-3xl">Projetos que já saíram do papel</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="border border-fio bg-carvao p-5">
              <blockquote className="text-sm text-marfim/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="font-mono mt-4 text-xs tracking-wide text-fumo uppercase">
                {d.autor} · {d.projeto}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
