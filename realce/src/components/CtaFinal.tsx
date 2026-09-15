import Lampadas, { ARCO } from './Lampadas'
import { sendToWhatsApp } from '../demo'

export default function CtaFinal() {
  return (
    <section className="bg-noite px-6 pb-24 text-luz">
      <div className="mx-auto max-w-2xl">
        <div className="relative pt-[20%] pb-10">
          <div
            className="absolute inset-0 border border-latao/35"
            style={{ borderRadius: `50% 50% 10px 10px / ${ARCO}% ${ARCO}% 10px 10px` }}
          />
          <Lampadas />

          <div className="relative px-6 text-center sm:px-12">
            {/* Slogan que eles já usam no site atual, só sem o erro de
                digitação do original ("cartão de vista"). */}
            <h2 className="text-3xl leading-snug sm:text-4xl">
              Sua beleza é seu cartão de visita.
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-fumo">
              Escolha os serviços, veja o horário fechar e mande pronto. A gente
              confirma no WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#visita" className="btn-jade">
                Montar minha visita
              </a>
              <button
                type="button"
                onClick={() =>
                  sendToWhatsApp('Olá! Queria informações sobre os serviços do Realce & Cia.')
                }
                className="btn-luz"
              >
                Só tirar uma dúvida
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
