import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import Gema from './Gema'
import type { Gema as GemaTipo } from '../data/gemas'
import type { Peca } from '../data/pecas'

const OURO = { color: '#d9b45c', metalness: 1, roughness: 0.28 } as const
const PRATA = { color: '#d8dade', metalness: 1, roughness: 0.2 } as const

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

const N_PEDRAS = 15
const RAIO_PULSEIRA = 1.15
const ARCO_ABERTURA = 0.55 // rad de "vão" deixado pro fecho, à esquerda
// Vão (fecho) centrado em π rad — do lado esquerdo da cena — pra pulseira
// abrir da esquerda (aro liso) pra direita (fileira de pedras), igual à
// foto de referência, em vez do vão ficar escondido no topo.
const GAP_CENTRO = Math.PI

function Pulseira({ gema }: { gema: GemaTipo }) {
  const inicio = GAP_CENTRO + ARCO_ABERTURA / 2
  const fim = GAP_CENTRO + Math.PI * 2 - ARCO_ABERTURA / 2

  const pedras = Array.from({ length: N_PEDRAS }, (_, i) => {
    const t = i / (N_PEDRAS - 1)
    const angulo = inicio + t * (fim - inicio)
    return {
      x: Math.cos(angulo) * RAIO_PULSEIRA,
      y: Math.sin(angulo) * RAIO_PULSEIRA,
    }
  })

  return (
    <group scale={0.8} rotation={[0.85, 0, 0.35]}>
      {/* pulseira cravejada: fileira de pedras pequenas encastoadas lado a
          lado num aro fino prateado, em vez de uma gema solitária — pedido
          explícito do usuário com foto de referência de "tennis bracelet".
          Rotação em Z (diagonal) só pra compor como a foto de referência —
          centralizada, sem deslocamento manual: esse offset fazia sentido
          quando a vitrine ocupava a tela cheia, mas com o Hero em duas
          colunas (v3) ele só empurrava a peça pra fora da própria coluna. */}
      <mesh rotation={[0, 0, inicio]}>
        <torusGeometry
          args={[RAIO_PULSEIRA, 0.035, 12, 80, Math.PI * 2 - ARCO_ABERTURA]}
        />
        <meshStandardMaterial {...PRATA} />
      </mesh>

      {/* fecho, nas duas pontas do vão */}
      {[inicio, fim].map((angulo, i) => (
        <mesh
          key={i}
          position={[Math.cos(angulo) * RAIO_PULSEIRA, Math.sin(angulo) * RAIO_PULSEIRA, 0]}
        >
          <boxGeometry args={[0.16, 0.12, 0.08]} />
          <meshStandardMaterial {...PRATA} />
        </mesh>
      ))}

      {pedras.map((p, i) => (
        <group key={i} position={[p.x, p.y, 0.04]}>
          <mesh>
            <torusGeometry args={[0.09, 0.02, 8, 16]} />
            <meshStandardMaterial {...PRATA} />
          </mesh>
          <Gema gema={gema} escala={0.1} />
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
      {peca.id === 'pulseira' && <Pulseira gema={gema} />}
    </group>
  )
}
