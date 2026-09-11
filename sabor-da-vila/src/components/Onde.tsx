const dias = [
  { label: 'Terça a quinta', horario: '18h às 23h' },
  { label: 'Sexta e sábado', horario: '18h às 00h' },
  { label: 'Domingo', horario: '18h às 22h' },
  { label: 'Segunda', horario: 'Fechado' },
]

export default function Onde() {
  return (
    <section id="onde" className="border-t-[6px] border-blue py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="poster text-blue">
          <span className="riso-type text-6xl md:text-8xl">
            <span>Onde e quando</span>
            <span className="riso-pink" aria-hidden="true">
              Onde e quando
            </span>
          </span>
        </h2>

        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xl font-bold">Rua Cardeal Arcoverde, 812 — Vila Pompeia, São Paulo</p>
            <p className="mt-3 max-w-sm text-lg">
              Balcão com 6 mesas na calçada. Entrega num raio de 3 km — taxa
              calculada no fechamento do pedido.
            </p>
          </div>

          <dl className="divide-y-2 divide-dashed divide-blue/40 border-y-2 border-blue">
            {dias.map((d) => (
              <div key={d.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-bold">{d.label}</dt>
                <dd className="tabular-nums text-ink/80">{d.horario}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
