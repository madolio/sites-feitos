import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Reveal from './Reveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const etapas = [
  {
    numero: '01',
    titulo: 'Conversa inicial',
    texto: 'Você conta o negócio pelo WhatsApp, alinhamos escopo e prazo.',
  },
  {
    numero: '02',
    titulo: 'Materiais',
    texto: 'Você manda textos, fotos e referências que gosta — ou eu ajudo a organizar.',
  },
  {
    numero: '03',
    titulo: 'Design e desenvolvimento',
    texto: 'O site é construído do zero, sob medida pro seu negócio.',
  },
  {
    numero: '04',
    titulo: 'Revisão e publicação',
    texto: 'Você revisa, ajustamos o que precisar, e o site vai ao ar.',
  },
]

export default function Processo() {
  const root = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Linha de progresso que preenche da esquerda pra direita conforme a
  // seção passa pela tela (scrub ligado ao scroll, não só um fade de
  // entrada) — dá a sensação de "avançar" pelas 4 etapas, não só listar.
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          trackRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">Como funciona</h2>
        </Reveal>

        <div className="relative mt-12 pt-8">
          <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true" />
          <div
            ref={trackRef}
            className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
            aria-hidden="true"
          />

          <Reveal as="ol" stagger={0.08} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {etapas.map((etapa) => (
              <li key={etapa.numero}>
                <span className="font-poster text-3xl text-accent">{etapa.numero}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{etapa.titulo}</h3>
                <p className="mt-1.5 text-ink/70">{etapa.texto}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
