// Converte temperatura de cor (Kelvin) em RGB de verdade — aproximação de
// Tanner Helland do espectro de corpo negro, o mesmo cálculo usado em
// software de iluminação de palco/estúdio. Nunca escolhemos a cor de uma
// luminária "no olho": ela é sempre derivada da temperatura real (2700K a
// 6500K, a faixa comercial de LED).
export function kelvinParaRgb(kelvin: number): { r: number; g: number; b: number } {
  const k = kelvin / 100

  let r: number
  let g: number
  let b: number

  if (k <= 66) {
    r = 255
    g = 99.4708025861 * Math.log(k) - 161.1195681661
  } else {
    r = 329.698727446 * Math.pow(k - 60, -0.1332047592)
    g = 288.1221695283 * Math.pow(k - 60, -0.0755148492)
  }

  if (k >= 66) {
    b = 255
  } else if (k <= 19) {
    b = 0
  } else {
    b = 138.5177312231 * Math.log(k - 10) - 305.0447927307
  }

  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  return { r: clamp(r), g: clamp(g), b: clamp(b) }
}

export function kelvinParaCss(kelvin: number): string {
  const { r, g, b } = kelvinParaRgb(kelvin)
  return `rgb(${r} ${g} ${b})`
}
