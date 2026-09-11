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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
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
