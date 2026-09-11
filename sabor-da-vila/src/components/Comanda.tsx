import { useRef, useState } from 'react'
import NumberFlow from '@number-flow/react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { allItems, brl } from '../data'
import { sendToWhatsApp } from '../demo'

type ComandaProps = {
  qty: Record<string, number>
  change: (id: string, delta: number) => void
  clear: () => void
}

const pagamentos = ['Pix', 'Cartão na entrega', 'Dinheiro'] as const

export default function Comanda({ qty, change, clear }: ComandaProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [modo, setModo] = useState<'retirada' | 'entrega'>('retirada')
  const [pagamento, setPagamento] = useState<(typeof pagamentos)[number]>('Pix')
  const [nome, setNome] = useState('')
  const [endereco, setEndereco] = useState('')
  const [obs, setObs] = useState('')

  const lines = allItems.filter((i) => (qty[i.id] ?? 0) > 0).map((i) => ({ ...i, n: qty[i.id] }))
  const count = lines.reduce((s, l) => s + l.n, 0)
  const total = lines.reduce((s, l) => s + l.n * l.price, 0)
  const ready = count > 0 && nome.trim().length > 1 && (modo === 'retirada' || endereco.trim().length > 5)

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    const message = [
      'Olá, Sabor da Vila! Quero pedir:',
      ...lines.map((l) => `${l.n}x ${l.name} (${brl(l.n * l.price)})`),
      `Total: ${brl(total)}`,
      '',
      modo === 'entrega' ? `Entrega em: ${endereco.trim()}` : 'Vou retirar no balcão.',
      `Pagamento: ${pagamento}`,
      obs.trim() && `Obs.: ${obs.trim()}`,
      `Nome: ${nome.trim()}`,
    ]
      .filter((l): l is string => typeof l === 'string')
      .join('\n')
    dialog.current?.close()
    sendToWhatsApp(message)
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 120, rotate: -3 }}
            animate={{ y: 0, rotate: 0 }}
            exit={{ y: 120 }}
            transition={{ type: 'spring', bounce: 0.35, duration: 0.5 }}
            className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6"
          >
            <button
              type="button"
              onClick={() => dialog.current?.showModal()}
              className="flex w-full items-center gap-4 rounded-full bg-blue py-2.5 pr-2.5 pl-6 text-paper shadow-[6px_6px_0_0_var(--color-pink)] sm:w-auto"
            >
              <span className="text-left leading-tight">
                <span className="block text-sm font-semibold">
                  Comanda, {count} {count === 1 ? 'item' : 'itens'}
                </span>
                <span className="poster block text-xl">
                  <NumberFlow value={total} locales="pt-BR" format={{ style: 'currency', currency: 'BRL' }} />
                </span>
              </span>
              <span className="ml-auto rounded-full bg-yellow px-4 py-2.5 font-bold text-blue">Fechar pedido</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <dialog
        ref={dialog}
        aria-labelledby="comanda-title"
        className="comanda-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close()
        }}
      >
        <div className="picote h-3 bg-blue" aria-hidden="true" />
        <form onSubmit={send} className="p-5 sm:p-7">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="comanda-title" className="poster text-4xl text-blue">
              Comanda
            </h2>
            <button type="button" onClick={() => dialog.current?.close()} className="font-semibold text-blue underline underline-offset-4">
              Continuar pedindo
            </button>
          </div>

          <ul className="mt-5 divide-y-2 divide-dashed divide-blue/40 border-y-2 border-blue">
            {lines.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="font-bold leading-tight">{l.name}</p>
                  <p className="text-sm text-ink/80">{brl(l.n * l.price)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1" role="group" aria-label={`Quantidade de ${l.name}`}>
                  <button type="button" onClick={() => change(l.id, -1)} aria-label={`Tirar um ${l.name}`} className="h-9 w-9 rounded-full border-2 border-blue text-xl leading-none text-blue">
                    −
                  </button>
                  <span className="poster w-7 text-center text-blue">{l.n}</span>
                  <button type="button" onClick={() => change(l.id, 1)} aria-label={`Adicionar mais um ${l.name}`} className="h-9 w-9 rounded-full bg-blue text-xl leading-none text-paper">
                    +
                  </button>
                </div>
              </li>
            ))}
            {lines.length === 0 && (
              <li className="py-4 text-ink/80">A comanda está vazia. Volte ao cardápio e toque no + de algum lanche.</li>
            )}
          </ul>

          <p className="mt-3 flex items-baseline justify-between">
            <span className="font-semibold">Total</span>
            <span className="poster text-2xl text-blue">{brl(total)}</span>
          </p>

          <fieldset className="mt-6">
            <legend className="font-bold">Como você quer receber?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill name="modo" label="Retiro no balcão" checked={modo === 'retirada'} onChange={() => setModo('retirada')} />
              <Pill name="modo" label="Entrega" checked={modo === 'entrega'} onChange={() => setModo('entrega')} />
            </div>
          </fieldset>

          {modo === 'entrega' && (
            <label className="mt-4 block">
              <span className="font-bold">Endereço</span>
              <input
                type="text"
                autoComplete="street-address"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Rua, número e complemento"
                className="mt-1.5 w-full border-2 border-blue bg-white px-3.5 py-2.5 placeholder:text-ink/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              />
            </label>
          )}

          <fieldset className="mt-5">
            <legend className="font-bold">Pagamento</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {pagamentos.map((p) => (
                <Pill key={p} name="pagamento" label={p} checked={pagamento === p} onChange={() => setPagamento(p)} />
              ))}
            </div>
          </fieldset>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-bold">Seu nome</span>
              <input
                type="text"
                autoComplete="given-name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-1.5 w-full border-2 border-blue bg-white px-3.5 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              />
            </label>
            <label className="block">
              <span className="font-bold">
                Observação <span className="font-normal text-ink/80">(opcional)</span>
              </span>
              <input
                type="text"
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                placeholder="Sem cebola, ponto…"
                className="mt-1.5 w-full border-2 border-blue bg-white px-3.5 py-2.5 placeholder:text-ink/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
              />
            </label>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={clear} className="text-sm font-semibold text-ink/80 underline underline-offset-4">
              Esvaziar comanda
            </button>
            <button type="submit" disabled={!ready} className="btn-blue disabled:cursor-not-allowed disabled:opacity-40">
              Mandar pedido
            </button>
          </div>
        </form>
      </dialog>
    </MotionConfig>
  )
}

function Pill({ name, label, checked, onChange }: { name: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`cursor-pointer rounded-full border-2 border-blue px-4 py-2 font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-pink ${
        checked ? 'bg-blue text-paper' : 'text-blue hover:bg-blue/10'
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  )
}
