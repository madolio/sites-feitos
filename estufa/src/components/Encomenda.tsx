import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { especies } from '../data/especies'

export default function Encomenda() {
  const [especie, setEspecie] = useState(especies[0].comum)
  const [ocasiao, setOcasiao] = useState('')

  const mensagem =
    `Olá! Quero encomendar um arranjo com ${especie}` +
    (ocasiao ? ` para ${ocasiao}.` : '.') +
    ' Podem me passar disponibilidade e valores?'

  return (
    <section id="encomenda" className="bg-mata py-20 text-vidro">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-terracota">Encomenda</p>
          <h2 className="mt-2 text-4xl">Monte o pedido, a gente confirma pelo WhatsApp</h2>
          <p className="mt-4 text-vidro/75">
            Escolha a espécie de partida e a ocasião — a mensagem já sai pronta.
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
              <label htmlFor="especie" className="dado-ficha block text-vidro/60">
                Espécie de partida
              </label>
              <select
                id="especie"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="mt-2 w-full rounded-md border border-vidro/25 bg-transparent px-4 py-3 text-vidro [color-scheme:dark]"
              >
                {especies.map((e) => (
                  <option key={e.id} value={e.comum} className="bg-mata text-vidro">
                    {e.comum} — {e.cientifico}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ocasiao" className="dado-ficha block text-vidro/60">
                Ocasião (opcional)
              </label>
              <input
                id="ocasiao"
                type="text"
                value={ocasiao}
                onChange={(e) => setOcasiao(e.target.value)}
                placeholder="ex.: aniversário, casamento, projeto de jardim"
                className="mt-2 w-full rounded-md border border-vidro/25 bg-transparent px-4 py-3 text-vidro placeholder:text-vidro/40"
              />
            </div>

            <button type="submit" className="btn-terracota w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
