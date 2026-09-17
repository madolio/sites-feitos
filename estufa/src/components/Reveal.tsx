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
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  stagger,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const targets = stagger ? gsap.utils.toArray(el.children) : el

        gsap.from(targets, {
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
      })
    },
    { scope: ref, dependencies: [delay, y, stagger] },
  )

  return createElement(Tag, { ref, className }, children)
}
