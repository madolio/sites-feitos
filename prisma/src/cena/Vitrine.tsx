import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Joia from './Joia'
import type { Gema as GemaTipo } from '../data/gemas'
import type { Peca } from '../data/pecas'

export default function Vitrine({ peca, gema }: { peca: Peca; gema: GemaTipo }) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 6.2], fov: 28 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[4, 5, 5]} intensity={2.4} angle={0.4} penumbra={0.6} />
      <spotLight position={[-4, -2, 3]} intensity={1.1} color={gema.cor} angle={0.5} penumbra={1} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Joia peca={peca} gema={gema} girando={false} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.4}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
    </Canvas>
  )
}
