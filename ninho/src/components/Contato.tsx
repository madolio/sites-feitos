import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { faixas } from '../data/faixas'

export default function Contato() {
  const [faixa, setFaixa] = useState(faixas[0].nome)
  const [nome, setNome] = useState('')

  const mensagem = `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Gostaria de agendar uma visita ao Ninho. Minha criança está na faixa etária de ${faixa.toLowerCase()}.`

  return (
    <section id="contato" className="bg-tinta py-20 text-papel">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-ninho">agende uma visita</p>
          <h2 className="mt-2 text-4xl">Venha conhecer o Ninho de perto</h2>
          <p className="mt-4 text-papel/75">
            Mostramos a sala da turma, a rotina do dia e tiramos as suas dúvidas sobre vagas e
            adaptação.
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
              <label htmlFor="faixa" className="dado-ficha block text-papel/60">
                Faixa etária da criança
              </label>
              <select
                id="faixa"
                value={faixa}
                onChange={(e) => setFaixa(e.target.value)}
                className="mt-2 w-full rounded-md border border-papel/25 bg-transparent px-4 py-3 text-papel [color-scheme:dark]"
              >
                {faixas.map((f) => (
                  <option key={f.id} value={f.nome} className="bg-tinta text-papel">
                    {f.nome} ({f.idade})
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-ninho w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
