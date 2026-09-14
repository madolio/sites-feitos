import { CanvasTexture, LinearFilter, RepeatWrapping, SRGBColorSpace } from 'three'

// "Lágrimas do vinho": estrias verticais irregulares, mais grossas em alguns
// pontos que em outros — como escorrem de verdade depois de um giro forte.
// Largas e em pouca quantidade de propósito: estrias finas somem no
// minificado quando a régua da taça ocupa só uma fatia pequena da tela.
export function texturaLagrimas() {
  const largura = 512
  const altura = 256
  const c = document.createElement('canvas')
  c.width = largura
  c.height = altura
  const g = c.getContext('2d')!
  g.clearRect(0, 0, largura, altura)

  let x = 0
  while (x < largura) {
    const gap = 20 + Math.random() * 40
    x += gap
    const comprimento = altura * (0.55 + Math.random() * 0.4)
    const largura2 = 6 + Math.random() * 8
    const grad = g.createLinearGradient(0, 0, 0, comprimento)
    grad.addColorStop(0, 'rgba(160, 30, 60, 1)')
    grad.addColorStop(0.7, 'rgba(140, 20, 52, 0.6)')
    grad.addColorStop(1, 'rgba(140, 20, 52, 0)')
    g.fillStyle = grad
    g.beginPath()
    g.ellipse(x, comprimento / 2, largura2, comprimento / 2, 0, 0, Math.PI * 2)
    g.fill()
  }

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  tex.wrapS = RepeatWrapping
  tex.minFilter = LinearFilter
  tex.generateMipmaps = false
  return tex
}

// Ondulação sutil na superfície do vinho — gira com o giro da taça, não
// desloca vértice nenhum (custo de shader zero), só a textura anda.
export function texturaOndulacao() {
  const lado = 256
  const c = document.createElement('canvas')
  c.width = lado
  c.height = lado
  const g = c.getContext('2d')!
  g.fillStyle = '#3c0716'
  g.fillRect(0, 0, lado, lado)

  for (let i = 0; i < 10; i++) {
    const r = 20 + i * 12
    g.strokeStyle = `rgba(190, 40, 70, ${0.12 - i * 0.008})`
    g.lineWidth = 2.5
    g.beginPath()
    g.arc(lado / 2, lado / 2, r, 0, Math.PI * 2)
    g.stroke()
  }
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2
    const r = Math.random() * lado * 0.48
    g.fillStyle = `rgba(255, 190, 200, ${0.03 + Math.random() * 0.05})`
    g.beginPath()
    g.arc(lado / 2 + Math.cos(a) * r, lado / 2 + Math.sin(a) * r, 1 + Math.random() * 2, 0, Math.PI * 2)
    g.fill()
  }

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  return tex
}
