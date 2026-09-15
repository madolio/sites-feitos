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
      className="m-auto w-[min(34rem,calc(100%-1.5rem))] rounded-2xl border border-dourado/40 bg-branco p-0 text-preto backdrop:bg-preto/70"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <p className="rotulo text-dourado-escuro">Prévia do agendamento</p>
        <h2 id="demo-title" className="mt-2 text-3xl">
          Sua mensagem
        </h2>
        <pre className="mt-5 rounded-lg border border-preto/15 bg-cinza p-4 font-sans text-[0.95rem] leading-relaxed whitespace-pre-wrap">
          {message}
        </pre>
        <p className="mt-5 text-grafite">
          Num site no ar, esse botão abriria o WhatsApp do salão com a mensagem
          acima já escrita. Aqui ele não abre: o Realce &amp; Cia é um salão de
          verdade, e este site é um <strong>conceito de redesenho</strong> criado
          pela Madolio — não o site oficial deles.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-dourado">
            Quero um site assim
          </a>
          <button type="button" onClick={() => ref.current?.close()} className="btn-contorno">
            Voltar ao site
          </button>
        </div>
      </div>
    </dialog>
  )
}
