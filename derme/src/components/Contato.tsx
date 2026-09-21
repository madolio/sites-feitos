import { useState } from 'react'
import { procedimentos } from '../data/procedimentos'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function Contato() {
  const [procedimentoId, setProcedimentoId] = useState(procedimentos[0].id)
  const [nome, setNome] = useState('')
  const [preferencia, setPreferencia] = useState('')

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const procedimento = procedimentos.find((p) => p.id === procedimentoId)
    const linhas = [
      `Olá! Meu nome é ${nome || '[nome]'} e quero agendar uma avaliação na Cútis Dermatologia.`,
      `Procedimento de interesse: ${procedimento?.nome ?? ''}.`,
      preferencia ? `Preferência de horário: ${preferencia}.` : undefined,
    ].filter(Boolean)
    sendToWhatsApp(linhas.join('\n'))
  }

  return (
    <section id="contato" className="border-t border-linha bg-noturno py-20 text-papel sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-clinico text-derme">Agendar</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Primeiro passo: a avaliação</h2>
          <p className="mt-3 text-papel/75">
            Toda indicação começa por uma avaliação presencial. Conte o que te interessa e a Dra. Marina confirma se
            aquele é mesmo o procedimento certo pra sua pele.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <form onSubmit={enviar} className="mt-8 space-y-5 rounded-2xl border border-papel/15 bg-papel/5 p-6 sm:p-8">
            <div>
              <label htmlFor="nome" className="dado-clinico text-papel/60">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-2 w-full rounded-lg border border-papel/25 bg-transparent px-4 py-2.5 text-papel outline-none placeholder:text-papel/40 focus-visible:border-derme"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="procedimento" className="dado-clinico text-papel/60">
                Procedimento de interesse
              </label>
              <select
                id="procedimento"
                value={procedimentoId}
                onChange={(e) => setProcedimentoId(e.target.value)}
                className="mt-2 w-full rounded-lg border border-papel/25 bg-noturno px-4 py-2.5 text-papel outline-none focus-visible:border-derme"
              >
                {procedimentos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="preferencia" className="dado-clinico text-papel/60">
                Preferência de horário (opcional)
              </label>
              <input
                id="preferencia"
                type="text"
                value={preferencia}
                onChange={(e) => setPreferencia(e.target.value)}
                className="mt-2 w-full rounded-lg border border-papel/25 bg-transparent px-4 py-2.5 text-papel outline-none placeholder:text-papel/40 focus-visible:border-derme"
                placeholder="ex: terça de manhã"
              />
            </div>

            <button type="submit" className="btn-derme w-full sm:w-auto">
              Enviar via WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
