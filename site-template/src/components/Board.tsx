import { WHATSAPP_URL } from '../config/site'
import { areas } from '../data/areas'
import GateArrow from './GateArrow'
import Reveal from './Reveal'
import SplitFlap from './SplitFlap'

const stats = [
  { value: '12', suffix: ' anos', label: 'de atuação' },
  { value: '180', suffix: '+', label: 'contratos revisados por ano' },
  { value: '24', suffix: 'h', label: 'prazo de resposta' },
]

// Antes: Hero (headline + CTA + 3 estatísticas) e PracticeAreas (lista
// numerada num bloco escuro separado) eram duas seções distintas. Agora são
// uma coisa só — um quadro de partidas de verdade: a manchete abre a página,
// e o corpo é o próprio painel escuro, com as estatísticas como cabeçalho e
// cada área de atuação como uma "partida" (número, casos ativos rodando no
// SplitFlap, seta de embarque). O CTA só aparece DEPOIS do quadro — a ideia é
// mostrar o que o escritório faz antes de pedir o contato, não o contrário.
export default function Board() {
  return (
    <section className="pt-28 md:pt-36">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h1 className="text-4xl leading-[1.2] text-ink md:text-5xl">
            Assessoria jurídica que te diz exatamente por onde ir.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/70">
            Direito empresarial e civil em São Paulo — contratos, sociedades
            e disputas resolvidas antes de virarem processo, com resposta
            direta em até 24h.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-14 bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid grid-cols-3 gap-4 border-b border-paper/15 py-8 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl text-accent sm:text-3xl">
                  <SplitFlap value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="mt-1.5 text-xs text-paper/60 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-b border-paper/15 py-3 text-xs tracking-[0.14em] text-paper/55 uppercase">
            <span>Áreas de atuação</span>
            <span>Casos ativos</span>
          </div>

          <Reveal as="div" stagger={0.08} className="divide-y divide-paper/15">
            {areas.map((area) => (
              <div key={area.number} className="py-6">
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="w-7 shrink-0 font-heading text-lg text-accent sm:text-xl">{area.number}</span>
                  <h3 className="min-w-0 flex-1 font-heading text-lg text-paper">{area.name}</h3>
                  <div className="shrink-0 font-heading text-lg text-accent sm:text-xl">
                    <SplitFlap value={area.casos} />
                  </div>
                  <GateArrow className="hidden h-4 w-4 shrink-0 text-paper/30 sm:block" />
                </div>
                <p className="mt-2 pl-11 text-sm text-paper/60 sm:pl-[3.75rem]">{area.description}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Reveal>

      <div className="mx-auto max-w-3xl px-6 pt-10 pb-4">
        <Reveal className="flex flex-wrap gap-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
            Agendar consulta
          </a>
          <a href="#atendimento" className="btn-outline inline-flex items-center gap-2">
            Como funciona o atendimento
            <GateArrow className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
