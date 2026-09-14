import { zonas } from '../data/flashes'

// Corpo de referência — o mesmo traço grosso único do resto do portfólio
// (Flash.tsx), nunca uma foto. É um gesto, não anatomia exata: só precisa
// dar pra reconhecer onde fica cada zona marcada.
export default function Corpo({
  zonaAtiva,
  onEscolherZona,
}: {
  zonaAtiva: string | null
  onEscolherZona: (id: string) => void
}) {
  return (
    <svg viewBox="0 0 220 480" className="h-full w-full overflow-visible" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-paper/35">
        <circle cx="110" cy="36" r="22" />
        <path d="M78,64 C70,90 68,130 74,170 C78,200 84,220 92,232 L128,232 C136,220 142,200 146,170 C152,130 150,90 142,64 C132,58 88,58 78,64 Z" />
        <path d="M76,70 C60,95 50,130 46,170 C44,195 46,215 52,236" />
        <path d="M144,70 C160,95 170,130 174,170 C176,195 174,215 168,236" />
        <circle cx="51" cy="240" r="6" />
        <circle cx="169" cy="240" r="6" />
        <path d="M98,234 C92,270 88,320 86,360 C85,390 84,415 82,440" />
        <path d="M122,234 C128,270 132,320 134,360 C135,390 136,415 138,440" />
        <path d="M72,442 L94,442" />
        <path d="M126,442 L148,442" />
      </g>

      {zonas.map((z) => {
        const ativa = zonaAtiva === z.id
        return (
          <g
            key={z.id}
            role="button"
            tabIndex={0}
            aria-pressed={ativa}
            aria-label={`Marcar no ${z.nome.toLowerCase()}`}
            className="cursor-pointer outline-none"
            onClick={() => onEscolherZona(z.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onEscolherZona(z.id)
              }
            }}
          >
            <circle
              cx={z.x}
              cy={z.y}
              r={z.diametro / 2}
              fill="none"
              stroke="currentColor"
              strokeWidth={ativa ? 2.5 : 1.5}
              strokeDasharray={ativa ? undefined : '3 4'}
              className={`transition-colors ${ativa ? 'text-ember' : 'text-paper/30 group-hover:text-paper/60'}`}
            />
            <circle cx={z.x} cy={z.y} r={Math.max(22, z.diametro / 2 + 12)} fill="transparent" />
            <text
              x={z.x}
              y={z.y + z.diametro / 2 + 16}
              textAnchor="middle"
              className={`text-[10px] transition-colors ${ativa ? 'fill-ember' : 'fill-paper/40'}`}
            >
              {z.nome}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
