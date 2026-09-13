import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'

// Côtes de Genève: o acabamento decorativo listrado em ondas que toda placa
// de relojoaria fina de verdade recebe — não é decoração genérica de metal
// escovado, é a assinatura visual do ofício. Aplicada na face de cima da
// placa-mãe.
export function texturaCotesDeGeneve() {
  const lado = 1024
  const c = document.createElement('canvas')
  c.width = lado
  c.height = lado
  const g = c.getContext('2d')!

  g.fillStyle = '#caa25e'
  g.fillRect(0, 0, lado, lado)

  const largura = 26
  for (let x = -lado; x < lado * 2; x += largura) {
    const grad = g.createLinearGradient(x, 0, x + largura, 0)
    grad.addColorStop(0, 'rgba(255,235,190,0.05)')
    grad.addColorStop(0.5, 'rgba(255,244,215,0.55)')
    grad.addColorStop(1, 'rgba(90,62,20,0.35)')
    g.fillStyle = grad
    g.save()
    g.translate(x, 0)
    g.transform(1, 0.55, 0, 1, 0, 0)
    g.fillRect(0, -lado, largura, lado * 3)
    g.restore()
  }

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  return tex
}

// Barril da mola real: estrias em espiral vistas de lado, como se a fita de
// aço enrolada estivesse à mostra por baixo da tampa.
export function texturaBarril() {
  const largura = 256
  const altura = 128
  const c = document.createElement('canvas')
  c.width = largura
  c.height = altura
  const g = c.getContext('2d')!

  g.fillStyle = '#8a6a34'
  g.fillRect(0, 0, largura, altura)

  for (let x = 0; x < largura; x += 5) {
    g.strokeStyle = x % 10 === 0 ? 'rgba(40,26,10,0.5)' : 'rgba(255,236,196,0.28)'
    g.lineWidth = 1.4
    g.beginPath()
    g.moveTo(x, 0)
    g.lineTo(x, altura)
    g.stroke()
  }

  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  tex.wrapS = RepeatWrapping
  tex.repeat.set(1, 1)
  return tex
}
