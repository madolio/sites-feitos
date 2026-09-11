import { LAWYER_NAME, OAB, WHATSAPP_URL } from '../config/site'
import Reveal from './Reveal'
import Signature from './Signature'

const credentials = [
  { value: '12 anos', label: 'De atuação empresarial e civil' },
  { value: '180+', label: 'Contratos revisados por ano' },
  { value: '24h', label: 'Prazo de resposta ao primeiro contato' },
]

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-[0.9375rem] text-ink/60">
            {LAWYER_NAME} — {OAB}
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-[1.15] text-ink md:text-5xl">
            O contrato certo evita o processo errado.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ink/70">
            Assessoria jurídica empresarial e civil para quem prefere prevenir
            a remediar — contratos, sociedades e disputas civis, com um
            advogado que responde direto, sem intermediário.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Agendar consulta
            </a>
            <a href="#atuacao" className="btn-outline">
              Ver áreas de atuação
            </a>
          </div>
        </Reveal>

        <Reveal
          as="dl"
          stagger={0.1}
          delay={0.2}
          className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8"
        >
          {credentials.map((item) => (
            <div key={item.value}>
              <dt className="font-heading text-xl font-medium text-ink md:text-2xl">
                {item.value}
              </dt>
              <dd className="mt-1 text-sm text-ink/70">{item.label}</dd>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.4} className="mt-14">
          <Signature />
        </Reveal>
      </div>
    </section>
  )
}
