import type { Tipo } from '../data'

const paths: Record<Tipo, string> = {
  apartamento: 'M6 40 V14 H26 V40 M11 20 H14 M18 20 H21 M11 27 H14 M18 27 H21 M11 34 H14 M18 34 H21',
  casa: 'M6 40 V22 L16 12 L26 22 V40 M13 40 V29 H19 V40',
  cobertura: 'M4 40 V24 H14 V16 H28 V40 M9 30 H10 M20 22 H21',
  terreno: 'M4 36 L12 20 L18 30 L23 18 L32 36 Z M4 40 H32',
}

export default function TipoIcon({ tipo, className = 'h-6 w-6' }: { tipo: Tipo; className?: string }) {
  return (
    <svg viewBox="0 0 36 44" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[tipo]} />
    </svg>
  )
}
