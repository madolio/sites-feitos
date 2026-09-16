import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import type { Mesh } from 'three'
import type { Gema as GemaTipo } from '../data/gemas'

// Lapidação "brilhante" simplificada: um octaedro (8 faces) captura a
// geometria essencial de facetas de coroa + pavilhão sem o custo de uma
// malha de lapidação real com 50+ facetas — o ponto aqui é a física da
// luz atravessando o material, não a geometria de corte exata.
export default function Gema({ gema, girando }: { gema: GemaTipo; girando: boolean }) {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current || !girando) return
    ref.current.rotation.y += delta * 0.35
    ref.current.rotation.x = Math.sin(Date.now() / 4000) * 0.15
  })

  return (
    <mesh ref={ref} scale={1.6}>
      <octahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        // ior real da pedra escolhida — quanto maior, mais a luz se dobra
        // ao entrar/sair da gema, e mais "viva" a peça parece girando.
        ior={gema.ior}
        thickness={1.4}
        chromaticAberration={gema.dispersao * 6}
        color={gema.cor}
        roughness={0.03}
        transmission={1}
        anisotropy={0.2}
        distortion={0.1}
        distortionScale={0.3}
        temporalDistortion={0.05}
        clearcoat={1}
        attenuationDistance={0.4}
        attenuationColor={gema.cor}
        envMapIntensity={1.4}
      />
    </mesh>
  )
}
