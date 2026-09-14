import { useMemo } from 'react'
import * as THREE from 'three'

// Fundo da cena: nunca uma foto de vinhedo, sempre silhueta — céu em
// gradiente (cúpula com cor por vértice, sem luz nenhuma incidindo nela) +
// três cristas de morro cada vez mais claras e mais longe (perspectiva aérea)
// + fileiras de parreiral na crista mais próxima, pontinhos escuros em
// InstancedMesh.
function CupulaCeu() {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(26, 32, 20, 0, Math.PI * 2, 0, Math.PI / 1.7)
    const cores = new Float32Array(g.attributes.position.count * 3)
    const topo = new THREE.Color('#241832')
    const meio = new THREE.Color('#7a3a4a')
    const horizonte = new THREE.Color('#e8934a')
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 26
      const t = 1 - Math.max(0, Math.min(1, (y + 0.15) / 0.6))
      const cor = t < 0.55 ? topo.clone().lerp(meio, t / 0.55) : meio.clone().lerp(horizonte, (t - 0.55) / 0.45)
      cores[i * 3] = cor.r
      cores[i * 3 + 1] = cor.g
      cores[i * 3 + 2] = cor.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(cores, 3))
    return g
  }, [])

  return (
    <mesh geometry={geo} scale={[1, 1, 1]}>
      <meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} />
    </mesh>
  )
}

function crista(largura: number, altura: number, pontos: number, seed: number) {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const shape = new THREE.Shape()
  shape.moveTo(-largura / 2, -4)
  const passo = largura / pontos
  for (let i = 0; i <= pontos; i++) {
    const x = -largura / 2 + i * passo
    const y = altura * (0.4 + rand() * 0.6) * Math.sin((i / pontos) * Math.PI * 0.8 + rand())
    shape.lineTo(x, Math.max(0.2, y))
  }
  shape.lineTo(largura / 2, -4)
  shape.closePath()
  return new THREE.ShapeGeometry(shape)
}

function Cristas() {
  const g1 = useMemo(() => crista(30, 2.2, 10, 3), [])
  const g2 = useMemo(() => crista(34, 3.2, 8, 11), [])
  const g3 = useMemo(() => crista(38, 4.4, 7, 27), [])

  return (
    <group position={[0, -0.3, 0]}>
      <mesh geometry={g3} position={[0, 0, -14]}>
        <meshBasicMaterial color="#5a4a63" fog={false} />
      </mesh>
      <mesh geometry={g2} position={[1, -0.1, -10]}>
        <meshBasicMaterial color="#3f2e42" fog={false} />
      </mesh>
      <mesh geometry={g1} position={[-0.6, -0.2, -6.5]}>
        <meshBasicMaterial color="#251a2c" fog={false} />
      </mesh>
    </group>
  )
}

function Parreiral() {
  const ref = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.05, 0.16, 5)
    return geo
  }, [])

  const posicoes = useMemo(() => {
    const arr: [number, number, number][] = []
    for (let fileira = 0; fileira < 3; fileira++) {
      const z = -5.6 - fileira * 0.5
      const n = 14 - fileira * 2
      for (let i = 0; i < n; i++) {
        const x = -3.2 + (i / (n - 1)) * 6.4 + (Math.random() - 0.5) * 0.15
        arr.push([x, -0.42 + fileira * 0.03, z])
      }
    }
    return arr
  }, [])

  return (
    <group>
      {posicoes.map((p, i) => (
        <mesh key={i} position={p} geometry={ref}>
          <meshBasicMaterial color="#1c1420" fog={false} />
        </mesh>
      ))}
    </group>
  )
}

export default function Vinhedo() {
  return (
    <>
      <CupulaCeu />
      <Cristas />
      <Parreiral />
      <mesh position={[2.6, 0.85, -13]}>
        <circleGeometry args={[1.15, 32]} />
        <meshBasicMaterial color="#ffcf8a" fog={false} />
      </mesh>
    </>
  )
}
