import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { especialidades } from '../data/especialidades'

export default function Contato() {
  const [especialidade, setEspecialidade] = useState(especialidades[0].nome)
  const [nome, setNome] = useState('')

  const mensagem =
    `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Quero agendar uma avaliação de fisioterapia ${especialidade.toLowerCase()}. Podem me passar horários disponíveis?`

  return (
    <section id="contato" className="bg-tinta py-20 text-papel">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-mapa text-trilha">Avaliação</p>
          <h2 className="mt-2 text-4xl">Antes de traçar a trilha, a gente avalia</h2>
          <p className="mt-4 text-papel/75">
            A primeira consulta define o ponto de partida real do seu caso. Diga a especialidade
            e o horário que funciona.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              sendToWhatsApp(mensagem)
            }}
          >
            <div>
              <label htmlFor="nome" className="dado-mapa block text-papel/60">
                Seu nome (opcional)
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="como podemos te chamar"
                className="mt-2 w-full rounded-md border border-papel/25 bg-transparent px-4 py-3 text-papel placeholder:text-papel/40"
              />
            </div>

            <div>
              <label htmlFor="especialidade" className="dado-mapa block text-papel/60">
                Especialidade
              </label>
              <select
                id="especialidade"
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
                className="mt-2 w-full rounded-md border border-papel/25 bg-transparent px-4 py-3 text-papel [color-scheme:dark]"
              >
                {especialidades.map((esp) => (
                  <option key={esp.nome} value={esp.nome} className="bg-tinta text-papel">
                    {esp.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-trilha w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
