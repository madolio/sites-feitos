import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import type { Mesh, Points as PointsType } from 'three'
import { AdditiveBlending } from 'three'

// Campo de partículas — poeira/fuligem de ferro flutuando no ar escuro do
// galpão, mesma técnica do Scene3D do Madolio (reescrita aqui, projetos são
// independentes).
type ParticleFieldProps = {
  count: number
  color: string
  opacity: number
  size: number
  minRadius: number
  maxRadius: number
}

function ParticleField({ count, color, opacity, size, minRadius, maxRadius }: ParticleFieldProps) {
  const points = useRef<PointsType>(null)
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [positions, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
      seed[i] = Math.random() * Math.PI * 2
    }
    return [pos, seed]
  }, [count, minRadius, maxRadius])

  useFrame(({ clock }) => {
    if (!points.current) return
    const t = clock.getElapsedTime()
    points.current.rotation.y = reducedMotion ? 0 : t * 0.04
    points.current.rotation.x = reducedMotion ? 0 : Math.sin(t * 0.07) * 0.12

    if (!reducedMotion) {
      const attr = points.current.geometry.attributes.position
      const arr = attr.array as Float32Array
      for (let i = 0; i < count; i++) {
        const s = seeds[i]
        arr[i * 3 + 1] += Math.sin(t * 0.5 + s) * 0.0005
      }
      attr.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Metal derretido — um blob distorcido, metálico e vermelho-brasa, girando
// devagar: a mesma ideia de "ferro em fusão" que dá nome ao lugar.
function MoltenBlob({ color }: { color: string }) {
  const mesh = useRef<Mesh>(null)
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame(({ clock }) => {
    if (!mesh.current || reducedMotion) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.15
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.2
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.4, 6]} />
      <MeshDistortMaterial
        color={color}
        distort={0.45}
        speed={reducedMotion ? 0 : 1.4}
        metalness={0.75}
        roughness={0.35}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

type Scene3DProps = {
  particleColor?: string
  particleCount?: number
  particleOpacity?: number
  particleSize?: number
  minRadius?: number
  maxRadius?: number
  cameraDistance?: number
  fov?: number
  blobColor?: string
  showBlob?: boolean
}

export default function Scene3D({
  particleColor = '#c9622f',
  particleCount = 500,
  particleOpacity = 0.55,
  particleSize = 0.04,
  minRadius = 2.4,
  maxRadius = 5,
  cameraDistance = 5.5,
  fov = 45,
  blobColor = '#7a281b',
  showBlob = false,
}: Scene3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, cameraDistance], fov }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 4]} intensity={40} color="#ffb37a" />
        {showBlob && <MoltenBlob color={blobColor} />}
        <ParticleField
          count={particleCount}
          color={particleColor}
          opacity={particleOpacity}
          size={particleSize}
          minRadius={minRadius}
          maxRadius={maxRadius}
        />
      </Suspense>
    </Canvas>
  )
}
