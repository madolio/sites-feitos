import { useId, useState } from 'react'
import Reveal from './Reveal'
import { faq } from '../data/faq'

function FaqItemRow({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const painelId = useId()

  return (
    <div className="border-b border-linha">
      <h3>
        <button
          type="button"
          aria-expanded={aberto}
          aria-controls={painelId}
          onClick={() => setAberto((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg normal-case tracking-normal"
        >
          <span>{pergunta}</span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-2xl text-sinal transition-transform motion-reduce:transition-none ${
              aberto ? 'rotate-45' : 'rotate-0'
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={painelId}
        role="region"
        aria-label={pergunta}
        hidden={!aberto}
        className="pb-5 text-sm text-chumbo/75 normal-case"
      >
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-b border-linha py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-oficina text-aco">antes de vir até a oficina</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Perguntas frequentes</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 rounded-lg border border-linha bg-white px-6 sm:px-8">
          {faq.map((item) => (
            <FaqItemRow key={item.pergunta} pergunta={item.pergunta} resposta={item.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
