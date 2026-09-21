import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { regimes } from '../data/regimes'

export default function Contato() {
  const [regimeNome, setRegimeNome] = useState(regimes[0].nome)
  const [nome, setNome] = useState('')

  const mensagem = `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Meu negócio se enquadra em ${regimeNome} e quero saber mais sobre os serviços de contabilidade da Razão Contábil.`

  return (
    <section id="contato" className="bg-tinta py-20 text-papel">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-fiscal text-prazo">Conversa inicial</p>
          <h2 className="mt-2 text-4xl">Antes de fechar contrato, a gente entende seu caso</h2>
          <p className="mt-4 text-papel/75">
            Diga qual regime se aproxima mais do seu negócio e o seu nome, se quiser. Respondemos
            com os próximos passos.
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
              <label htmlFor="nome" className="dado-fiscal block text-papel/60">
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
              <label htmlFor="regime" className="dado-fiscal block text-papel/60">
                Regime (ou o que mais se aproxima)
              </label>
              <select
                id="regime"
                value={regimeNome}
                onChange={(e) => setRegimeNome(e.target.value)}
                className="mt-2 w-full rounded-md border border-papel/25 bg-transparent px-4 py-3 text-papel [color-scheme:dark]"
              >
                {regimes.map((r) => (
                  <option key={r.id} value={r.nome} className="bg-tinta text-papel">
                    {r.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-prazo w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
