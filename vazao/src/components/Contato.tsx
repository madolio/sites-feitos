import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { servicos } from '../data/servicos'

export default function Contato() {
  const [servico, setServico] = useState(servicos[0].nome)
  const [nome, setNome] = useState('')

  const mensagem = `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Preciso de ${servico.toLowerCase()}. Podem me passar um orçamento?`

  return (
    <section id="contato" className="bg-tinta py-20 text-papel">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-vazao text-emergencia">Orçamento sem compromisso</p>
          <h2 className="mt-2 text-4xl">Conte o que está acontecendo</h2>
          <p className="mt-4 text-papel/75">
            Diga o tipo de serviço e a gente responde com um horário ou, se for emergência, já
            confirma a saída.
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
              <label htmlFor="nome" className="dado-vazao block text-papel/60">
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
              <label htmlFor="servico" className="dado-vazao block text-papel/60">
                Serviço
              </label>
              <select
                id="servico"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="mt-2 w-full rounded-md border border-papel/25 bg-transparent px-4 py-3 text-papel [color-scheme:dark]"
              >
                {servicos.map((s) => (
                  <option key={s.nome} value={s.nome} className="bg-tinta text-papel">
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-emergencia w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
