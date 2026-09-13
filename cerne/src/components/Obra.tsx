import { useEffect, useRef, useState } from 'react'
import { casos } from '../data/casos'
import Ilustracao from './Ilustracoes'

// O esqueleto inteiro do site: sem hero, sem seções empilhadas. Duas colunas
// que rolam de formas diferentes — a esquerda é o documento normal (os
// casos, um abaixo do outro); a direita é `sticky`, ocupa a tela toda, e
// troca de desenho técnico conforme qual caso está no meio da tela à
// esquerda (IntersectionObserver com margem negativa em cima/embaixo, pra
// disparar exatamente quando o caso cruza o centro vertical).
export default function Obra() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const i = refs.current.findIndex((el) => el === entry.target)
          if (i !== -1) setActive(i)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start">
      <div>
        <header className="max-w-md px-6 pt-28 pb-16 sm:px-10 lg:pt-36">
          <p className="text-lg text-ink/75">
            Projetos de interiores contados um a um — a planta, o corte, os
            materiais. Role pra conhecer cada obra.
          </p>
        </header>

        <ol>
          {casos.map((caso, i) => (
            <li
              key={caso.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              className="border-t border-line px-6 py-20 sm:px-10 lg:py-32"
            >
              <div className="mb-8 aspect-square max-w-xs rounded-sm border border-line bg-panel p-8 lg:hidden">
                <Ilustracao tipo={caso.ilustracao} />
              </div>
              <span className="text-sm font-medium text-moss">
                {caso.ambiente} · {caso.area}
              </span>
              <h2 className="mt-2 max-w-md text-3xl sm:text-4xl">{caso.titulo}</h2>
              <p className="mt-4 max-w-md text-ink/75">{caso.texto}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="hidden border-l border-line bg-panel lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:justify-center">
        <div className="relative h-[360px] w-[360px]">
          {casos.map((caso, i) => (
            <div
              key={caso.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: active === i ? 1 : 0 }}
              aria-hidden={active !== i}
            >
              <Ilustracao tipo={caso.ilustracao} />
            </div>
          ))}
        </div>

        <p className="absolute bottom-10 text-sm text-ink/60">{casos[active].titulo}</p>
      </div>
    </div>
  )
}
