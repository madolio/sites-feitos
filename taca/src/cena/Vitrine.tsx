import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { taca } from '../estado'
import { criarParedeLagrimas, criarSuperficieVinho, criarTaca, criarVinho } from './geometria'
import { texturaLagrimas, texturaOndulacao } from './texturas'
import Vinhedo from './Vinhedo'

function ConjuntoTaca() {
  const grupo = useRef<THREE.Group>(null)
  const vinhoGrupo = useRef<THREE.Group>(null)
  const superficieRef = useRef<THREE.Mesh>(null)
  const lagrimasRef = useRef<THREE.MeshBasicMaterial>(null)
  const vinhoRotacao = useRef(0)

  const geoTaca = useMemo(() => criarTaca(), [])
  const geoVinho = useMemo(() => criarVinho(), [])
  const geoSuperficie = useMemo(() => criarSuperficieVinho(), [])
  const geoLagrimas = useMemo(() => criarParedeLagrimas(), [])
  const texOndulacao = useMemo(() => texturaOndulacao(), [])
  const texLagrimas = useMemo(() => texturaLagrimas(), [])

  useFrame((_, delta) => {
    if (!taca.arrastando) {
      taca.velocidade *= Math.max(0, 1 - delta * 1.8)
    }
    taca.angulo += taca.velocidade * delta

    // o vinho segue o giro da taça com atraso — física de líquido de mentirinha:
    // um lowpass simples já basta pra parecer que ele "continua girando".
    vinhoRotacao.current += (taca.angulo - vinhoRotacao.current) * Math.min(1, delta * 2.2)

    const energia = Math.abs(taca.velocidade)
    if (energia > 0.7) taca.pernas = 1
    else taca.pernas = Math.max(0, taca.pernas - delta * 0.12)

    if (grupo.current) grupo.current.rotation.y = taca.angulo
    if (vinhoGrupo.current) vinhoGrupo.current.rotation.y = vinhoRotacao.current
    if (superficieRef.current) {
      superficieRef.current.rotation.z += delta * (0.15 + energia * 0.25)
    }
    if (lagrimasRef.current) lagrimasRef.current.opacity = taca.pernas * 0.8
  })

  return (
    <group ref={grupo}>
      <group ref={vinhoGrupo} renderOrder={1}>
        <mesh geometry={geoVinho} renderOrder={1}>
          <meshPhysicalMaterial
            color="#5a0e24"
            transparent
            opacity={0.92}
            roughness={0.12}
            metalness={0}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
            envMapIntensity={1.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh ref={superficieRef} geometry={geoSuperficie} position={[0, 1.521, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
          <meshStandardMaterial map={texOndulacao} roughness={0.15} metalness={0.1} />
        </mesh>
      </group>

      <mesh geometry={geoTaca} renderOrder={2}>
        <meshPhysicalMaterial
          transparent
          opacity={0.22}
          roughness={0.05}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={2.2}
          side={THREE.DoubleSide}
          color="#fffaf2"
          depthWrite={false}
        />
      </mesh>

      <mesh geometry={geoLagrimas} renderOrder={3}>
        <meshBasicMaterial ref={lagrimasRef} map={texLagrimas} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default function Vitrine() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 26, near: 0.1, far: 60, position: [0, 1.05, 11] }}
      style={{ touchAction: 'none' }}
      fallback={null}
    >
      <fog attach="fog" args={['#3a2a3e', 9, 22]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.6, 3, -8]} intensity={1.8} color="#ffcf8a" />
      <directionalLight position={[-2, 2, 3]} intensity={0.4} color="#a8c4d8" />

      <Environment resolution={128} frames={1}>
        <color attach="background" args={['#241832']} />
        <Lightformer form="rect" intensity={2.4} position={[2.6, 1.5, -6]} scale={[3, 2, 1]} color="#ffcf8a" />
        <Lightformer form="circle" intensity={1.2} position={[-3, 3, 2]} scale={2} color="#e9dfc8" />
      </Environment>

      <Vinhedo />
      <ConjuntoTaca />

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={0.9} intensity={0.9} radius={0.6} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Vignette offset={0.32} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  )
}
