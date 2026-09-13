import { formas, type Forma } from './data'

// Estado mutável compartilhado entre a cena 3D (que lê/escreve a 60 fps) e a
// interface (que só consulta de vez em quando). Fica fora do React de
// propósito: se o perfil do barro fosse estado React, cada arrastada
// re-renderizaria a árvore inteira.

export const N = 64 // amostras do perfil externo, da base até a borda
export const MIN_R = 0.16
export const MAX_R = 1.35
export const MIN_H = 0.55
export const MAX_H = 2.7

export const peca = {
  raio: new Float32Array(N),
  altura: 1,
  /** Forma pronta pra onde o perfil está animando (null = livre). */
  alvo: null as null | { raio: Float32Array; altura: number },
  sujo: true,
  tocou: false,
}

/** Andamento da queima, animado pelo GSAP em App.tsx e lido pela cena. */
export const forno = { frente: -1, calor: 0, temperatura: 20 }

export function perfilDe(forma: Forma) {
  const { altura, raio } = formas[forma]
  const r = new Float32Array(N)
  for (let i = 0; i < N; i++) r[i] = raio(i / (N - 1))
  return { raio: r, altura }
}

export function aplicarForma(forma: Forma, animar = true) {
  const alvo = perfilDe(forma)
  if (animar) {
    peca.alvo = alvo
  } else {
    peca.raio.set(alvo.raio)
    peca.altura = alvo.altura
    peca.alvo = null
  }
  peca.sujo = true
}

export function raioEm(y: number) {
  const t = Math.min(1, Math.max(0, y / peca.altura)) * (N - 1)
  const i = Math.min(N - 2, Math.floor(t))
  const f = t - i
  return peca.raio[i] * (1 - f) + peca.raio[i + 1] * f
}

export function medidas() {
  let maior = 0
  for (let i = 0; i < N; i++) maior = Math.max(maior, peca.raio[i])
  // Gargalo: a parte de cima estreita bem mais que a barriga.
  let menorNoTopo = Infinity
  for (let i = Math.floor(N * 0.6); i < N; i++) menorNoTopo = Math.min(menorNoTopo, peca.raio[i])
  const altura = Math.round(peca.altura * 10)
  const diametro = Math.round(maior * 20)
  const razao = altura / diametro
  const tipo =
    razao < 0.62 ? 'Tigela' : menorNoTopo < maior * 0.72 || razao > 1.4 ? 'Vaso' : razao >= 0.9 ? 'Copo' : 'Pote'
  return { altura, diametro, tipo }
}

aplicarForma('barro', false)
