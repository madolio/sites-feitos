import { WHATSAPP_URL } from '../constants'
import Reveal from './Reveal'

export default function CtaFinal() {
  return (
    <section id="contato" className="scroll-mt-20 bg-void py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-poster text-4xl tracking-tight text-white uppercase md:text-5xl">
          Bora colocar seu negócio no ar?
        </h2>
        <p className="mt-4 text-fog">Resposta rápida no WhatsApp, sem enrolação.</p>

        <div className="mt-8">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-ghost">
            Falar no WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  )
}
