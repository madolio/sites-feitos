import type { Caso } from '../data/casos'

// Um desenho técnico por caso — nunca foto. Mesma linguagem de traço em todos
// (contorno #2E2118, sem preenchimento, acentos em moss), só a técnica de
// representação muda: planta baixa, corte, axonometria ou paleta de material.
export default function Ilustracao({ tipo }: { tipo: Caso['ilustracao'] }) {
  return (
    <svg viewBox="0 0 400 460" className="h-full w-full" fill="none" aria-hidden="true">
      {tipo === 'planta' && <Planta />}
      {tipo === 'secao' && <Secao />}
      {tipo === 'axonometria' && <Axonometria />}
      {tipo === 'material' && <Material />}
    </svg>
  )
}

function Planta() {
  return (
    <g stroke="#2E2118" strokeWidth="2.5" strokeLinejoin="round">
      <rect x="40" y="60" width="320" height="340" />
      <line x1="200" y1="60" x2="200" y2="220" />
      <line x1="40" y1="220" x2="360" y2="220" strokeDasharray="3 7" stroke="#4E6046" strokeWidth="2" />
      {/* bancada integrada */}
      <rect x="60" y="240" width="150" height="30" fill="#E3DBCB" />
      {/* mesa */}
      <ellipse cx="280" cy="320" rx="50" ry="30" />
      {/* sofá */}
      <rect x="220" y="90" width="120" height="45" rx="6" />
      <text x="80" y="200" fontFamily="Sora" fontSize="13" fill="#2E2118">
        cozinha
      </text>
      <text x="260" y="200" fontFamily="Sora" fontSize="13" fill="#2E2118">
        sala
      </text>
    </g>
  )
}

function Secao() {
  return (
    <g stroke="#2E2118" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M50 400 V180 L200 60 H350 V400" />
      <line x1="200" y1="60" x2="200" y2="400" />
      <line x1="50" y1="240" x2="200" y2="240" />
      {/* raios de sol */}
      <g stroke="#4E6046" strokeWidth="2" strokeDasharray="2 8">
        <line x1="380" y1="90" x2="230" y2="230" />
        <line x1="380" y1="130" x2="250" y2="260" />
        <line x1="380" y1="170" x2="270" y2="290" />
      </g>
      <rect x="220" y="330" width="60" height="50" />
      <rect x="70" y="260" width="100" height="30" fill="#E3DBCB" />
    </g>
  )
}

function Axonometria() {
  return (
    <g stroke="#2E2118" strokeWidth="2.5" strokeLinejoin="round">
      <g transform="translate(200 140)">
        <path d="M0 0 L90 -45 L180 0 L90 45 Z" />
        <path d="M0 0 V90 L90 135 V45 Z" />
        <path d="M180 0 V90 L90 135 V45 Z" fill="#E3DBCB" />
      </g>
      <g transform="translate(120 300)" stroke="#4E6046">
        <path d="M0 0 L60 -30 L120 0 L60 30 Z" />
        <path d="M0 0 V40 L60 70 V30 Z" />
        <path d="M120 0 V40 L60 70 V30 Z" />
      </g>
    </g>
  )
}

function Material() {
  return (
    <g strokeWidth="2">
      <rect x="40" y="60" width="140" height="140" stroke="#2E2118" fill="none" />
      <g stroke="#2E2118" strokeWidth="1.4">
        {[80, 100, 120, 140, 160, 180].map((y) => (
          <path key={y} d={`M40 ${y} Q110 ${y - 8} 180 ${y}`} />
        ))}
      </g>

      <rect x="220" y="60" width="140" height="140" stroke="#2E2118" fill="none" />
      <g stroke="#4E6046" strokeWidth="1.2">
        {Array.from({ length: 8 }, (_, i) => 220 + i * 20).map((x) => (
          <line key={x} x1={x} y1="60" x2={x} y2="200" />
        ))}
        {Array.from({ length: 8 }, (_, i) => 60 + i * 20).map((y) => (
          <line key={y} x1="220" y1={y} x2="360" y2={y} />
        ))}
      </g>

      <rect x="40" y="240" width="320" height="120" stroke="#2E2118" fill="none" />
      <g fill="#2E2118">
        {Array.from({ length: 60 }, (_, i) => (
          <circle key={i} cx={56 + (i % 15) * 20} cy={260 + Math.floor(i / 15) * 20} r="1.4" />
        ))}
      </g>
    </g>
  )
}
