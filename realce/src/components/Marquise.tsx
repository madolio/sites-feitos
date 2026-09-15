import { useEffect, useState } from 'react'

const secoes = [
  { id: 'visita', rotulo: 'Monte sua visita' },
  { id: 'servicos', rotulo: 'Serviços' },
  { id: 'noivas', rotulo: 'Noivas' },
  { id: 'escola', rotulo: 'Escola' },
  { id: 'onde', rotulo: 'Onde estamos' },
]

// O "esqueleto" da página: no lugar de sublinhado ou pílula marcando a
// seção atual, cada item tem uma lâmpada em cima que acende quando você
// entra na seção — a barra inteira é o espelho de camarim em miniatura.
export default function Marquise() {
  const [ativa, setAtiva] = useState('')

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visivel) setAtiva(visivel.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    for (const s of secoes) {
      const el = document.getElementById(s.id)
      if (el) observador.observe(el)
    }
    return () => observador.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dourado/20 bg-preto/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a href="#inicio" className="leading-tight">
          <span className="font-display text-xl text-branco">Realce &amp; Cia</span>
          <span className="block text-[0.62rem] tracking-[0.2em] text-fumo uppercase">
            são roque · desde 2004
          </span>
        </a>

        <nav className="hidden items-end gap-7 md:flex" aria-label="Seções">
          {secoes.map((s) => {
            const acesa = ativa === s.id
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={acesa ? 'true' : undefined}
                className="group flex flex-col items-center gap-2 text-sm"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    acesa
                      ? 'bg-branco shadow-[0_0_10px_3px_rgba(197,157,95,0.75)]'
                      : 'bg-branco/25 group-hover:bg-branco/60'
                  }`}
                />
                <span className={acesa ? 'text-branco' : 'text-fumo group-hover:text-branco'}>
                  {s.rotulo}
                </span>
              </a>
            )
          })}
        </nav>

        <a href="#visita" className="btn-dourado px-5 py-2.5 text-sm">
          Agendar
        </a>
      </div>
    </header>
  )
}
