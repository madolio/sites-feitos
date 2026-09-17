import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Joia from './Joia'
import type { Gema as GemaTipo } from '../data/gemas'
import type { Peca } from '../data/pecas'

// Espelha o guard de prefers-reduced-motion usado em Reveal.tsx (lá via
// gsap.matchMedia): aqui a auto-rotação da câmera é um prop simples do
// OrbitControls, então checamos a media query direto.
function usePrefereMovimentoReduzido() {
  return useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
}

export default function Vitrine({ peca, gema }: { peca: Peca; gema: GemaTipo }) {
  const movimentoReduzido = usePrefereMovimentoReduzido()

  return (
    <Canvas
      camera={{ position: [0, 0.1, 6.2], fov: 28 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <spotLight position={[4, 5, 5]} intensity={3.5} angle={0.4} penumbra={0.6} />
      <spotLight position={[-4, -2, 3]} intensity={1.8} color={gema.cor} angle={0.5} penumbra={1} />
      <spotLight position={[0, 3, -4]} intensity={2} angle={0.6} penumbra={0.8} />
      <pointLight position={[0, 0, 4]} intensity={1.2} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Joia peca={peca} gema={gema} girando={false} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!movimentoReduzido}
        autoRotateSpeed={1.4}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
    </Canvas>
  )
}
