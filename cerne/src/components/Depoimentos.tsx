import Reveal from './Reveal'

// Três casos concretos, amarrados ao método de Processo.tsx (material antes
// de planta, acompanhamento na obra), não elogio genérico de "adorei o
// resultado".
const depoimentos = [
  {
    autor: 'Renata M.',
    caso: 'Sala de estar',
    texto:
      'A gente ia trocar o piso da sala sem pensar duas vezes. A Cerne mostrou que o concreto aparente que já tínhamos no corredor combinava melhor e custava menos que o porcelanato que eu queria.',
  },
  {
    autor: 'Diego A.',
    caso: 'Cozinha e home office',
    texto:
      'Trabalho de casa e queria um canto de escritório na cozinha. Eles vieram, viram que eu ficava sentado ali das 8h às 11h todo dia por causa da luz, e desenharam a bancada considerando isso.',
  },
  {
    autor: 'Beatriz L.',
    caso: 'Apartamento, reforma completa',
    texto:
      'No meio da obra o pedreiro ia instalar o rodapé errado. Como a Cerne estava acompanhando, pegaram antes de fechar a parede. Sem isso eu só ia notar depois de pronto.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-t border-line bg-panel px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <span className="text-sm font-medium text-pine">Quem já projetou com a gente</span>
          <h2 className="mt-2 text-3xl text-ink sm:text-4xl">Decisões que mudaram o resultado</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-2xl border border-line bg-paper p-6">
              <blockquote className="text-ink/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-ink/60">
                <span className="font-medium text-ink">{d.autor}</span> · {d.caso}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
