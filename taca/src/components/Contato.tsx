import { useState } from 'react'
import { sendToWhatsApp } from '../demo'
import { CampoNumero } from './CampoNumero'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [pessoas, setPessoas] = useState('')
  const pronto = nome.trim().length > 1 && pessoas.trim().length > 0

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pronto) return
    sendToWhatsApp(`Olá, Taça! Meu nome é ${nome.trim()}.\nQuero agendar uma degustação pra ${pessoas.trim()} pessoa(s).`)
  }

  return (
    <footer id="contato" className="scroll-mt-20 px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-4xl font-medium text-ink sm:text-5xl">Vamos marcar uma visita?</h2>
        <p className="mt-3 max-w-md text-ink/65">
          A degustação inclui quatro rótulos e a caminhada pelo talhão — conta
          quantas pessoas vêm com você.
        </p>

        <form onSubmit={enviar} className="mt-10 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line bg-white/50 px-4 py-3 text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-garnet"
            />
          </label>
          <CampoNumero label="Quantas pessoas" value={pessoas} onChange={setPessoas} min={1} max={20} />
          <button type="submit" disabled={!pronto} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
            Pedir horários disponíveis
          </button>
        </form>

        <div className="mt-16 border-t border-line pt-6">
          <span className="font-heading text-lg font-medium text-garnet">Taça</span>
          <p className="mt-2 text-sm text-ink/50">
            A Taça é uma vinícola fictícia: este site é um conceito criado
            pela{' '}
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
