import { sendToWhatsApp } from '../demo'
import LoafCounter from './LoafCounter'

export default function Hero() {
  return (
    <section id="inicio" className="border-b-2 border-crosta pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 text-center md:grid-cols-2 md:text-left">
        <div className="order-2 md:order-1">
          <h1 className="text-5xl leading-[1.05] md:text-6xl">Pão quente, todo dia, sem pressa</h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-crosta/75 md:mx-0">
            Fermentação natural, sem conservante. O pão de hoje começou a
            descansar ontem à noite.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
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

        <div className="order-1 md:order-2">
          <img
            src="https://images.pexels.com/photos/30350350/pexels-photo-30350350.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Pães artesanais redondos, com casca dourada e crocante, recém-saídos do forno sobre uma grade de resfriamento na padaria"
            className="aspect-[4/3] w-full rounded-2xl border-2 border-crosta/15 object-cover"
            loading="eager"
            width={1200}
            height={900}
          />
        </div>
      </div>
    </section>
  )
}
