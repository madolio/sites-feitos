import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import type { Mesh } from 'three'
import type { Gema as GemaTipo } from '../data/gemas'

// Lapidação "brilhante" simplificada: um octaedro (8 faces) captura a
// geometria essencial de facetas de coroa + pavilhão sem o custo de uma
// malha de lapidação real com 50+ facetas — o ponto aqui é a física da
// luz atravessando o material, não a geometria de corte exata.
// `escala` deixa a mesma pedra servir de solitário grande (colar) ou de
// pedra pequena encastoada (anel/brincos) sem duplicar o componente.
export default function Gema({
  gema,
  girando = false,
  escala = 1,
  posicao = [0, 0, 0],
}: {
  gema: GemaTipo
  girando?: boolean
  escala?: number
  posicao?: [number, number, number]
}) {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current || !girando) return
    ref.current.rotation.y += delta * 0.35
  })

  return (
    <mesh ref={ref} scale={escala} position={posicao}>
      <octahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        // ior real da pedra escolhida — quanto maior, mais a luz se dobra
        // ao entrar/sair da gema, e mais "viva" a peça parece girando.
        // attenuationDistance MAIOR que thickness é o que faz a pedra
        // parecer clara e brilhante — antes estava menor (0.4 < 1.4),
        // e pela lei de Beer-Lambert isso absorve praticamente toda a luz
        // que atravessa, deixando a gema com cara de pedra preta opaca.
        ior={gema.ior}
        thickness={0.7}
        chromaticAberration={gema.dispersao * 8}
        color={gema.cor}
        roughness={0.02}
        transmission={1}
        anisotropy={0.15}
        distortion={0.06}
        distortionScale={0.2}
        temporalDistortion={0.03}
        clearcoat={1}
        attenuationDistance={1.1}
        attenuationColor={gema.cor}
        envMapIntensity={2.4}
      />
    </mesh>
  )
}
