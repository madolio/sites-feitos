import Reveal from './Reveal'

const areas = [
  {
    name: 'Direito contratual',
    description:
      'Elaboração e revisão de contratos comerciais, prestação de serviços e parcerias — pra fechar negócio sem deixar brecha.',
  },
  {
    name: 'Direito societário',
    description:
      'Constituição de sociedades, acordos entre sócios, alterações contratuais e reorganizações societárias.',
  },
  {
    name: 'Consultivo empresarial',
    description:
      'Orientação jurídica contínua pro dia a dia da empresa, antes que uma decisão vire um problema.',
  },
  {
    name: 'Contencioso civil',
    description:
      'Defesa e representação em disputas civis e empresariais, do acordo à sentença.',
  },
]

export default function PracticeAreas() {
  return (
    <section id="atuacao" className="scroll-mt-20 bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">Áreas de atuação</h2>
        </Reveal>

        <Reveal stagger={0.08} className="mt-10 border-t border-ink/15">
          {areas.map((area) => (
            <div key={area.name} className="grid gap-2 border-b border-ink/15 py-7 sm:grid-cols-[13rem_1fr] sm:gap-10">
              <h3 className="text-lg font-semibold text-ink">{area.name}</h3>
              <p className="max-w-md text-ink/70">{area.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
