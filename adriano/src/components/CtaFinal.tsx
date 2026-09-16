import { linkWhatsApp } from '../contato'

export default function CtaFinal() {
  return (
    <section className="bg-grafite py-20 text-center text-white md:py-24">
      <div className="revelar mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl">Precisa de orçamento?</h2>
        <p className="mt-4 text-lg text-white/70">
          Me chame no WhatsApp e conta o que você precisa — água ou elétrica.
        </p>
        <a
          href={linkWhatsApp('Olá! Gostaria de um orçamento.')}
          target="_blank"
          rel="noreferrer"
          className="btn-contorno-claro mt-8"
        >
          Falar no WhatsApp
        </a>
      </div>
    </section>
  )
}
