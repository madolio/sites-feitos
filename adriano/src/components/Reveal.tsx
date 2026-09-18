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

        const tween = gsap.from(alvos, {
          opacity: 0,
          y: 22,
          duration: 0.7,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
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
    { scope: ref, dependencies: [stagger] },
  )

  return createElement(Tag, { ref, className, ...rest }, children)
}
