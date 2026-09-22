// Adaptado de bruma/src/components/ContainerScroll.tsx (o motor genérico
// preservado lá — ver bruma/CLAUDE.md, "ContainerScroll: preservado sem
// uso"), que por sua vez vem do padrão "Container Scroll Animation" da
// Aceternity. Cada projeto do portfólio é standalone: este arquivo é uma
// cópia adaptada, não um import cruzado entre pastas.
//
// Motivo do reuso aqui (Zênite, observatório/turismo astronômico): a OCULAR
// de um telescópio é literalmente uma moldura circular que começa desfocada
// e vai ganhando nitidez conforme se gira a roda de foco — o gesto físico é
// quase o mesmo movimento que este componente já anima via `rotateX`/scale
// ligado ao scroll. Por isso a moldura retangular original virou um círculo
// (ver `Card`), e o `titleComponent` fica com o texto que descreve o gesto
// de focar. Ver zenite/CLAUDE.md, seção "ContainerScroll reaproveitado".
//
// Três pendências documentadas no arquivo original foram resolvidas aqui:
// 1. `prefers-reduced-motion`: com `useReducedMotion()` do framer-motion,
//    a moldura renderiza direto no estado final (reta, no zoom final, título
//    sem parallax) e nem assina `useScroll` de verdade pro efeito.
// 2. Altura da seção em mobile: reduzida de h-[60rem]/[80rem] pra
//    h-[46rem]/[72rem] — ainda dá espaço pro scroll "girar a roda de foco",
//    mas sem tanto vazio abaixo do card em telas pequenas.
// 3. Moldura circular (`rounded-full`) com bezel de latão, testada com
//    conteúdo curto e centralizado (ver Foco.tsx) pra continuar legível
//    dentro do círculo, inclusive em 375–390px.
import { useRef, type ReactNode } from 'react'
import { useScroll, useTransform, useReducedMotion, motion, type MotionValue } from 'framer-motion'

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef })

  const rotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [22, 0])
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.82, 1])
  const blur = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [6, 0])
  const translate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -60])

  return (
    <div
      className="relative flex h-[46rem] items-center justify-center p-2 md:h-[72rem] md:p-20"
      ref={containerRef}
    >
      <div className="relative w-full py-6 md:py-32" style={{ perspective: '1200px' }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale} blur={blur}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({ translate, children }: { translate: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-2xl text-center">
      {children}
    </motion.div>
  )
}

function Card({
  rotate,
  scale,
  blur,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  blur: MotionValue<number>
  children: ReactNode
}) {
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 30px 40px #00000042, 0 70px 60px #00000026, 0 0 80px 6px #7fd9a01a',
      }}
      className="relative mx-auto aspect-square w-[19rem] rounded-full border-[10px] border-latao bg-cupula-alta p-2 sm:w-[24rem] md:w-[34rem] md:border-[14px] md:p-3"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-2px] rounded-full ring-2 ring-noturno/60"
      />
      <motion.div
        style={{ filter }}
        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-noturno"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
