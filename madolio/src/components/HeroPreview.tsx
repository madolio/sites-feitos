import { useEffect, useRef, useState } from 'react'
import type { Projeto } from '../data/projetos'

// Prévia de verdade do site (iframe real, não mockup), mas recortada pra
// mostrar só a primeira seção (o hero) — não a página inteira encolhida até
// virar ilegível. O iframe renderiza numa largura de desktop fixa (1280px) e
// só HERO_HEIGHT de altura é visível; o resto da página real fica fora do
// corte. Encolhido via scale calculado por ResizeObserver pra caber no card.
const VIRTUAL_WIDTH = 1280
const HERO_HEIGHT = 760

export default function HeroPreview({ projeto }: { projeto: Projeto }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / VIRTUAL_WIDTH))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (!projeto.url) return null

  return (
    <div className="overflow-hidden rounded-lg border-2 border-ink shadow-[6px_6px_0_0_rgba(29,27,24,0.12)]">
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-white px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="ml-2 truncate rounded-full bg-surface-alt px-3 py-1 text-xs text-ink/55">seudominio.com</span>
      </div>

      <div
        ref={frameRef}
        className="relative w-full overflow-hidden bg-surface-alt"
        style={{ aspectRatio: `${VIRTUAL_WIDTH} / ${HERO_HEIGHT}` }}
      >
        <iframe
          src={projeto.url}
          title={`Prévia do site ${projeto.name}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0 transition-opacity duration-300"
          style={{
            width: VIRTUAL_WIDTH,
            height: HERO_HEIGHT,
            transform: `scale(${scale})`,
            opacity: loaded ? 1 : 0,
          }}
        />
        {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-alt" aria-hidden="true" />}
      </div>
    </div>
  )
}
