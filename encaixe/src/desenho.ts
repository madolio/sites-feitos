// Cada peça do catálogo é mostrada como um FIGURINO TÉCNICO PLANO — o
// desenho de moda que registra corte e costura sem corpo dentro (o que a
// indústria chama de "flat sketch"), não uma foto de manequim. Continua o
// mesmo princípio do site anterior (desenho técnico, não foto), aplicado a
// alfaiataria em vez de marcenaria. As linhas de cada arquétipo são
// geradas aqui por coordenadas.
export type Traco = {
  x1: number
  y1: number
  x2: number
  y2: number
  tracejado?: boolean
}

export type Desenho = {
  tracos: Traco[]
  /** Ponto de um detalhe de construção em destaque — onde o texto aponta. */
  junta: { x: number; y: number }
  /** Cota de tamanho, desenhada como régua embaixo do desenho. */
  cota: { x1: number; x2: number; y: number; label: string }
  viewBox: string
}

const L = (x1: number, y1: number, x2: number, y2: number, tracejado = false): Traco => ({ x1, y1, x2, y2, tracejado })

export function desenharBlazer(label: string): Desenho {
  return {
    viewBox: '0 0 160 200',
    tracos: [
      L(50, 30, 80, 46),
      L(80, 46, 110, 30),
      L(50, 30, 34, 42),
      L(110, 30, 126, 42),
      L(34, 42, 30, 170),
      L(126, 42, 130, 170),
      L(30, 170, 130, 170),
      L(80, 46, 80, 160, true),
      L(80, 46, 62, 60),
      L(62, 60, 50, 30),
      L(76, 95, 84, 95),
      L(76, 118, 84, 118),
      L(34, 42, 10, 130),
      L(10, 130, 26, 138),
      L(26, 138, 30, 170),
      L(126, 42, 150, 130),
      L(150, 130, 134, 138),
      L(134, 138, 130, 170),
      L(40, 130, 58, 130),
      L(102, 130, 120, 130),
    ],
    junta: { x: 62, y: 60 },
    cota: { x1: 30, x2: 130, y: 184, label },
  }
}

export function desenharCalca(label: string): Desenho {
  return {
    viewBox: '0 0 160 220',
    tracos: [
      L(48, 20, 112, 20),
      L(48, 20, 44, 100),
      L(112, 20, 116, 100),
      L(44, 100, 32, 190),
      L(116, 100, 128, 190),
      L(80, 20, 78, 96, true),
      L(78, 96, 70, 190, true),
      L(78, 96, 90, 190, true),
      L(28, 190, 40, 190),
      L(120, 190, 132, 190),
      L(66, 24, 62, 90),
      L(48, 26, 112, 26),
    ],
    junta: { x: 66, y: 24 },
    cota: { x1: 30, x2: 132, y: 196, label },
  }
}

export function desenharColete(label: string): Desenho {
  return {
    viewBox: '0 0 160 200',
    tracos: [
      L(52, 30, 80, 42),
      L(80, 42, 108, 30),
      L(52, 30, 40, 40),
      L(108, 30, 120, 40),
      L(40, 40, 36, 160),
      L(120, 40, 124, 160),
      L(36, 160, 124, 160),
      L(40, 40, 56, 46),
      L(56, 46, 44, 100),
      L(120, 40, 104, 46),
      L(104, 46, 116, 100),
      L(80, 42, 80, 150, true),
      L(74, 78, 86, 78),
      L(74, 100, 86, 100),
      L(74, 122, 86, 122),
      L(48, 128, 66, 128),
      L(48, 124, 66, 124),
    ],
    junta: { x: 57, y: 126 },
    cota: { x1: 36, x2: 124, y: 174, label },
  }
}

export function desenharCamisa(label: string): Desenho {
  return {
    viewBox: '0 0 160 215',
    tracos: [
      L(64, 20, 96, 20),
      L(64, 20, 56, 34),
      L(96, 20, 104, 34),
      L(56, 34, 104, 34),
      L(56, 34, 38, 176),
      L(104, 34, 122, 176),
      L(38, 176, 122, 176),
      L(80, 34, 80, 168, true),
      L(80, 56, 80, 60),
      L(80, 76, 80, 80),
      L(80, 96, 80, 100),
      L(80, 116, 80, 120),
      L(56, 34, 20, 90),
      L(20, 90, 34, 96),
      L(104, 34, 140, 90),
      L(140, 90, 126, 96),
      L(24, 88, 30, 94),
    ],
    junta: { x: 27, y: 91 },
    cota: { x1: 38, x2: 122, y: 190, label },
  }
}
