import { useId, useState } from 'react'
import { faq } from '../data/faq'
import Reveal from './Reveal'

export default function Faq() {
  const [aberta, setAberta] = useState<string | null>(faq[0]?.id ?? null)
  const baseId = useId()

  function alternar(id: string) {
    setAberta((atual) => (atual === id ? null : id))
  }

  return (
    <section className="border-b border-linha bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="rotulo-mono">Perguntas frequentes</p>
          <h2 className="mt-2 text-4xl">Antes de marcar, as dúvidas mais comuns</h2>
          <p className="mt-4 max-w-2xl text-tinta/75">
            O que quem nunca fez unha em gel ou BIAB na Renata Bastos costuma perguntar antes do
            primeiro horário.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 divide-y divide-linha rounded-2xl border border-linha">
          {faq.map((item) => {
            const isAberta = aberta === item.id
            const painelId = `${baseId}-painel-${item.id}`
            const botaoId = `${baseId}-botao-${item.id}`
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    id={botaoId}
                    aria-expanded={isAberta}
                    aria-controls={painelId}
                    onClick={() => alternar(item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-tinta transition hover:text-uv focus-visible:outline-offset-[-2px]"
                  >
                    <span>{item.pergunta}</span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 font-mono text-uv transition-transform duration-200 motion-reduce:transition-none ${
                        isAberta ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={painelId}
                  role="region"
                  aria-labelledby={botaoId}
                  hidden={!isAberta}
                  className="px-5 pb-5 text-tinta/75"
                >
                  <p>{item.resposta}</p>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
