import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type { Gema } from '../data/gemas'
import type { Peca } from '../data/pecas'

// Geometria fixa (não depende de gema/peça): centro da composição e raios
// das camadas da pedra. Todo o desenho — bruto, facetado, engaste — parte
// deste mesmo centro, pra reforçar que é a MESMA forma se transformando,
// não ícones diferentes lado a lado.
const CX = 200
const CY = 230
const R_GUIDE = 145 // onde as linhas de construção começam (fora da pedra bruta)
const R_OUTER = 80 // girdle da lapidação — mesmo ponto onde as linhas de construção terminam
const R_TABLE = 34 // mesa central da lapidação

const OCT_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const GUIDE_ANGLES = [0, 90, 180, 270]
const PRONG_ANGLES = [45, 135, 225, 315]

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}
function pt(angleDeg: number, r: number): [number, number] {
  const a = toRad(angleDeg)
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}
function fmt([x, y]: [number, number]) {
  return `${x.toFixed(2)},${y.toFixed(2)}`
}

// Contorno irregular da pedra bruta — pontos com raio variado (não é um
// polígono regular), como um croqui de levantamento gemológico de uma
// pedra ainda não lapidada.
const ROUGH_ANGLES_RADII: [number, number][] = [
  [0, 92],
  [35, 68],
  [80, 88],
  [125, 60],
  [150, 95],
  [195, 72],
  [230, 90],
  [270, 65],
  [310, 85],
  [340, 74],
]
const roughPoints = ROUGH_ANGLES_RADII.map(([a, r]) => pt(a, r))
const roughPointsStr = roughPoints.map(fmt).join(' ')

const outerPts = OCT_ANGLES.map((a) => pt(a, R_OUTER))
const tablePts = OCT_ANGLES.map((a) => pt(a, R_TABLE))
const outerPtsStr = outerPts.map(fmt).join(' ')
const tablePtsStr = tablePts.map(fmt).join(' ')

const guideLines = GUIDE_ANGLES.map((a) => ({
  angle: a,
  from: pt(a, R_GUIDE),
  to: pt(a, R_OUTER),
}))

const radiatingLines = OCT_ANGLES.map((a, i) => ({
  angle: a,
  from: outerPts[i],
  to: tablePts[i],
}))

const prongs = PRONG_ANGLES.map((a) => {
  const i = OCT_ANGLES.indexOf(a)
  const [vx, vy] = outerPts[i]
  const dir: [number, number] = [Math.cos(toRad(a)), Math.sin(toRad(a))]
  const perp: [number, number] = [-Math.sin(toRad(a)), Math.cos(toRad(a))]
  const base: [number, number] = [vx + 20 * dir[0], vy + 20 * dir[1]]
  const p1: [number, number] = [base[0] + 5 * perp[0], base[1] + 5 * perp[1]]
  const p2: [number, number] = [base[0] - 5 * perp[0], base[1] - 5 * perp[1]]
  return { angle: a, tip: [vx, vy] as [number, number], p1, p2, dir }
})

// Faixa de "fogo" real: quanto maior a dispersão da gema, mais facetas de
// brilho aparecem acesas — não é decoração, é o mesmo dado gemológico que
// o Hero já mostra como texto (IOR/dispersão).
function fogoCount(dispersao: number) {
  const t = (dispersao - 0.013) / (0.044 - 0.013)
  return Math.max(3, Math.min(8, Math.round(3 + t * 5)))
}

function drawIn(
  el: SVGGeometryElement | null,
  tl: gsap.core.Timeline,
  position: string | number,
  duration: number,
  ease = 'power2.out',
) {
  if (!el) return
  const len = el.getTotalLength()
  gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
  tl.to(el, { strokeDashoffset: 0, duration, ease }, position)
}

const SILHUETAS: Record<Peca['id'], string> = {
  anel: 'M 150 262 Q 150 340 200 340 Q 250 340 250 262',
  colar: 'M 40 18 L 200 150 M 360 18 L 200 150',
  pulseira: '', // usa <ellipse>, ver abaixo
}

