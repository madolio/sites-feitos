import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import Gema from './Gema'
import type { Gema as GemaTipo } from '../data/gemas'
import type { Peca } from '../data/pecas'

const OURO = { color: '#d9b45c', metalness: 1, roughness: 0.28 } as const

function Anel({ gema }: { gema: GemaTipo }) {
  return (
    <group>
      {/* aro visto de frente, como numa foto de joalheria — não de cima */}
      <mesh>
        <torusGeometry args={[0.9, 0.09, 24, 100]} />
        <meshStandardMaterial {...OURO} />
      </mesh>
      {/* bezel: aro fino abraçando a gema no topo do anel */}
      <mesh position={[0, 0.95, 0.05]}>
        <torusGeometry args={[0.28, 0.045, 12, 32]} />
        <meshStandardMaterial {...OURO} />
      </mesh>
      <Gema gema={gema} escala={0.3} posicao={[0, 0.95, 0.05]} />
    </group>
  )
}

function Colar({ gema }: { gema: GemaTipo }) {
  return (
    <group position={[0, 0.4, 0]}>
      {/* duas correntes finas descendo dos ombros até o bail central,
          bem mais simples e legível que tentar curvar uma corrente real */}
      <mesh position={[-0.55, 0.55, 0]} rotation={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshStandardMaterial {...OURO} />
      </mesh>
      <mesh position={[0.55, 0.55, 0]} rotation={[0, 0, -0.55]}>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshStandardMaterial {...OURO} />
      </mesh>
      {/* bail preso na ponta das duas correntes */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.035, 12, 32]} />
        <meshStandardMaterial {...OURO} />
      </mesh>
      <Gema gema={gema} escala={0.55} posicao={[0, -0.55, 0]} girando />
    </group>
  )
}

function Brincos({ gema }: { gema: GemaTipo }) {
  return (
    <group>
      {[-1, 1].map((lado) => (
        <group key={lado} position={[lado * 0.75, 0, 0]}>
          {/* base do brinco (tarraxa) atrás da gema */}
          <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.06, 24]} />
            <meshStandardMaterial {...OURO} />
          </mesh>
          <Gema gema={gema} escala={0.3} posicao={[0, 0, 0]} />
        </group>
      ))}
    </group>
  )
}

export default function Joia({ peca, gema, girando }: { peca: Peca; gema: GemaTipo; girando: boolean }) {
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!ref.current || !girando) return
    ref.current.rotation.y += delta * 0.3
  })

  return (
    <group ref={ref}>
      {peca.id === 'anel' && <Anel gema={gema} />}
      {peca.id === 'colar' && <Colar gema={gema} />}
      {peca.id === 'brincos' && <Brincos gema={gema} />}
    </group>
  )
}
