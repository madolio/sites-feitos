import { Children, useEffect, useRef, useState, type ReactNode } from 'react'

// O esqueleto inteiro do site: a página rola de LADO, não de cima pra baixo.
// Cada filho é um painel de largura 100vw; o wheel vertical (mouse/trackpad)
// é redirecionado pro scrollLeft, e o CSS scroll-snap encaixa no painel mais
// próximo ao soltar. No touch (celular), o arrasto lateral já é nativo — não
// precisa de JS pra isso, só o scroll-snap.
export default function Trilho({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const count = Children.count(children)

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    // React anexa onWheel como passive por padrão, o que faz preventDefault()
    // falhar silenciosamente (e logar erro no console). Um listener nativo
    // com passive:false é necessário pra realmente bloquear o scroll vertical.
    const onWheel = (e: globalThis.WheelEvent) => {
      // Só redireciona quando o gesto é predominantemente vertical — um
      // trackpad que já manda deltaX (gesto de lado) continua funcionando nativo.
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth)
      setActive(Math.max(0, Math.min(count - 1, i)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [count])

  const goTo = (i: number) => {
    const el = railRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative h-svh w-full">
      <div
        ref={railRef}
        id="trilho"
        className="trilho flex h-svh w-full overflow-x-auto overflow-y-hidden"
      >
        {children}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center gap-2 sm:bottom-8">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir pro painel ${i + 1}`}
            aria-current={active === i}
            className={`pointer-events-auto h-2 w-2 rounded-full transition-all ${
              active === i ? 'w-6 bg-ember' : 'bg-paper/30 hover:bg-paper/50'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(Math.min(count - 1, active + 1))}
        aria-label="Próximo painel"
        tabIndex={active === count - 1 ? -1 : 0}
        className={`fixed top-1/2 right-4 z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 text-paper transition-opacity hover:border-paper sm:flex ${
          active === count - 1 ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        →
      </button>
    </div>
  )
}
