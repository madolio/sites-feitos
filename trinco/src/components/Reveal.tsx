import { createElement, useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'

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

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) return // já nasce no estado final, sem animação

    const targets = stagger ? gsap.utils.toArray(el.children) : el
    gsap.set(targets, { opacity: 0, y: y })

    let disparado = false
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && !disparado) {
            disparado = true
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay,
              ease: 'power3.out',
              stagger,
            })
            observer.disconnect()
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, y, stagger])

  return createElement(Tag, { ref, className }, children)
}
