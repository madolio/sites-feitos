import { sendToWhatsApp } from '../demo'

export default function CtaFinal() {
  return (
    <section id="contato" className="py-16 text-center md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl md:text-4xl">Bora treinar old school?</h2>
        <p className="mt-4 text-smoke">Segunda a sábado, 6h às 22h. Sem playlist de app — a trilha é nossa.</p>

        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero saber mais sobre a Ferro.')}
          className="btn-rust mt-8"
        >
          Falar no WhatsApp
        </button>
      </div>
    </section>
  )
}
