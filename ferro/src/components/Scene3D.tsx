import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import type { Group, Mesh, Points as PointsType } from 'three'
import { AdditiveBlending, ExtrudeGeometry, Path, Shape } from 'three'

// Poeira de ferro suspensa no ar escuro do galpão.
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

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [count, minRadius, maxRadius])

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) return
    const t = clock.getElapsedTime()
    points.current.rotation.y = t * 0.03
    points.current.rotation.x = Math.sin(t * 0.05) * 0.08
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

// Anilha olímpica de verdade: anel extrudado com chanfro e seis furos de
// pegada, montado com Shape + holes. Substituiu um blob distorcido que, sem
// nada pra refletir, parecia um borrão de plástico azul chapado.
function useAnilhaGeometry(raio: number) {
  return useMemo(() => {
    const shape = new Shape()
    shape.absarc(0, 0, raio, 0, Math.PI * 2, false)

    const furoCentral = new Path()
    furoCentral.absarc(0, 0, raio * 0.26, 0, Math.PI * 2, true)
    shape.holes.push(furoCentral)

    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2
      const furo = new Path()
      furo.absarc(
        Math.cos(ang) * raio * 0.63,
        Math.sin(ang) * raio * 0.63,
        raio * 0.105,
        0,
        Math.PI * 2,
        true,
      )
      shape.holes.push(furo)
    }

    const geo = new ExtrudeGeometry(shape, {
      depth: raio * 0.18,
      bevelEnabled: true,
      bevelThickness: raio * 0.045,
      bevelSize: raio * 0.045,
      bevelSegments: 4,
      curveSegments: 72,
    })
    geo.center()
    return geo
  }, [raio])
}

type AnilhaProps = {
  raio: number
  posicao: [number, number, number]
  velocidade: number
  inclinacao: number
  cor: string
  aspereza: number
}

function Anilha({ raio, posicao, velocidade, inclinacao, cor, aspereza }: AnilhaProps) {
  const mesh = useRef<Mesh>(null)
  const geometry = useAnilhaGeometry(raio)
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame(({ clock }) => {
    if (!mesh.current || reducedMotion) return
    mesh.current.rotation.y = clock.getElapsedTime() * velocidade
  })

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={posicao}
      rotation={[inclinacao, 0.4, 0.15]}
    >
      <meshStandardMaterial color={cor} metalness={1} roughness={aspereza} envMapIntensity={1.1} />
    </mesh>
  )
}

// Estúdio de luz montado à mão. É isto que faz o metal parecer metal: sem
// um ambiente pra refletir, metalness={1} renderiza quase preto e chapado.
// Os lightformers viram um cubemap local (frames={1}), sem baixar HDR de
// CDN nenhum.
//
// As intensidades são baixas de propósito. Com elas altas o aço vira cromo
// espelhado e estoura de branco — bonito sozinho, mas o título do Hero fica
// por cima e some. Aqui o corpo da anilha fica escuro e só as quinas pegam
// luz, que é o contraste de capa de disco de metal.
function Estudio({ corLuz }: { corLuz: string }) {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#050505']} />
      <Lightformer intensity={1.6} position={[0, 4, -6]} scale={[12, 8, 1]} color="#ffffff" />
      <Lightformer intensity={3.2} position={[-5, 0, 1]} scale={[2, 12, 1]} color={corLuz} />
      <Lightformer intensity={2} position={[5, 1, 1]} scale={[2, 12, 1]} color="#ffffff" />
      <Lightformer intensity={0.9} position={[0, -5, 2]} scale={[12, 4, 1]} color={corLuz} />
    </Environment>
  )
}

function Cena({
  particleColor,
  particleCount,
  particleOpacity,
  particleSize,
  minRadius,
  maxRadius,
  acoColor,
  luzColor,
}: Required<
  Pick<
    Scene3DProps,
    | 'particleColor'
    | 'particleCount'
    | 'particleOpacity'
    | 'particleSize'
    | 'minRadius'
    | 'maxRadius'
    | 'acoColor'
    | 'luzColor'
  >
>) {
  const grupo = useRef<Group>(null)
  const { viewport } = useThree()
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // As anilhas ficam nas laterais pra deixar o miolo da tela livre pro
  // título. Num viewport estreito o mundo visível encolhe e elas sairiam de
  // quadro, então o conjunto inteiro escala junto — encolhe e se aproxima do
  // centro em vez de sumir.
  const escala = Math.min(1, viewport.width / 7.3)

  // Balanço lento do conjunto inteiro, como peso pendurado no rack.
  useFrame(({ clock }) => {
    if (!grupo.current || reducedMotion) return
    const t = clock.getElapsedTime()
    grupo.current.rotation.z = Math.sin(t * 0.18) * 0.04
    grupo.current.position.y = Math.sin(t * 0.25) * 0.08
  })

  return (
    <>
      <Estudio corLuz={luzColor} />
      <ambientLight intensity={0.2} />

      <group ref={grupo} scale={escala}>
        <Anilha
          raio={2.3}
          posicao={[3.5, -0.4, -1.2]}
          velocidade={0.18}
          inclinacao={0.38}
          cor={acoColor}
          aspereza={0.3}
        />
        <Anilha
          raio={1.5}
          posicao={[-3.7, 0.9, -2]}
          velocidade={-0.24}
          inclinacao={-0.35}
          cor={acoColor}
          aspereza={0.36}
        />
        <Anilha
          raio={0.85}
          posicao={[-2.3, -2.5, -3.6]}
          velocidade={0.32}
          inclinacao={0.85}
          cor={acoColor}
          aspereza={0.42}
        />
      </group>

      <ParticleField
        count={particleCount}
        color={particleColor}
        opacity={particleOpacity}
        size={particleSize}
        minRadius={minRadius}
        maxRadius={maxRadius}
      />
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
  /** Cor base do aço das anilhas. */
  acoColor?: string
  /** Cor da luz lateral que o aço reflete. */
  luzColor?: string
}

export default function Scene3D({
  particleColor = '#5b9fff',
  particleCount = 420,
  particleOpacity = 0.4,
  particleSize = 0.03,
  minRadius = 3.4,
  maxRadius = 7,
  cameraDistance = 6.2,
  fov = 45,
  acoColor = '#414a56',
  luzColor = '#5b9fff',
}: Scene3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, cameraDistance], fov }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Cena
          particleColor={particleColor}
          particleCount={particleCount}
          particleOpacity={particleOpacity}
          particleSize={particleSize}
          minRadius={minRadius}
          maxRadius={maxRadius}
          acoColor={acoColor}
          luzColor={luzColor}
        />
      </Suspense>
    </Canvas>
  )
}
