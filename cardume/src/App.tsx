import { lazy, Suspense, useEffect } from 'react'
import DemoDialog from './components/DemoDialog'
import Fundo from './components/Fundo'
import { Curiosidades, ListaCursos, Superficie, TELAS } from './components/Pranchetas'
import Profundimetro from './components/Profundimetro'
import Visor from './components/Visor'
import { hexDaAgua } from './cores'
import { mergulho, profundidadeDoScroll } from './estado'

// three.js e a cena inteira ficam num pedaço separado do bundle; enquanto
// carrega (ou se não houver WebGL), o fundo CSS já muda de cor com a
// profundidade.
const Oceano = lazy(() => import('./cena/Oceano'))

export default function App() {
  useMotor()

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Oceano />
        </Suspense>
      </div>

      <main className="relative z-10" style={{ height: `${TELAS * 100}vh` }}>
        <Superficie />
        <Curiosidades />
        <ListaCursos />
        <Fundo />
      </main>

      <Visor />
      <Profundimetro />
      <DemoDialog />
    </>
  )
}

// O motor do mergulho: a cada quadro, converte o scroll em profundidade
// (com inércia — a água "freia" a descida), mede a velocidade vertical pro
// visor e acompanha o ponteiro (que vira a lanterna lá embaixo).
function useMotor() {
  useEffect(() => {
    let raf = 0
    let antes = performance.now()
    let ultimaCor = -1

    const tick = (agora: number) => {
      const dt = Math.min(0.1, (agora - antes) / 1000)
      antes = agora
      mergulho.alvo = profundidadeDoScroll()
      const anterior = mergulho.atual
      mergulho.atual += (mergulho.alvo - mergulho.atual) * (1 - Math.exp(-dt * 3.2))
      const v = dt > 0 ? (mergulho.atual - anterior) / dt : 0
      mergulho.velocidade += (v - mergulho.velocidade) * 0.12

      // o fundo CSS só é visto antes do 3D carregar — não precisa mudar a
      // cada quadro (mexer numa variável do :root recalcula o estilo da
      // página inteira)
      if (Math.abs(mergulho.atual - ultimaCor) > 0.25) {
        ultimaCor = mergulho.atual
        document.documentElement.style.setProperty('--agua', hexDaAgua(mergulho.atual))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const ponteiro = (e: PointerEvent) => {
      mergulho.ponteiro.x = (e.clientX / window.innerWidth) * 2 - 1
      mergulho.ponteiro.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', ponteiro, { passive: true })
    window.addEventListener('pointerdown', ponteiro, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', ponteiro)
      window.removeEventListener('pointerdown', ponteiro)
    }
  }, [])
}
