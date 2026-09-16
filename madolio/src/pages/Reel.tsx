import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Seo from '../components/Seo'
import { projetos } from '../data/projetos'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function slugDeUrl(url: string): string {
  return url.replace('https://', '').split('.')[0]
}

export default function Reel() {
  const destaques = useMemo(
    () => projetos.filter((p) => p.destaque && p.url).map((p) => ({ ...p, slug: slugDeUrl(p.url!) })),
    [],
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const painelRefs = useRef<HTMLDivElement[]>([])
  painelRefs.current = []

  const registrarPainel = (el: HTMLDivElement | null) => {
    if (el && !painelRefs.current.includes(el)) painelRefs.current.push(el)
  }

  useGSAP(
    () => {
      const container = containerRef.current
      const painéis = painelRefs.current
      if (!container || painéis.length < 2) return

      gsap.set(painéis, { opacity: 0 })
      gsap.set(painéis[0], { opacity: 1 })

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${painéis.length * window.innerHeight}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
          },
        })

        painéis.forEach((_, i) => {
          if (i === 0) return
          tl.to(painéis[i - 1], { opacity: 0, duration: 0.35 }, i - 0.7)
          tl.to(painéis[i], { opacity: 1, duration: 0.35 }, i - 0.7)
        })

        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })
    },
    { scope: containerRef, dependencies: [destaques.length] },
  )

  return (
    <>
      <Seo
        title="Reel — Madolio"
        description="Um apanhado em movimento dos projetos mais ousados da Madolio, rolando na tela como um reel."
        path="/reel"
      />

      <div ref={containerRef} className="relative h-svh w-full overflow-hidden bg-ink">
        {destaques.map((p, i) => (
          <div
            key={p.slug}
            ref={registrarPainel}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
            style={{ backgroundColor: p.bg }}
          >
            <img
              src={`/previews/${p.slug}.jpg`}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase opacity-60" style={{ color: p.accent }}>
                {String(i + 1).padStart(2, '0')} / {String(destaques.length).padStart(2, '0')} — {p.category}
              </p>
              <h2 className="mt-3 font-poster text-4xl text-white sm:text-6xl">{p.name}</h2>
              <p className="mt-4 text-lg text-white/80">{p.description}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-ink transition hover:brightness-110"
                style={{ backgroundColor: p.accent }}
              >
                Ver {p.name}
              </a>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-widest text-white/50 uppercase">
          Role pra continuar
        </div>
      </div>
    </>
  )
}
