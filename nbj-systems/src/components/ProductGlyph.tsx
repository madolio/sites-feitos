// Mesma linguagem visual do TreatmentDiagram: contorno #0f2430, sem
// preenchimento (exceto os detalhes granulados/pontilhados), traço 2.5.
// Um glifo por categoria de produto, pra reforçar o "esquema técnico" em
// todo lugar que hoje só tem foto ou nada.
const glyphs = {
  filtrante: (
    <>
      <rect x="34" y="6" width="28" height="52" rx="6" />
      <g stroke="#c8d5d9" strokeWidth="1.6">
        <line x1="42" y1="14" x2="42" y2="50" />
        <line x1="48" y1="14" x2="48" y2="50" />
        <line x1="54" y1="14" x2="54" y2="50" />
      </g>
    </>
  ),
  tanque: (
    <>
      <rect x="18" y="8" width="60" height="48" rx="10" />
      <path d="M18 30 H78" stroke="#c8d5d9" strokeWidth="1.6" />
      <path d="M30 56 V64 M66 56 V64" strokeLinecap="round" />
    </>
  ),
  bancada: (
    <>
      <rect x="12" y="10" width="72" height="26" rx="4" />
      <path d="M20 36 V58 M40 36 V58 M56 36 V58 M76 36 V58" />
      <path d="M12 58 H84" />
    </>
  ),
  cristal: (
    <>
      <path d="M48 6 L74 24 L64 58 L32 58 L22 24 Z" />
      <path d="M48 6 V58 M22 24 H74" stroke="#c8d5d9" strokeWidth="1.6" />
    </>
  ),
} as const

export default function ProductGlyph({ kind, className = '' }: { kind: keyof typeof glyphs; className?: string }) {
  return (
    <svg
      viewBox="0 0 96 68"
      className={className}
      fill="none"
      stroke="#0f2430"
      strokeWidth="2.5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyphs[kind]}
    </svg>
  )
}
