import { useState, type FormEvent } from 'react'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function PainelContato() {
  const [nome, setNome] = useState('')
  const ready = nome.trim().length > 1

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Tinta! Meu nome é ${nome.trim()} e quero marcar uma sessão.`)
  }

  return (
    <section
      id="contato"
      className="panel flex h-svh w-screen shrink-0 flex-col justify-center px-6 py-20 sm:px-10"
    >
      <Reveal>
        <h2 className="font-display text-3xl tracking-widest text-paper uppercase sm:text-4xl">
          Marca a sua
        </h2>
        <p className="mt-3 max-w-sm text-paper/65">
          Conta seu nome — a gente confirma o horário e o valor pelo WhatsApp.
        </p>

        <form onSubmit={submit} className="mt-8 flex max-w-sm flex-wrap gap-3">
          <input
            type="text"
            placeholder="Seu nome"
            autoComplete="given-name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="min-w-0 flex-1 border border-paper/25 bg-transparent px-4 py-3 text-paper placeholder:text-paper/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
          />
          <button type="submit" disabled={!ready} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
            Marcar
          </button>
        </form>

        <p className="mt-12 max-w-sm text-sm text-paper/50">
          A Tinta é um estúdio fictício: este site é um conceito criado pela{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold text-paper underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </Reveal>
    </section>
  )
}
