// Adesivos 2D com contorno preto de 1.5px — o motivo assinatura do estilo de
// referência ("Slush"): nunca sombra, nunca gradiente, cor saturada só na
// forma, nunca no texto.
const shapes = {
  star: 'M20 2 L24.5 14.5 L38 15.5 L27.5 24 L31 37.5 L20 30 L9 37.5 L12.5 24 L2 15.5 L15.5 14.5 Z',
  blob: 'M20 3 C30 3 37 10 37 20 C37 30 30 37 20 37 C10 37 3 30 3 20 C3 10 10 3 20 3 Z',
  bolt: 'M22 2 L8 22 H18 L14 38 L32 16 H21 Z',
  balloon: 'M20 4 C30 4 34 13 32 21 C30 29 24 32 22 33 L23 37 L17 37 L18 33 C16 32 10 29 8 21 C6 13 10 4 20 4 Z',
} as const

const colors: Record<string, string> = {
  sky: 'var(--color-sky)',
  ember: 'var(--color-ember)',
  mint: 'var(--color-mint)',
  sun: 'var(--color-sun)',
  lavender: 'var(--color-lavender)',
}

type StickerProps = {
  shape: keyof typeof shapes
  color: keyof typeof colors
  className?: string
  rotate?: number
}

export default function Sticker({ shape, color, className = 'h-10 w-10', rotate = 0 }: StickerProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path d={shapes[shape]} fill={colors[color]} stroke="var(--color-carbon)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
