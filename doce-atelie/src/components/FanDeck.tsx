import { useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import type { Flavor } from '../data'

gsap.registerPlugin(useGSAP)

// Adaptado do "Bounce Cards" do React Bits (reactbits.dev/components/bounce-cards):
// a mesma entrada elástica em stagger (ease 'elastic.out(1, 0.8)') e o
// "empurra os vizinhos" quando uma carta recebe hover — só que as cartas viraram
// as tiras de um leque de cores estilo Pantone, girando em volta de um rebite
// na base em vez de se espalharem em linha reta. Geometria e transição em
// index.css (.fan / .fan-strip).

const START = -30
const SPREAD = 72
const TINTS = [100, 72, 48, 28]

type FanDeckProps = {
  flavors: Flavor[]
  selected: string
  onSelect: (id: string) => void
}

export default function FanDeck({ flavors, selected, onSelect }: FanDeckProps) {
  const root = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const n = flavors.length

  useGSAP(
    () => {
      const el = root.current
      if (!el) return

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        el.classList.add('is-opening')
        gsap.fromTo(
          '.fan-strip',
          { '--open': 0 },
          {
            '--open': 1,
            duration: 1.6,
            delay: 0.35,
            ease: 'elastic.out(1, 0.8)',
            stagger: 0.06,
            onComplete: () => el.classList.remove('is-opening'),
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="fan"
      role="group"
      aria-label="Cartela de recheios"
      onMouseLeave={() => setHovered(null)}
    >
      {flavors.map((flavor, i) => {
        const base = START + (SPREAD * i) / (n - 1)
        const push = hovered === null || hovered === i ? 0 : i < hovered ? -5 : 5
        const lift = hovered === i ? -1.5 : selected === flavor.id ? -0.8 : 0
        const style = {
          '--base': `${base}deg`,
          '--closed': `${START}deg`,
          '--push': `${push}deg`,
          '--lift': `${lift}em`,
          zIndex: i,
        } as CSSProperties

        return (
          <button
            key={flavor.id}
            type="button"
            className={`fan-strip ${selected === flavor.id ? 'is-selected' : ''}`}
            style={style}
            aria-pressed={selected === flavor.id}
            aria-label={flavor.name}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            onClick={() => onSelect(flavor.id)}
          >
            <span className="fan-code" aria-hidden="true">
              {flavor.code}
            </span>
            {TINTS.map((tint) => (
              <span
                key={tint}
                className="fan-chip"
                style={{
                  background:
                    tint === 100 ? flavor.color : `color-mix(in srgb, ${flavor.color} ${tint}%, #fff)`,
                }}
              />
            ))}
            <span className="fan-hole" aria-hidden="true" />
          </button>
        )
      })}
      <span className="fan-rivet" aria-hidden="true" />
    </div>
  )
}
