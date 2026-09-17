import Reveal from './Reveal'

const prazos = [
  {
    swatch: '#f5c93a',
    title: '3 dias',
    text: 'de antecedência pra bolos de um andar. Bolo de andar ou festa com mais de 60 pessoas: 7 dias.',
  },
  {
    swatch: '#a2bb6f',
    title: '50% de sinal',
    text: 'garante a data na agenda. O restante é pago na retirada.',
  },
  {
    swatch: '#c4213a',
    title: 'Vila Mariana',
    text: 'Retirada no ateliê com hora marcada. Entregamos em São Paulo, com taxa por bairro.',
  },
]

export default function Prazos() {
  return (
    <section id="prazos" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="display text-5xl md:text-7xl">Prazos e retirada</h2>

        <Reveal as="dl" y={26} stagger={0.1} className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {prazos.map((p) => (
            <div key={p.title}>
              <span className="block h-3 w-full rounded-[3px]" style={{ background: p.swatch }} aria-hidden="true" />
              <dt className="display mt-5 text-4xl">{p.title}</dt>
              <dd className="mt-2 max-w-xs text-ink/75">{p.text}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
