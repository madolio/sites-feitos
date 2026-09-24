import { useState } from 'react'
import { whatsappUrl } from '../config/site'
import { faq, rotulos } from '../data/conteudo'
import { IconPlus, IconWhatsapp, Reveal, Rich } from './ui'

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section id="perguntas" className="bg-sage/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={faq.title} />
          </h2>
          <p className="mt-5 text-lg text-muted">{faq.text}</p>
          <a href={whatsappUrl(rotulos.mensagemDuvida)} target="_blank" rel="noreferrer" className="btn btn-primary mt-8">
            <IconWhatsapp />
            {rotulos.perguntarWhatsapp}
          </a>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <ul className="border-t border-forest/20">
            {faq.itens.map((f, i) => {
              const ativa = aberta === i
              return (
                <li key={f.pergunta} className="border-b border-forest/20">
                  <h3>
                    <button
                      type="button"
                      id={`faq-botao-${i}`}
                      aria-expanded={ativa}
                      aria-controls={`faq-${i}`}
                      onClick={() => setAberta(ativa ? null : i)}
                      className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left font-display text-xl leading-snug sm:text-2xl"
                    >
                      {f.pergunta}
                      <IconPlus
                        className={`size-6 shrink-0 text-clay transition-transform duration-300 ${ativa ? 'rotate-45' : ''}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    aria-labelledby={`faq-botao-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${ativa ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pr-10 pb-6 text-muted">{f.resposta}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
