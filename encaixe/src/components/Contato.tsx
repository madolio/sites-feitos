import { useState } from 'react'
import { sendToWhatsApp } from '../demo'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [pedido, setPedido] = useState('')
  const pronto = nome.trim().length > 1 && pedido.trim().length > 3

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pronto) return
    sendToWhatsApp(`Olá, Encaixe! Meu nome é ${nome.trim()}.\nQuero encomendar: ${pedido.trim()}.`)
  }

  return (
    <footer id="contato" className="scroll-mt-24 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-3xl font-medium text-ink sm:text-4xl">Vamos desenhar sua peça?</h2>
        <p className="mt-3 max-w-md text-ink/70">
          Conta o que você precisa e pra qual ocasião — eu respondo com uma
          ideia de tecido e um prazo.
        </p>

        <form onSubmit={enviar} className="mt-10 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full border border-line bg-white/60 px-4 py-3 text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">O que você quer encomendar</span>
            <textarea
              rows={3}
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              placeholder="Ex: um blazer pra usar no trabalho, tecido escuro"
              className="mt-2 w-full resize-none border border-line bg-white/60 px-4 py-3 text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </label>
          <button type="submit" disabled={!pronto} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
            Enviar pedido
          </button>
        </form>

        <div className="mt-16 border-t border-line pt-6">
          <span className="font-heading text-lg font-medium text-ink">Encaixe</span>
          <p className="mt-2 text-sm text-ink/60">
            A Encaixe é uma alfaiataria fictícia: este site é um conceito
            criado pela{' '}
            <a href="https://madolio.com.br" className="font-semibold underline underline-offset-4">
              Madolio
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
