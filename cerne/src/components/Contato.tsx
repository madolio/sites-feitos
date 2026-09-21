import { useState, type FormEvent } from 'react'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function Contato() {
  const [nome, setNome] = useState('')
  const ready = nome.trim().length > 1

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Cerne! Meu nome é ${nome.trim()} e quero um orçamento pra um projeto de interiores.`)
  }

  return (
    <footer id="contato" className="border-t border-line bg-panel px-6 py-20 sm:px-10 md:py-28">
      <Reveal className="mx-auto max-w-lg">
        <h2 className="text-3xl text-ink sm:text-4xl">Vamos desenhar o seu?</h2>
        <p className="mt-3 text-ink/75">
          Conta seu nome — a gente confirma um horário pra conversar sobre o
          projeto.
        </p>

        <form onSubmit={submit} className="mt-8 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Seu nome"
            autoComplete="given-name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="min-w-0 flex-1 rounded-full border border-ink/25 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          />
          <button
            type="submit"
            disabled={!ready}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Pedir orçamento
          </button>
        </form>

        <p className="mt-10 text-sm text-ink/70">
          O Cerne é um estúdio fictício: um conceito feito com{' '}
          <span aria-hidden="true" className="text-pine">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </Reveal>
    </footer>
  )
}
