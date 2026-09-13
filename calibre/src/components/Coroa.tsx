import { useRef } from 'react'
import { corda, darCorda } from '../estado'

// A coroa de corda: você gira, não arrasta em linha reta — o gesto certo de
// dar corda num relógio de verdade. Mede o ângulo do ponteiro em volta do
// centro do botão a cada movimento e converte a diferença em energia.
export default function Coroa() {
  const ultimoAngulo = useRef<number | null>(null)
  const voltas = useRef(0)

  const anguloDe = (e: React.PointerEvent, el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    return Math.atan2(e.clientY - cy, e.clientX - cx)
  }

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    corda.arrastando = true
    ultimoAngulo.current = anguloDe(e, e.currentTarget)
  }

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!corda.arrastando || ultimoAngulo.current === null) return
    const atual = anguloDe(e, e.currentTarget)
    let diff = atual - ultimoAngulo.current
    if (diff > Math.PI) diff -= Math.PI * 2
    if (diff < -Math.PI) diff += Math.PI * 2
    ultimoAngulo.current = atual
    voltas.current += Math.abs(diff)
    darCorda(Math.abs(diff) * 0.12)
  }

  const onUp = () => {
    corda.arrastando = false
    ultimoAngulo.current = null
  }

  return (
    <button
      type="button"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className="group relative h-16 w-16 shrink-0 touch-none rounded-full border border-brass/50 bg-[radial-gradient(circle_at_35%_30%,#3a2c18,#171009)] shadow-[inset_0_0_0_1px_rgba(202,162,94,0.15)] active:scale-95"
      aria-label="Girar a coroa pra dar corda no calibre"
    >
      <span className="pointer-events-none absolute inset-2 rounded-full border border-dashed border-brass/40 transition-colors group-hover:border-brass/70" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[0.6rem] font-medium tracking-wide text-brass/70">
        gire
      </span>
    </button>
  )
}
