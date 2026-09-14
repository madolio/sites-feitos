import { useEffect, useRef, useState } from 'react'
import { DEMO_EVENT, MADOLIO_WHATSAPP } from '../demo'

export default function DemoDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  const [endereco, setEndereco] = useState('')

  useEffect(() => {
    const onDemo = (e: Event) => {
      setEndereco((e as CustomEvent<string>).detail)
      ref.current?.showModal()
    }
    window.addEventListener(DEMO_EVENT, onDemo)
    return () => window.removeEventListener(DEMO_EVENT, onDemo)
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-title"
      className="m-auto w-[min(30rem,calc(100%-1.5rem))] rounded-sm border border-line bg-paper p-0 text-indigo backdrop:bg-indigo-deep/60"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="font-serif text-2xl text-indigo">
          Esse e-mail não existe
        </h2>
        <p className="mono mt-4 text-sm text-brass">{endereco}</p>
        <p className="mt-3 text-indigo/75">
          A Âncora é uma consultoria fictícia — este endereço não recebe mensagens de verdade. Num site real, esse
          botão abriria seu cliente de e-mail com o destinatário já preenchido.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-brass">
            Quero um site assim
          </a>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex items-center justify-center rounded-sm border border-indigo/25 px-6 py-3 font-semibold text-indigo transition-colors hover:border-indigo"
          >
            Voltar ao site
          </button>
        </div>
      </div>
    </dialog>
  )
}
