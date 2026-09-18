import { createElement, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type RevealProps = {
  children: ReactNode
  className?: string
  stagger?: number
  as?: ElementType
  id?: string
}

// Revelação por rolagem, usada só nos blocos de abertura de cada seção e nas
// fichas de serviço — não em todo elemento (a diretriz do repositório avisa
// que fade-in espalhado vira ruído). Sempre dentro de `matchMedia`: com
// `prefers-reduced-motion`, nada anima e o conteúdo já nasce no estado final.
export default function Reveal({
  children,
  className,
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
        const alvos = stagger ? gsap.utils.toArray(el.children) : el

        gsap.from(alvos, {
          opacity: 0,
          y: 22,
          duration: 0.7,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
        })
      })
    },
    { scope: ref, dependencies: [stagger] },
  )

  return createElement(Tag, { ref, className, ...rest }, children)
}
