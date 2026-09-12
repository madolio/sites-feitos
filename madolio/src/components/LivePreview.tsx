import { useEffect, useRef, useState } from 'react'
import type { Projeto } from '../data/projetos'

// Prévia de verdade do site (não um mockup abstrato): um iframe carregando a
// página real, renderizado numa largura de desktop fixa (1280px) e encolhido
// via CSS scale pra caber na moldura — o mesmo truque que ferramentas de
// screenshot usam pra simular "como o site se parece" sem ser uma captura
// estática. `pointer-events-none` porque é uma prévia, não o site navegável.
//
// `projeto: null` é o estado ocioso — sempre a MESMA moldura (mesma barra de
// endereço, mesma altura), só que vazia, pra a página não "pular" de altura
// quando o preview troca de ocioso pra ativo (era o bug: o link "ver todos os
// projetos" embaixo descia porque o ocioso tinha uma caixa mais baixa, sem a
// barra de endereço nem o texto do card embaixo).
const VIRTUAL_WIDTH = 1280
const VIRTUAL_HEIGHT = 960

export default function LivePreview({ projeto }: { projeto: Projeto | null }) {
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

  // Reseta o "carregando" sempre que o site muda, pra cada troca ter seu
  // próprio fade-in em vez de aparecer com o estado (loaded) da anterior.
  useEffect(() => {
    setLoaded(false)
  }, [projeto?.url])

  const host = projeto?.url ? new URL(projeto.url).host : null

  return (
    <div className="overflow-hidden rounded-lg border-2 border-ink shadow-[6px_6px_0_0_rgba(29,27,24,0.12)]">
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-white px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="h-2.5 w-2.5 rounded-full border border-ink/40" />
        <span className="ml-2 truncate rounded-full bg-surface-alt px-3 py-1 text-xs text-ink/55">
          {host ?? 'nenhum site selecionado'}
        </span>
      </div>

      <div ref={frameRef} className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
        {projeto?.url && (
          <>
            <iframe
              key={projeto.url}
              src={projeto.url}
              title={`Prévia do site ${projeto.name}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className="pointer-events-none absolute top-0 left-0 origin-top-left border-0 transition-opacity duration-300"
              style={{ width: VIRTUAL_WIDTH, height: VIRTUAL_HEIGHT, transform: `scale(${scale})`, opacity: loaded ? 1 : 0 }}
            />
            {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-alt" aria-hidden="true" />}
          </>
        )}
      </div>
    </div>
  )
}
