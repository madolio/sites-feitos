import { useState } from 'react'
import Reveal from './Reveal'
import { perguntas } from '../data/perguntas'
import { sendToWhatsApp } from '../demo'

export default function Perguntas() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section id="perguntas" className="border-b border-linha py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-etiqueta text-jeans">antes de vir até a loja</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Perguntas que a gente ouve todo dia no balcão</h2>
          <p className="mt-4 max-w-xl text-carvao/75">
            Separamos as dúvidas mais comuns de quem ainda não veio na Trama. Se a sua não estiver
            aqui, chama no WhatsApp.
          </p>
        </Reveal>

        <Reveal as="div" delay={0.05} className="mt-8 divide-y divide-linha border-y border-linha">
          {perguntas.map((item, i) => {
            const aberta_ = aberta === i
            const idBotao = `pergunta-botao-${i}`
            const idPainel = `pergunta-painel-${i}`
            return (
              <div key={item.pergunta}>
                <h3>
                  <button
                    id={idBotao}
                    type="button"
                    aria-expanded={aberta_}
                    aria-controls={idPainel}
                    onClick={() => setAberta(aberta_ ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-display hover:text-jeans"
                  >
                    {item.pergunta}
                    <span aria-hidden="true" className={`shrink-0 text-2xl leading-none transition-transform motion-reduce:transition-none ${aberta_ ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={idPainel}
                  role="region"
                  aria-labelledby={idBotao}
                  hidden={!aberta_}
                  className="pb-5 pr-10 text-carvao/75"
                >
                  {item.resposta}
                </div>
              </div>
            )
          })}
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá! Tenho uma dúvida que não vi nas perguntas frequentes da Trama.')}
            className="btn-ferrugem"
          >
            Perguntar direto pelo WhatsApp
          </button>
        </Reveal>
      </div>
    </section>
  )
}
