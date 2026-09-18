import type { ReactNode } from 'react'
import type { Glifo } from '../dados'

// Esquemas em SVG no lugar de ícone genérico ou foto — e não existe foto de
// trabalho pra usar aqui, o que é um fato do projeto, não uma escolha de
// estilo. Cada glifo é o símbolo real da peça: vaso de osmose, cartucho
// filtrante e registro no P&ID; quadro de distribuição e disjuntor no
// unifilar. Tudo em `currentColor`, então a seção é que define o ofício.
const glifos: Record<Glifo, ReactNode> = {
  osmose: (
    <>
      <rect x="18" y="20" width="60" height="28" rx="14" />
      <g strokeOpacity="0.4" strokeWidth="1.8">
        {[26, 36, 46, 56, 66].map((x) => (
          <line key={x} x1={x} y1="21" x2={x + 10} y2="47" />
        ))}
      </g>
      <path d="M12 16 V52 M84 16 V52" strokeLinecap="round" />
    </>
  ),
  filtro: (
    <>
      <rect x="32" y="4" width="32" height="9" rx="2" />
      <rect x="36" y="13" width="24" height="49" rx="6" />
      <g strokeOpacity="0.4" strokeWidth="1.8">
        <line x1="42" y1="20" x2="42" y2="55" />
        <line x1="48" y1="20" x2="48" y2="55" />
        <line x1="54" y1="20" x2="54" y2="55" />
      </g>
    </>
  ),
  registro: (
    <>
      <path d="M24 20 L24 48 L48 34 Z" />
      <path d="M72 20 L72 48 L48 34 Z" />
      <path d="M48 34 V12 M34 12 H62" strokeLinecap="round" />
    </>
  ),
  quadro: (
    <>
      <rect x="22" y="6" width="52" height="56" rx="3" />
      <path d="M30 24 H66" strokeWidth="4" strokeLinecap="round" />
      <g strokeOpacity="0.55">
        <rect x="31" y="34" width="10" height="18" rx="1.5" />
        <rect x="43" y="34" width="10" height="18" rx="1.5" />
        <rect x="55" y="34" width="10" height="18" rx="1.5" />
      </g>
    </>
  ),
  disjuntor: (
    <>
      <path d="M48 4 V10" strokeLinecap="round" />
      <circle cx="48" cy="13" r="3.2" fill="currentColor" stroke="none" />
      <path d="M48 13 L68 38" strokeLinecap="round" />
      <circle cx="48" cy="50" r="3.2" fill="currentColor" stroke="none" />
      <path d="M41 43 L55 57 M55 43 L41 57" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 53 V64" strokeLinecap="round" />
    </>
  ),
}

export default function OficioGlyph({
  glifo,
  className = '',
}: {
  glifo: Glifo
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 96 68"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glifos[glifo]}
    </svg>
  )
}
