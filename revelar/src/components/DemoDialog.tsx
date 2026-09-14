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
      className="m-auto w-[min(32rem,calc(100%-1.5rem))] border-2 border-ink bg-paper p-0 text-ink backdrop:bg-ink/60"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="text-2xl">
          Seu pedido
        </h2>
        <pre className="mt-5 border border-line bg-white p-4 font-sans text-[0.95rem] leading-relaxed whitespace-pre-wrap normal-case">
          {message}
        </pre>
        <p className="mt-5 text-ink/75 normal-case">
          Num site de verdade, esse botão abriria o WhatsApp do estúdio com a
          mensagem acima já escrita. O Revelar é um estúdio fictício — este
          site é um conceito criado pela Madolio.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-amber">
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
