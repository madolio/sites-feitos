import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { Gema } from '../data/gemas'
import type { Peca } from '../data/pecas'

// Cada peça posiciona a MESMA gema (facetada a partir da MESMA pedra bruta)
// num lugar diferente da composição — é isso que faz o anel parecer anel,
// o colar parecer colar e a pulseira parecer pulseira, em vez de três
// variações do mesmo octógono centralizado.
type GemaLayout = { cx: number; cy: number; outerR: number; tableR: number }

const GEM_LAYOUTS: Record<Peca['id'], GemaLayout> = {
  anel: { cx: 200, cy: 205, outerR: 30, tableR: 13 },
  colar: { cx: 200, cy: 284, outerR: 26, tableR: 11 },
  pulseira: { cx: 200, cy: 152, outerR: 34, tableR: 15 },
}

const OCT_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
const GUIDE_ANGLES = [0, 90, 180, 270]
const PRONG_ANGLES = [45, 135, 225, 315]

// Raios da pedra bruta num octógono de referência com outerR=80 — pra
// qualquer peça, esses raios são escalados proporcionalmente ao tamanho
// real da gema daquela peça, mantendo a mesma silhueta irregular.
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
const ROUGH_BASE_R = 80

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}
function ptAt(cx: number, cy: number, angleDeg: number, r: number): [number, number] {
  const a = toRad(angleDeg)
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}
function fmt([x, y]: [number, number]) {
  return `${x.toFixed(2)},${y.toFixed(2)}`
}

