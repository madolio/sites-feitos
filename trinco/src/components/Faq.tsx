import { useState } from 'react'
import Reveal from './Reveal'
import { faq } from '../data/faq'

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-linha bg-limalha py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-placa text-latao">antes de ligar</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Perguntas frequentes</h2>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
          <Reveal delay={0.05} className="divide-y divide-linha border-y border-linha">
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
                      <span aria-hidden="true" className="text-2xl text-latao">
                        {abertaAgora ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                  {abertaAgora && (
                    <div id={idPainel} role="region" aria-labelledby={idBotao} className="pb-5 text-grafite/75">
                      {item.resposta}
                    </div>
                  )}
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <img
              src="https://images.pexels.com/photos/35287856/pexels-photo-35287856.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Mãos de chaveiro operando uma máquina de cópia de chaves, ajustando a chave em bruto contra o gabarito"
              className="aspect-[3/4] w-full rounded-lg border border-linha object-cover"
              loading="lazy"
            />
            <p className="dado-placa mt-3 text-grafite/50">cada corte, na medida da fechadura</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
