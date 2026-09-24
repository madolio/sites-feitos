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

export function Logo({ compact = false }: { compact?: boolean }) {
  if (site.logo) return <img src={site.logo.src} alt={site.logo.alt} className="h-10 w-auto" />
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 -skew-x-6 place-items-center bg-accent font-display text-2xl leading-none font-extrabold text-accent-foreground max-[359px]:hidden"
      >
        {site.initial}
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-display text-3xl leading-none font-bold tracking-wide uppercase">{site.name}</span>
        <span
          className={`mt-1 text-[0.6875rem] font-semibold tracking-[0.16em] text-muted uppercase ${compact ? 'hidden min-[480px]:block' : ''}`}
        >
          {site.descriptor}
        </span>
      </span>
    </span>
  )
}

type IconProps = { className?: string }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

export const IconPlus = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const IconMenu = ({ className = 'size-6' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
export const IconClose = ({ className = 'size-6' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const IconWhatsapp = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
    <path d="M9 9c.3 2.3 2.7 4.7 5 5l1.3-1.2-1.8-1-.9.7c-.7-.3-1.6-1.2-1.9-1.9l.7-.9-1-1.8Z" />
  </svg>
)
export const IconPhone = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </svg>
)
export const IconMail = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)
export const IconPin = ({ className = 'size-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
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
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
)
