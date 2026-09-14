import type { Flash as FlashType } from '../data/flashes'

// Ilustrações estilo "flash sheet" tradicional: traço grosso único, sem
// preenchimento, mesma linguagem de todo o portfólio (nunca foto).
//
// `animado`: usado só no carimbo em cima do corpo (Corpo.tsx via
// PainelProvador.tsx) — o traço se desenha sozinho, como se a máquina
// estivesse tatuando ali na hora. Técnica: `stroke-dasharray`/`-dashoffset`
// com um valor fixo bem maior que qualquer caminho do ícone (120×120,
// nenhum traço passa de ~260 unidades) — não precisa medir o comprimento
// real de cada `<path>` em runtime, só garantir a margem.
export default function Flash({
  tipo,
  className = '',
  animado = false,
}: {
  tipo: FlashType['tipo']
  className?: string
  animado?: boolean
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${animado ? 'flash-traçando' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {tipo === 'rosa' && <Rosa />}
      {tipo === 'punhal' && <Punhal />}
      {tipo === 'andorinha' && <Andorinha />}
      {tipo === 'raio' && <Raio />}
      {tipo === 'cobra' && <Cobra />}
      {tipo === 'ancora' && <Ancora />}
    </svg>
  )
}

function Rosa() {
  return (
    <>
      <path d="M60 20c-14 4-20 14-16 24 3 7 12 10 18 6-8 2-15-3-14-11 1-8 10-13 18-10" />
      <path d="M60 20c14 4 20 14 16 24-3 7-12 10-18 6 8 2 15-3 14-11-1-8-10-13-18-10" />
      <circle cx="60" cy="34" r="8" />
      <path d="M60 42v50" />
      <path d="M60 60c-10 0-16 6-16 14M60 70c10 0 16 6 16 14" />
      <path d="M50 56l-6-6M70 56l6-6" />
    </>
  )
}

function Punhal() {
  return (
    <>
      <path d="M60 14v50" />
      <path d="M42 64h36" />
      <path d="M48 64c2-16 6-30 12-40 6 10 10 24 12 40" />
      <path d="M52 70h16v6h-16z" />
      <path d="M56 76v28l4 8 4-8V76" />
      <path d="M46 88c4 4 4 10 0 16M74 88c-4 4-4 10 0 16" />
    </>
  )
}

function Andorinha() {
  return (
    <>
      <path d="M60 50c-16-14-32-16-44-10 10 2 18 8 22 16-10-2-20 0-28 8 12-2 22 2 28 10-6 4-10 10-10 18 8-6 16-10 22-10" />
      <path d="M60 50c16-14 32-16 44-10-10 2-18 8-22 16 10-2 20 0 28 8-12-2-22 2-28 10 6 4 10 10 10 18-8-6-16-10-22-10" />
      <path d="M60 50c-2 10-2 20 0 30" />
    </>
  )
}

function Raio() {
  return <path d="M66 14 34 66h20l-8 40 40-56H66l8-36z" strokeLinejoin="round" />
}

function Cobra() {
  return (
    <>
      <path d="M30 40c10-14 26-14 32-2 6 10-2 18-12 16-8-2-10-10-4-14" />
      <path d="M46 60c14-6 28 2 30 16 2 12-8 20-20 16" />
      <path d="M56 92c10 4 22 0 26-10" />
      <circle cx="26" cy="34" r="3" fill="currentColor" />
      <path d="M18 30l6 4-6 4" />
    </>
  )
}

function Ancora() {
  return (
    <>
      <circle cx="60" cy="24" r="8" />
      <path d="M60 32v56" />
      <path d="M40 46h40" />
      <path d="M60 88c-14 0-26-10-26-24M60 88c14 0 26-10 26-24" />
      <path d="M34 60c0 6 3 10 6 12M86 60c0 6-3 10-6 12" />
    </>
  )
}
