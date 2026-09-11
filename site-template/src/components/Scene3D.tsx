import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Points as PointsType } from 'three'
import { AdditiveBlending } from 'three'

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
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    points.current.rotation.y = reducedMotion ? 0 : t * 0.05
    points.current.rotation.x = reducedMotion ? 0 : Math.sin(t * 0.08) * 0.15

    if (!reducedMotion) {
      const attr = points.current.geometry.attributes.position
      const arr = attr.array as Float32Array
      for (let i = 0; i < count; i++) {
        const s = seeds[i]
        arr[i * 3 + 1] += Math.sin(t * 0.6 + s) * 0.0006
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

function CoreGlow({ color, layers }: { color: string; layers: { radius: number; opacity: number }[] }) {
  return (
    <>
      {layers.map((layer) => (
        <mesh key={layer.radius}>
          <sphereGeometry args={[layer.radius, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={layer.opacity} depthWrite={false} />
        </mesh>
      ))}
    </>
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
  glowColor?: string
  showGlow?: boolean
}

const DEFAULT_GLOW_LAYERS = [
  { radius: 0.32, opacity: 0.9 },
  { radius: 0.55, opacity: 0.4 },
  { radius: 0.85, opacity: 0.18 },
  { radius: 1.3, opacity: 0.08 },
]

export default function Scene3D({
  particleColor = '#8fb3ff',
  particleCount = 900,
  particleOpacity = 0.85,
  particleSize = 0.045,
  minRadius = 2.2,
  maxRadius = 3.6,
  cameraDistance = 5.5,
  fov = 45,
  glowColor = '#3f6dff',
  showGlow = true,
}: Scene3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, cameraDistance], fov }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        {showGlow && <CoreGlow color={glowColor} layers={DEFAULT_GLOW_LAYERS} />}
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
