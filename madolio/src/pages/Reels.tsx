import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { reels } from '../data/reels'

// Rolagem vertical com snap, uma tela por projeto — o mesmo formato de
// "reels" de rede social, só que cada clipe é o gesto de assinatura de um
// site (girar algo, arrastar algo, clicar num ponto certo), não o site
// inteiro. Cada `<section>` ocupa 100svh e trava no scroll (snap-start);
// não existe botão de "próximo" — rolar É a navegação, como o formato real.
export default function Reels() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const secoes = Array.from(container.querySelectorAll<HTMLElement>('[data-reel]'))

    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) setAtual(Number((visivel.target as HTMLElement).dataset.reel))
      },
      { root: container, threshold: 0.6 },
    )
    secoes.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      const container = containerRef.current
      if (!container) return
      const alvo = atual + (e.key === 'ArrowDown' ? 1 : -1)
      const secao = container.querySelector<HTMLElement>(`[data-reel="${alvo}"]`)
      if (secao) {
        e.preventDefault()
        secao.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [atual])

  return (
    <div className="bg-void">
      <Seo
        title="Reels — o gesto de cada site, em 3 segundos | Madolio"
        description="O portfólio da Madolio em clipes curtos: a interação de assinatura de cada site, uma atrás da outra."
        path="/reels"
      />

      <Link
        to="/projetos"
        className="fixed top-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur transition-colors hover:text-white sm:top-6"
      >
        ← ver como página
      </Link>

      <div className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col gap-2 sm:flex sm:right-6">
        {reels.map((r, i) => (
          <span
            key={r.slug}
            aria-hidden="true"
            className={`h-6 w-[3px] rounded-full transition-colors ${i === atual ? 'bg-accent-hero' : 'bg-white/20'}`}
          />
        ))}
      </div>

      {reels.length === 0 ? (
        <div className="flex h-[100svh] items-center justify-center px-6 text-center text-white/60">
          Em breve.
        </div>
      ) : (
      <div
        ref={containerRef}
        className="h-[100svh] snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        {reels.map((r, i) => (
          <section
            key={r.slug}
            data-reel={i}
            className="relative flex h-[100svh] snap-start items-end justify-center overflow-hidden"
          >
            <img
              src={`/reels/${r.slug}.gif`}
              alt=""
              aria-hidden="true"
              className="clipe-anim absolute inset-0 h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <img
              src={`/reels/${r.slug}.png`}
              alt={`${r.projeto}: ${r.legenda}`}
              className="clipe-poster absolute inset-0 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

            <div className="relative z-10 w-full max-w-md px-6 pb-16 sm:pb-20">
              <span className="text-sm font-semibold text-accent-hero">{r.categoria}</span>
              <h2 className="font-poster mt-1 text-4xl tracking-tight text-white uppercase">{r.projeto}</h2>
              <p className="mt-2 text-white/80">{r.legenda}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-void transition-colors hover:bg-white/85"
              >
                Ver site completo
              </a>
            </div>
          </section>
        ))}
      </div>
      )}
    </div>
  )
}
