import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Seo from '../components/Seo'

const HomeBelowFold = lazy(() => import('../components/HomeBelowFold'))

export default function Home() {
  // O resto da página só é pedido depois que o hero pintou e a página terminou
  // de carregar — assim o chunk não disputa banda/CPU com o primeiro render.
  const [showRest, setShowRest] = useState(false)
  useEffect(() => {
    let handle: number | undefined
    const start = () => {
      handle = window.setTimeout(() => setShowRest(true), 150)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      window.clearTimeout(handle)
    }
  }, [])

  const placeholder = <div className="min-h-[200svh]" aria-hidden="true" />

  return (
    <>
      <Seo
        title="Madolio — Criação de sites profissionais para pequenos negócios"
        description="Sites profissionais para confeitarias, salões, hamburguerias e outros pequenos negócios, no ar em 5 a 15 dias. Design próprio, responsivo e feito sob medida — sem modelo genérico."
        path="/"
      />
      <Hero />
      {/* Reserva altura enquanto o chunk chega, pro rodapé não aparecer e depois ser empurrado. */}
      <Suspense fallback={placeholder}>
        {showRest ? <HomeBelowFold /> : placeholder}
      </Suspense>
    </>
  )
}
