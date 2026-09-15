// Ícones literais de barbearia — tesoura, navalha e pente — no lugar do
// silhueta genérica de "profissional" que existia antes. Traço simples,
// mesma espessura da identidade (stroke, sem preenchimento).

export function Tesoura({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx={9} cy={9} r={4} stroke="currentColor" strokeWidth={2} />
      <circle cx={9} cy={23} r={4} stroke="currentColor" strokeWidth={2} />
      <path d="M12 12 L27 27 M12 20 L27 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export function Navalha({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path d="M4 24 L20 8 L26 8 L26 14 L10 30 Z" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
      <path d="M4 24 L2 26" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export function Pente({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <rect x={4} y={6} width={24} height={6} rx={1} stroke="currentColor" strokeWidth={2} />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={7 + i * 3.5} y1={12} x2={7 + i * 3.5} y2={27} stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      ))}
    </svg>
  )
}
