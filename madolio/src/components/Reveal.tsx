import { createElement, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  stagger?: number
  /** Tag do wrapper — use quando o filho precisa ser um elemento semântico
   * específico (ex: `dl`), pra não quebrar a estrutura exigida pelo pai. */
  as?: ElementType
  [prop: string]: unknown
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  stagger,
  as: Tag = 'div',
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const targets = stagger ? gsap.utils.toArray(el.children) : el

        const tween = gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.7,
          delay,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })

        // Rede de segurança: um elemento colado no fim da página (rodapé curto)
        // pode ter o topo impossível de chegar a 88% da altura da janela — o
        // gatilho acima nunca dispararia e o conteúdo ficaria em opacity 0 pra
        // sempre. Ao chegar no fim do scroll, toca o que estiver à vista.
        ScrollTrigger.create({
          start: () => ScrollTrigger.maxScroll(window) - 2,
          once: true,
          onEnter: () => {
            const r = el.getBoundingClientRect()
            if (r.top < window.innerHeight && r.bottom > 0) tween.play()
          },
        })
      })
    },
    { scope: ref, dependencies: [delay, y, stagger] },
  )

  return createElement(Tag, { ref, className, ...rest }, children)
}
