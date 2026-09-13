import * as THREE from 'three'

// Toda peça metálica da cena (as três engrenagens, a coroa de corda) sai da
// mesma função: uma engrenagem é só um disco com dentes — muda a contagem de
// dentes, o raio e a espessura. A coroa reaproveita a mesma forma com dentes
// finos e curtos (o serrilhado de segurar entre os dedos é, geometricamente,
// a mesma coisa que o dente de uma engrenagem).
export function criarEngrenagem(dentes: number, raio: number, profundidadeDente: number, espessura: number, raioFuro = raio * 0.28) {
  const shape = new THREE.Shape()
  const passos = dentes * 2
  for (let i = 0; i <= passos; i++) {
    const ang = (i / passos) * Math.PI * 2
    const r = i % 2 === 0 ? raio : raio - profundidadeDente
    const x = Math.cos(ang) * r
    const y = Math.sin(ang) * r
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }

  const furo = new THREE.Path()
  furo.absarc(0, 0, raioFuro, 0, Math.PI * 2, true)
  shape.holes.push(furo)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: espessura,
    bevelEnabled: true,
    bevelThickness: espessura * 0.12,
    bevelSize: profundidadeDente * 0.25,
    bevelSegments: 2,
    curveSegments: 2,
  })
  geo.rotateX(Math.PI / 2)
  geo.translate(0, -espessura / 2, 0)
  return geo
}

// Placa-mãe: disco liso com furos de rubi decorativos (só estética — a
// distância deles do centro é aleatória o bastante pra não parecer grade).
export function criarPlacaMae(raio: number, espessura: number) {
  const geo = new THREE.CylinderGeometry(raio, raio, espessura, 48)
  return geo
}

export function furosDecorativos(raioPlaca: number, quantidade: number, seed = 7) {
  const pontos: { x: number; z: number }[] = []
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = 0; i < quantidade; i++) {
    const ang = rand() * Math.PI * 2
    const r = raioPlaca * (0.35 + rand() * 0.55)
    pontos.push({ x: Math.cos(ang) * r, z: Math.sin(ang) * r })
  }
  return pontos
}

// Volante de balanço: aro fino + dois raios em cruz — a peça que oscila pra
// lá e pra cá em vez de girar sempre pro mesmo lado.
export function criarVolante(raio: number, espessuraAro: number) {
  return new THREE.TorusGeometry(raio, espessuraAro, 8, 32)
}

// Barril da mola real: cilindro com estrias em espiral gravadas via textura
// (não geometria) — ver texturas.ts.
export function criarBarril(raio: number, altura: number) {
  return new THREE.CylinderGeometry(raio, raio, altura, 40)
}
