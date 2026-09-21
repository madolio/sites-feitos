import { useState } from 'react'
import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'
import { categorias } from '../data/categorias'

export default function Contato() {
  const [categoria, setCategoria] = useState(categorias[0].nome)
  const [nome, setNome] = useState('')

  const mensagem =
    `Olá! ${nome ? `Meu nome é ${nome}. ` : ''}Queria saber o que vocês têm em ${categoria.toLowerCase()} e se tem no meu tamanho.`

  return (
    <section id="contato" className="bg-carvao py-20 text-cru">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-etiqueta text-ferrugem">Fale com a loja</p>
          <h2 className="mt-2 text-4xl">Sem provador virtual, mas a gente responde rápido</h2>
          <p className="mt-4 text-cru/75">
            Diz o que você procura e a gente confirma se tem no seu tamanho antes de você vir até
            aqui.
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
              <label htmlFor="nome" className="dado-etiqueta block text-cru/60">
                Seu nome (opcional)
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="como podemos te chamar"
                className="mt-2 w-full rounded-md border border-cru/25 bg-transparent px-4 py-3 text-cru placeholder:text-cru/40"
              />
            </div>

            <div>
              <label htmlFor="categoria" className="dado-etiqueta block text-cru/60">
                O que você procura
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="mt-2 w-full rounded-md border border-cru/25 bg-transparent px-4 py-3 text-cru [color-scheme:dark]"
              >
                {categorias.map((cat) => (
                  <option key={cat.nome} value={cat.nome} className="bg-carvao text-cru">
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-ferrugem w-full sm:w-auto">
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
