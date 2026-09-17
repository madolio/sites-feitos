import { CASE_REF, WHATSAPP_URL } from '../config/site'
import { areas } from '../data/areas'
import Readout from './Readout'
import Reveal from './Reveal'
import SessionTimer from './SessionTimer'
import StatusLight from './StatusLight'

const stats = [
  { value: '12', suffix: ' anos', label: 'de atuação' },
  { value: '180', suffix: '+', label: 'contratos revisados por ano' },
  { value: '24', suffix: 'h', label: 'prazo de resposta' },
]

// Substitui Hero + PracticeAreas (agora fundidos, igual antes) — mas a
// estrutura mudou de "quadro de partidas" pra "painel de controle
// acompanhando um caso ao vivo". O cabeçalho é um rastreador de sessão de
// verdade (nº de processo + cronômetro subindo a cada segundo), e as áreas
// de atuação viram um checklist de sistemas GO/NO-GO — cada linha "arma"
// (luz cinza vira verde) conforme entra na tela, em vez de ficar estática.
export default function Docket() {
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
          {/* Rastreador de sessão — o "colide" do Q3: número de processo real
              no lugar de um nº de voo, cronômetro que conta pra frente sem
              parar, não uma métrica estática. */}
          <div className="telemetry-grid flex flex-wrap items-center justify-between gap-3 border-b border-paper/15 py-4">
            <div className="flex items-center gap-2 text-[0.6875rem] tracking-[0.14em] text-paper/60 uppercase">
              <span className="pulse-live h-2 w-2 rounded-full bg-hold" aria-hidden="true" />
              Processo nº <span className="readout text-paper">{CASE_REF}</span>
            </div>
            <div className="text-[0.6875rem] tracking-[0.14em] text-paper/60 uppercase">
              Tempo de sessão <SessionTimer className="ml-2 text-precision" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b border-paper/15 py-8 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl text-precision sm:text-3xl">
                  <Readout value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="mt-1.5 text-xs text-paper/60 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-b border-paper/15 py-3 text-xs tracking-[0.14em] text-paper/55 uppercase">
            <span>Checklist de sistemas</span>
            <span>Casos ativos</span>
          </div>

          <Reveal as="div" stagger={0.08} className="divide-y divide-paper/15">
            {areas.map((area) => (
              <div key={area.code} className="py-6">
                <div className="flex items-center gap-4 sm:gap-8">
                  <StatusLight className="h-2 w-2" />
                  <span className="readout w-16 shrink-0 text-xs text-paper/50 sm:text-sm">
                    {area.code}
                  </span>
                  <h3 className="min-w-0 flex-1 font-heading text-lg text-paper">{area.name}</h3>
                  <div className="shrink-0 font-heading text-lg text-precision sm:text-xl">
                    <Readout value={area.casos} />
                  </div>
                  <span className="hidden text-[0.6875rem] font-semibold tracking-[0.14em] text-go uppercase sm:block">
                    GO
                  </span>
                </div>
                <p className="mt-2 pl-14 text-sm text-paper/60 sm:pl-24">{area.description}</p>
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
          <a href="#atendimento" className="btn-outline">
            Como funciona o atendimento
          </a>
        </Reveal>
      </div>
    </section>
  )
}
