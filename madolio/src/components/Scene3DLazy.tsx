import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from 'react'

const Scene3D = lazy(() => import('./Scene3D'))

type Scene3DLazyProps = ComponentProps<typeof Scene3D> & {
  className?: string
}

export default function Scene3DLazy({ className, ...sceneProps }: Scene3DLazyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let idleHandle: number | undefined
    let idleCancel: ((handle: number) => void) | undefined

    // A cena fica dentro do Hero, então já está visível desde o primeiro
    // frame — um IntersectionObserver sozinho não adia nada nesse caso, e o
    // chunk do three.js (grande) acaba competindo com o carregamento
    // crítico e atrasando o FCP/LCP. Em vez disso, só carrega depois que a
    // página termina de carregar E o elemento está visível.
    const load = () => setShouldLoad(true)

    const scheduleLoad = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(load, { timeout: 1500 })
        idleCancel = window.cancelIdleCallback
      } else {
        idleHandle = window.setTimeout(load, 300)
        idleCancel = window.clearTimeout
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        if (document.readyState === 'complete') {
          scheduleLoad()
        } else {
          window.addEventListener('load', scheduleLoad, { once: true })
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      window.removeEventListener('load', scheduleLoad)
      if (idleHandle !== undefined) idleCancel?.(idleHandle)
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <Suspense fallback={null}>
          <Scene3D {...sceneProps} />
        </Suspense>
      )}
    </div>
  )
}
