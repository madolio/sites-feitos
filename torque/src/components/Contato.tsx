import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { especialidades } from '../data/especialidades'

export default function Contato() {
  const [servico, setServico] = useState(especialidades[0].nome)
  const [nome, setNome] = useState('')

  const mensagem =
    `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Quero agendar um horário pra ${servico.toLowerCase()}. Podem me passar horários disponíveis?`

  return (
    <section id="contato" className="bg-chumbo py-20 text-oficina">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-oficina text-sinal">Agendamento</p>
          <h2 className="mt-2 text-4xl">Antes de levantar o carro, a gente escuta o problema</h2>
          <p className="mt-4 text-oficina/75 normal-case">
            Diga o serviço e um horário que funciona pra você. Sem enrolação, sem peça trocada sem
            avisar antes.
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
              <label htmlFor="nome" className="dado-oficina block text-oficina/60">
                Seu nome (opcional)
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="como podemos te chamar"
                className="mt-2 w-full rounded-md border border-oficina/25 bg-transparent px-4 py-3 text-oficina placeholder:text-oficina/40"
              />
            </div>

            <div>
              <label htmlFor="servico" className="dado-oficina block text-oficina/60">
                Serviço
              </label>
              <select
                id="servico"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="mt-2 w-full rounded-md border border-oficina/25 bg-transparent px-4 py-3 text-oficina [color-scheme:dark]"
              >
                {especialidades.map((esp) => (
                  <option key={esp.nome} value={esp.nome} className="bg-chumbo text-oficina">
                    {esp.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-sinal w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
