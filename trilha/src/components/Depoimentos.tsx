import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata M.',
    fase: 'Controle da dor',
    texto:
      'Cheguei mal conseguindo dobrar o joelho de tanta dor. Nas primeiras duas semanas o foco foi só baixar a inflamação, nada de força ainda. Foi frustrante no início, mas entendi depois que sem isso o resto não ia funcionar.',
  },
  {
    autor: 'Diego S.',
    fase: 'Amplitude de movimento',
    texto:
      'Depois da cirurgia no ombro eu não conseguia nem pentear o cabelo. Passei um mês inteiro só recuperando o movimento antes de qualquer exercício com peso. Cada grau de amplitude a mais parecia uma vitória.',
  },
  {
    autor: 'Beatriz A.',
    fase: 'Retorno funcional',
    texto:
      'Voltei a correr depois de sete meses de fisioterapia por causa de uma lesão no tendão. A fase de fortalecimento foi a mais longa e mais puxada, mas os testes antes da alta me deram confiança de que o joelho ia aguentar.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-linha bg-papel-forte/40 py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-mapa text-altitude">Quem já andou a trilha</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Relatos de cada trecho do percurso</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.autor}
              className="relative rounded-lg border border-linha bg-papel p-5 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="dado-mapa absolute top-4 right-4 rotate-6 rounded border-2 border-trilha/50 px-2 py-0.5 text-trilha/70"
              >
                marco
              </span>
              <blockquote className="pr-16 text-sm text-tinta/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="dado-mapa mt-4 text-tinta/60">
                {d.autor} · {d.fase}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
