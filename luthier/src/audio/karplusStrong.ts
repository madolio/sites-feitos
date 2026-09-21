// Física real, não decorativa.
//
// Frequência de uma corda vibrante (fórmula de Mersenne):
//   f = (1 / (2L)) * sqrt(T / μ)
// onde L = comprimento vibrante (m), T = tensão (N), μ = densidade linear (kg/m).
//
// Assumimos uma corda de náilon (densidade real ≈ 1140 kg/m³, a mesma faixa
// usada em cordas clássicas 1ª–3ª) e uma tensão representativa de violão
// clássico (faixa real ≈ 70–90 N por corda em afinação padrão — usamos 80 N
// fixo, meio da faixa) para isolar o efeito de comprimento de escala e
// bitola, que são os dois parâmetros que o visitante controla.
export const TENSAO_N = 80
export const DENSIDADE_CORDA_KGM3 = 1140

export function calcularFrequenciaHz(comprimentoEscalaMm: number, bitolaMm: number): number {
  const L = comprimentoEscalaMm / 1000
  const raio = bitolaMm / 2 / 1000
  const area = Math.PI * raio * raio
  const mu = DENSIDADE_CORDA_KGM3 * area
  return (1 / (2 * L)) * Math.sqrt(TENSAO_N / mu)
}

/**
 * Síntese por Karplus-Strong: preenche uma linha de atraso do tamanho
 * sampleRate/f com ruído branco (o "pluck") e a realimenta através de um
 * filtro de média móvel com perda (`amortecimento`), o algoritmo real de
 * modelagem física de corda dedilhada — não uma amostra gravada nem uma
 * onda decorativa.
 */
export function sintetizarPulso(
  sampleRate: number,
  frequenciaHz: number,
  amortecimento: number,
  duracaoSeg: number,
): Float32Array {
  const N = Math.max(2, Math.round(sampleRate / frequenciaHz))
  const anel = new Float32Array(N)
  for (let i = 0; i < N; i++) anel[i] = Math.random() * 2 - 1

  const total = Math.floor(sampleRate * duracaoSeg)
  const saida = new Float32Array(total)
  let ptr = 0

  for (let i = 0; i < total; i++) {
    const atual = anel[ptr]
    const proximo = anel[(ptr + 1) % N]
    saida[i] = atual
    anel[ptr] = amortecimento * 0.5 * (atual + proximo)
    ptr = (ptr + 1) % N
  }

  return saida
}

export function tocarPulso(
  ctx: AudioContext,
  frequenciaHz: number,
  amortecimento: number,
  volume: number,
): void {
  const duracao = 2.5
  const amostras = sintetizarPulso(ctx.sampleRate, frequenciaHz, amortecimento, duracao)

  const buffer = ctx.createBuffer(1, amostras.length, ctx.sampleRate)
  buffer.getChannelData(0).set(amostras)

  const source = ctx.createBufferSource()
  source.buffer = buffer

  const gain = ctx.createGain()
  gain.gain.value = volume

  source.connect(gain)
  gain.connect(ctx.destination)
  source.start()
}
