// Um balde de feira em SVG: corpo trapezoidal, aro no topo, alça, e um
// nível de água que sobe/desce (clipPath) conforme o balde está "cheio"
// (seção ativa) ou "em repouso". Uma flor de linha simples espia por cima
// da borda, na cor da seção — é o mesmo vocabulário do balde de verdade
// que guarda flor por tipo numa banca de feira.
type BaldeProps = {
  cor: string
  nivel: number
  ativo: boolean
  tamanho?: number
}

export default function Balde({ cor, nivel, ativo, tamanho = 56 }: BaldeProps) {
  const clipId = `balde-clip-${cor.replace(/[^a-z0-9]/gi, '')}-${tamanho}`
  // corpo trapezoidal: mais largo no topo, mais estreito na base
  const corpoPath = 'M10,16 L54,16 L47,62 Q32,67 17,62 Z'
  const alturaAgua = 46 * Math.max(0.08, Math.min(1, nivel))
  const yAgua = 62 - alturaAgua

  return (
    <svg
      viewBox="0 0 64 74"
      width={tamanho}
      height={(tamanho * 74) / 64}
      aria-hidden="true"
      className="overflow-visible"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={corpoPath} />
        </clipPath>
      </defs>

      {/* haste + flor espiando por cima do balde */}
      <g className={ativo ? 'balde-ativo' : undefined}>
        <line x1="32" y1="16" x2="32" y2="4" stroke="var(--color-folha)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="4" r="3.6" fill={cor} className="balde-onda" />
        <circle cx="27.5" cy="6" r="2.6" fill={cor} opacity="0.75" />
        <circle cx="36.5" cy="6" r="2.6" fill={cor} opacity="0.75" />
      </g>

      {/* corpo do balde (metal galvanizado) */}
      <path d={corpoPath} fill="var(--color-paper)" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* água */}
      <rect x="8" y={yAgua} width="48" height={alturaAgua + 4} fill={cor} opacity="0.55" clipPath={`url(#${clipId})`} className="balde-agua" />
      <rect x="8" y={yAgua} width="48" height="2" fill={cor} opacity="0.85" clipPath={`url(#${clipId})`} className="balde-agua" />

      {/* aro do topo + alça */}
      <ellipse cx="32" cy="16" rx="22" ry="4.2" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="1.6" />
      <path d="M16,17 Q32,2 48,17" fill="none" stroke="var(--color-ink)" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />

      {/* brilho de ativo */}
      <ellipse
        cx="32"
        cy="16"
        rx="22"
        ry="4.2"
        fill="none"
        stroke={cor}
        strokeWidth="2.4"
        className="balde-brilho"
        opacity={ativo ? 0.9 : 0}
      />
    </svg>
  )
}
