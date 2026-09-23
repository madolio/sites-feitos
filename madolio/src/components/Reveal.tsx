import { createElement, useEffect, useRef, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** false = só sobe, sem começar transparente. Usar no conteúdo acima da
   * dobra: um elemento com opacity 0 não conta como LCP, então o fade
   * empurrava o LCP pra depois da animação inteira. */
  fade?: boolean
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
  fade = true,
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

    // Transições CSS inline em vez de GSAP: o Reveal roda no hero, e importar
    // o GSAP + o setup dele (que lê estilo computado → layout forçado) custava
    // main thread e bundle inicial. Mesma curva do power3.out e mesma duração.
    const targets = (stagger ? Array.from(el.children) : [el]) as HTMLElement[]
    const EASE = 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    const DURATION = 0.7
    targets.forEach((t, i) => {
      const d = delay + (stagger ?? 0) * i
      if (fade) t.style.opacity = '0'
      t.style.transform = `translateY(${y}px)`
      t.style.transition = `${fade ? `opacity ${DURATION}s ${EASE} ${d}s, ` : ''}transform ${DURATION}s ${EASE} ${d}s`
    })

    let timer: number | undefined
    const observer = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return
        observer.disconnect()
        targets.forEach((t) => {
          if (fade) t.style.opacity = '1'
          t.style.transform = 'translateY(0)'
        })
        // Devolve o controle de transition às classes do elemento (hover etc.).
        const total = delay + (stagger ?? 0) * (targets.length - 1) + DURATION
        timer = window.setTimeout(() => {
          targets.forEach((t) => {
            t.style.transition = ''
            t.style.opacity = ''
            t.style.transform = ''
          })
        }, total * 1000 + 100)
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [delay, y, stagger, fade])

  return createElement(Tag, { ref, className, ...rest }, children)
}
