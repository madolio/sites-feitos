import { useEffect, useRef, useState } from 'react'

// Em vez de barra de menu, a navegação é a régua de carpinteiro: uma trena
// fixa na borda esquerda da tela, com uma marca maior em cada seção — como
// as marcas de centímetro cheio numa régua de dobrar. O traço ativo (a seção
// visível) fica cheio; os outros ficam só de contorno.
const secoes = [
  { id: 'catalogo', label: 'Peças' },
  { id: 'processo', label: 'Como trabalho' },
  { id: 'contato', label: 'Encomendar' },
]

export default function Regua() {
  const [ativo, setAtivo] = useState<string>(secoes[0].id)
  const observando = useRef(false)

  useEffect(() => {
    if (observando.current) return
    observando.current = true

    const alvos = secoes
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas.filter((e) => e.isIntersecting)
        if (visiveis.length === 0) return
        const maisVisivel = visiveis.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        setAtivo(maisVisivel.target.id)
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    alvos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Seções da página"
      className="fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col gap-14 border-l border-ink/30 pl-4">
        {secoes.map((s) => {
          const ativa = ativo === s.id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group relative flex items-center gap-3 text-left"
              aria-current={ativa ? 'true' : undefined}
            >
              <span
                className={`absolute -left-4 h-px transition-all ${
                  ativa ? 'w-3.5 bg-accent' : 'w-2 bg-ink/30 group-hover:bg-ink/60'
                }`}
              />
              <span
                className={`font-ui text-xs font-medium tracking-wide transition-colors ${
                  ativa ? 'text-accent' : 'text-ink/45 group-hover:text-ink/80'
                }`}
              >
                {s.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
