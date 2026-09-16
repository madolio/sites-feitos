import { useState } from 'react'
import { pacotes } from '../data'
import { sendToWhatsApp } from '../demo'
import { Mark } from './FilmBar'
import Reveal from './Reveal'

export default function Contato() {
  const [pacote, setPacote] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const ready = pacote !== null && nome.trim().length > 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Revelar! Quero um orçamento pro pacote ${pacote}.\nMeu nome é ${nome.trim()}.`)
  }

  return (
    <footer id="contato" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Pacotes</h2>
        </Reveal>

        <Reveal as="ul" stagger={0.08} className="mt-10 divide-y-2 divide-ink border-y-2 border-ink">
          {pacotes.map((p) => (
            <li key={p.nome} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-5">
              <div>
                <p className="text-lg font-bold">{p.nome}</p>
                <p className="text-sm text-ink/65">
                  {p.horas} · {p.entregas}
                </p>
              </div>
              <span className="font-display text-lg text-amber-ink">{p.preco}</span>
            </li>
          ))}
        </Reveal>

        <Reveal as="form" onSubmit={submit} className="mt-12 space-y-6">
          <fieldset>
            <legend className="font-bold">Qual pacote te interessa?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {pacotes.map((p) => (
                <label
                  key={p.nome}
                  className={`cursor-pointer border-2 border-ink px-4 py-2 font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amber-ink ${
                    pacote === p.nome ? 'bg-ink text-paper' : 'text-ink hover:bg-ink/5'
                  }`}
                >
                  <input type="radio" name="pacote" checked={pacote === p.nome} onChange={() => setPacote(p.nome)} className="sr-only" />
                  {p.nome}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block max-w-sm">
            <span className="font-bold">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-ink"
            />
          </label>

          <button type="submit" disabled={!ready} className="btn-amber disabled:cursor-not-allowed disabled:opacity-50">
            Pedir orçamento
          </button>
        </Reveal>

        <div className="mt-16 flex items-center gap-2.5 border-t border-line pt-6">
          <Mark className="h-6 w-6 text-ink" />
          <span className="font-display">Revelar</span>
        </div>
        <p className="mt-4 text-sm text-ink/65">
          O Revelar é um estúdio fictício: este site é um conceito criado
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
