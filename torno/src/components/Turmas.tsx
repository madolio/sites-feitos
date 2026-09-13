import { useEffect, useRef } from 'react'
import { turmas } from '../data'
import { sendToWhatsApp } from '../demo'

// Atalho pras turmas a qualquer momento — pra quem não quer brincar no torno
// antes de ver preço e horário.
export default function Turmas({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (aberto && !d.open) d.showModal()
    if (!aberto && d.open) d.close()
  }, [aberto])

  return (
    <dialog
      ref={ref}
      aria-labelledby="turmas-title"
      onClose={onFechar}
      onClick={(e) => {
        if (e.target === ref.current) onFechar()
      }}
      className="m-auto w-[min(30rem,calc(100%-1.5rem))] rounded-[28px] border border-line bg-folha p-0 text-ink backdrop:bg-ink/45"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="turmas-title" className="text-3xl">
            Turmas
          </h2>
          <button type="button" onClick={onFechar} aria-label="Fechar" className="rounded-full px-2 text-2xl leading-none text-ink/60 hover:text-ink">
            ×
          </button>
        </div>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {turmas.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <p className="font-semibold">{t.nome}</p>
                <p className="text-sm text-ink/65">{t.detalhe}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold tabular-nums">{t.preco}</span>
                <button
                  type="button"
                  onClick={() => sendToWhatsApp(`Olá, Torno! Quero me inscrever em "${t.nome}" (${t.preco}).`)}
                  className="rounded-full border border-ink/25 px-3.5 py-1.5 text-sm font-semibold hover:border-ink"
                >
                  Quero essa
                </button>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-ink/60">
          O Torno é um ateliê fictício: este site é um conceito criado pela{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </dialog>
  )
}
