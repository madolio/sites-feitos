import { useRef, type MouseEvent, type ReactNode } from 'react'

// Cartão do bento: brilho que segue o cursor (Card Spotlight, Aceternity UI)
// + inclinação 3D leve que acompanha o mouse (Tilted Card, React Bits) — as
// duas técnicas juntas, num cartão só, em vez de reinventar do zero.
export default function BentoCard({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 10
    const rotateX = ((y / rect.height) - 0.5) * -10
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--rx', `${rotateX}deg`)
    el.style.setProperty('--ry', `${rotateY}deg`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`bento-card rounded-2xl border border-line bg-white ${className}`}
    >
      <div className="bento-card-inner h-full p-8">{children}</div>
    </div>
  )
}
