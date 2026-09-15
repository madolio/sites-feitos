import type { CSSProperties } from 'react'

// Altura do arco em % da moldura. O mesmo número é usado no border-radius
// da moldura (Hero.tsx), então lâmpada e borda caem exatamente em cima uma
// da outra — se mudar aqui, mudar lá.
export const ARCO = 26

const ARCO_QTD = 11
const LADO_QTD = 4

// Ordem de aceso: sobe pelo lado esquerdo, passa pelo arco e desce pelo
// direito — como alguém ligando o espelho de camarim numa chave só.
function posicoes() {
  const esquerda = Array.from({ length: LADO_QTD }, (_, i) => ({
    x: 0,
    y: 100 - (i * (100 - ARCO - 12)) / LADO_QTD - 8,
  }))

  const arco = Array.from({ length: ARCO_QTD }, (_, i) => {
    const ang = Math.PI * (1 - i / (ARCO_QTD - 1))
    return { x: 50 + 50 * Math.cos(ang), y: ARCO - ARCO * Math.sin(ang) }
  })

  const direita = Array.from({ length: LADO_QTD }, (_, i) => ({
    x: 100,
    y: ARCO + 8 + (i * (100 - ARCO - 12)) / LADO_QTD,
  }))

  return [...esquerda, ...arco, ...direita]
}

export default function Lampadas() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {posicoes().map((p, i) => (
        <span
          key={i}
          className="lampada"
          style={{ left: `${p.x}%`, top: `${p.y}%`, '--atraso': `${i * 55}ms` } as CSSProperties}
        />
      ))}
    </div>
  )
}
