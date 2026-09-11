import { useEffect, useRef } from 'react'

// Adaptado do "Click Spark" do React Bits (reactbits.dev/animations/click-spark):
// as mesmas faíscas saindo em círculo do ponto do clique, com ease-out — mas
// desenhadas como granulado colorido (traço grosso de ponta redonda, nas cores
// da cartela, girando e caindo um pouco). Mudanças de performance: canvas fixo
// do tamanho da tela (não do tamanho da página), com devicePixelRatio, e o loop
// só roda enquanto tem granulado no ar — o original desenha a cada frame pra
// sempre.

const COLORS = ['#c4213a', '#f5c93a', '#a2bb6f', '#f4b4bf', '#4b2519', '#ec8c3c']
const COUNT = 11
const DURATION = 700
const RADIUS = 42

type Sprinkle = { x: number; y: number; angle: number; spin: number; color: string; start: number }

export default function Sprinkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let sprinkles: Sprinkle[] = []
    let raf = 0

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.lineCap = 'round'
      ctx.lineWidth = 3.4

      sprinkles = sprinkles.filter((s) => {
        const p = (now - s.start) / DURATION
        if (p >= 1) return false
        const eased = p * (2 - p)
        const x = s.x + Math.cos(s.angle) * eased * RADIUS
        const y = s.y + Math.sin(s.angle) * eased * RADIUS + p * p * 26
        const rot = s.angle + s.spin * p
        ctx.globalAlpha = 1 - p * p * p
        ctx.strokeStyle = s.color
        ctx.beginPath()
        ctx.moveTo(x - Math.cos(rot) * 3.6, y - Math.sin(rot) * 3.6)
        ctx.lineTo(x + Math.cos(rot) * 3.6, y + Math.sin(rot) * 3.6)
        ctx.stroke()
        return true
      })

      ctx.globalAlpha = 1
      raf = sprinkles.length > 0 ? requestAnimationFrame(draw) : 0
    }

    const onClick = (e: MouseEvent) => {
      // Clique via teclado (Enter/Espaço) vem com coordenada 0,0 — ignora.
      if (e.detail === 0) return
      const now = performance.now()
      for (let i = 0; i < COUNT; i++) {
        sprinkles.push({
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / COUNT + Math.random() * 0.5,
          spin: (Math.random() - 0.5) * 9,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          start: now,
        })
      }
      if (!raf) raf = requestAnimationFrame(draw)
    }

    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  )
}
