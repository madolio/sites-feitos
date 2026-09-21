import { useState } from 'react'
import Reveal from './Reveal'
import { faq } from '../data/faq'

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-linha bg-papel py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-broto">antes de matricular</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Perguntas frequentes</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 divide-y divide-linha border-y border-linha">
          {faq.map((item, i) => {
            const abertaAgora = aberta === i
            const idPainel = `faq-painel-${i}`
            const idBotao = `faq-botao-${i}`
            return (
              <div key={item.pergunta}>
                <h3 className="m-0">
                  <button
                    type="button"
                    id={idBotao}
                    aria-expanded={abertaAgora}
                    aria-controls={idPainel}
                    onClick={() => setAberta(abertaAgora ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold"
                  >
                    {item.pergunta}
                    <span aria-hidden="true" className="text-2xl text-broto">
                      {abertaAgora ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                {abertaAgora && (
                  <div id={idPainel} role="region" aria-labelledby={idBotao} className="pb-5 text-tinta/75">
                    {item.resposta}
                  </div>
                )}
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
