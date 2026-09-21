import { createElement, useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'

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

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) return // já nasce no estado final, sem animação

    const alvos = stagger ? gsap.utils.toArray(el.children) : el
    gsap.set(alvos, { opacity: 0, y: 22 })

    let disparado = false
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && !disparado) {
            disparado = true
            gsap.to(alvos, {
              opacity: 1,
              y: 0,
              duration: 0.7,
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
  }, [stagger])

  return createElement(Tag, { ref, className, ...rest }, children)
}
