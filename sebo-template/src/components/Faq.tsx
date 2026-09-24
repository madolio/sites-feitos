import { useState } from 'react'
import { whatsappUrl } from '../config/site'
import { faq, rotulos } from '../data/conteudo'

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section id="duvidas" className="px-6 py-20 sm:px-10 lg:pl-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="rotulo-mao">{faq.rotulo}</p>
          <h2 className="mt-2 text-3xl text-foreground sm:text-4xl">{faq.title}</h2>
          <p className="mt-3 text-muted">{faq.text}</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-contorno mt-6">
            {rotulos.contato.whatsapp}
          </a>
        </div>

        <ul className="border-t border-foreground/15">
          {faq.itens.map((f, i) => {
            const ativa = aberta === i
            return (
              <li key={f.pergunta} className="border-b border-foreground/15">
                <h3 className="!font-body text-base font-semibold">
                  <button
                    type="button"
                    id={`faq-botao-${i}`}
                    aria-expanded={ativa}
                    aria-controls={`faq-${i}`}
                    onClick={() => setAberta(ativa ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-lg"
                  >
                    {f.pergunta}
                    <span aria-hidden="true" className={`shrink-0 text-2xl leading-none text-accent-text transition-transform ${ativa ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-botao-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${ativa ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-8 pb-5 text-muted">{f.resposta}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
