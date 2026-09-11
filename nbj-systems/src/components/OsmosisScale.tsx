import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { osmosisModels } from '../data/products'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const maxFlow = Math.max(...osmosisModels.map((m) => m.flow))

// Compara os modelos pela vazão. Com `detailed`, mostra a descrição de cada um.
export default function OsmosisScale({ detailed = false }: { detailed?: boolean }) {
  const ref = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-bar]', {
          scaleX: 0,
          transformOrigin: '0% 50%',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <ul ref={ref} className={detailed ? 'space-y-10' : 'space-y-5'}>
      {osmosisModels.map((model) => (
        <li key={model.name}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-bold text-ink">{model.name}</h3>
            <span className="text-ink/70 tabular-nums">{model.flow} L/h</span>
          </div>
          <div className="mt-2 h-2.5 bg-ink/10">
            <div
              data-bar
              className="h-full bg-accent"
              style={{ width: `${(model.flow / maxFlow) * 100}%` }}
            />
          </div>
          {detailed && (
            <p className="mt-3 max-w-prose text-ink/70">{model.description}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
