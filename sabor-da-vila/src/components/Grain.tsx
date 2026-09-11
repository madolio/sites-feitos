import { useEffect } from 'react'

// Adaptado do "Noise" do React Bits (reactbits.dev/animations/noise): o mesmo
// grão — pixel cinza aleatório com alfa baixo —, mas desenhado UMA vez num tile
// pequeno e usado como fundo repetido do body::after (ver index.css). O
// original redesenha um canvas de 1024×1024 a cada dois frames, o que pesa no
// celular e derruba o Lighthouse.

const SIZE = 180
const ALPHA = 22

export default function Grain() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const image = ctx.createImageData(SIZE, SIZE)
    const data = image.data
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255
      data[i] = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = ALPHA
    }
    ctx.putImageData(image, 0, 0)
    document.documentElement.style.setProperty('--grain', `url(${canvas.toDataURL('image/png')})`)
  }, [])

  return null
}
