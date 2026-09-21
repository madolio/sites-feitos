import { useEffect, useRef } from 'react'

type ChladniProps = {
  frequenciaHz: number
  className?: string
}

// Aproximação de Chladni por superposição de modos (estilo Ritz) numa placa
// quadrada: Z(x,y) = cos(nπx)cos(mπy) − cos(mπx)cos(nπy). As curvas de nível
// onde Z ≈ 0 são as linhas nodais — exatamente onde a areia real se acumula
// numa placa de Chladni vibrando, porque ali o deslocamento é zero. Os
// números de modo (n, m) são derivados da frequência que está tocando, então
// o padrão muda de verdade com o parâmetro físico, não é um GIF pronto.
function modosDaFrequencia(f: number): { n: number; m: number } {
  const passo = Math.max(1, Math.round(f / 55))
  const n = 1 + (passo % 6)
  const m = 1 + (Math.floor(passo / 6) % 6)
  return { n: n === m ? n + 1 : n, m }
}

export default function Chladni({ frequenciaHz, className }: ChladniProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const RES = 110
    const { n, m } = modosDaFrequencia(frequenciaHz)

    function desenhar(fase: number) {
      const ctx2 = canvas!.getContext('2d')
      if (!ctx2) return
      const w = canvas!.width
      const h = canvas!.height
      ctx2.fillStyle = '#12191c'
      ctx2.fillRect(0, 0, w, h)

      const grid = new Float32Array(RES * RES)
      for (let j = 0; j < RES; j++) {
        const y = j / (RES - 1)
        for (let i = 0; i < RES; i++) {
          const x = i / (RES - 1)
          const a = Math.cos(n * Math.PI * x + fase) * Math.cos(m * Math.PI * y)
          const b = Math.cos(m * Math.PI * x) * Math.cos(n * Math.PI * y + fase)
          grid[j * RES + i] = a - b
        }
      }

      // Traça linha nodal onde o sinal muda entre células vizinhas.
      ctx2.fillStyle = '#5ffbc0'
      const cw = w / RES
      const ch = h / RES
      const limiar = 0.06
      for (let j = 0; j < RES; j++) {
        for (let i = 0; i < RES; i++) {
          const v = grid[j * RES + i]
          if (Math.abs(v) < limiar) {
            const alpha = 1 - Math.abs(v) / limiar
            ctx2.globalAlpha = 0.25 + alpha * 0.75
            ctx2.fillRect(i * cw, j * ch, cw + 0.6, ch + 0.6)
          }
        }
      }
      ctx2.globalAlpha = 1
    }

    if (reduzMovimento) {
      desenhar(0)
      return
    }

    let fase = 0
    const loop = () => {
      fase += 0.006
      desenhar(fase)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [frequenciaHz])

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={480}
      role="img"
      aria-label={`Padrão de Chladni (linhas nodais) para os modos derivados de ${Math.round(frequenciaHz)} Hz`}
      className={className}
    />
  )
}
