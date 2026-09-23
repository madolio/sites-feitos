import { pontosDoAnel, pathSuaveFechado } from '../lib/curva'

// Miniatura de curva de nível por especialidade — mesma mecânica do
// TrilhaMapa (anéis concêntricos com raio perturbado por harmônicos
// senoidais), só com parâmetros próprios por especialidade, pra ler como
// "relevo característico" de cada frente de tratamento em vez de um ícone
// genérico importado: relevo mais acidentado (harmônicos fortes, alta
// frequência) para o que exige mais correção ativa, relevo mais suave
// (harmônicos fracos, baixa frequência) para o que é sobre reeducação e
// controle fino.
export type CurvaEspecialidadeProps = {
  /** Raios base dos anéis, do centro pra fora. */
  aneis: number[]
  /** Amplitude do harmônico principal (irregularidade grande). */
  a1: number
  /** Amplitude do harmônico secundário (irregularidade fina). */
  a2: number
  freq1?: number
  freq2?: number
  cor: string
  className?: string
}

export default function CurvaEspecialidade({
  aneis,
  a1,
  a2,
  freq1 = 3,
  freq2 = 5,
  cor,
  className,
}: CurvaEspecialidadeProps) {
  const contornos = aneis.map((raio, i) =>
    pathSuaveFechado(pontosDoAnel(raio, i, { cx: 50, cy: 50, a1, a2, freq1, freq2, segmentos: 40 })),
  )

  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      {contornos.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={cor}
          strokeWidth={i === contornos.length - 1 ? 2 : 1.1}
          opacity={0.32 + (i / Math.max(1, contornos.length - 1)) * 0.6}
        />
      ))}
      {/* marco de pico, no vocabulário do mapa principal */}
      <circle cx="50" cy="50" r="2.6" fill={cor} />
    </svg>
  )
}