export default function ConstrucaoJoia({ gema, peca }: { gema: Gema; peca: Peca }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const roughRef = useRef<SVGPolygonElement>(null)
  const guideRefs = useRef<(SVGLineElement | null)[]>([])
  const tickGroupRef = useRef<SVGGElement>(null)
  const facetGroupRef = useRef<SVGGElement>(null)
  const outerOctRef = useRef<SVGPolygonElement>(null)
  const tableOctRef = useRef<SVGPolygonElement>(null)
  const radiatingRefs = useRef<(SVGLineElement | null)[]>([])
  const wireRefs = useRef<Record<Peca['id'], SVGGElement | null>>({ anel: null, colar: null, pulseira: null })
  const prongRefs = useRef<(SVGGElement | null)[]>([])
  const sweepRef = useRef<SVGRectElement>(null)
  const stampRef = useRef<SVGGElement>(null)

  const gemaRef = useRef(gema)
  const pecaRef = useRef(peca)
  gemaRef.current = gema
  pecaRef.current = peca

  // Animação de construção: dispara uma única vez, quando o componente
  // entra na tela — a mesma forma bruta vira faceta, vira engaste, vira
  // peça certificada, num único timeline contínuo.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const guides = guideRefs.current.filter((g): g is SVGLineElement => g !== null)
    const radiating = radiatingRefs.current.filter((g): g is SVGLineElement => g !== null)
    const prongEls = prongRefs.current.filter((g): g is SVGGElement => g !== null)
    const activeWire = wireRefs.current[pecaRef.current.id]

    if (!mm.matches) {
      // Estado final completo, sem animação: peça pronta, facetada,
      // engastada e certificada — nunca "presa" no meio da transformação.
      gsap.set(roughRef.current, { opacity: 0 })
      gsap.set(tickGroupRef.current, { opacity: 0 })
      gsap.set(guides, { opacity: 0 })
      gsap.set(facetGroupRef.current, { opacity: 1 })
      gsap.set([outerOctRef.current, tableOctRef.current, ...radiating], { strokeDashoffset: 0 })
      gsap.set(Object.values(wireRefs.current).filter(Boolean), { opacity: 0 })
      gsap.set(activeWire, { opacity: 1, strokeDashoffset: 0 })
      gsap.set(prongEls, { x: 0, y: 0 })
      gsap.set(sweepRef.current, { opacity: 0 })
      gsap.set(stampRef.current, { opacity: 1, scale: 1, transformOrigin: '50% 50%' })
      return
    }

    // estado inicial: só a pedra bruta existe
    gsap.set(tickGroupRef.current, { opacity: 0 })
    gsap.set(facetGroupRef.current, { opacity: 0 })
    gsap.set(Object.values(wireRefs.current).filter(Boolean), { opacity: 0 })
    gsap.set(sweepRef.current, { opacity: 0 })
    gsap.set(stampRef.current, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' })
    prongEls.forEach((el, i) => {
      const [dx, dy] = prongs[i].dir
      gsap.set(el, { x: 26 * dx, y: 26 * dy })
    })

    const tl = gsap.timeline({ paused: true })

    // a) forma bruta se desenha
    drawIn(roughRef.current, tl, 0, 1.1)

    // b) linhas de construção varrem a pedra + marcação de medida
    tl.addLabel('construir', 0.95)
    guides.forEach((el, i) => drawIn(el, tl, `construir+=${i * 0.1}`, 0.55))
    tl.to(tickGroupRef.current, { opacity: 1, duration: 0.4 }, 'construir+=0.3')

    // c) o momento da transformação: a pedra bruta esmaece enquanto a
    // faceta nasce no mesmo centro — as linhas de construção (b) já
    // terminam exatamente onde as linhas de faceta começam, então
    // continuam a mesma linha em vez de trocar de desenho.
    tl.addLabel('transformar', 1.95)
    tl.to(roughRef.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 'transformar')
    tl.to(tickGroupRef.current, { opacity: 0, duration: 0.5 }, 'transformar')
    tl.to(facetGroupRef.current, { opacity: 1, duration: 0.9, ease: 'power2.inOut' }, 'transformar')
    drawIn(outerOctRef.current, tl, 'transformar', 0.8)
    drawIn(tableOctRef.current, tl, 'transformar+=0.15', 0.6)
    radiating.forEach((el, i) => drawIn(el, tl, `transformar+=${0.05 * i}`, 0.5))

    // d) engaste: silhueta da peça + garras fecham sobre a pedra
    tl.addLabel('engastar', 3.05)
    if (activeWire) {
      const shapes = Array.from(activeWire.querySelectorAll('path, ellipse')) as SVGGeometryElement[]
      shapes.forEach((el, i) => drawIn(el, tl, `engastar+=${i * 0.1}`, 0.7))
      tl.to(activeWire, { opacity: 1, duration: 0.4 }, 'engastar')
    }
    prongEls.forEach((el, i) => {
      tl.to(el, { x: 0, y: 0, duration: 0.55, ease: 'power3.out' }, `engastar+=${0.3 + i * 0.08}`)
    })

    // e) certificação: um único brilho cruza a pedra, depois o selo assenta
    tl.addLabel('certificar', 4.15)
    tl.fromTo(sweepRef.current, { x: -230, opacity: 0 }, { x: -30, opacity: 0.55, duration: 0.3, ease: 'power1.in' }, 'certificar')
    tl.to(sweepRef.current, { x: 230, opacity: 0, duration: 0.35, ease: 'power1.out' }, 'certificar+=0.3')
    tl.fromTo(
      stampRef.current,
      { opacity: 0, scale: 0.4 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' },
      'certificar+=0.55',
    )

    let disparado = false
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && !disparado) {
            disparado = true
            tl.play()
            observer.disconnect()
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(svg)
    return () => {
      observer.disconnect()
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Troca de peça depois da construção inicial: crossfade curto entre as
  // silhuetas, sem repetir a animação inteira.
  const primeiraRenderPeca = useRef(true)
  useEffect(() => {
    if (primeiraRenderPeca.current) {
      primeiraRenderPeca.current = false
      return
    }
    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    for (const id of Object.keys(wireRefs.current) as Peca['id'][]) {
      const el = wireRefs.current[id]
      if (!el) continue
      const alvo = id === peca.id ? 1 : 0
      if (mm.matches) gsap.to(el, { opacity: alvo, duration: 0.35, ease: 'power2.out' })
      else gsap.set(el, { opacity: alvo })
    }
  }, [peca.id])

  const fogo = fogoCount(gema.dispersao)

  return (
    <div className="relative h-full w-full overflow-hidden bg-carvao">
      <svg
        ref={svgRef}
        viewBox="0 0 400 460"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Animação de uma pedra bruta se transformando, num único traço contínuo, em uma gema lapidada, engastada e certificada."
      >
        <defs>
          <pattern id="grade-joia" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-fio)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <clipPath id="clip-gema">
            <polygon points={outerPtsStr} />
          </clipPath>
        </defs>

        <rect x="0" y="0" width="400" height="460" fill="url(#grade-joia)" />

        {/* a) forma bruta */}
        <polygon ref={roughRef} points={roughPointsStr} fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" strokeLinejoin="round" />

        {/* b) linhas de construção — terminam exatamente nos vértices da
            girdle (R_OUTER), onde as linhas de faceta (c) começam */}
        <g>
          {guideLines.map((l, i) => (
            <line
              key={l.angle}
              ref={(node) => {
                guideRefs.current[i] = node
              }}
              x1={l.from[0]}
              y1={l.from[1]}
              x2={l.to[0]}
              y2={l.to[1]}
              stroke="var(--color-acento)"
              strokeWidth="1.25"
            />
          ))}
        </g>
        <g ref={tickGroupRef}>
          <line x1={pt(0, R_GUIDE)[0]} y1={224} x2={pt(0, R_GUIDE)[0]} y2={236} stroke="var(--color-acento)" strokeWidth="1" />
          <line x1={pt(180, R_GUIDE)[0]} y1={224} x2={pt(180, R_GUIDE)[0]} y2={236} stroke="var(--color-acento)" strokeWidth="1" />
          <line x1={pt(180, R_GUIDE)[0]} y1={230} x2={pt(0, R_GUIDE)[0]} y2={230} stroke="var(--color-acento)" strokeWidth="0.75" opacity="0.6" />
          <text x={CX} y={214} textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fill="var(--color-acento)">
            Ø 24,6mm
          </text>
        </g>

        {/* c) faceta — nasce no mesmo centro da pedra bruta */}
        <g ref={facetGroupRef}>
          <polygon
            ref={outerOctRef}
            points={outerPtsStr}
            fill={gema.cor}
            fillOpacity={0.16}
            stroke={gema.cor}
            strokeWidth="1.75"
            style={{ transition: 'fill 400ms ease, stroke 400ms ease' }}
          />
          <polygon
            ref={tableOctRef}
            points={tablePtsStr}
            fill={gema.cor}
            fillOpacity={0.4}
            stroke="var(--color-marfim)"
            strokeWidth="1.25"
            style={{ transition: 'fill 400ms ease' }}
          />
          {radiatingLines.map((l, i) => (
            <line
              key={l.angle}
              ref={(node) => {
                radiatingRefs.current[i] = node
              }}
              x1={l.from[0]}
              y1={l.from[1]}
              x2={l.to[0]}
              y2={l.to[1]}
              stroke={gema.cor}
              strokeWidth={i < fogo ? 2 : 1.1}
              opacity={i < fogo ? 0.95 : 0.45}
              style={{ transition: 'stroke 400ms ease, opacity 400ms ease, stroke-width 400ms ease' }}
            />
          ))}
        </g>

        {/* d) silhuetas de engaste — só a da peça selecionada fica visível */}
        <g
          ref={(node) => {
            wireRefs.current.anel = node
          }}
        >
          <path d={SILHUETAS.anel} fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" />
        </g>
        <g
          ref={(node) => {
            wireRefs.current.colar = node
          }}
        >
          <path d={SILHUETAS.colar} fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" />
        </g>
        <g
          ref={(node) => {
            wireRefs.current.pulseira = node
          }}
        >
          <ellipse cx={CX} cy={CY} rx="150" ry="112" fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" />
        </g>

        {/* garras fechando sobre a pedra */}
        {prongs.map((p, i) => (
          <g
            key={p.angle}
            ref={(node) => {
              prongRefs.current[i] = node
            }}
          >
            <polygon
              points={`${fmt(p.tip)} ${fmt(p.p1)} ${fmt(p.p2)}`}
              fill="var(--color-marfim)"
              opacity="0.92"
            />
          </g>
        ))}

        {/* e) brilho único de certificação, recortado no contorno da faceta */}
        <rect
          ref={sweepRef}
          x="-20"
          y="100"
          width="34"
          height="260"
          fill="var(--color-marfim)"
          clipPath="url(#clip-gema)"
          transform={`rotate(18 ${CX} ${CY})`}
        />

        {/* selo de certificação */}
        <g ref={stampRef} transform="translate(340,412)">
          <circle cx="0" cy="0" r="22" fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" />
          <path d="M -8 0 L -2 6 L 10 -8" fill="none" stroke="var(--color-acento)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  )
}
