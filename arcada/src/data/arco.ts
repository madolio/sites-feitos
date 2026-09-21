import type { Dente } from './dentes'

export interface PosicaoDente {
  dente: Dente
  /** Posição em percentual do contêiner (0–100), pronta pra `left`/`top`. */
  xPct: number
  yPct: number
  /** Ângulo de rotação do dente, seguindo a tangente da curva do arco. */
  anguloDeg: number
  largura: number
  altura: number
}

// viewBox de referência usado só pra calcular a curva — o resultado final é
// convertido pra percentual, então funciona em qualquer tamanho de tela.
const LARGURA_REF = 800
const ALTURA_REF = 380
const AMPLITUDE = 62
const Y_SUPERIOR = 150
const Y_INFERIOR = 230

/**
 * Posiciona os 16 dentes de um arco ao longo de uma curva senoidal: os
 * dentes anteriores (incisivos, no meio da fileira) ficam mais próximos da
 * linha do lábio, e os posteriores (molares/sisos, nas pontas) recuam —
 * a representação estilizada convencional de um odontograma "desenrolado".
 */
export function calcularArco(dentes: Dente[], arco: 'superior' | 'inferior'): PosicaoDente[] {
  const n = dentes.length
  const baseY = arco === 'superior' ? Y_SUPERIOR : Y_INFERIOR
  const direcao = arco === 'superior' ? -1 : 1

  return dentes.map((dente, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    const x = 40 + t * (LARGURA_REF - 80)
    const y = baseY + direcao * AMPLITUDE * Math.sin(t * Math.PI)

    // Derivada aproximada da curva no ponto, pra inclinar o dente conforme
    // a tangente — dá o efeito de "leque" que um arco dentário real tem.
    const dt = 0.001
    const t2 = Math.min(1, t + dt)
    const x2 = 40 + t2 * (LARGURA_REF - 80)
    const y2 = baseY + direcao * AMPLITUDE * Math.sin(t2 * Math.PI)
    const anguloDeg = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI

    return {
      dente,
      xPct: (x / LARGURA_REF) * 100,
      yPct: (y / ALTURA_REF) * 100,
      anguloDeg,
      largura: 30 * dente.largura,
      altura: 42 * dente.largura,
    }
  })
}
