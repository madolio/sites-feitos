import { sendToWhatsApp } from '../demo'

export default function CtaFinal() {
  return (
    <section id="contato" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl">Bora treinar?</h2>
        <p className="mt-4 text-iron/70">Segunda a sábado, 6h às 22h.</p>

        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero saber mais sobre a Ferro.')}
          className="btn-signal mt-8"
        >
          Falar no WhatsApp
        </button>
      </div>
    </section>
  )
}
