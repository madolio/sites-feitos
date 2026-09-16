import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import Gema from './Gema'
import type { Gema as GemaTipo } from '../data/gemas'

export default function Vitrine({ gema, girando }: { gema: GemaTipo; girando: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <spotLight position={[4, 5, 5]} intensity={2.2} angle={0.4} penumbra={0.6} />
      <spotLight position={[-4, -2, 3]} intensity={1.1} color={gema.cor} angle={0.5} penumbra={1} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Float speed={girando ? 1.2 : 0} rotationIntensity={girando ? 0.3 : 0} floatIntensity={girando ? 0.6 : 0}>
          <Gema gema={gema} girando={girando} />
        </Float>
      </Suspense>
    </Canvas>
  )
}
