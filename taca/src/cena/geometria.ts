import * as THREE from 'three'

// Perfil da taça, da base ao aro — os mesmos pontos descrevem tanto a taça
// (raio cheio) quanto, escalados, o vinho por dentro dela. y em unidades de
// cena, x é o raio naquela altura.
const PERFIL_TACA: [number, number][] = [
  [0, -0.02],
  [0.44, 0.0],
  [0.42, 0.03],
  [0.1, 0.06],
  [0.065, 0.08],
  [0.06, 0.82],
  [0.09, 0.88],
  [0.15, 0.93],
  [0.3, 1.04],
  [0.46, 1.22],
  [0.55, 1.5],
  [0.58, 1.82],
  [0.56, 2.02],
  [0.47, 2.16],
  [0.45, 2.2],
]

export const ALTURA_BASE_TACA_BOJO = 0.93
export const ALTURA_VINHO = 1.52

export function raioNaAltura(y: number) {
  for (let i = 0; i < PERFIL_TACA.length - 1; i++) {
    const [x1, y1] = PERFIL_TACA[i]
    const [x2, y2] = PERFIL_TACA[i + 1]
    if (y >= y1 && y <= y2) {
      const t = (y - y1) / (y2 - y1 || 1)
      return x1 + (x2 - x1) * t
    }
  }
  return PERFIL_TACA[PERFIL_TACA.length - 1][0]
}

export function criarTaca() {
  const pontos = PERFIL_TACA.map(([x, y]) => new THREE.Vector2(x, y))
  const geo = new THREE.LatheGeometry(pontos, 64)
  return geo
}

// Vinho: mesmo perfil da taça só na região do bojo, encolhido um pouco pra
// caber dentro da parede de vidro sem brigar com ela (z-fighting).
export function criarVinho(escala = 0.93) {
  const pontos: THREE.Vector2[] = []
  for (const [x, y] of PERFIL_TACA) {
    if (y < ALTURA_BASE_TACA_BOJO || y > ALTURA_VINHO) continue
    pontos.push(new THREE.Vector2(x * escala, y))
  }
  pontos.unshift(new THREE.Vector2(raioNaAltura(ALTURA_BASE_TACA_BOJO) * escala * 0.3, ALTURA_BASE_TACA_BOJO - 0.02))
  pontos.push(new THREE.Vector2(raioNaAltura(ALTURA_VINHO) * escala, ALTURA_VINHO))
  const geo = new THREE.LatheGeometry(pontos, 64)
  return geo
}

export function criarSuperficieVinho(escala = 0.93) {
  const raio = raioNaAltura(ALTURA_VINHO) * escala
  return new THREE.CircleGeometry(raio, 64)
}

// Camada fina logo acima do vinho, onde as "lágrimas" escorrem depois de um
// giro forte — começa exatamente na altura do vinho (não no ponto de perfil
// mais próximo, que fica um pouco acima e deixaria um vão sem parede).
export function criarParedeLagrimas(escala = 0.97) {
  const ALTURA_TOPO = 2.16
  const pontos: THREE.Vector2[] = [new THREE.Vector2(raioNaAltura(ALTURA_VINHO) * escala, ALTURA_VINHO)]
  for (const [x, y] of PERFIL_TACA) {
    if (y <= ALTURA_VINHO || y >= ALTURA_TOPO) continue
    pontos.push(new THREE.Vector2(x * escala, y))
  }
  pontos.push(new THREE.Vector2(raioNaAltura(ALTURA_TOPO) * escala, ALTURA_TOPO))
  return new THREE.LatheGeometry(pontos, 48)
}
