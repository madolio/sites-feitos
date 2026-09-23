import { useId } from 'react'

// Visto de entrada: o carimbo circular que um passaporte recebe ao entrar num
// pais. Aqui cada idioma que a escola ensina ganha o seu — o texto vem de
// `idiomas` em data.ts, nada e inventado. O nome corre num arco em cima e o
// intervalo de niveis (A1 a C2, ja dito na capa) embaixo.
export default function Visto({ idioma, className = '' }: { idioma: string; className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <path id={`${id}-arco`} d="M 18 62 A 42 42 0 0 1 102 62" />
        <path id={`${id}-base`} d="M 24 70 A 38 38 0 0 0 96 70" />
      </defs>
      <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 3" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text fontSize="9" letterSpacing="2.4" fill="currentColor" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
        <textPath href={`#${id}-arco`} startOffset="50%">
          ADMITIDO
        </textPath>
      </text>
      <text fontSize="8" letterSpacing="2" fill="currentColor" fontFamily="var(--font-mono, monospace)" textAnchor="middle">
        <textPath href={`#${id}-base`} startOffset="50%">
          A1 · C2
        </textPath>
      </text>
      <text x="60" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="var(--font-mono, monospace)">
        {idioma.toUpperCase()}
      </text>
    </svg>
  )
}
