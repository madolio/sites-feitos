import { useState } from 'react'
import { tecnicas } from '../data/tecnicas'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [tecnicaId, setTecnicaId] = useState(tecnicas[0].id)
  const [horario, setHorario] = useState('')

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const tecnica = tecnicas.find((t) => t.id === tecnicaId)
    const partes = [
      `Olá! Quero agendar um horário na Renata Bastos Nail Studio.`,
      `Técnica: ${tecnica?.nome ?? ''}.`,
      nome ? `Nome: ${nome}.` : null,
      horario ? `Horário preferido: ${horario}.` : null,
    ].filter(Boolean)
    sendToWhatsApp(partes.join(' '))
  }

  return (
    <section id="contato" className="bg-tinta px-6 py-20 text-marfim sm:px-10">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <p className="rotulo-mono text-uv">Agendamento</p>
          <h2 className="mt-2 text-4xl">Marcar horário</h2>
          <p className="mt-4 text-marfim/75">
            Escolha a técnica e a Renata confirma o horário certo pra caber o tempo de cura sem
            correria — sem botão que abre WhatsApp de verdade, isto é um conceito.
          </p>
        </Reveal>

        <Reveal delay={0.1} as="form" className="mt-8 grid gap-4">
          <form onSubmit={enviar} className="grid gap-4">
            <label className="grid gap-1 text-sm">
              Nome (opcional)
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="rounded-lg border border-marfim/25 bg-tinta px-3 py-2 text-marfim outline-none focus-visible:border-uv"
              />
            </label>

            <label className="grid gap-1 text-sm">
              Técnica
              <select
                value={tecnicaId}
                onChange={(e) => setTecnicaId(e.target.value)}
                className="rounded-lg border border-marfim/25 bg-tinta px-3 py-2 text-marfim outline-none focus-visible:border-uv"
              >
                {tecnicas.map((t) => (
                  <option key={t.id} value={t.id} className="text-tinta">
                    {t.nome}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm">
              Horário preferido (opcional)
              <input
                type="text"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="ex.: sábado de manhã"
                className="rounded-lg border border-marfim/25 bg-tinta px-3 py-2 text-marfim placeholder:text-marfim/40 outline-none focus-visible:border-uv"
              />
            </label>

            <button type="submit" className="btn-coral mt-2 justify-self-start">
              Ver mensagem de agendamento
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
