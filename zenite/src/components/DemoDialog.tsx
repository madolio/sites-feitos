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
      className="m-auto w-[min(32rem,calc(100%-1.5rem))] rounded-2xl border border-latao-fundo bg-cupula p-0 text-marfim backdrop:bg-black/70"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="font-display text-2xl sm:text-3xl">
          Sua mensagem
        </h2>
        <pre className="mt-5 rounded-xl border border-latao-fundo bg-noturno p-4 font-sans text-[0.95rem] leading-relaxed whitespace-pre-wrap text-marfim/90">
          {message}
        </pre>
        <p className="mt-5 text-neblina">
          Num site de verdade, esse botão abriria o WhatsApp do Zênite com a
          mensagem acima já escrita. O Zênite é um observatório fictício —
          este site é um conceito criado pela Madolio.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-fosforo">
            Quero um site assim
          </a>
          <button type="button" onClick={() => ref.current?.close()} className="btn-contorno">
            Voltar ao Zênite
          </button>
        </div>
      </div>
    </dialog>
  )
}
