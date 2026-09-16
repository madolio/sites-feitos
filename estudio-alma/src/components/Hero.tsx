import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { movements } from '../data'
import Figure from './Figure'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const LAST = movements.length - 1

export default function Hero() {
  const section = useRef<HTMLElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(false)
  const [inView, setInView] = useState(true)
  const movement = movements[index]

  // Desktop: a seção fica presa e a rolagem escolhe o movimento.
  // Tela menor: sem prender a rolagem — o boneco troca sozinho (e para quando
  // a pessoa escolhe um movimento). Reduced motion: nenhum dos dois.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        trigger.current = ScrollTrigger.create({
          trigger: section.current,
          start: 'top top',
          end: `+=${LAST * 60}%`,
          pin: true,
          onUpdate: (self) => setIndex(Math.round(self.progress * LAST)),
        })
        return () => {
          trigger.current = null
        }
      })
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        setAutoplay(true)
        return () => setAutoplay(false)
      })
    },
    { scope: section },
  )

  useEffect(() => {
    const el = section.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!autoplay || !inView) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % movements.length), 2800)
    return () => window.clearInterval(id)
  }, [autoplay, inView])

  const choose = (i: number) => {
    setAutoplay(false)
    const st = trigger.current
    if (st) {
      window.scrollTo({ top: st.start + (st.end - st.start) * (i / LAST), behavior: 'smooth' })
    } else {
      setIndex(i)
    }
  }

  return (
    <section ref={section} id="inicio" className="overflow-hidden bg-gesso pt-24 pb-16 lg:flex lg:h-svh lg:items-center lg:pt-10 lg:pb-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <div>
          <h1 className="display text-[3.6rem] sm:text-7xl lg:text-[6.4rem]">Pilates é controle.</h1>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            Aulas em aparelho e no solo, com no máximo três alunos por turma
            e instrutora do começo ao fim. Na Vila Madalena, em São Paulo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#experimental" className="btn-ink">
              Agendar aula experimental
            </a>
            <a href="#horarios" className="btn-line">
              Ver horários
            </a>
          </div>
        </div>

        <div>
          <div className="mx-auto max-w-[27rem] lg:max-w-[30rem]">
            <Figure index={index} />
          </div>

          <div className="mx-auto mt-4 max-w-[30rem]">
            <div role="tablist" aria-label="Movimentos do método" className="flex flex-wrap gap-1.5">
              {movements.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={i === index}
                  aria-controls="movimento"
                  onClick={() => choose(i)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    i === index ? 'bg-ink text-gesso' : 'text-ink/75 hover:bg-ink/10'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>

            <div id="movimento" role="tabpanel" aria-labelledby={`tab-${movement.id}`} aria-live="polite" className="mt-5 border-t-2 border-ink pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-2xl font-medium">{movement.name}</p>
                <p className="text-sm tabular-nums text-ink/70">
                  {index + 1} de {movements.length}
                </p>
              </div>
              <p className="mt-1 min-h-[3.2em] text-ink/85">{movement.description}</p>
              <p className="mt-2 text-sm text-ink/70">Trabalha: {movement.works.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
