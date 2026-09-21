import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { especialidades } from '../data/especialidades'

export default function Contato() {
  const [motivo, setMotivo] = useState(especialidades[0].nome)
  const [nome, setNome] = useState('')

  const mensagem = `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Gostaria de agendar uma primeira conversa. O que me trouxe até aqui tem a ver com ${motivo.toLowerCase()}.`

  return (
    <section id="contato" className="bg-tinta py-20 text-papel">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-acolhe">primeira conversa</p>
          <h2 className="mt-2 text-4xl">Dá pra começar com uma mensagem</h2>
          <p className="mt-4 text-papel/75">
            Não precisa saber explicar tudo de uma vez. Diga o que fizer sentido agora e o horário
            que funciona pra você.
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
              <label htmlFor="motivo" className="dado-ficha block text-papel/60">
                O que te trouxe até aqui
              </label>
              <select
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="mt-2 w-full rounded-md border border-papel/25 bg-transparent px-4 py-3 text-papel [color-scheme:dark]"
              >
                {especialidades.map((esp) => (
                  <option key={esp.nome} value={esp.nome} className="bg-tinta text-papel">
                    {esp.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-acolhe w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
