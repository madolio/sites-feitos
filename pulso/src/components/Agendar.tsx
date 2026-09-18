import { useState } from 'react'
import { sendToWhatsApp } from '../demo'
import { Mark } from './Rail'
import Reveal from './Reveal'

const horarios = ['Manhã', 'Almoço', 'Fim de tarde', 'Noite'] as const

// Rodapé/CTA: a "largada" — um formulário curto que vira a mensagem do
// WhatsApp, não um bloco genérico de "fale conosco".
export default function Agendar() {
  const [horario, setHorario] = useState<(typeof horarios)[number] | null>(null)
  const [nome, setNome] = useState('')
  const ready = horario !== null && nome.trim().length > 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Pulso! Quero uma aula grátis, de preferência ${horario?.toLowerCase()}.\nMeu nome é ${nome.trim()}.`)
  }

  return (
    <footer id="agendar" className="scroll-mt-16 border-t-4 border-track bg-track py-20 text-chalk md:py-28 lg:pl-16">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-4xl text-chalk sm:text-5xl">Sua largada é agora.</h2>
          <p className="mt-4 max-w-md text-lg text-chalk/90">
            A primeira aula é grátis, sem compromisso. É só marcar o melhor
            horário.
          </p>
        </Reveal>

        <form onSubmit={submit} className="mt-10 max-w-lg space-y-6">
          <fieldset>
            <legend className="font-bold">Qual horário fica melhor?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {horarios.map((h) => (
                <label
                  key={h}
                  className={`cursor-pointer border-2 border-chalk px-4 py-2 font-bold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-chalk ${
                    horario === h ? 'bg-chalk text-lane-ink' : 'text-chalk hover:bg-chalk/10'
                  }`}
                >
                  <input type="radio" name="horario" checked={horario === h} onChange={() => setHorario(h)} className="sr-only" />
                  {h}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="font-bold">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full border-2 border-chalk bg-track px-4 py-3 text-chalk placeholder:text-chalk/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chalk"
            />
          </label>

          <button
            type="submit"
            disabled={!ready}
            className="inline-flex items-center justify-center bg-chalk px-7 py-3.5 font-display text-lg tracking-wide text-lane-ink uppercase transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Marcar aula grátis
          </button>
        </form>

        <div className="mt-16 flex items-center gap-2.5 border-t-2 border-chalk/25 pt-6">
          <Mark className="h-6 w-6" />
          <span className="font-display tracking-wide">Pulso</span>
        </div>
        <p className="mt-4 text-sm text-chalk/85">
          O Pulso é um negócio fictício: este site é um conceito criado pela{' '}
          <a href="https://madolio.com.br" className="font-bold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
        <p className="mt-2 text-sm text-chalk/70">
          feito com{' '}
          <span aria-hidden="true" className="text-lane">
            ♥
          </span>
          <span className="sr-only">amor</span> por{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-chalk"
          >
            madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
