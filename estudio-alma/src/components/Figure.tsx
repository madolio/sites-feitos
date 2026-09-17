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
  const glow = useRef<SVGCircleElement>(null)
  const shadow = useRef<SVGEllipseElement>(null)
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
    glow.current?.setAttribute('cx', String(p.sunX))
    glow.current?.setAttribute('cy', String(p.sunY))
    // A sombra de contato acompanha o quadril (só o eixo X importa — o chão é
    // fixo em y=400) e "acorda" quando a pose se afasta do centro, dando ao
    // boneco uma sensação de peso apoiado no chão em vez de flutuando sobre
    // a barra. Largura cai um pouco quando o quadril sai do centro, como uma
    // sombra vista de perto perdendo área.
    const spread = Math.max(0.55, 1 - Math.abs(p.hx - 200) / 260)
    shadow.current?.setAttribute('cx', String(p.hx))
    shadow.current?.setAttribute('rx', String(70 * spread))
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
      <defs>
        <radialGradient id="figure-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b300" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f2b300" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="28" y="52" width="86" height="86" fill="#2c4fa3" />
      <circle ref={glow} cx={initial.sunX} cy={initial.sunY} r="168" fill="url(#figure-glow)" />
      <circle ref={sun} cx={initial.sunX} cy={initial.sunY} r="104" fill="#f2b300" />
      <ellipse ref={shadow} cx={initial.hx} cy="416" rx="70" ry="9" fill="#1d1b26" opacity="0.18" />
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
