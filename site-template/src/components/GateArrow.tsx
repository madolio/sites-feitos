// Seta de sinalização — o mesmo pictograma usado em placas de embarque de
// aeroporto/trem, reaproveitado como marcador direcional na página.
export default function GateArrow({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 11h13.2l-4.6-4.6L14 5l7 7-7 7-1.4-1.4 4.6-4.6H4z" />
    </svg>
  )
}
