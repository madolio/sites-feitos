import { sendToWhatsApp } from '../demo'

export default function CtaFinal() {
  return (
    <section id="contato" className="bg-farinha py-16 text-center md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl md:text-4xl">Passa aqui hoje</h2>
        <p className="mt-4 text-crosta/70">Terça a domingo, 6h30 às 19h.</p>

        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero saber mais sobre a Fornada.')}
          className="btn-forno mt-8"
        >
          Falar no WhatsApp
        </button>
      </div>
    </section>
  )
}
