// Cada projeto do portfólio é representado por um mini-esquema de planta
// (não uma foto) — consistente com a vibe e sem depender de imagens de
// arquitetura reais que não existem. Um layout por índice, pra não repetir a
// mesma "casinha" seis vezes.
const layouts = [
  <>
    <rect x="6" y="6" width="52" height="36" />
    <rect x="58" y="6" width="26" height="20" />
    <line x1="58" y1="6" x2="58" y2="42" />
    <line x1="58" y1="26" x2="84" y2="26" />
  </>,
  <>
    <rect x="6" y="6" width="34" height="36" />
    <rect x="40" y="6" width="44" height="18" />
    <rect x="40" y="24" width="44" height="18" />
    <line x1="40" y1="6" x2="40" y2="42" />
    <line x1="40" y1="24" x2="84" y2="24" />
  </>,
  <>
    <rect x="6" y="6" width="78" height="36" />
    <rect x="30" y="6" width="22" height="36" fill="var(--color-blueline)" fillOpacity="0.15" stroke="none" />
    <line x1="30" y1="6" x2="30" y2="42" />
    <line x1="52" y1="6" x2="52" y2="42" />
  </>,
  <>
    <rect x="6" y="14" width="40" height="28" />
    <rect x="46" y="6" width="38" height="20" />
    <rect x="46" y="26" width="38" height="16" />
    <line x1="46" y1="6" x2="46" y2="42" />
    <line x1="46" y1="26" x2="84" y2="26" />
  </>,
  <>
    <rect x="6" y="6" width="78" height="18" />
    <rect x="6" y="24" width="30" height="18" />
    <rect x="36" y="24" width="24" height="18" />
    <rect x="60" y="24" width="24" height="18" />
    <line x1="6" y1="24" x2="84" y2="24" />
    <line x1="36" y1="24" x2="36" y2="42" />
    <line x1="60" y1="24" x2="60" y2="42" />
  </>,
  <>
    <rect x="6" y="6" width="78" height="36" />
    <rect x="34" y="18" width="22" height="12" fill="var(--color-blueline)" fillOpacity="0.15" stroke="none" />
    <line x1="34" y1="6" x2="34" y2="18" />
    <line x1="56" y1="6" x2="56" y2="18" />
    <line x1="34" y1="30" x2="34" y2="42" />
    <line x1="56" y1="30" x2="56" y2="42" />
  </>,
]

export default function ProjetoPlan({ index, className = '' }: { index: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 90 48"
      className={className}
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      {layouts[index % layouts.length]}
    </svg>
  )
}
