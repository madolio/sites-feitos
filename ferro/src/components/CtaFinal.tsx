import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function CtaFinal() {
  return (
    <section className="bg-preto py-16 text-center text-branco md:py-24">
      <Reveal className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl text-branco md:text-4xl">Comece medindo, não chutando</h2>
        <p className="mt-4 text-cinza">Segunda a sábado, 6h às 22h.</p>

        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero saber mais sobre a Ferro.')}
          className="btn-contorno-claro mt-8"
        >
          Falar no WhatsApp
        </button>
      </Reveal>
    </section>
  )
}
