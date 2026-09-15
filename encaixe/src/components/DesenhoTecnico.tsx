import type { Desenho } from '../desenho'

export default function DesenhoTecnico({ desenho, nomeJunta }: { desenho: Desenho; nomeJunta: string }) {
  const { tracos, junta, cota, viewBox } = desenho

  return (
    <svg viewBox={viewBox} className="h-full w-full overflow-visible" aria-hidden="true">
      {tracos.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="var(--color-ink)"
          strokeWidth={1}
          strokeDasharray={t.tracejado ? '2 2' : undefined}
          strokeLinecap="round"
        />
      ))}

      {/* cota de largura */}
      <g stroke="var(--color-accent)" strokeWidth={0.6}>
        <line x1={cota.x1} y1={cota.y - 4} x2={cota.x1} y2={cota.y + 4} />
        <line x1={cota.x2} y1={cota.y - 4} x2={cota.x2} y2={cota.y + 4} />
        <line x1={cota.x1} y1={cota.y} x2={cota.x2} y2={cota.y} />
      </g>
      <text
        x={(cota.x1 + cota.x2) / 2}
        y={cota.y + 11}
        textAnchor="middle"
        fill="var(--color-accent)"
        fontSize={7}
        fontFamily="var(--font-ui)"
      >
        {cota.label}
      </text>

      {/* encaixe em destaque — o halo só aparece no hover do card (ver
          Catalogo.tsx, className="group"). Não é o "movimento não pedido"
          do Hero: é resposta a uma ação do visitante, não automático. */}
      <circle cx={junta.x} cy={junta.y} r={7} fill="var(--color-wood)" fillOpacity={0} className="encaixe-halo" />
      <circle cx={junta.x} cy={junta.y} r={3.2} fill="none" stroke="var(--color-wood)" strokeWidth={1.2} />
      <text
        x={junta.x + 6}
        y={junta.y - 4}
        fill="var(--color-wood-dark)"
        fontSize={6.5}
        fontFamily="var(--font-ui)"
        fontWeight={600}
      >
        {nomeJunta}
      </text>
    </svg>
  )
}
