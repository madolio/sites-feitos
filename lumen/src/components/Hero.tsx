import { useEffect, useRef } from 'react'

// O cursor é a luminária: numa sala escura, a única luz é a que você move.
// Só em telas com mouse de verdade (hover fino) — em toque não existe
// "posição do cursor" antes do clique, então ali o conteúdo já fica visível
// sem o efeito (ver checagem de matchMedia abaixo).
export function Hero() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const secaoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const temMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!temMouse) return

    const overlay: HTMLDivElement = overlayRef.current!
    const secao: HTMLDivElement = secaoRef.current!
    if (!overlay || !secao) return

    overlay.style.opacity = '1'

    let alvoX = 0.5
    let alvoY = 0.35
    let raf = 0

    function tick() {
      overlay.style.setProperty('--mx', `${alvoX * 100}%`)
      overlay.style.setProperty('--my', `${alvoY * 100}%`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    function onMove(e: PointerEvent) {
      const r = secao.getBoundingClientRect()
      alvoX = (e.clientX - r.left) / r.width
      alvoY = (e.clientY - r.top) / r.height
    }
    secao.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      secao.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section ref={secaoRef} className="relative flex min-h-[100vh] items-center overflow-hidden bg-noite">
      {/* conteúdo — visível por padrão; a camada escura (só some quando há mouse) é que cria o efeito */}
      <div className="relative z-0 mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="font-mono text-sm tracking-widest text-acento uppercase">Projeto luminotécnico</p>
        <h1 className="mt-4 text-4xl leading-tight sm:text-6xl">A luz certa não é a mais forte. É a mais pensada.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-fumo">
          Mova o cursor. Numa sala escura de verdade, é assim que a luz revela o espaço — um ponto de cada vez, nunca
          tudo de uma vez.
        </p>
        <a href="#calculadora" className="btn-acento mt-8 inline-block">
          Calcular minha iluminação
        </a>
      </div>

      {/* camada escura com um "furo" que segue o cursor — opacity 0 até o JS confirmar que há mouse */}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-noite opacity-0 transition-opacity duration-500"
        style={{
          maskImage: 'radial-gradient(circle at var(--mx, 50%) var(--my, 35%), transparent 0, transparent 150px, black 420px)',
          WebkitMaskImage:
            'radial-gradient(circle at var(--mx, 50%) var(--my, 35%), transparent 0, transparent 150px, black 420px)',
        }}
      />
    </section>
  )
}
