import GateArrow from './GateArrow'
import Reveal from './Reveal'

const areas = [
  {
    number: '01',
    name: 'Direito contratual',
    description:
      'Elaboração e revisão de contratos comerciais, prestação de serviços e parcerias — pra fechar negócio sem deixar brecha.',
  },
  {
    number: '02',
    name: 'Direito societário',
    description:
      'Constituição de sociedades, acordos entre sócios, alterações contratuais e reorganizações societárias.',
  },
  {
    number: '03',
    name: 'Consultivo empresarial',
    description:
      'Orientação jurídica contínua pro dia a dia da empresa, antes que uma decisão vire um problema.',
  },
  {
    number: '04',
    name: 'Contencioso civil',
    description:
      'Defesa e representação em disputas civis e empresariais, do acordo à sentença.',
  },
]

export default function PracticeAreas() {
  return (
    <section id="atuacao" className="scroll-mt-20 bg-surface-alt py-20 text-paper md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-3xl text-paper md:text-4xl">Áreas de atuação</h2>
        </Reveal>

        <Reveal stagger={0.08} className="mt-10 border-t border-paper/15">
          {areas.map((area) => (
            <div
              key={area.number}
              className="flex gap-6 border-b border-paper/15 py-7 sm:gap-10"
            >
              <span className="font-heading text-2xl text-accent">{area.number}</span>
              <div className="flex-1">
                <h3 className="flex items-center gap-2 font-heading text-lg text-paper">
                  {area.name}
                </h3>
                <p className="mt-2 max-w-md text-paper/70">{area.description}</p>
              </div>
              <GateArrow className="mt-1 h-4 w-4 shrink-0 text-paper/30" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
