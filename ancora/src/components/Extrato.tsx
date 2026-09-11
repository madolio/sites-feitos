import { useEffect, useRef, useState } from 'react'
import NumberFlow from '@number-flow/react'
import { lancamentos } from '../data'

// O "wildcard": um extrato que soma linha a linha conforme entra na tela —
// cada lançamento aparece, o saldo corrente sobe com NumberFlow, até o total.
// Puramente decorativo/ilustrativo (aviso no rodapé do componente).

const currency = { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 } as const

export default function Extrato() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setVisible(lancamentos.length)
          return
        }
        let i = 0
        const step = () => {
          i += 1
          setVisible(i)
          if (i < lancamentos.length) window.setTimeout(step, 420)
        }
        window.setTimeout(step, 300)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const shown = lancamentos.slice(0, visible)
  const saldo = shown.reduce((s, l) => s + l.valor, 0)

  return (
    <div ref={ref} className="border border-line bg-white/60 p-6 sm:p-8">
      <p className="mono text-sm text-indigo/75">Extrato ilustrativo — aportes e rendimento</p>

      <ul className="mt-5 space-y-2.5">
        {lancamentos.map((l, i) => (
          <li
            key={l.id}
            className="ledger-row mono text-sm transition-opacity duration-300"
            style={{ opacity: i < visible ? 1 : 0.12 }}
          >
            <span className="shrink-0 text-indigo/80">{l.descricao}</span>
            <span className="dots" aria-hidden="true" />
            <span className="shrink-0 text-indigo">
              {i < visible ? l.valor.toLocaleString('pt-BR', currency) : '—'}
            </span>
          </li>
        ))}
      </ul>

      <div className="ledger-row mono mt-5 border-t border-line pt-4 text-lg font-semibold">
        <span>Saldo</span>
        <span className="dots" aria-hidden="true" />
        <span className="text-brass">
          <NumberFlow value={saldo} locales="pt-BR" format={currency} />
        </span>
      </div>
    </div>
  )
}
