import { WHATSAPP_URL } from '../config/site'
import GateArrow from './GateArrow'
import Reveal from './Reveal'
import SplitFlap from './SplitFlap'

const board = [
  { value: '12', suffix: ' anos', label: 'de atuação empresarial e civil' },
  { value: '180', suffix: '+', label: 'contratos revisados por ano' },
  { value: '24', suffix: 'h', label: 'prazo de resposta ao primeiro contato' },
]

export default function Hero() {
  return (
    <section className="pt-32 pb-0 md:pt-40">
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

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Agendar consulta
            </a>
            <a href="#atuacao" className="btn-outline inline-flex items-center gap-2">
              Ver áreas de atuação
              <GateArrow className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* O painel de embarque — assinatura visual e de motion da página. */}
      <Reveal delay={0.15} className="mt-16 bg-ink text-paper">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-6 px-6 py-10">
          {board.map((item) => (
            <div key={item.label}>
              <div className="font-heading text-3xl text-accent md:text-4xl">
                <SplitFlap value={item.value} />
                {item.suffix}
              </div>
              <p className="mt-2 text-sm text-paper/65">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
