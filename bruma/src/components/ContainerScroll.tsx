// Adaptado do componente "Container Scroll Animation" (padrão Aceternity) —
// trocado apenas next/image por <img> normal e removido "use client", que
// não existe fora do Next.js App Router. O resto (framer-motion puro) veio
// direto: dá o efeito de "cartão 3D se endireitando" conforme rola a página.
//
// PRESERVADO SEM USO no momento: a Bruma removeu o wrapper que usava este
// componente (era `Vitrine.tsx` — um frasco genérico + bolhas animadas
// dentro do card, competindo com a cena de processo; ver histórico do
// commit "Consolidate bruma into one perfume scene, remove second 21st.dev
// effect", 22/09/2026). Esse conteúdo (frasco/bolhas/textos de perfume)
// era específico da Bruma e foi removido de vez — NÃO faz parte do motor
// reutilizável e não deve ser resgatado. O motor genérico é só isto aqui:
// moldura com perspectiva que começa inclinada e se endireita conforme o
// scroll, recebendo `titleComponent` e `children` — sem qualquer
// dependência do conteúdo específico da Bruma.
//
// REGRA PARA REUSO FUTURO: não reaproveitar só pra aproveitar código.
// Antes de aplicar em outro projeto do portfólio, confirmar que existe um
// momento natural de "revelar uma tela/produto/objeto dentro de uma
// moldura durante o scroll" — e que isso acrescenta significado à
// experiência daquele projeto específico, não só tecnicamente encaixa.
// Sem essa justificativa conceitual, não usar.
//
// Em 22/09/2026 nenhum candidato óbvio (torre, rota, razão, torque, derme,
// madolio-admin) se qualificou: todos já são dashboards/produtos completos
// onde a própria página inteira É o produto (sidebar + conteúdo full-bleed
// ou Layout/Home ocupando a tela toda), não uma landing page com uma
// captura de tela pra emoldurar. Enfiar esses projetos inteiros dentro
// deste card giraria numa "tela dentro de outra tela" sem sentido — não
// fazer isso só pra encaixar o efeito. Analisar de novo caso a caso quando
// surgir um projeto novo: (1) identidade visual existente, (2) conceito/
// narrativa da página, (3) se o efeito soma significado, (4) só então
// reutilizar.
//
// Pendências a considerar quando for de fato reutilizado:
// - `prefers-reduced-motion`: hoje este componente não trata (framer-motion
//   tem `useReducedMotion()` pronto pra isso — não implementado ainda).
// - Responsividade real além do `isMobile` binário atual.
// - Evitar seção excessivamente alta (`h-[60rem] md:h-[80rem]`) só pra
//   sustentar a animação — em mobile isso é bastante scroll vazio.
import { useRef, useState, useEffect, type ReactNode } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scaleDimensions = (): [number, number] => (isMobile ? [0.7, 0.9] : [1.05, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
      ref={containerRef}
    >
      <div className="relative w-full py-10 md:py-40" style={{ perspective: '1000px' }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({ translate, children }: { translate: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-3xl text-center">
      {children}
    </motion.div>
  )
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-fio bg-carvao p-2 shadow-2xl md:h-[40rem] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-noite md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  )
}
