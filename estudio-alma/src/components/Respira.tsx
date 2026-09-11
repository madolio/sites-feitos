import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// O "wildcard" da página: um guia de respiração que só começa quando a pessoa
// aperta o botão. Três ciclos de 4 s puxando o ar e 6 s soltando. Com reduced
// motion o círculo não cresce — só o texto e a contagem mudam.

const CYCLES = 3
const IN = 4
const OUT = 6

export default function Respira() {
  const circle = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [phase, setPhase] = useState<'parado' | 'inspira' | 'expira' | 'fim'>('parado')
  const [cycle, setCycle] = useState(0)

  useEffect(() => () => void tl.current?.kill(), [])

  const start = () => {
    tl.current?.kill()
    const el = circle.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const full = reduce ? { opacity: 1 } : { scale: 1 }
    const empty = reduce ? { opacity: 0.3 } : { scale: 0.5 }
    gsap.set(el, reduce ? { scale: 0.75, opacity: 0.3 } : { scale: 0.5, opacity: 1 })

    const t = gsap.timeline({ onComplete: () => setPhase('fim') })
    for (let i = 0; i < CYCLES; i++) {
      t.call(() => {
        setCycle(i + 1)
        setPhase('inspira')
      })
      t.to(el, { ...full, duration: IN, ease: 'sine.inOut' })
      t.call(() => setPhase('expira'))
      t.to(el, { ...empty, duration: OUT, ease: 'sine.inOut' })
    }
    tl.current = t
  }

  const label = {
    parado: 'Um minuto antes de marcar a aula.',
    inspira: 'Puxa o ar pelo nariz, abrindo as costelas pros lados.',
    expira: 'Solta pela boca, devagar, fechando as costelas.',
    fim: 'É assim que toda aula começa.',
  }[phase]

  return (
    <section className="border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="display text-6xl md:text-8xl">Respira.</h2>
          <p className="mt-6 max-w-sm text-lg text-ink/85" aria-live="polite">
            {label}
          </p>
          {phase !== 'parado' && phase !== 'fim' && (
            <p className="mt-2 text-sm tabular-nums text-ink/70">
              Ciclo {cycle} de {CYCLES}
            </p>
          )}
          <button type="button" onClick={start} className="btn-line mt-8">
            {phase === 'parado' ? 'Respirar junto' : phase === 'fim' ? 'De novo' : 'Recomeçar'}
          </button>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-ink/30" aria-hidden="true" />
          <div
            ref={circle}
            className="absolute inset-0 rounded-full bg-verde"
            style={{ transform: 'scale(0.5)' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
