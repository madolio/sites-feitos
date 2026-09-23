import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Reveal from './Reveal'
import SectionNumber from './SectionNumber'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP)

const fazSentido = [
  'Você já tem um negócio rodando e precisa de presença profissional rápida.',
  'Você quer parar de perder cliente porque "não tem site".',
  'Você prefere resolver tudo direto com uma pessoa, sem repassar briefing pra agência.',
]

const naoFazSentido = [
  'Você precisa de loja virtual com catálogo grande e carrinho de compras.',
  'Você quer atualizar o conteúdo sozinho todo dia — o site é sob medida, não um builder.',
  'Você está procurando o mais barato do mercado, não o mais bem feito.',
]

// Check/x se desenham a traço (DrawSVG) ao entrar na tela, em vez de um
// ícone estático — o mesmo princípio do SketchToSite, aplicado aqui pra dar
// peso à resposta "sim"/"não" de cada linha sem recair em ícone-em-caixinha.
function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none">
      <path data-mark d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Cross() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-ink/35" fill="none">
      <path data-mark d="M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path data-mark d="M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function ParaQuemE() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        // drawSVG mede cada traço (getBBox → layout forçado da página toda),
        // então só prepara quando a seção está perto de aparecer — não durante
        // o carregamento inicial.
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            gsap.set('[data-mark]', { drawSVG: '0%' })
            gsap.to('[data-mark]', {
              drawSVG: '100%',
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
            })
          },
          { rootMargin: '600px 0px' },
        )
        observer.observe(root.current!)
        return () => observer.disconnect()
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionNumber n="04" label="É pra você?" />
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">
            Pra quem é — e pra quem não é
          </h2>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-poster text-sm tracking-wider text-accent uppercase">Faz sentido se</h3>
            <ul className="mt-4 space-y-3">
              {fazSentido.map((item) => (
                <li key={item} className="flex gap-3 text-ink/80">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:border-l md:border-line md:pl-16">
            <h3 className="font-poster text-sm tracking-wider text-ink/50 uppercase">Não faz sentido se</h3>
            <ul className="mt-4 space-y-3">
              {naoFazSentido.map((item) => (
                <li key={item} className="flex gap-3 text-ink/70">
                  <Cross />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
