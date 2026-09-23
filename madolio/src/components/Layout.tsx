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
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
