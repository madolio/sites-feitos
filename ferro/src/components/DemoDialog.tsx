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
      className="w-[min(32rem,calc(100%-1.5rem))] border-4 border-iron bg-steel-50 p-0 text-iron backdrop:bg-iron/60"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="text-3xl">
          Sua mensagem
        </h2>
        <pre className="mt-5 border-2 border-iron bg-white p-4 font-sans text-[0.95rem] leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
        <p className="mt-5 text-iron/75">
          Num site de verdade, esse botão abriria o WhatsApp da academia com a
          mensagem acima já escrita. O Ferro é um negócio fictício — este
          site é um conceito criado pela Madolio.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-signal">
            Quero um site assim
          </a>
          <button type="button" onClick={() => ref.current?.close()} className="btn-iron">
            Voltar ao site
          </button>
        </div>
      </div>
    </dialog>
  )
}
