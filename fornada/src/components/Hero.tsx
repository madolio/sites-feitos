import { sendToWhatsApp } from '../demo'
import LoafCounter from './LoafCounter'

export default function Hero() {
  return (
    <section id="inicio" className="border-b-2 border-crosta pt-28 pb-16 text-center md:pt-36 md:pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <h1 className="text-5xl leading-[1.05] md:text-6xl">Pão quente, todo dia, sem pressa</h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-crosta/75">
          Fermentação natural, sem conservante. O pão de hoje começou a
          descansar ontem à noite.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá! Quero saber o que tem fresquinho hoje na Fornada.')}
            className="btn-forno"
          >
            Ver o que saiu do forno agora
          </button>
        </div>

        <div className="mt-14 border-t border-crosta/15 pt-8">
          <span className="tally text-5xl text-forno md:text-6xl">
            <LoafCounter target={340} />
          </span>
          <p className="mt-2 text-sm text-crosta/60 uppercase">pães saindo do forno por dia</p>
        </div>
      </div>
    </section>
  )
}
