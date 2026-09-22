import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata M.',
    contexto: 'aluna de Aparelhos há 8 meses',
    texto:
      'Eu tinha dor lombar direto no fim do dia sentada no trabalho. Depois de uns dois meses de aula duas vezes por semana a dor quase sumiu, e a Helena ajustou o exercício quando contei que tinha piorado numa semana.',
    cor: '#f2b300',
  },
  {
    autor: 'Thiago A.',
    contexto: 'reabilitação de joelho, hoje aluno regular',
    texto:
      'Vim fazer reabilitação de joelho depois de uma cirurgia e fiquei. A Helena pediu o relatório do meu ortopedista antes da primeira aula e montou a sequência em cima disso.',
    cor: '#2f8f5b',
  },
  {
    autor: 'Beatriz S.',
    contexto: 'trocou Aparelhos por Solo por causa de viagens',
    texto:
      'Viajo muito a trabalho e não conseguia manter a turma fixa de Aparelhos. Troquei pra Solo, que tem mais horário livre, e não perdi o ritmo mesmo com a agenda bagunçada.',
    cor: '#2c4fa3',
  },
]

export default function Depoimentos() {
  return (
    <section id="alunos" className="scroll-mt-16 border-t-2 border-ink py-20 md:py-28 lg:scroll-mt-0">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="display text-6xl md:text-8xl">Quem já passou pelo trilho.</h2>

        <Reveal delay={0.05} stagger={0.08} className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="relative border-2 border-ink p-6">
              <span
                aria-hidden="true"
                className="absolute top-5 right-5 h-3 w-3 rounded-full"
                style={{ backgroundColor: d.cor }}
              />
              <blockquote className="pr-6 text-ink/85">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="font-mono mt-5 text-sm text-ink/60">
                {d.autor} · {d.contexto}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
