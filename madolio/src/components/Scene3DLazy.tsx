import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from 'react'

const IDLE_FALLBACK_MS = 3500

const Scene3D = lazy(() => import('./Scene3D'))

type Scene3DLazyProps = ComponentProps<typeof Scene3D> & {
  className?: string
}

export default function Scene3DLazy({ className, ...sceneProps }: Scene3DLazyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [visible, setVisible] = useState(true)

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

    // Montar o WebGL (three.js: ~900 kB + compilar shaders) custa centenas de
    // ms de main thread e é decorativo — o hero já está pintado. Então espera
    // a página carregar e a pessoa interagir (rolar/tocar/mexer o mouse) ou,
    // sem interação, um tempo fixo, o que vier primeiro.
    const INTERACTION_EVENTS = ['pointerdown', 'pointermove', 'wheel', 'touchstart', 'keydown', 'scroll']
    let timer: number | undefined
    const cleanupTriggers = () => {
      INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, trigger))
      window.clearTimeout(timer)
    }
    const trigger = () => {
      cleanupTriggers()
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(load, { timeout: 1000 })
        idleCancel = window.cancelIdleCallback
      } else {
        idleHandle = window.setTimeout(load, 100)
        idleCancel = window.clearTimeout
      }
    }
    const scheduleLoad = () => {
      INTERACTION_EVENTS.forEach((ev) => window.addEventListener(ev, trigger, { once: true, passive: true }))
      timer = window.setTimeout(trigger, IDLE_FALLBACK_MS)
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

    // Cena fora da tela não precisa renderizar: pausa o loop do WebGL.
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    visibility.observe(el)

    return () => {
      visibility.disconnect()
      observer.disconnect()
      window.removeEventListener('load', scheduleLoad)
      cleanupTriggers()
      if (idleHandle !== undefined) idleCancel?.(idleHandle)
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <div className="scene-in h-full w-full">
          <Suspense fallback={null}>
            <Scene3D {...sceneProps} active={visible} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
