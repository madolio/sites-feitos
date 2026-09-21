import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { pelagens } from '../data/pelagens'

export default function Contato() {
  const [tipoPelagem, setTipoPelagem] = useState(pelagens[0].nome)
  const [nome, setNome] = useState('')

  const mensagem = `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Gostaria de agendar banho e tosa. Meu pet tem pelagem ${tipoPelagem.toLowerCase()}.`

  return (
    <section id="contato" className="bg-tinta py-20 text-papel">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-pelo">agendar</p>
          <h2 className="mt-2 text-4xl">Dá pra começar com uma mensagem</h2>
          <p className="mt-4 text-papel/75">
            Conte o tipo de pelo do seu pet e a gente já indica o serviço certo antes de marcar o
            horário.
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
              <label htmlFor="nome" className="dado-ficha block text-papel/60">
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
              <label htmlFor="pelagem" className="dado-ficha block text-papel/60">
                Tipo de pelagem do seu pet
              </label>
              <select
                id="pelagem"
                value={tipoPelagem}
                onChange={(e) => setTipoPelagem(e.target.value)}
                className="mt-2 w-full rounded-md border border-papel/25 bg-transparent px-4 py-3 text-papel [color-scheme:dark]"
              >
                {pelagens.map((p) => (
                  <option key={p.id} value={p.nome} className="bg-tinta text-papel">
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-pelo w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
