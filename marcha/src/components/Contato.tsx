import { useState } from 'react'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export function Contato() {
  const [texto, setTexto] = useState('')

  return (
    <section id="contato" className="relative overflow-hidden bg-preto px-6 py-20 md:py-28">
      <img
        src="/carros/floresta.jpg"
        alt=""
        width={1600}
        height={1126}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-preto/70" />
      <Reveal className="relative mx-auto max-w-xl">
        <p className="font-mono text-sm tracking-widest text-acento uppercase">Contato</p>
        <h2 className="mt-3 text-3xl text-marfim sm:text-4xl">Fale com a Marcha</h2>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (texto.trim()) sendToWhatsApp(texto.trim())
          }}
        >
          <textarea
            rows={4}
            placeholder="ex: quero agendar um test-drive pro sábado de manhã"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="rounded-md border border-fio bg-carvao px-4 py-3 text-marfim outline-none focus:border-acento"
          />
          <button type="submit" disabled={!texto.trim()} className="btn-acento disabled:opacity-40">
            Enviar pelo WhatsApp
          </button>
        </form>

        <p className="mt-8 text-xs text-fumo">A Marcha é uma concessionária fictícia, conceito de site criado pela Madolio.</p>
      </Reveal>
    </section>
  )
}
