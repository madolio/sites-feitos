import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { servicos } from '../data/servicos'

export default function Contato() {
  const [servico, setServico] = useState(servicos[0].nome)
  const [nome, setNome] = useState('')

  const mensagem = `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Preciso de: ${servico}.`

  return (
    <section id="contato" className="bg-limalha py-20">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-placa text-latao">fale agora</p>
          <h2 className="mt-2 text-4xl">Dá pra começar com uma mensagem</h2>
          <p className="mt-4 text-grafite/75">
            Diga o que precisa e o melhor jeito de te chamar. Se for emergência, a gente já sabe
            priorizar.
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
              <label htmlFor="nome" className="dado-placa block text-grafite/60">
                Seu nome (opcional)
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="como podemos te chamar"
                className="mt-2 w-full rounded-md border border-grafite/25 bg-transparent px-4 py-3 text-grafite placeholder:text-grafite/40"
              />
            </div>

            <div>
              <label htmlFor="servico" className="dado-placa block text-grafite/60">
                O que você precisa
              </label>
              <select
                id="servico"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="mt-2 w-full rounded-md border border-grafite/25 bg-transparent px-4 py-3 text-grafite"
              >
                {servicos.map((s) => (
                  <option key={s.id} value={s.nome}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-latao w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
