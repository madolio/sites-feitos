import { useEffect, useRef, useState } from 'react'
import { DEMO_EVENT, MADOLIO_WHATSAPP, SEBO_WHATSAPP_FICTICIO } from '../demo'

export default function DemoDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  const [motivo, setMotivo] = useState('')

  useEffect(() => {
    const onDemo = (e: Event) => {
      setMotivo((e as CustomEvent<string>).detail)
      ref.current?.showModal()
    }
    window.addEventListener(DEMO_EVENT, onDemo)
    return () => window.removeEventListener(DEMO_EVENT, onDemo)
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-title"
      className="m-auto w-[min(30rem,calc(100%-1.5rem))] border border-tinta/15 bg-pagina p-0 text-tinta backdrop:bg-pano/70"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="p-6 sm:p-8">
        <h2 id="demo-title" className="text-2xl">
          Esse WhatsApp não existe
        </h2>
        <p className="mt-4 rotulo-mao text-xl text-carimbo">"{motivo}"</p>
        <p className="mt-3 text-sm text-tinta/55">Número fictício mostrado no site: {SEBO_WHATSAPP_FICTICIO}</p>
        <p className="mt-3 text-tinta/75">
          O Sebo Marginália é um sebo fictício — este número não recebe mensagens de verdade. Num site real, esse
          botão abriria o WhatsApp já com a mensagem preenchida.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={MADOLIO_WHATSAPP} target="_blank" rel="noreferrer" className="btn-tinta">
            Quero um site assim
          </a>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-tinta/25 px-6 py-3 font-semibold text-tinta transition-colors hover:border-tinta/60"
          >
            Voltar ao site
          </button>
        </div>
      </div>
    </dialog>
  )
}
