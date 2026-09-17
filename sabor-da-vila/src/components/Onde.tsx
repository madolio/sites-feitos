import Reveal from './Reveal'

// getDay(): 0 domingo .. 6 sábado.
const dias: { label: string; horario: string; diasDaSemana: number[] }[] = [
  { label: 'Terça a quinta', horario: '18h às 23h', diasDaSemana: [2, 3, 4] },
  { label: 'Sexta e sábado', horario: '18h às 00h', diasDaSemana: [5, 6] },
  { label: 'Domingo', horario: '18h às 22h', diasDaSemana: [0] },
  { label: 'Segunda', horario: 'Fechado', diasDaSemana: [1] },
]

export default function Onde() {
  return (
    <section id="onde" className="scroll-mt-36 border-t-[6px] border-blue py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="poster text-blue">
          <span className="riso-type text-6xl md:text-8xl">
            <span>Onde e quando</span>
            <span className="riso-pink" aria-hidden="true">
              Onde e quando
            </span>
          </span>
        </h2>

        <Reveal className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xl font-bold">Rua Cardeal Arcoverde, 812 — Vila Pompeia, São Paulo</p>
            <p className="mt-3 max-w-sm text-lg">
              Balcão com 6 mesas na calçada. Entrega num raio de 3 km — taxa
              calculada no fechamento do pedido.
            </p>
          </div>

          <dl className="divide-y-2 divide-dashed divide-blue/40 border-y-2 border-blue">
            {dias.map((d) => {
              // Marcado no cliente (não no SSR) pra não travar a data de build —
              // só um "hoje" carimbado ao lado da linha do dia certo, feito com
              // o mesmo picote/traço grosso do resto do site em vez de um badge
              // genérico com cantos arredondados.
              const hoje = d.diasDaSemana.includes(new Date().getDay())
              return (
                <div key={d.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="flex items-baseline gap-2 font-bold">
                    {d.label}
                    {hoje && (
                      <span className="poster rounded-none bg-yellow px-1.5 py-0.5 text-[0.6875rem] leading-none text-blue" style={{ mixBlendMode: 'multiply' }}>
                        HOJE
                      </span>
                    )}
                  </dt>
                  <dd className="tabular-nums text-ink/80">{d.horario}</dd>
                </div>
              )
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
