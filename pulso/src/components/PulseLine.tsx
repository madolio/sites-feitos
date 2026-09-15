// A linha de batimento que dá nome ao lugar: um traçado de monitor cardíaco
// correndo sem parar, na cor da raia. Uma unidade de 100×40 se repete 6x num
// SVG bem largo, e a metade da largura desliza em loop via CSS — o
// equivalente do "correr a pista" mas na métrica que o nome "Pulso" pede de
// verdade (batimento), não só a metáfora de atletismo que já existia.
const UNIDADE = 'M0 20 H14 L18 4 L24 36 L29 20 H45 L49 10 L54 30 L58 20 H100'

export default function PulseLine({ className = '' }: { className?: string }) {
  const tiles = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="pulse-line h-full w-[200%]">
        {tiles.map((i) => (
          <path
            key={i}
            d={UNIDADE}
            transform={`translate(${i * 100} 0)`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  )
}
