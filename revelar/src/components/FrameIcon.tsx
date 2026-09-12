import type { Frame } from '../data'

const paths: Record<Frame['tipo'], string> = {
  casamento: 'M24 40 a8 8 0 1 1 0.01 0 M40 40 a8 8 0 1 1 0.01 0 M30 36 L34 36',
  ensaio: 'M20 44 Q20 26 32 26 Q44 26 44 44 M26 20 a6 6 0 1 1 0.01 0 M38 20 a6 6 0 1 1 0.01 0',
  evento: 'M16 44 V22 L32 12 L48 22 V44 M24 44 V32 H40 V44',
  corporativo: 'M18 44 V16 H30 V44 M34 44 V26 H46 V44 M22 22 H24 M22 28 H24 M22 34 H24',
  produto: 'M32 14 L48 22 V38 L32 46 L16 38 V22 Z M16 22 L32 30 L48 22 M32 30 V46',
  still: 'M18 40 Q18 20 32 20 Q46 20 46 40 Z M24 40 V32 M32 40 V28 M40 40 V32',
}

export default function FrameIcon({ tipo, className = 'h-9 w-9' }: { tipo: Frame['tipo']; className?: string }) {
  return (
    <svg viewBox="0 0 64 56" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[tipo]} />
    </svg>
  )
}
