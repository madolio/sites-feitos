import { useState } from 'react'
import { sendToWhatsApp } from '../demo'
import { servicos } from '../data'
import { Mark } from './FolderTabs'
import Reveal from './Reveal'

export default function Agendar() {
  const [servico, setServico] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const ready = servico !== null && nome.trim().length > 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Focinho! Quero agendar: ${servico}.\nMeu nome é ${nome.trim()}.`)
  }

  return (
    <footer id="agendar" className="scroll-mt-24 border-t border-line bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-3xl text-paper sm:text-4xl">Vamos marcar?</h2>
          <p className="mt-3 max-w-md text-paper/75">
            Escolhe o serviço e o nome do seu bichano ou cachorro — a gente
            confirma o horário na hora.
          </p>
        </Reveal>

        <Reveal as="form" onSubmit={submit} className="mt-10 max-w-lg space-y-6">
          <fieldset>
            <legend className="font-bold">Qual serviço?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {servicos.map((s) => (
                <label
                  key={s.id}
                  className={`cursor-pointer rounded-full border-2 border-paper/40 px-4 py-2 font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-paper ${
                    servico === s.name ? 'bg-paper text-ink' : 'text-paper hover:bg-paper/10'
                  }`}
                >
                  <input type="radio" name="servico" checked={servico === s.name} onChange={() => setServico(s.name)} className="sr-only" />
                  {s.name}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="font-bold">Nome do pet (ou seu, se preferir)</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full rounded-lg border-2 border-paper/40 bg-ink px-4 py-3 text-paper placeholder:text-paper/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            />
          </label>

          <button type="submit" disabled={!ready} className="btn-accent disabled:cursor-not-allowed disabled:opacity-50">
            Enviar pedido
          </button>
        </Reveal>

        <div className="mt-16 flex items-center gap-2.5 border-t border-paper/20 pt-6">
          <Mark className="h-7 w-7" />
          <span className="font-display text-lg">Focinho</span>
        </div>
        <p className="mt-4 text-sm text-paper/80">
          O Focinho é um negócio fictício: este site é um conceito criado
          pela{' '}
          <a href="https://madolio.com.br" className="font-semibold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-paper/80">
          feito com <span aria-hidden="true" className="text-accent">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-paper/50 underline-offset-4">
            madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
