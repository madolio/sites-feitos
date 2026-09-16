import { useState } from 'react'
import { sendToWhatsApp } from '../demo'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [ideia, setIdeia] = useState('')

  const enviar = () => {
    const msg = `Olá! Sou ${nome || '[nome]'} e quero compor uma fragrância: ${ideia || '[ideia]'}`
    sendToWhatsApp(msg)
  }

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-xl">
        <h2 className="font-display text-3xl sm:text-4xl">Vamos compor sua fragrância</h2>
        <p className="mt-3 text-fumo">Conte memórias, gostos, ocasião — e retornamos pelo WhatsApp.</p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="rounded-xl border border-fio bg-carvao px-4 py-3 text-marfim outline-none placeholder:text-fumo focus-visible:border-acento"
          />
          <textarea
            value={ideia}
            onChange={(e) => setIdeia(e.target.value)}
            placeholder="Descreva a fragrância que você imagina"
            rows={4}
            className="rounded-xl border border-fio bg-carvao px-4 py-3 text-marfim outline-none placeholder:text-fumo focus-visible:border-acento"
          />
          <button type="button" onClick={enviar} className="btn-acento self-start">
            Enviar pelo WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
