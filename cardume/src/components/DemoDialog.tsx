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
      className="m-auto w-[min(32rem,calc(100%-1.5rem))] rounded-[24px] border border-espuma/15 bg-placa p-0 text-espuma backdrop:bg-abismo/70"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="text-2xl font-bold">
          Sua mensagem
        </h2>
        <pre className="mt-5 rounded-2xl border border-espuma/15 bg-abismo/60 p-4 font-titulo text-[0.95rem] leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
        <p className="mt-5 text-espuma/75">
          Num site de verdade, esse botão abriria o WhatsApp do Cardume com a
          mensagem acima já escrita. O Cardume é uma escola fictícia — este
          site é um conceito criado pela Madolio.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary">
            Quero um site assim
          </a>
          <button type="button" onClick={() => ref.current?.close()} className="btn-outline">
            Voltar ao mergulho
          </button>
        </div>
      </div>
    </dialog>
  )
}
