import { useEffect, useRef } from 'react'
import { cursos } from '../data'
import { mergulho, PROF_MAX, scrollDaProfundidade } from '../estado'

// No lugar de uma barra de navegação: uma régua de profundidade. Os cursos
// são marcas na régua — clicar leva até a profundidade que ele libera.
export default function Profundimetro() {
  const marcador = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      if (marcador.current) marcador.current.style.top = `${(Math.max(0, mergulho.atual) / PROF_MAX) * 100}%`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const ir = (d: number) => {
    const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: scrollDaProfundidade(d), behavior: suave ? 'smooth' : 'auto' })
  }

  const marcas = Array.from({ length: PROF_MAX / 5 + 1 }, (_, i) => i * 5)

  return (
    <nav
      aria-label="Profundidade"
      className="fixed top-[12vh] right-3 bottom-[12vh] z-30 w-11 rounded-full border border-espuma/15 bg-placa/70 sm:right-5 sm:w-14"
    >
      <div className="absolute inset-x-0 top-5 bottom-5">
        {marcas.map((d) => (
          <div key={d} className="absolute right-0 left-0 flex items-center" style={{ top: `${(d / PROF_MAX) * 100}%` }}>
            <span className={`ml-auto h-px bg-espuma/40 ${d % 10 === 0 ? 'w-3' : 'w-1.5'}`} />
            {d % 10 === 0 && (
              <span className="absolute left-1.5 -translate-y-px font-visor text-[0.6rem] text-espuma/60 sm:left-2">
                {d}
              </span>
            )}
          </div>
        ))}

        {cursos.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => ir(c.profundidade)}
            aria-label={`${c.nome} — até ${c.profundidade} m`}
            title={`${c.nome} — até ${c.profundidade} m`}
            className="group absolute right-1 -translate-y-1/2 sm:right-1.5"
            style={{ top: `${(c.profundidade / PROF_MAX) * 100}%` }}
          >
            <span className="block h-3 w-3 rounded-full border-2 border-lanterna bg-placa transition-colors group-hover:bg-lanterna" />
            <span className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 rounded-full bg-placa/90 px-2.5 py-1 font-visor text-[0.65rem] whitespace-nowrap text-espuma group-hover:block group-focus-visible:block">
              {c.nome}
            </span>
          </button>
        ))}

        <div ref={marcador} className="pointer-events-none absolute right-full -translate-y-1/2 pr-1" style={{ top: '0%' }}>
          <span className="block h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-lanterna" />
        </div>
      </div>
    </nav>
  )
}
