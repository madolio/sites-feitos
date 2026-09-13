// Miniatura do próprio TreatmentDiagram (cano → membrana → tanque), na mesma
// linguagem (#0f2430, sem preenchimento), pra marcar cada modelo de osmose
// com o esquema em vez de só um número.
export default function FlowGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 24" className={className} fill="none" aria-hidden="true">
      <line x1="0" y1="12" x2="64" y2="12" stroke="#c8d5d9" strokeWidth="6" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="#8a9a8f" strokeWidth="2" strokeDasharray="4 5" />
      <rect x="24" y="4" width="16" height="16" rx="3" fill="#fff" stroke="#0f2430" strokeWidth="2" />
      <g stroke="#c8d5d9" strokeWidth="1.3">
        <line x1="27" y1="7" x2="35" y2="17" />
        <line x1="31" y1="7" x2="37" y2="14" />
      </g>
      <rect x="46" y="2" width="16" height="20" rx="2" fill="none" stroke="#0f2430" strokeWidth="2" />
      <rect x="47.5" y="9" width="13" height="11.5" fill="#2ba7cc" fillOpacity="0.3" />
    </svg>
  )
}
