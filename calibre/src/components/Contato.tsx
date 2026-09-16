import { useState } from 'react'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [ideia, setIdeia] = useState('')
  const pronto = nome.trim().length > 1 && ideia.trim().length > 3

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pronto) return
    sendToWhatsApp(`Olá, Calibre! Meu nome é ${nome.trim()}.\nQuero conversar sobre: ${ideia.trim()}.`)
  }

  return (
    <footer id="contato" className="scroll-mt-20 px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="font-heading text-4xl font-medium text-cream sm:text-5xl">Vamos desenhar seu calibre?</h2>
          <p className="mt-3 max-w-md text-cream/65">
            Conta a ideia — caixa, mostrador, o que você quer ver quando virar o
            pulso — e eu respondo com um esboço.
          </p>

          <form onSubmit={enviar} className="mt-10 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-cream">Seu nome</span>
              <input
                type="text"
                autoComplete="given-name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line bg-black/20 px-4 py-3 text-cream focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-cream">Sua ideia</span>
              <textarea
                rows={3}
                value={ideia}
                onChange={(e) => setIdeia(e.target.value)}
                placeholder="Ex: um relógio pra usar todo dia, mostrador escuro"
                className="mt-2 w-full resize-none rounded-lg border border-line bg-black/20 px-4 py-3 text-cream focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
              />
            </label>
            <button type="submit" disabled={!pronto} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
              Enviar
            </button>
          </form>
        </Reveal>

        <Reveal className="mt-16 border-t border-line pt-6">
          <span className="font-heading text-lg font-medium text-brass">Calibre</span>
          <p className="mt-2 text-sm text-cream/60">
            A Calibre é uma relojoaria fictícia: este site é um conceito
            criado pela{' '}
            <a href="https://madolio.com.br" className="font-semibold underline underline-offset-4">
              Madolio
            </a>
            .
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
