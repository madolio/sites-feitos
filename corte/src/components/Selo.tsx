// Selo circular estilo carimbo de barbearia antiga — texto correndo por
// dentro da borda, tesoura no centro. Reforça o clima de barbearia
// tradicional sem depender só da cor. O traço da tesoura é inlinado (não
// reaproveita o componente <Tesoura>, que é um <svg> próprio — aninhar um
// <svg> dentro de outro ignora o viewBox do pai e não escala junto).
export default function Selo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx={50} cy={50} r={46} fill="none" stroke="currentColor" strokeWidth={1.5} />
      <circle cx={50} cy={50} r={38} fill="none" stroke="currentColor" strokeWidth={1} />
      <path id="selo-arco-topo" d="M 14 50 A 36 36 0 0 1 86 50" fill="none" />
      <path id="selo-arco-baixo" d="M 18 62 A 32 32 0 0 0 82 62" fill="none" />
      <text fontSize={7.5} fill="currentColor" letterSpacing="2" fontWeight={700}>
        <textPath href="#selo-arco-topo" startOffset="50%" textAnchor="middle">
          BARBEARIA CORTE
        </textPath>
      </text>
      <text fontSize={7} fill="currentColor" letterSpacing="1.5">
        <textPath href="#selo-arco-baixo" startOffset="50%" textAnchor="middle">
          TRADIÇÃO DE VERDADE
        </textPath>
      </text>

      <g transform="translate(34, 38)" stroke="currentColor" strokeWidth={2} fill="none">
        <circle cx={4} cy={4} r={3.5} />
        <circle cx={4} cy={20} r={3.5} />
        <path d="M6.5 6.5 L26 24 M6.5 17.5 L26 0" strokeLinecap="round" />
      </g>
    </svg>
  )
}
