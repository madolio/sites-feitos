import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Chrome from './Chrome'
import Footer from './Footer'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Chrome />
      <main className="flex-1">
        {/* Reserva a altura da tela enquanto o chunk da rota chega: sem isso o rodapé
            aparece no topo e é empurrado pra baixo quando a página monta (CLS). */}
        <Suspense fallback={<div className="min-h-[100svh]" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
