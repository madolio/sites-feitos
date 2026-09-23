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
  // Os dois lados usam as MESMAS alturas, espelhadas, e o vao junto ao arco e
  // o vao ate a base sao iguais entre si. Antes, a esquerda era
  // y = 100 - i*passo - 8 (de 92% a 45,5%) e a direita y = ARCO + 8 + i*passo
  // (de 34% a 80,5%): nao eram espelho uma da outra, e os vaos junto ao arco e
  // a base ficavam diferentes de um lado e do outro.
  const lados = Array.from({ length: LADO_QTD }, (_, i) => ARCO + ((i + 1) * (100 - ARCO)) / (LADO_QTD + 1))

  const esquerda = [...lados].reverse().map((y) => ({ x: 0, y }))

  const arco = Array.from({ length: ARCO_QTD }, (_, i) => {
    const ang = Math.PI * (1 - i / (ARCO_QTD - 1))
    return { x: 50 + 50 * Math.cos(ang), y: ARCO - ARCO * Math.sin(ang) }
  })

  const direita = lados.map((y) => ({ x: 100, y }))

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
