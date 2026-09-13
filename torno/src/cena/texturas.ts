import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'

// Grés tem pintas de ferro — pontinhos escuros que atravessam até o esmalte
// depois da queima. A textura é quase branca (multiplica a cor do material),
// só com os pontos e um grão bem leve.
export function texturaPintas() {
  const lado = 1024
  const c = document.createElement('canvas')
  c.width = lado
  c.height = lado
  const g = c.getContext('2d')!

  const img = g.createImageData(lado, lado)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 238 + Math.random() * 17
    img.data[i] = v
    img.data[i + 1] = v
    img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  g.putImageData(img, 0, 0)

  for (let i = 0; i < 1900; i++) {
    const x = Math.random() * lado
    const y = Math.random() * lado
    const r = 0.5 + Math.random() ** 3 * 2.4
    g.fillStyle = `rgba(52, 34, 22, ${0.45 + Math.random() * 0.45})`
    g.beginPath()
    g.arc(x, y, r, 0, Math.PI * 2)
    g.fill()
  }

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  tex.wrapS = RepeatWrapping
  tex.wrapT = RepeatWrapping
  tex.repeat.set(3, 1)
  tex.anisotropy = 4
  return tex
}

// Cabeça do torno: alumínio com anéis-guia concêntricos e restos de barbotina
// — as manchas claras deixam o giro visível mesmo com a peça simétrica.
export function texturaRoda() {
  const lado = 512
  const c = document.createElement('canvas')
  c.width = lado
  c.height = lado
  const g = c.getContext('2d')!
  const m = lado / 2

  g.fillStyle = '#6a655e'
  g.fillRect(0, 0, lado, lado)

  g.strokeStyle = 'rgba(255, 255, 255, 0.07)'
  g.lineWidth = 2
  for (let r = 20; r < m; r += 22) {
    g.beginPath()
    g.arc(m, m, r, 0, Math.PI * 2)
    g.stroke()
  }

  const manchas: [number, number, number, number][] = [
    [150, 0.2, 1.3, 16],
    [205, 2.4, 3.3, 11],
    [110, 3.9, 5.1, 20],
    [232, 4.6, 5.0, 8],
  ]
  g.lineCap = 'round'
  for (const [r, a0, a1, w] of manchas) {
    g.strokeStyle = 'rgba(160, 152, 141, 0.55)'
    g.lineWidth = w
    g.beginPath()
    g.arc(m, m, r, a0, a1)
    g.stroke()
  }

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  return tex
}
