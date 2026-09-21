import { useEffect, useRef } from 'react'

// Movimento contínuo de verdade no hero (não um fade estático): três
// senoides sobrepostas com fases levemente diferentes, como as ressonâncias
// de uma corda e seus harmônicos se sobrepondo. Para quando
// prefers-reduced-motion está ativo.
function OndaAmbiente() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const w = canvas.width
      const h = canvas.height
      ctx.strokeStyle = 'rgba(95, 251, 192, 0.5)'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0; x <= w; x++) {
        const y = h / 2 + Math.sin((x / w) * Math.PI * 3) * 18
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      return
    }

    let raf: number
    let t = 0
    const w = canvas.width
    const h = canvas.height

    function loop() {
      const ctx2 = canvas!.getContext('2d')
      if (!ctx2) return
      ctx2.clearRect(0, 0, w, h)
      t += 0.012

      const harmonicos = [
        { amp: 22, freq: 1.4, fase: 0, cor: 'rgba(95, 251, 192, 0.85)' },
        { amp: 12, freq: 2.8, fase: 1.1, cor: 'rgba(95, 251, 192, 0.4)' },
        { amp: 7, freq: 4.2, fase: 2.3, cor: 'rgba(181, 105, 58, 0.5)' },
      ]

      for (const hz of harmonicos) {
        ctx2.strokeStyle = hz.cor
        ctx2.lineWidth = 2
        ctx2.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const y = h / 2 + Math.sin((x / w) * Math.PI * hz.freq + t + hz.fase) * hz.amp
          if (x === 0) ctx2.moveTo(x, y)
          else ctx2.lineTo(x, y)
        }
        ctx2.stroke()
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} width={960} height={160} aria-hidden="true" className="w-full" />
}

export default function Hero() {
  return (
    <section className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden px-6 pt-28 pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-neblina)_1px,transparent_1px),linear-gradient(90deg,var(--color-neblina)_1px,transparent_1px)] [background-size:42px_42px]"
      />

      <header className="absolute inset-x-0 top-0 z-10 flex items-baseline justify-between p-5 sm:p-8">
        <span className="font-display text-xl">Ressoa</span>
        <span className="rotulo-mono hidden sm:inline">oficina de cordas — são bento do sul, sc</span>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="rotulo-mono">luteria de precisão — violão, viola caipira e ukulele sob encomenda</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
          Cada instrumento é medido antes de ser talhado.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-osso/75">
          A Ressoa trabalha como um laboratório de acústica: comprimento de escala,
          bitola de corda e madeira entram numa fórmula real antes de virar madeira
          cortada. Role a página — o mesmo cálculo que define seu instrumento toca
          e desenha um padrão de Chladni ao vivo, logo abaixo.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-12 w-full max-w-3xl rounded-2xl border border-neblina/25 bg-painel/70 p-4">
        <OndaAmbiente />
        <p className="mt-2 text-center text-xs text-neblina">
          sobreposição de harmônicos — a mesma ideia física por trás do timbre de uma corda
        </p>
      </div>
    </section>
  )
}
