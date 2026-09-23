// Motor compartilhado de curva de nível: mesma mecânica usada em
// TrilhaMapa.tsx (anéis fechados ao redor de um pico, raio perturbado por
// harmônicos senoidais determinísticos), generalizada em parâmetros pra
// poder ser reaproveitada em qualquer lugar do site que precise do mesmo
// vocabulário visual — inclusive fora do mapa principal (ver
// CurvaEspecialidade.tsx). Isolar aqui evita duas implementações divergentes
// da mesma matemática.
//
//   r(θ, anel) = raioBase(anel) + a1·sin(freq1·θ + anel) + a2·sin(freq2·θ + 2·anel)

export type Ponto = [number, number]

export type OpcoesAnel = {
  segmentos?: number
  a1?: number
  a2?: number
  freq1?: number
  freq2?: number
  cx?: number
  cy?: number
  escalaX?: number
  escalaY?: number
  deriva?: number
}

export function pontosDoAnel(raioBase: number, indiceAnel: number, opcoes: OpcoesAnel = {}): Ponto[] {
  const {
    segmentos = 28,
    a1 = 18,
    a2 = 9,
    freq1 = 3,
    freq2 = 5,
    cx = 0,
    cy = 0,
    escalaX = 1,
    escalaY = 1,
    deriva = 0,
  } = opcoes

  const pontos: Ponto[] = []
  for (let i = 0; i < segmentos; i++) {
    const theta = (i / segmentos) * Math.PI * 2
    const r = raioBase + a1 * Math.sin(freq1 * theta + indiceAnel) + a2 * Math.sin(freq2 * theta + 2 * indiceAnel)
    const x = cx + r * Math.cos(theta) * escalaX
    const y = cy + r * Math.sin(theta) * escalaY + indiceAnel * deriva
    pontos.push([x, y])
  }
  return pontos
}

// Catmull-Rom -> Bézier cúbica, fechado, pra um traço suave de curva de nível
// (aparência desenhada à mão, não uma elipse perfeita).
export function pathSuaveFechado(pontos: Ponto[]): string {
  const n = pontos.length
  let d = `M ${pontos[0][0].toFixed(1)} ${pontos[0][1].toFixed(1)} `
  for (let i = 0; i < n; i++) {
    const p0 = pontos[(i - 1 + n) % n]
    const p1 = pontos[i]
    const p2 = pontos[(i + 1) % n]
    const p3 = pontos[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `
  }
  return d + 'Z'
}
