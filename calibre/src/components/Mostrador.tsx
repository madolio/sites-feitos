// Mostrador desenhado, não fotografado — os ponteiros sempre param às
// 10h09, a mesma pose que toda fotografia de relojoaria usa (o "sorriso" da
// simetria com a marca da coroa às 3h). `contadores` desenha os pequenos
// sub-mostradores de cronógrafo quando o modelo tem.
export default function Mostrador({
  corFundo,
  corMarcadores,
  corPonteiros,
  contadores = [],
}: {
  corFundo: string
  corMarcadores: string
  corPonteiros: string
  contadores?: { cx: number; cy: number }[]
}) {
  const marcas = Array.from({ length: 12 }, (_, i) => {
    const ang = (i / 12) * Math.PI * 2 - Math.PI / 2
    const r1 = i % 3 === 0 ? 74 : 80
    const x1 = 100 + Math.cos(ang) * r1
    const y1 = 100 + Math.sin(ang) * r1
    const x2 = 100 + Math.cos(ang) * 88
    const y2 = 100 + Math.sin(ang) * 88
    return { x1, y1, x2, y2, forte: i % 3 === 0 }
  })

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <circle cx={100} cy={100} r={96} fill="none" stroke={corPonteiros} strokeOpacity={0.4} strokeWidth={2} />
      <circle cx={100} cy={100} r={88} fill={corFundo} />

      {marcas.map((m, i) => (
        <line key={i} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke={corMarcadores} strokeWidth={m.forte ? 3 : 1.5} strokeLinecap="round" />
      ))}

      {contadores.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={20} fill="none" stroke={corMarcadores} strokeWidth={1} opacity={0.7} />
          <line x1={c.cx} y1={c.cy} x2={c.cx} y2={c.cy - 13} stroke={corPonteiros} strokeWidth={1.4} strokeLinecap="round" />
        </g>
      ))}

      {/* ponteiro das horas, 10h */}
      <line x1={100} y1={100} x2={68} y2={78} stroke={corPonteiros} strokeWidth={5} strokeLinecap="round" />
      {/* ponteiro dos minutos, 09 */}
      <line x1={100} y1={100} x2={122} y2={45} stroke={corPonteiros} strokeWidth={4} strokeLinecap="round" />
      {/* segundeiro fino */}
      <line x1={100} y1={112} x2={83} y2={35} stroke={corPonteiros} strokeWidth={1.2} strokeLinecap="round" opacity={0.85} />

      <circle cx={100} cy={100} r={4.5} fill={corPonteiros} />
      <rect x={192} y={94} width={9} height={12} rx={2} fill={corMarcadores} opacity={0.6} />
    </svg>
  )
}
