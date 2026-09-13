import { BufferAttribute, BufferGeometry, DynamicDrawUsage } from 'three'
import { N, peca, raioEm } from '../estado'

// Superfície de revolução feita à mão em vez de `LatheGeometry`: o perfil muda
// a cada arrastada, e recriar a geometria 60× por segundo alocaria memória
// sem parar. Aqui o buffer é criado uma vez e só as posições/normais são
// reescritas. O layout dos vértices e a ordem dos índices são os mesmos do
// LatheGeometry do three (perfil subindo pela parede externa = face externa).
//
// Perfil, em ordem: centro da base → quina do pé → parede externa subindo →
// arco da borda → parede interna descendo → centro do fundo interno.

export const SEG = 96
export const PAREDE = 0.07 // 7 mm
export const FUNDO = 0.09
const P = 2 * N + 6

const sen = new Float32Array(SEG + 1)
const cos = new Float32Array(SEG + 1)
for (let s = 0; s <= SEG; s++) {
  const phi = (s / SEG) * Math.PI * 2
  sen[s] = Math.sin(phi)
  cos[s] = Math.cos(phi)
}

const px = new Float32Array(P)
const py = new Float32Array(P)
const tx = new Float32Array(P)
const ty = new Float32Array(P)

/** Ondulação dos anéis do torno — a marca dos dedos subindo a parede. */
export const anel = (y: number, amplitude: number) => amplitude * Math.sin(y * 55 + 0.7)

export function criarGeometria() {
  const geo = new BufferGeometry()
  const pos = new BufferAttribute(new Float32Array((SEG + 1) * P * 3), 3)
  const nor = new BufferAttribute(new Float32Array((SEG + 1) * P * 3), 3)
  pos.setUsage(DynamicDrawUsage)
  nor.setUsage(DynamicDrawUsage)

  const uv = new Float32Array((SEG + 1) * P * 2)
  for (let s = 0; s <= SEG; s++) {
    for (let j = 0; j < P; j++) {
      const o = (s * P + j) * 2
      uv[o] = s / SEG
      uv[o + 1] = j / (P - 1)
    }
  }

  const indices: number[] = []
  for (let s = 0; s < SEG; s++) {
    for (let j = 0; j < P - 1; j++) {
      const a = s * P + j
      const b = a + P
      const c = a + P + 1
      const d = a + 1
      indices.push(a, b, d, c, d, b)
    }
  }

  geo.setAttribute('position', pos)
  geo.setAttribute('normal', nor)
  geo.setAttribute('uv', new BufferAttribute(uv, 2))
  geo.setIndex(indices)
  atualizarGeometria(geo, 0.004)
  return geo
}

export function atualizarGeometria(geo: BufferGeometry, ondulacao: number) {
  const H = peca.altura
  let j = 0
  const ponto = (x: number, y: number, tX = Number.NaN, tY = Number.NaN) => {
    px[j] = x
    py[j] = y
    tx[j] = tX
    ty[j] = tY
    j++
  }

  const r0 = peca.raio[0] + anel(0, ondulacao)
  ponto(0, 0, 1, 0)
  ponto(r0, 0, 1, 0) // fim da face de baixo — mesma posição do próximo, normal diferente: quina viva no pé

  for (let i = 0; i < N; i++) {
    const y = (i / (N - 1)) * H
    ponto(peca.raio[i] + anel(y, ondulacao), y)
  }

  const rFora = peca.raio[N - 1] + anel(H, ondulacao)
  const rDentro = Math.max(peca.raio[N - 1] - PAREDE, 0.012) + anel(H, ondulacao)
  const cx = (rFora + rDentro) / 2
  const rr = (rFora - rDentro) / 2
  for (const a of [Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4]) {
    ponto(cx + rr * Math.cos(a), H + rr * Math.sin(a), -Math.sin(a), Math.cos(a))
  }

  for (let k = 0; k < N; k++) {
    const y = H - (k / (N - 1)) * (H - FUNDO)
    ponto(Math.max(raioEm(y) - PAREDE, 0.012) + anel(y, ondulacao), y)
  }
  ponto(0, FUNDO, -1, 0)

  for (let q = 0; q < P; q++) {
    if (!Number.isNaN(tx[q])) continue
    if (q === 2) {
      tx[q] = px[3] - px[2]
      ty[q] = py[3] - py[2]
    } else {
      tx[q] = px[q + 1] - px[q - 1]
      ty[q] = py[q + 1] - py[q - 1]
    }
  }

  const pos = geo.getAttribute('position') as BufferAttribute
  const nor = geo.getAttribute('normal') as BufferAttribute
  const pa = pos.array as Float32Array
  const na = nor.array as Float32Array

  for (let q = 0; q < P; q++) {
    // normal 2D = tangente girada -90° (aponta pra fora na parede externa,
    // pra dentro na interna, pra cima na borda e no fundo)
    let nx = ty[q]
    let ny = -tx[q]
    const len = Math.hypot(nx, ny)
    if (len < 1e-6) {
      nx = 0
      ny = 1
    } else {
      nx /= len
      ny /= len
    }
    for (let s = 0; s <= SEG; s++) {
      const o = (s * P + q) * 3
      pa[o] = px[q] * sen[s]
      pa[o + 1] = py[q]
      pa[o + 2] = px[q] * cos[s]
      na[o] = nx * sen[s]
      na[o + 1] = ny
      na[o + 2] = nx * cos[s]
    }
  }

  pos.needsUpdate = true
  nor.needsUpdate = true
  geo.computeBoundingSphere()
}
