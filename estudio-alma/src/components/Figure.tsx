import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { movements, type Pose } from '../data'

// Boneco no estilo das figuras do Balé Triádico (Oskar Schlemmer): cada parte
// do corpo é uma forma simples numa das cores das molas do reformer. É uma
// cadeia de grupos SVG aninhados — quadril → perna / tronco → braço, cabeça —
// então basta interpolar seis números (os ângulos e a posição do quadril) com
// o GSAP e reescrever os `transform` a cada frame.

const TORSO = 118
const LEG = 172
const ARM = 108
const SHOULDER = TORSO - 6
const HEAD_OFFSET = 36

const initial = movements[0].pose

export default function Figure({ index }: { index: number }) {
  const hip = useRef<SVGGElement>(null)
  const leg = useRef<SVGGElement>(null)
  const torso = useRef<SVGGElement>(null)
  const arm = useRef<SVGGElement>(null)
  const neck = useRef<SVGGElement>(null)
  const sun = useRef<SVGCircleElement>(null)
  const pose = useRef<Pose>({ ...initial })

  const apply = useCallback(() => {
    const p = pose.current
    hip.current?.setAttribute('transform', `translate(${p.hx} ${p.hy})`)
    leg.current?.setAttribute('transform', `rotate(${p.leg})`)
    torso.current?.setAttribute('transform', `rotate(${p.torso})`)
    arm.current?.setAttribute('transform', `translate(${SHOULDER} 0) rotate(${p.arm})`)
    neck.current?.setAttribute('transform', `translate(${TORSO} 0) rotate(${p.neck})`)
    sun.current?.setAttribute('cx', String(p.sunX))
    sun.current?.setAttribute('cy', String(p.sunY))
  }, [])

  useEffect(() => {
    const target = movements[index].pose
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Object.assign(pose.current, target)
      apply()
      return
    }
    const tween = gsap.to(pose.current, {
      ...target,
      duration: 1.15,
      ease: 'power3.inOut',
      onUpdate: apply,
      overwrite: true,
    })
    return () => {
      tween.kill()
    }
  }, [index, apply])

  return (
    <svg viewBox="0 0 400 440" className="h-auto w-full" role="img" aria-label={`Figura fazendo ${movements[index].name}`}>
      <rect x="28" y="52" width="86" height="86" fill="#2c4fa3" />
      <circle ref={sun} cx={initial.sunX} cy={initial.sunY} r="104" fill="#f2b300" />
      <rect x="18" y="400" width="364" height="10" fill="#1d1b26" />

      <g ref={hip} transform={`translate(${initial.hx} ${initial.hy})`}>
        <g ref={leg} transform={`rotate(${initial.leg})`}>
          <line x1="0" y1="0" x2={LEG} y2="0" stroke="#2f8f5b" strokeWidth="28" strokeLinecap="round" />
        </g>
        <g ref={torso} transform={`rotate(${initial.torso})`}>
          <line x1="0" y1="0" x2={TORSO} y2="0" stroke="#1d1b26" strokeWidth="46" strokeLinecap="round" />
          <g ref={arm} transform={`translate(${SHOULDER} 0) rotate(${initial.arm})`}>
            <line x1="0" y1="0" x2={ARM} y2="0" stroke="#2c4fa3" strokeWidth="17" strokeLinecap="round" />
          </g>
          <circle cx="0" cy="0" r="6" fill="#e9e8e4" />
          <circle cx={SHOULDER} cy="0" r="4.5" fill="#e9e8e4" />
          <g ref={neck} transform={`translate(${TORSO} 0) rotate(${initial.neck})`}>
            <circle cx={HEAD_OFFSET} cy="0" r="23" fill="#d63c3c" />
          </g>
        </g>
      </g>
    </svg>
  )
}
