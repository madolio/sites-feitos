import { useEffect, useRef, useState } from 'react'

const RAIO = 54
const CIRCUNFERENCIA = 2 * Math.PI * RAIO
const MARCAS = 24

// O selo visual da especialidade real dele: o anel enche até 100% quando
// entra na tela. Sobreviveu ao redesenho porque já era um instrumento — só
// ganhou a face com as marcas de escala do resto do painel.
//
// Continua sem lib de animação (IntersectionObserver + requestAnimationFrame)
// e continua respeitando `prefers-reduced-motion`: nesse caso pula direto
// pra 100 e nada se move.
export default function PurezaGauge() {
  const ref = useRef<HTMLDivElement>(null)
  const [percurso, setPercurso] = useState(0)

  useEffect(() => {
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semMovimento) {
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

  const deslocamento = CIRCUNFERENCIA * (1 - percurso / 100)

  return (
    <figure className="w-full max-w-[16rem]">
      <div className="rounded-sm border border-linha bg-superficie px-6 py-7">
        <div ref={ref} className="relative mx-auto flex h-36 w-36 items-center justify-center">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
            {Array.from({ length: MARCAS }, (_, i) => {
              const angulo = (i / MARCAS) * Math.PI * 2
              return (
                <line
                  key={i}
                  x1={60 + Math.cos(angulo) * 41}
                  y1={60 + Math.sin(angulo) * 41}
                  x2={60 + Math.cos(angulo) * 46}
                  y2={60 + Math.sin(angulo) * 46}
                  stroke="var(--color-linha)"
                  strokeWidth={i % 6 === 0 ? 2.4 : 1.2}
                  strokeLinecap="round"
                />
              )
            })}
            <circle cx="60" cy="60" r={RAIO} fill="none" stroke="var(--color-linha)" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r={RAIO}
              fill="none"
              stroke="var(--color-agua)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUNFERENCIA}
              strokeDashoffset={deslocamento}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-heading text-[1.75rem] font-extrabold tabular-nums text-agua">
              {percurso}%
            </span>
            <span className="rotulo text-[0.625rem] text-fumo">pura</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-[0.9375rem] leading-snug text-fumo">
        É o padrão de água que eu entrego pra quem precisa dela pra hemodiálise.
      </figcaption>
    </figure>
  )
}
