import { useState } from 'react'
import { sendToWhatsApp } from '../demo'

const modalidades = ['Aparelhos', 'Solo', 'Particular'] as const
const periodos = ['De manhã', 'No almoço', 'À noite', 'No sábado'] as const

export default function Experimental() {
  const [modalidade, setModalidade] = useState<(typeof modalidades)[number]>('Aparelhos')
  const [periodo, setPeriodo] = useState<(typeof periodos)[number] | null>(null)
  const [nome, setNome] = useState('')
  const ready = periodo !== null && nome.trim().length > 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(
      `Olá, Estúdio Alma! Quero agendar uma aula experimental de ${modalidade.toLowerCase()}, ${periodo?.toLowerCase()}.\nMeu nome é ${nome.trim()}.`,
    )
  }

  return (
    <section id="experimental" className="scroll-mt-16 bg-amarela py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div>
          <h2 className="display text-6xl md:text-8xl">A primeira aula é com a Helena.</h2>
          <p className="mt-6 max-w-md text-lg">
            A aula experimental começa por uma avaliação da postura e termina
            com um plano de treino. Sem compromisso de matrícula.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-8">
          <fieldset>
            <legend className="text-lg font-medium">Qual aula?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {modalidades.map((m) => (
                <Choice key={m} name="modalidade" label={m} checked={modalidade === m} onChange={() => setModalidade(m)} />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-lg font-medium">Qual horário fica melhor?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {periodos.map((p) => (
                <Choice key={p} name="periodo" label={p} checked={periodo === p} onChange={() => setPeriodo(p)} />
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="text-lg font-medium">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-3 w-full border-2 border-ink bg-gesso px-4 py-3 text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            />
          </label>

          <button type="submit" disabled={!ready} className="btn-ink disabled:cursor-not-allowed disabled:opacity-40">
            Pedir aula experimental
          </button>
        </form>
      </div>
    </section>
  )
}

function Choice({
  name,
  label,
  checked,
  onChange,
}: {
  name: string
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label
      className={`cursor-pointer border-2 border-ink px-4 py-2.5 font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
        checked ? 'bg-ink text-amarela' : 'hover:bg-ink/10'
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  )
}
