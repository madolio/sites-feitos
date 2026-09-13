import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { useMemo, useRef } from 'react'
import { ToneMappingMode } from 'postprocessing'
import * as THREE from 'three'
import { corda, montagem } from '../estado'
import { criarEngrenagem, criarPlacaMae, criarVolante, criarBarril, furosDecorativos } from './geometria'
import { texturaCotesDeGeneve, texturaBarril } from './texturas'

type Pos = [number, number, number]

// Cada peça sabe onde fica montada (posição real dentro do calibre) e onde
// flutua explodida — a cena só interpola entre as duas por `montagem.progresso`,
// não anima peça por peça.
const PLACA: { montada: Pos; explodida: Pos } = { montada: [0, 0, 0], explodida: [0, 0, 0] }
const BARRIL: { montada: Pos; explodida: Pos } = { montada: [-0.58, 0.22, 0.32], explodida: [-1.5, 1.9, 0.9] }
const RODA_CENTRO: { montada: Pos; explodida: Pos } = { montada: [0.12, 0.22, -0.22], explodida: [0.5, 2.6, -1.1] }
const RODA_TERCA: { montada: Pos; explodida: Pos } = { montada: [0.62, 0.28, -0.06], explodida: [1.8, 3.3, -0.3] }
const RODA_ESCAPE: { montada: Pos; explodida: Pos } = { montada: [0.28, 0.34, 0.5], explodida: [0.9, 4.0, 1.9] }
const VOLANTE: { montada: Pos; explodida: Pos } = { montada: [0.1, 0.5, 0.05], explodida: [0.1, 4.9, 0.05] }

function lerpPos(out: THREE.Vector3, a: Pos, b: Pos, t: number) {
  out.set(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t)
}

const bronze = new THREE.Color('#caa25e')

function Calibre() {
  const grupo = useRef<THREE.Group>(null)
  const placaRef = useRef<THREE.Mesh>(null)
  const barrilRef = useRef<THREE.Mesh>(null)
  const rodaCentroRef = useRef<THREE.Mesh>(null)
  const rodaTercaRef = useRef<THREE.Mesh>(null)
  const rodaEscapeRef = useRef<THREE.Mesh>(null)
  const volanteRef = useRef<THREE.Mesh>(null)
  const anguloVolante = useRef(0)
  const anguloRodas = useRef(0)
  const tmp = useMemo(() => new THREE.Vector3(), [])

  const geoPlaca = useMemo(() => criarPlacaMae(1.55, 0.1), [])
  const texPlaca = useMemo(() => texturaCotesDeGeneve(), [])
  const furos = useMemo(() => furosDecorativos(1.55, 22), [])
  const geoBarril = useMemo(() => criarBarril(0.4, 0.26), [])
  const texBarrilLateral = useMemo(() => texturaBarril(), [])
  const geoCentro = useMemo(() => criarEngrenagem(40, 0.5, 0.05, 0.06), [])
  const geoTerca = useMemo(() => criarEngrenagem(26, 0.32, 0.045, 0.055), [])
  const geoEscape = useMemo(() => criarEngrenagem(15, 0.2, 0.05, 0.05), [])
  const geoVolante = useMemo(() => criarVolante(0.36, 0.02), [])

  useFrame((_, delta) => {
    const t = montagem.progresso
    if (grupo.current) grupo.current.rotation.y += delta * 0.12

    // reserva de marcha drena devagar sozinha, nunca zera de vez
    corda.energia = Math.max(0.05, corda.energia - delta * 0.012)
    const veloc = 0.6 + corda.energia * 5.5

    anguloRodas.current += delta * veloc
    anguloVolante.current += delta * (2 + corda.energia * 9)
    const oscilacao = Math.sin(anguloVolante.current) * (0.35 + corda.energia * 0.35)

    if (placaRef.current) {
      lerpPos(tmp, PLACA.explodida, PLACA.montada, t)
      placaRef.current.position.copy(tmp)
    }
    if (barrilRef.current) {
      lerpPos(tmp, BARRIL.explodida, BARRIL.montada, t)
      barrilRef.current.position.copy(tmp)
      barrilRef.current.rotation.y = anguloRodas.current * 0.4
    }
    if (rodaCentroRef.current) {
      lerpPos(tmp, RODA_CENTRO.explodida, RODA_CENTRO.montada, t)
      rodaCentroRef.current.position.copy(tmp)
      rodaCentroRef.current.rotation.x = Math.PI / 2
      rodaCentroRef.current.rotation.z = anguloRodas.current
    }
    if (rodaTercaRef.current) {
      lerpPos(tmp, RODA_TERCA.explodida, RODA_TERCA.montada, t)
      rodaTercaRef.current.position.copy(tmp)
      rodaTercaRef.current.rotation.x = Math.PI / 2
      rodaTercaRef.current.rotation.z = -anguloRodas.current * 1.6
    }
    if (rodaEscapeRef.current) {
      lerpPos(tmp, RODA_ESCAPE.explodida, RODA_ESCAPE.montada, t)
      rodaEscapeRef.current.position.copy(tmp)
      rodaEscapeRef.current.rotation.x = Math.PI / 2
      rodaEscapeRef.current.rotation.z = anguloRodas.current * 2.4
    }
    if (volanteRef.current) {
      lerpPos(tmp, VOLANTE.explodida, VOLANTE.montada, t)
      volanteRef.current.position.copy(tmp)
      volanteRef.current.rotation.x = Math.PI / 2
      volanteRef.current.rotation.z = oscilacao
    }
  })

  return (
    <group ref={grupo}>
      <mesh ref={placaRef} geometry={geoPlaca} receiveShadow castShadow>
        <meshStandardMaterial map={texPlaca} metalness={0.75} roughness={0.32} />
      </mesh>
      {furos.map((f, i) => (
        <mesh key={i} position={[f.x, 0.052, f.z]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.035, 16]} />
          <meshStandardMaterial color="#2a1f10" metalness={0.2} roughness={0.6} />
        </mesh>
      ))}

      <mesh ref={barrilRef} geometry={geoBarril} castShadow>
        <meshStandardMaterial map={texBarrilLateral} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh ref={rodaCentroRef} geometry={geoCentro} castShadow>
        <meshStandardMaterial color={bronze} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh ref={rodaTercaRef} geometry={geoTerca} castShadow>
        <meshStandardMaterial color={bronze} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh ref={rodaEscapeRef} geometry={geoEscape} castShadow>
        <meshStandardMaterial color={bronze} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh ref={volanteRef} geometry={geoVolante} castShadow>
        <meshStandardMaterial color="#3a5a72" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function Vitrine() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 32, near: 0.1, far: 40, position: [2.6, 2.5, 4.4] }}
      style={{ touchAction: 'none' }}
      fallback={null}
    >
      <color attach="background" args={['#120d08']} />
      <fog attach="fog" args={['#120d08', 6, 13]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} castShadow />

      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#1c140c']} />
        <Lightformer form="rect" intensity={3} position={[-3, 3, 3]} scale={[3, 1.6, 1]} target={[0, 0, 0]} color="#ffdca8" />
        <Lightformer form="rect" intensity={2} position={[3.4, 1.4, -2]} scale={[0.8, 3.6, 1]} target={[0, 0, 0]} color="#a8c4d8" />
        <Lightformer form="circle" intensity={1.2} position={[0, 5, -3]} scale={2.2} color="#ffe6c2" />
      </Environment>

      <Calibre />

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={1.05} intensity={1.3} radius={0.65} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Vignette offset={0.3} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  )
}
