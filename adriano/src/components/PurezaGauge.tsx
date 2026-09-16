import { useEffect, useRef, useState } from 'react'

const RAIO = 54
const CIRCUNFERENCIA = 2 * Math.PI * RAIO

// O selo visual da especialidade real dele: água tratada a 100% de pureza
// (o padrão que hemodiálise exige). Um anel que enche até 100% quando entra
// na tela, em vez de um ícone de gota genérico.
export default function PurezaGauge() {
  const ref = useRef<HTMLDivElement>(null)
  const [percurso, setPercurso] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setPercurso(100)
      return
    }

    const el = ref.current
    if (!el) return

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        observador.disconnect()

        const inicio = performance.now()
        const duracao = 1400

        function passo(agora: number) {
          const t = Math.min(1, (agora - inicio) / duracao)
          const facilitado = 1 - Math.pow(1 - t, 3)
          setPercurso(Math.round(facilitado * 100))
          if (t < 1) requestAnimationFrame(passo)
        }
        requestAnimationFrame(passo)
      },
      { threshold: 0.4 },
    )
    observador.observe(el)
    return () => observador.disconnect()
  }, [])

  const offset = CIRCUNFERENCIA * (1 - percurso / 100)

  return (
    <div className="rounded-2xl border border-agua-clara bg-agua-clara/50 p-6 text-center">
      <div ref={ref} className="relative mx-auto inline-flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={RAIO} fill="none" stroke="var(--color-agua-clara)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={RAIO}
            fill="none"
            stroke="var(--color-agua)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUNFERENCIA}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-heading text-2xl font-semibold text-agua">{percurso}%</span>
          <span className="text-[0.65rem] font-medium text-fumo">pura</span>
        </div>
      </div>
      <p className="mt-4 max-w-[10rem] text-sm text-fumo">É o padrão de água que eu entrego pra quem precisa dela pra hemodiálise.</p>
    </div>
  )
}
