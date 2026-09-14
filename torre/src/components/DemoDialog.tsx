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
      className="w-[min(30rem,calc(100%-1.5rem))] rounded-md border border-line bg-panel p-0 text-ink backdrop:bg-deck/70"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="font-display text-2xl text-ink">
          Esse e-mail não existe
        </h2>
        <p className="mono mt-4 text-sm text-cyan">{endereco}</p>
        <p className="mt-3 text-ink-dim">
          O Torre é um produto fictício — este endereço não recebe mensagens de verdade. Num site real, esse botão
          abriria seu cliente de e-mail com o destinatário já preenchido.
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
