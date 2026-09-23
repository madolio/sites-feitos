import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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

  useFrame(({ clock }, delta) => {
    if (!points.current) return
    const t = clock.getElapsedTime()
    points.current.rotation.y = reducedMotion ? 0 : t * 0.05
    points.current.rotation.x = reducedMotion ? 0 : Math.sin(t * 0.08) * 0.15

    if (!reducedMotion) {
      const attr = points.current.geometry.attributes.position
      const arr = attr.array as Float32Array
      for (let i = 0; i < count; i++) {
        const s = seeds[i]
        arr[i * 3 + 1] += Math.sin(t * 0.6 + s) * 0.0006 * (delta * 60)
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

// A rotação é lentíssima (0,05 rad/s): 30 quadros/s são indistinguíveis de 60,
// e metade do trabalho de GPU/CPU (principalmente em celular). O R3F não tem
// limite de fps, então o loop fica em `frameloop="never"` e este componente
// chama `advance` no ritmo certo, só enquanto a cena está visível.
function FrameLimiter({ active, fps }: { active: boolean; fps: number }) {
  const advance = useThree((state) => state.advance)
  useEffect(() => {
    if (!active) return
    let raf = 0
    let last = 0
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (t - last < 1000 / fps - 2) return
      last = t
      advance(t / 1000)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active, advance, fps])
  return null
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
  /** false pausa o render loop (cena fora da tela). */
  active?: boolean
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
  active = true,
}: Scene3DProps) {
  // Movimento reduzido: cena estática, desenhada uma vez (sem loop de render).
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const coarsePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  return (
    <Canvas
      // Celular (ponteiro grosso) fica em 1x: a cena é pontos suaves de 0,045 de
      // raio, dpr 1,5+ só multiplica pixels pintados sem ganho visível.
      dpr={coarsePointer ? 1 : [1, 1.5]}
      frameloop={reducedMotion ? (active ? 'demand' : 'never') : 'never'}
      camera={{ position: [0, 0, cameraDistance], fov }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
    >
      {!reducedMotion && <FrameLimiter active={active} fps={30} />}
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
