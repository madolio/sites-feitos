import { sendToWhatsApp } from '../demo'
import PlateCounter from './PlateCounter'

export default function Hero() {
  return (
    <section id="inicio" className="border-b-4 border-iron bg-iron pt-28 pb-16 text-steel-50 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-5xl leading-[0.95] md:text-6xl">
          Treino de verdade,
          <br />
          sem enrolação
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-steel-50/75">
          Musculação, funcional e horário livre pra treinar no seu ritmo — sem
          turma cheia, sem fila pra aparelho.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá! Quero fazer uma aula experimental na Ferro.')}
            className="btn-signal"
          >
            Aula experimental grátis
          </button>
        </div>

        <div className="mt-14 border-t border-steel-50/20 pt-8">
          <span className="tally text-5xl text-signal md:text-6xl">
            <PlateCounter target={48500} />
          </span>
          <p className="mt-2 text-sm text-steel-50/60 uppercase">kg levantados por mês, só nessa unidade</p>
        </div>
      </div>
    </section>
  )
}
