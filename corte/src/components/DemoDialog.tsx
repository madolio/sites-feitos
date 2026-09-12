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
      className="w-[min(32rem,calc(100%-1.5rem))] rounded-xl border-2 border-ink bg-paper p-0 text-ink backdrop:bg-ink/60"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="text-2xl">
          Sua senha ficou assim
        </h2>
        <pre className="mt-5 rounded-lg border border-line bg-white p-4 font-sans text-[0.95rem] leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
        <p className="mt-5 text-ink/75">
          Num site de verdade, esse botão abriria o WhatsApp do salão com a
          mensagem acima já escrita. O Corte é um negócio fictício — este
          site é um conceito criado pela Madolio.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-teal">
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
