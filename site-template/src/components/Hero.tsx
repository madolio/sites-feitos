import { WHATSAPP_URL } from '../config/site'
import Reveal from './Reveal'
import Stamp from './Stamp'

const facts = [
  { value: '12 anos', label: 'de atuação' },
  { value: '180+', label: 'contratos revisados por ano' },
  { value: '24h', label: 'prazo de resposta' },
]

// Abre a página como a porta de uma sala de leitura: manchete, um selo que
// assenta uma vez (motion de entrada, não telemetria contínua) e os números
// que justificam a confiança antes de pedir qualquer coisa em troca.
export default function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="flex items-start gap-6 sm:gap-8">
          <Stamp />
          <div className="min-w-0 pt-1">
            <h1 className="text-4xl leading-[1.15] text-ink md:text-5xl">
              Um acervo jurídico organizado antes de você precisar dele.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/70">
              Direito empresarial e civil em São Paulo. Cada área de atuação
              tem ficha própria — com prazos, etapas e documentos claros
              desde a primeira conversa.
            </p>
          </div>
        </Reveal>

        <Reveal
          as="div"
          stagger={0.1}
          delay={0.1}
          className="mt-14 grid grid-cols-3 gap-4 border-t border-ink/15 pt-8 sm:gap-8"
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <div className="font-heading text-2xl text-ink sm:text-3xl">{fact.value}</div>
              <p className="mt-1.5 text-xs text-ink/60 sm:text-sm">{fact.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
            Agendar consulta
          </a>
          <a href="#acervo" className="btn-outline">
            Consultar o acervo
          </a>
        </Reveal>
      </div>
    </section>
  )
}
