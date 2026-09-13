// Cada peça do catálogo é mostrada como um desenho técnico de elevação —
// não foto — no espírito de um caderno de bancada. As linhas de cada arquétipo
// (mesa, banco, etc.) são geradas aqui por coordenadas, não desenhadas peça a
// peça: mesa e aparador só variam a largura, por exemplo. `pernaTracejada`
// marca as peças "de trás" (sugerindo profundidade, não uma planta de verdade).
export type Traco = {
  x1: number
  y1: number
  x2: number
  y2: number
  tracejado?: boolean
}

export type Desenho = {
  tracos: Traco[]
  /** Ponto do encaixe em destaque — onde o texto da peça aponta. */
  junta: { x: number; y: number }
  /** Cota de largura, desenhada como régua embaixo do desenho. */
  cota: { x1: number; x2: number; y: number; label: string }
  viewBox: string
}

const L = (x1: number, y1: number, x2: number, y2: number, tracejado = false): Traco => ({ x1, y1, x2, y2, tracejado })

export function desenharMesa(label: string): Desenho {
  const y0 = 118
  const yTopo = 46
  return {
    viewBox: '0 0 200 140',
    tracos: [
      L(20, yTopo, 180, yTopo),
      L(20, yTopo + 6, 180, yTopo + 6),
      L(20, yTopo, 20, yTopo + 6),
      L(180, yTopo, 180, yTopo + 6),
      L(46, yTopo + 6, 34, y0, true),
      L(154, yTopo + 6, 166, y0, true),
      L(32, yTopo + 6, 32, y0),
      L(168, yTopo + 6, 168, y0),
      L(32, 96, 168, 96),
    ],
    junta: { x: 32, y: 96 },
    cota: { x1: 20, x2: 180, y: y0 + 14, label },
  }
}

export function desenharBanco(label: string): Desenho {
  const y0 = 118
  const yTopo = 78
  return {
    viewBox: '0 0 200 140',
    tracos: [
      L(35, yTopo, 165, yTopo),
      L(35, yTopo + 5, 165, yTopo + 5),
      L(35, yTopo, 35, yTopo + 5),
      L(165, yTopo, 165, yTopo + 5),
      L(46, yTopo + 5, 46, y0),
      L(154, yTopo + 5, 154, y0),
      L(46, 102, 154, 102),
    ],
    junta: { x: 46, y: 102 },
    cota: { x1: 35, x2: 165, y: y0 + 14, label },
  }
}

export function desenharEstante(label: string): Desenho {
  const topo = 24
  const base = 120
  const prateleiras = [46, 68, 90]
  return {
    viewBox: '0 0 200 140',
    tracos: [
      L(58, topo, 58, base),
      L(142, topo, 142, base),
      L(58, topo, 142, topo),
      L(58, base, 142, base),
      ...prateleiras.map((y) => L(58, y, 142, y)),
    ],
    junta: { x: 58, y: prateleiras[1] },
    cota: { x1: 58, x2: 142, y: base + 14, label },
  }
}

export function desenharCadeira(label: string): Desenho {
  const base = 120
  const assento = 72
  return {
    viewBox: '0 0 200 140',
    tracos: [
      L(64, 26, 64, assento),
      L(116, 26, 116, assento),
      L(64, 26, 116, 26),
      L(64, 42, 116, 42),
      L(64, 57, 116, 57),
      L(64, assento, 116, assento),
      L(64, assento + 4, 116, assento + 4),
      L(70, assento + 4, 70, base),
      L(110, assento + 4, 110, base),
      L(64, 26, 60, assento + 4, true),
      L(60, assento + 4, 60, base, true),
    ],
    junta: { x: 70, y: assento + 4 },
    cota: { x1: 60, x2: 116, y: base + 14, label },
  }
}

export function desenharAparador(label: string): Desenho {
  const y0 = 118
  const yTopo = 68
  return {
    viewBox: '0 0 200 140',
    tracos: [
      L(18, yTopo, 182, yTopo),
      L(18, yTopo + 5, 182, yTopo + 5),
      L(18, yTopo, 18, yTopo + 5),
      L(182, yTopo, 182, yTopo + 5),
      L(28, yTopo + 5, 28, y0),
      L(172, yTopo + 5, 172, y0),
      L(28, y0, 172, y0),
      L(100, yTopo + 5, 100, y0),
      circleAsTraco(91, (yTopo + y0) / 2),
      circleAsTraco(109, (yTopo + y0) / 2),
    ],
    junta: { x: 28, y: yTopo + 5 },
    cota: { x1: 18, x2: 182, y: y0 + 14, label },
  }
}

export function desenharBanqueta(label: string): Desenho {
  const assento = 56
  const base = 118
  const xEsq = 76
  const xDir = 124
  return {
    viewBox: '0 0 200 140',
    tracos: [
      L(xEsq, assento, xDir, assento),
      L(xEsq, assento + 5, xDir, assento + 5),
      L(xEsq, assento, xEsq, assento + 5),
      L(xDir, assento, xDir, assento + 5),
      L(xEsq + 4, assento + 5, xDir - 4, base),
      L(xDir - 4, assento + 5, xEsq + 4, base),
    ],
    junta: { x: 100, y: (assento + 5 + base) / 2 },
    cota: { x1: xEsq, x2: xDir, y: base + 14, label },
  }
}

// Pequeno truque pra "desenhar" um círculo (puxador) sem sair do formato
// Traco de linha reta: duas linhas curtas cruzadas fazem um xis discreto,
// mais coerente com a linguagem de desenho técnico do que um círculo perfeito.
function circleAsTraco(x: number, y: number): Traco {
  return L(x - 1.5, y - 1.5, x + 1.5, y + 1.5)
}
