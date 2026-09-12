import { useEffect, useRef, useState } from 'react'
import type { Projeto } from '../data/projetos'

// Prévia de verdade do site (não um mockup abstrato): um iframe carregando a
// página real, renderizado numa largura de desktop fixa (1280px) e encolhido
// via CSS scale pra caber na moldura — o mesmo truque que ferramentas de
// screenshot usam pra simular "como o site se parece" sem ser uma captura
// estática. `pointer-events-none` porque é uma prévia, não o site navegável.
const VIRTUAL_WIDTH = 1280
const VIRTUAL_HEIGHT = 960

export default function LivePreview({ projeto }: { projeto: Projeto }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / VIRTUAL_WIDTH))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (!projeto.url) return null
  const host = new URL(projeto.url).host

  return (
    <div className="overflow-hidden rounded-lg border-2 border-ink shadow-[6px_6px_0_0_rgba(29,27,24,0.12)]">
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-white px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="ml-2 truncate rounded-full bg-surface-alt px-3 py-1 text-xs text-ink/55">{host}</span>
      </div>

      <div ref={frameRef} className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <iframe
          key={projeto.url}
          src={projeto.url}
          title={`Prévia do site ${projeto.name}`}
          loading="lazy"
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width: VIRTUAL_WIDTH, height: VIRTUAL_HEIGHT, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  )
}
