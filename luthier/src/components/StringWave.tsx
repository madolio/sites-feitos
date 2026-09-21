import { useEffect, useRef } from 'react'

type StringWaveProps = {
  tocando: boolean
  frequenciaHz: number
  className?: string
}

// Visualização da corda vibrando: uma senoide amortecida cujo período visual
// acompanha a frequência calculada e cuja amplitude decai enquanto o pluck
// de Karplus-Strong está soando — não é decoração desacoplada do áudio, é
// a mesma frequência que está sendo sintetizada.
export default function StringWave({ tocando, frequenciaHz, className }: StringWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const inicioRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const w = canvas.width
    const h = canvas.height
    const meio = h / 2

    function tracar(amplitude: number, cicloVisual: number) {
      const ctx2 = canvas!.getContext('2d')
      if (!ctx2) return
      ctx2.clearRect(0, 0, w, h)
      ctx2.strokeStyle = '#5ffbc0'
      ctx2.lineWidth = 2.5
      ctx2.beginPath()
      for (let x = 0; x <= w; x++) {
        const t = x / w
        const y = meio + Math.sin(t * Math.PI * cicloVisual) * amplitude * meio * 0.8
        if (x === 0) ctx2.moveTo(x, y)
        else ctx2.lineTo(x, y)
      }
      ctx2.stroke()
    }

    // Mais ciclos desenhados pra frequências mais agudas (referência visual
    // proporcional, não em escala real — a escala real não caberia na tela).
    const ciclosVisuais = 2 + Math.min(6, frequenciaHz / 220)

    if (!tocando || reduzMovimento) {
      tracar(reduzMovimento && tocando ? 0.5 : 0.18, ciclosVisuais)
      return
    }

    inicioRef.current = performance.now()
    const duracaoMs = 2500
    const loop = (t: number) => {
      const decorrido = t - inicioRef.current
      const progresso = Math.min(1, decorrido / duracaoMs)
      const amplitude = 0.85 * Math.exp(-progresso * 4.2)
      tracar(amplitude, ciclosVisuais)
      if (progresso < 1) {
        rafRef.current = requestAnimationFrame(loop)
      }
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [tocando, frequenciaHz])

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={160}
      aria-hidden="true"
      className={className}
    />
  )
}
