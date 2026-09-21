import { useState, type FormEvent } from 'react'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [dente, setDente] = useState('')
  const [motivo, setMotivo] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const partes = [`Olá! Meu nome é ${nome || '(nome)'}`]
    if (dente) partes.push(`quero falar sobre o dente ${dente}`)
    if (motivo) partes.push(`o motivo é: ${motivo}`)
    sendToWhatsApp(partes.join(', ') + '.')
  }

  return (
    <section id="contato" className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <Reveal>
        <p className="rotulo-mono">Agendamento</p>
        <h2 className="mt-2 text-4xl sm:text-5xl">Marcar uma avaliação</h2>
        <p className="mt-4 text-lg text-tinta/75">
          Se você já sabe qual dente te incomoda, conte pra gente — ajuda a preparar a
          consulta antes mesmo de você chegar.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <form onSubmit={onSubmit} className="mt-10 grid gap-5 rounded-2xl border border-linha bg-white/60 p-6 sm:p-8">
          <label className="grid gap-1.5">
            <span className="rotulo-mono">Nome</span>
            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="rounded-lg border border-contorno/40 bg-papel px-4 py-2.5 text-tinta outline-none focus-visible:border-esmalte"
              placeholder="Seu nome"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="rotulo-mono">Dente ou região (opcional)</span>
            <input
              value={dente}
              onChange={(e) => setDente(e.target.value)}
              className="rounded-lg border border-contorno/40 bg-papel px-4 py-2.5 text-tinta outline-none focus-visible:border-esmalte"
              placeholder="ex.: siso inferior direito, dente 48"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="rotulo-mono">Motivo (opcional)</span>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={3}
              className="rounded-lg border border-contorno/40 bg-papel px-4 py-2.5 text-tinta outline-none focus-visible:border-esmalte"
              placeholder="dor ao mastigar, sensibilidade, avaliação de rotina…"
            />
          </label>
          <button type="submit" className="btn-esmalte justify-self-start">
            Enviar pedido de avaliação
          </button>
        </form>
      </Reveal>

      <p className="mt-8 text-center text-sm text-tinta/50">
        Meridiana Odontologia é uma clínica fictícia — este é um site-conceito feito com{' '}
        <span aria-hidden="true" className="text-esmalte">♥</span>
        <span className="sr-only">amor</span> pela{' '}
        <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
          Madolio
        </a>
        .
      </p>
    </section>
  )
}