function buildGem(layout: GemaLayout) {
  const { cx, cy, outerR, tableR } = layout
  const scale = outerR / ROUGH_BASE_R
  const guideR = outerR + 40

  const outerPts = OCT_ANGLES.map((a) => ptAt(cx, cy, a, outerR))
  const tablePts = OCT_ANGLES.map((a) => ptAt(cx, cy, a, tableR))
  const roughPoints = ROUGH_ANGLES_RADII.map(([a, r]) => ptAt(cx, cy, a, r * scale))

  const guideLines = GUIDE_ANGLES.map((a) => ({
    angle: a,
    from: ptAt(cx, cy, a, guideR),
    to: ptAt(cx, cy, a, outerR),
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
    const off = 20 * scale
    const w = 6 * scale
    const base: [number, number] = [vx + off * dir[0], vy + off * dir[1]]
    const p1: [number, number] = [base[0] + w * perp[0], base[1] + w * perp[1]]
    const p2: [number, number] = [base[0] - w * perp[0], base[1] - w * perp[1]]
    return { angle: a, tip: [vx, vy] as [number, number], p1, p2, dir }
  })

  return {
    cx,
    cy,
    outerR,
    outerPts,
    tablePts,
    outerPtsStr: outerPts.map(fmt).join(' '),
    tablePtsStr: tablePts.map(fmt).join(' '),
    roughPointsStr: roughPoints.map(fmt).join(' '),
    guideLines,
    radiatingLines,
    prongs,
    guideR,
  }
}

// Corrente do colar: curva suave entre dois pontos de ancoragem (que
// seguem, implicitamente, fora do canvas) até o ponto mais baixo, onde o
// pingente é pendurado. Os "elos" são círculos pequenos plotados ao longo
// dessa mesma curva.
const CHAIN_PATH = 'M 70,40 Q 140,230 200,258 Q 260,230 330,40'
const CHAIN_LINKS: [number, number][] = [
  [92, 66],
  [122, 138],
  [156, 202],
  [244, 202],
  [278, 138],
  [308, 66],
]

// Arco do topo da pulseira, onde o traço do aro "engorda" atrás da gema
// pra parecer que a pedra está encravada no próprio metal, não pousada
// por cima dele.
const BANGLE_WIDEN_ARC = 'M 155.6,156.6 A 105,92 0 0 1 244.4,156.6'

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
  const pieceGroupRef = useRef<SVGGElement>(null)
  const sweepRef = useRef<SVGRectElement>(null)
  const stampRef = useRef<SVGGElement>(null)

  // A geometria exibida (posição/tamanho da gema, qual silhueta) só troca
  // depois do crossfade — assim nunca se vê a peça "pulando" de lugar.
  const [displayPecaId, setDisplayPecaId] = useState<Peca['id']>(peca.id)
  const layout = GEM_LAYOUTS[displayPecaId]
  const gem = buildGem(layout)

  const gemaRef = useRef(gema)
  const pecaRef = useRef(peca)
  gemaRef.current = gema
  pecaRef.current = peca

  // Animação de construção: dispara uma única vez, quando o componente
  // entra na tela — a pedra bruta se transforma na gema facetada JÁ NA
  // POSIÇÃO FINAL dela sobre a peça selecionada, depois o aro/corrente se
  // desenha ao redor e as garras fecham por cima.
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
      // engastada e certificada — nunca "presa" no meio da transformação,
      // e sem nenhuma forma de construção sobrando na tela.
      gsap.set(roughRef.current, { opacity: 0 })
      gsap.set(tickGroupRef.current, { opacity: 0 })
      gsap.set(guides, { opacity: 0 })
      gsap.set(facetGroupRef.current, { opacity: 1 })
      gsap.set([outerOctRef.current, tableOctRef.current, ...radiating], { strokeDashoffset: 0 })
      gsap.set(Object.values(wireRefs.current).filter(Boolean), { opacity: 0 })
      gsap.set(activeWire, { opacity: 1 })
      if (activeWire) {
        const shapes = Array.from(activeWire.querySelectorAll('path, ellipse')) as SVGGeometryElement[]
        gsap.set(shapes, { strokeDashoffset: 0 })
      }
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
      const [dx, dy] = gem.prongs[i].dir
      gsap.set(el, { x: 26 * dx, y: 26 * dy })
    })

    const tl = gsap.timeline({ paused: true })

    // a) forma bruta se desenha, já no lugar onde a gema final vai ficar
    drawIn(roughRef.current, tl, 0, 1.1)

    // b) linhas de construção varrem a pedra + marcação de medida
    tl.addLabel('construir', 0.95)
    guides.forEach((el, i) => drawIn(el, tl, `construir+=${i * 0.1}`, 0.55))
    tl.to(tickGroupRef.current, { opacity: 1, duration: 0.4 }, 'construir+=0.3')

    // c) transformação: a pedra bruta esmaece enquanto a faceta nasce no
    // mesmo centro (mesmo ponto onde a peça vai posicionar a gema)
    tl.addLabel('transformar', 1.95)
    tl.to(roughRef.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, 'transformar')
    tl.to(tickGroupRef.current, { opacity: 0, duration: 0.5 }, 'transformar')
    tl.to(guides, { opacity: 0, duration: 0.5 }, 'transformar')
    tl.to(facetGroupRef.current, { opacity: 1, duration: 0.9, ease: 'power2.inOut' }, 'transformar')
    drawIn(outerOctRef.current, tl, 'transformar', 0.8)
    drawIn(tableOctRef.current, tl, 'transformar+=0.15', 0.6)
    radiating.forEach((el, i) => drawIn(el, tl, `transformar+=${0.05 * i}`, 0.5))

    // d) engaste: aro/corrente da peça se desenha ao redor da gema já
    // posicionada, e as garras (só o anel tem) fecham por cima
    tl.addLabel('engastar', 3.05)
    if (activeWire) {
      // Traços abertos (aro sobe / cesto / corrente) desenham com o
      // efeito de dash-reveal. Elipses fechadas (aro/bangle) NÃO usam esse
      // efeito — um dasharray igual ao perímetro inteiro de uma forma
      // fechada deixa uma costura (hairline) visível no ponto onde o
      // traço começa/termina; em vez disso elas só crescem/aparecem.
      const paths = Array.from(activeWire.querySelectorAll('path')) as SVGGeometryElement[]
      const ellipses = Array.from(activeWire.querySelectorAll('ellipse')) as SVGGeometryElement[]
      paths.forEach((el, i) => drawIn(el, tl, `engastar+=${i * 0.1}`, 0.7))
      if (ellipses.length) {
        gsap.set(ellipses, { scale: 0.85, transformOrigin: '50% 50%' })
        tl.to(ellipses, { scale: 1, duration: 0.6, ease: 'power2.out' }, 'engastar')
      }
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

  // Troca de peça depois da construção inicial: crossfade curto — some a
  // gema+engaste antigos, troca a geometria (posição/tamanho da gema e
  // qual aro/corrente), depois some a nova peça já pronta no lugar certo.
  const primeiraRenderPeca = useRef(true)
  useEffect(() => {
    if (primeiraRenderPeca.current) {
      primeiraRenderPeca.current = false
      return
    }
    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) {
      setDisplayPecaId(peca.id)
      return
    }
    const group = pieceGroupRef.current
    if (!group) {
      setDisplayPecaId(peca.id)
      return
    }
    gsap.to(group, {
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => setDisplayPecaId(peca.id),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peca.id])

  // Depois que a geometria da nova peça está no DOM, revela com um fade in.
  const primeiraRenderDisplay = useRef(true)
  useEffect(() => {
    if (primeiraRenderDisplay.current) {
      primeiraRenderDisplay.current = false
      return
    }
    const group = pieceGroupRef.current
    if (!group) return
    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (mm.matches) gsap.fromTo(group, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    else gsap.set(group, { opacity: 1 })
  }, [displayPecaId])

  // O aro/corrente/pulseira de CADA peça fica sempre no DOM (pra poder
  // fazer crossfade entre elas); sem isto, só o wire que estava visível no
  // primeiro carregamento nunca escondia de novo ao trocar de peça — a
  // troca reposicionava a gema, mas o aro do anel continuava por baixo do
  // colar/pulseira selecionado. Pula a primeira renderização: nela, quem
  // decide a opacidade inicial de cada wire é o timeline de construção (ou
  // o estado final do modo reduced-motion), não este efeito — senão o aro
  // apareceria de imediato, antes da fase "engastar" da animação.
  const primeiraRenderWire = useRef(true)
  useEffect(() => {
    if (primeiraRenderWire.current) {
      primeiraRenderWire.current = false
      return
    }
    for (const id of Object.keys(wireRefs.current) as Peca['id'][]) {
      const el = wireRefs.current[id]
      if (!el) continue
      gsap.set(el, { opacity: id === displayPecaId ? 1 : 0 })
    }
  }, [displayPecaId])

  const fogo = fogoCount(gema.dispersao)
  const isAnel = displayPecaId === 'anel'

  return (
    <div className="relative h-full w-full overflow-hidden bg-carvao">
      <svg
        ref={svgRef}
        viewBox="0 0 400 460"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Animação de uma pedra bruta se transformando, num único traço contínuo, em uma gema lapidada, engastada numa joia."
      >
        <defs>
          <pattern id="grade-joia" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-fio)" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <clipPath id="clip-gema">
            <polygon points={gem.outerPtsStr} />
          </clipPath>
        </defs>

        <rect x="0" y="0" width="400" height="460" fill="url(#grade-joia)" />

        <g ref={pieceGroupRef}>
          {/* a) forma bruta */}
          <polygon ref={roughRef} points={gem.roughPointsStr} fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" strokeLinejoin="round" />

          {/* b) linhas de construção — curtas, coladas na gema (não
              atravessam o canvas inteiro) e somem antes do estado final */}
          <g>
            {gem.guideLines.map((l, i) => (
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
                opacity="0.75"
              />
            ))}
          </g>
          <g ref={tickGroupRef}>
            <text x={gem.cx} y={gem.cy - gem.guideR - 8} textAnchor="middle" fontFamily="var(--font-display)" fontSize="10" fill="var(--color-acento)">
              Ø {(gem.outerR * 0.82).toFixed(1)}mm
            </text>
          </g>

          {/* aro/corrente — desenhado ATRÁS da gema, pra ficar por baixo
              dela (a pedra pousa/encrava sobre o metal, não flutua na
              frente dele) */}
          <g
            ref={(node) => {
              wireRefs.current.anel = node
            }}
          >
            <ellipse cx="200" cy="330" rx="72" ry="26" fill="none" stroke="var(--color-marfim)" strokeWidth="20" />
            <path d="M 178,298 L 189,236" fill="none" stroke="var(--color-marfim)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 222,298 L 211,236" fill="none" stroke="var(--color-marfim)" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g
            ref={(node) => {
              wireRefs.current.colar = node
            }}
          >
            <path d={CHAIN_PATH} fill="none" stroke="var(--color-marfim)" strokeWidth="2" strokeLinecap="round" />
            {CHAIN_LINKS.map(([lx, ly]) => (
              <circle key={`${lx}-${ly}`} cx={lx} cy={ly} r="3" fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" />
            ))}
            <circle cx="200" cy="256" r="6" fill="none" stroke="var(--color-marfim)" strokeWidth="2" />
          </g>
          <g
            ref={(node) => {
              wireRefs.current.pulseira = node
            }}
          >
            <ellipse cx="200" cy="240" rx="105" ry="92" fill="none" stroke="var(--color-marfim)" strokeWidth="16" />
            <path d={BANGLE_WIDEN_ARC} fill="none" stroke="var(--color-marfim)" strokeWidth="34" strokeLinecap="round" />
          </g>

          {/* c) faceta — nasce no mesmo ponto onde a pedra bruta estava,
              já na posição final sobre a peça selecionada */}
          <g ref={facetGroupRef}>
            <polygon
              points={gem.outerPtsStr}
              ref={outerOctRef}
              fill={gema.cor}
              fillOpacity={0.16}
              stroke={gema.cor}
              strokeWidth="1.75"
              style={{ transition: 'fill 400ms ease, stroke 400ms ease' }}
            />
            <polygon
              points={gem.tablePtsStr}
              ref={tableOctRef}
              fill={gema.cor}
              fillOpacity={0.4}
              stroke="var(--color-marfim)"
              strokeWidth="1.25"
              style={{ transition: 'fill 400ms ease' }}
            />
            {gem.radiatingLines.map((l, i) => (
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

          {/* garras — só o anel tem; fecham por cima da gema, tocando o
              cesto que sobe do aro */}
          {isAnel &&
            gem.prongs.map((p, i) => (
              <g
                key={p.angle}
                ref={(node) => {
                  prongRefs.current[i] = node
                }}
              >
                <polygon points={`${fmt(p.tip)} ${fmt(p.p1)} ${fmt(p.p2)}`} fill="var(--color-marfim)" opacity="0.92" />
              </g>
            ))}

          {/* e) brilho único de certificação, recortado no contorno da faceta */}
          <rect
            ref={sweepRef}
            x={gem.cx - 220}
            y={gem.cy - 130}
            width="34"
            height="260"
            fill="var(--color-marfim)"
            clipPath="url(#clip-gema)"
            transform={`rotate(18 ${gem.cx} ${gem.cy})`}
          />
        </g>

        {/* selo de certificação — fixo no canto, fora do grupo que faz
            crossfade ao trocar de peça */}
        <g ref={stampRef} transform="translate(340,412)">
          <circle cx="0" cy="0" r="22" fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" />
          <path d="M -8 0 L -2 6 L 10 -8" fill="none" stroke="var(--color-acento)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  )
}
