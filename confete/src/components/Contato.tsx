import { useState } from 'react'
import { pacotes } from '../data'
import { sendToWhatsApp } from '../demo'
import { Mark } from './Nav'

export default function Contato() {
  const [pacote, setPacote] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const ready = pacote !== null && nome.trim().length > 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Confete! Quero um orçamento pro pacote ${pacote}.\nMeu nome é ${nome.trim()}.`)
  }

  return (
    <footer id="contato" className="scroll-mt-24 border-t-[1.5px] border-carbon py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-4xl sm:text-5xl">Bora marcar a data?</h2>
        <p className="mt-3 max-w-md text-lg text-carbon/80">
          Conta o pacote e o nome do aniversariante — a gente confirma
          disponibilidade na hora.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <fieldset>
            <legend className="font-display font-bold">Qual pacote?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {pacotes.map((p) => (
                <label
                  key={p.nome}
                  className={`cursor-pointer rounded-full border-[1.5px] border-carbon px-4 py-2 font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-carbon ${
                    pacote === p.nome ? 'bg-carbon text-cream' : 'text-carbon hover:bg-carbon/5'
                  }`}
                >
                  <input type="radio" name="pacote" checked={pacote === p.nome} onChange={() => setPacote(p.nome)} className="sr-only" />
                  {p.nome}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block max-w-sm">
            <span className="font-display font-bold">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full rounded-2xl border-[1.5px] border-carbon bg-white px-4 py-3 text-carbon focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon"
            />
          </label>

          <button type="submit" disabled={!ready} className="btn-sticker disabled:cursor-not-allowed disabled:opacity-40">
            Pedir orçamento
          </button>
        </form>

        <div className="mt-16 flex items-center gap-2.5 border-t-[1.5px] border-carbon/20 pt-6">
          <Mark className="h-7 w-7" />
          <span className="font-display font-bold">Confete</span>
        </div>
        <p className="mt-4 text-sm text-carbon/75">
          A Confete é uma empresa fictícia: este site é um conceito criado
          pela{' '}
          <a href="https://madolio.com.br" className="font-semibold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
