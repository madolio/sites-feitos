import { useState } from 'react'
import { servicos, START_TICKET } from '../data'
import { sendToWhatsApp } from '../demo'
import { Mark } from './TicketBar'

// Quantas pessoas já estão na fila na frente de uma senha nova — fixo, só
// pra dar uma estimativa plausível (o Corte é fictício, não existe fila
// real pra consultar).
const PESSOAS_NA_FRENTE = 2

export default function Agendar() {
  const [servico, setServico] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const ready = servico !== null && nome.trim().length > 1

  const servicoEscolhido = servicos.find((s) => s.name === servico)
  const espera = servicoEscolhido ? servicoEscolhido.minutos * PESSOAS_NA_FRENTE : null
  const senha = START_TICKET + PESSOAS_NA_FRENTE + 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(
      `Olá, Corte! Quero marcar: ${servico}.\nMeu nome é ${nome.trim()}.` +
        (espera ? `\nVi no site que a senha seria a Nº ${senha}, espera estimada de ~${espera} min.` : ''),
    )
  }

  return (
    <footer id="agendar" className="scroll-mt-16 border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl">Pegue a sua senha</h2>
        <p className="mt-3 max-w-md text-ink/70">
          Escolhe o serviço e o nome — a gente confirma o horário na hora
          pelo WhatsApp.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <fieldset>
            <legend className="font-bold">Qual serviço?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {servicos.map((s) => (
                <label
                  key={s.name}
                  className={`cursor-pointer rounded-lg border-2 border-ink/25 px-4 py-2 font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal ${
                    servico === s.name ? 'border-ink bg-ink text-paper' : 'text-ink hover:border-ink'
                  }`}
                >
                  <input type="radio" name="servico" checked={servico === s.name} onChange={() => setServico(s.name)} className="sr-only" />
                  {s.name}
                </label>
              ))}
            </div>
          </fieldset>

          {servicoEscolhido && (
            <div className="ticket flex items-baseline gap-4 rounded-lg border-2 border-dashed border-teal/40 bg-teal/5 px-4 py-3 text-sm">
              <span>
                Sua senha seria a <strong className="text-lg text-teal">Nº {senha}</strong>
              </span>
              <span className="text-ink/60">~{espera} min de espera</span>
            </div>
          )}

          <label className="block max-w-sm">
            <span className="font-bold">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full rounded-lg border-2 border-ink/25 bg-white px-4 py-3 text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            />
          </label>

          <button type="submit" disabled={!ready} className="btn-teal disabled:cursor-not-allowed disabled:opacity-50">
            Pegar minha senha
          </button>
        </form>

        <div className="mt-16 flex items-center gap-2.5 border-t border-line pt-6">
          <Mark className="h-6 w-6 text-ink" />
          <span className="font-display">Corte</span>
        </div>
        <p className="mt-4 text-sm text-ink/70">
          O Corte é um negócio fictício: este site é um conceito criado pela{' '}
          <a href="https://madolio.com.br" className="font-semibold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
