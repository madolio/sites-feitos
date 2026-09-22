import Reveal from './Reveal'

// Depoimentos distintos dos de Resultados.tsx (que já cita Marcelo, Juliana
// e Rafael em linha) — aqui é uma prova social mais detalhada, com o caso
// concreto por trás do resultado, não repetição das mesmas falas curtas.
const depoimentos = [
  {
    autor: 'Bianca Souza',
    programa: 'Base de força',
    texto:
      'Comecei sem nunca ter pegado numa barra. Nas primeiras semanas o personal cortou a carga pela metade do que eu achava que aguentava, e foi exatamente por isso que não travei o ombro como da última vez que tentei sozinha numa academia.',
  },
  {
    autor: 'Thiago Almeida',
    programa: 'Condicionamento',
    texto:
      'Trabalho em turno e faltava horário fixo pra malhar. Aqui o circuito cabe em 40 minutos, e quando preciso remarcar é só mandar mensagem: nunca perdi aula por causa da escala.',
  },
  {
    autor: 'Renata Lima',
    programa: 'Mobilidade',
    texto:
      'Levei uma lesão de joelho pro Pulso achando que ia ter que parar de treinar. O programa foi reajustado na hora, sem cobrar aula extra, e hoje agacho com carga maior do que antes da lesão.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-16 border-t-4 border-track bg-chalk py-20 md:py-28 lg:pl-16">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">Quem já correu essa pista</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="border-t-2 border-lane-ink pt-5">
              <blockquote className="text-track/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="stopwatch mt-4 text-sm text-lane-ink uppercase">
                {d.autor} · {d.programa}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
