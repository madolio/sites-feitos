import type { Especie } from '../data/especies'

// Ilustração técnica em linha (estilo prancha de herbário/field guide) —
// nunca foto. Traço fino, sem preenchimento sólido, no espírito de
// ilustração botânica científica: estrutura da planta, não still-life.
type Props = {
  tipo: Especie['ilustracao']
  className?: string
}

const STROKE = 'var(--color-mata)'

export default function EspecieIlustracao({ tipo, className }: Props) {
  const common = {
    viewBox: '0 0 160 200',
    className,
    fill: 'none',
    stroke: STROKE,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (tipo) {
    case 'strelitzia':
      return (
        <svg {...common}>
          <path d="M80 190V90" />
          <path d="M80 100c0-30 18-34 34-40-4 22-14 30-34 40Z" />
          <path d="M80 96c-2-24 8-32 22-40" />
          <path d="M80 96c-14-2-24 6-30 16 12 4 24 0 30-16Z" opacity="0.7" />
          <path d="M55 165c-14-6-22-20-20-38 16 2 26 14 26 32" />
          <path d="M105 170c14-8 20-24 16-42-16 4-24 18-22 36" />
        </svg>
      )
    case 'aechmea':
      return (
        <svg {...common}>
          <path d="M80 195v-70" />
          <ellipse cx="80" cy="95" rx="10" ry="16" />
          <path d="M80 60c-4 14-4 24 0 35" />
          <path d="M55 60c8 16 16 26 25 35" />
          <path d="M105 60c-8 16-16 26-25 35" />
          <path d="M40 120c14-2 26 4 34 14" />
          <path d="M120 120c-14-2-26 4-34 14" />
          <path d="M46 150c12-4 22 0 30 10" />
          <path d="M114 150c-12-4-22 0-30 10" />
        </svg>
      )
    case 'heliconia':
      return (
        <svg {...common}>
          <path d="M70 195V70" />
          <path d="M70 76c8-6 26-6 34 2-10 10-24 10-34-2Z" />
          <path d="M70 92c8-6 26-6 34 2-10 10-24 10-34-2Z" />
          <path d="M70 108c8-6 26-6 34 2-10 10-24 10-34-2Z" />
          <path d="M70 60c-24-2-38-18-38-40 22 2 36 16 38 40Z" opacity="0.75" />
        </svg>
      )
    case 'cattleya':
      return (
        <svg {...common}>
          <path d="M80 195v-90" />
          <ellipse cx="80" cy="90" rx="7" ry="14" />
          <path d="M80 76c-4-14 2-26 14-32-2 16-6 26-14 32Z" />
          <path d="M80 76c4-14-2-26-14-32 2 16 6 26 14 32Z" />
          <path d="M80 104c-16 4-24 16-22 30 16-2 24-14 22-30Z" />
          <path d="M80 104c16 4 24 16 22 30-16-2-24-14-22-30Z" />
          <path d="M80 100c-3 6-3 12 0 18 3-6 3-12 0-18Z" />
        </svg>
      )
    case 'zantedeschia':
      return (
        <svg {...common}>
          <path d="M80 195V90" />
          <path d="M80 40c-16 8-22 26-16 48 20-4 26-24 16-48Z" />
          <path d="M80 40c16 8 22 26 16 48-20-4-26-24-16-48Z" />
          <line x1="80" y1="52" x2="80" y2="86" strokeWidth="1" />
          <path d="M55 160c-16-6-24-20-22-38 16 2 26 16 22 38" />
        </svg>
      )
    case 'tibouchina':
      return (
        <svg {...common}>
          <path d="M80 195v-60" />
          <path d="M80 135c-18 4-30-4-34-20 18-2 30 6 34 20Z" />
          <path d="M80 135c18 4 30-4 34-20-18-2-30 6-34 20Z" />
          <g>
            <circle cx="60" cy="60" r="12" />
            <circle cx="90" cy="45" r="12" />
            <circle cx="105" cy="72" r="12" />
            <circle cx="70" cy="85" r="12" />
          </g>
        </svg>
      )
  }
}
