import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { site } from '../config/site'

/** Texto com *destaque*: o trecho entre asteriscos vira itálico colorido. */
export function Rich({ text }: { text: string }) {
  const partes = text.split(/\*(.+?)\*/g)
  return (
    <>
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <em key={i} className="em-accent">
            {p}
          </em>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

/** Aparece ao entrar na tela (o CSS só esconde antes quando há JS e movimento). */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  if (site.logo) return <img src={site.logo.src} alt={site.logo.alt} className="h-10 w-auto" />
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`grid size-10 shrink-0 place-items-center rounded-full border font-display text-xl italic ${
          light ? 'border-clay-light text-clay-light' : 'border-clay text-clay'
        }`}
      >
        {site.initial}
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl tracking-tight ${light ? 'text-bone' : 'text-ink'}`}>{site.name}</span>
        <span
          className={`mt-1 text-xs font-semibold tracking-[0.16em] uppercase ${compact ? 'hidden min-[420px]:block' : ''} ${light ? 'text-bone/70' : 'text-muted'}`}
        >
          {site.descriptor}
        </span>
      </span>
    </span>
  )
}

type IconProps = { className?: string }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

export const IconArrow = ({ className = 'size-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
export const IconPlus = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const IconMenu = ({ className = 'size-6' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)
export const IconClose = ({ className = 'size-6' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const IconWhatsapp = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20z" />
    <path d="M9 9.2c.3 2.3 2.5 4.5 4.8 4.8l1.1-1.2-1.9-1-.8.6a3.4 3.4 0 0 1-1.6-1.6l.6-.8-1-1.9L9 9.2z" />
  </svg>
)
export const IconPhone = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2L14 12.5l4 1.5v3a2 2 0 0 1-2 2A12 12 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)
export const IconMail = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
)
export const IconPin = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
)
export const IconClock = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
export const IconInstagram = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
  </svg>
)
