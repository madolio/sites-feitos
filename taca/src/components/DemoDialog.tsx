import { useEffect, useRef, useState } from 'react'
import { DEMO_EVENT, MADOLIO_WHATSAPP } from '../demo'

export default function DemoDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const onDemo = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail)
      ref.current?.showModal()
    }
    window.addEventListener(DEMO_EVENT, onDemo)
    return () => window.removeEventListener(DEMO_EVENT, onDemo)
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-title"
      className="w-[min(32rem,calc(100%-1.5rem))] rounded-2xl border border-ink/15 bg-parchment p-0 text-ink backdrop:bg-ink/50"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="font-heading text-3xl text-garnet">
          Seu pedido
        </h2>
        <pre className="mt-5 rounded-xl border border-ink/15 bg-white/50 p-4 font-ui text-[0.95rem] leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
        <p className="mt-5 text-ink/70">
          Num site de verdade, esse botão abriria o WhatsApp da Taça com a
          mensagem acima já escrita. A Taça é uma vinícola fictícia — este
          site é um conceito criado pela Madolio.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary">
            Quero um site assim
          </a>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex items-center justify-center rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Voltar ao site
          </button>
        </div>
      </div>
    </dialog>
  )
}
