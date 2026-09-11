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
      className="demo-dialog"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="border-t-8 border-amarela p-6 sm:p-8">
        <h2 id="demo-title" className="display text-5xl">
          Sua mensagem
        </h2>
        <pre className="mt-5 border-2 border-ink bg-white p-4 font-sans text-[0.95rem] leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
        <p className="mt-5 text-ink/80">
          Num site de verdade, esse botão abriria o WhatsApp do estúdio com a
          mensagem acima já escrita. O Estúdio Alma é um negócio fictício —
          este site é um conceito criado pela Madolio.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-ink">
            Quero um site assim
          </a>
          <button type="button" onClick={() => ref.current?.close()} className="btn-line">
            Voltar ao site
          </button>
        </div>
      </div>
    </dialog>
  )
}
