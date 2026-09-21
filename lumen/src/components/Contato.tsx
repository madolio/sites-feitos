import { sendToWhatsApp } from '../demo'
import { useState } from 'react'
import Reveal from './Reveal'

export function Contato() {
  const [texto, setTexto] = useState('')

  return (
    <section id="contato" className="border-t border-fio bg-noite px-6 py-20">
      <Reveal className="mx-auto max-w-xl">
        <p className="font-mono text-sm tracking-widest text-acento uppercase">Contato</p>
        <h2 className="mt-3 text-3xl">Fale sobre o seu projeto</h2>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (texto.trim()) sendToWhatsApp(texto.trim())
          }}
        >
          <textarea
            rows={4}
            placeholder="ex: quero orçar a iluminação de um apartamento de 70m²"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="rounded-none border border-fio bg-carvao px-4 py-3 text-marfim outline-none focus:border-acento"
          />
          <button type="submit" disabled={!texto.trim()} className="btn-acento disabled:opacity-40">
            Enviar pelo WhatsApp
          </button>
        </form>

        <p className="mt-8 text-xs text-fumo">
          O Lúmen é um estúdio de luminotécnica fictício, conceito de site feito com{' '}
          <span aria-hidden="true" className="text-acento">
            ♥
          </span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 transition hover:text-marfim"
          >
            Madolio
          </a>
          .
        </p>
      </Reveal>
    </section>
  )
}
