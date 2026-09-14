import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { taca, vinho } from '../estado'
import { ALTURA_BASE_TACA_BOJO, ALTURA_VINHO, criarParedeLagrimas, criarSuperficieVinho, criarTaca, criarVinho, raioNaAltura } from './geometria'
import { texturaLagrimas, texturaOndulacao } from './texturas'
import Vinhedo from './Vinhedo'

const NIVEL_VAZIO = ALTURA_BASE_TACA_BOJO + 0.04
const RAIO_MAX = raioNaAltura(ALTURA_VINHO)

function ConjuntoTaca() {
  const grupo = useRef<THREE.Group>(null)
  const vinhoGrupo = useRef<THREE.Group>(null)
  const vinhoMaterial = useRef<THREE.MeshPhysicalMaterial>(null)
  const superficieRef = useRef<THREE.Mesh>(null)
  const superficieMaterial = useRef<THREE.MeshStandardMaterial>(null)
  const lagrimasRef = useRef<THREE.MeshBasicMaterial>(null)
  const vinhoRotacao = useRef(0)
  const nivelAtual = useRef(NIVEL_VAZIO)
  const corAtual = useRef(new THREE.Color(vinho.corAlvo))
  const corAlvoCache = useRef({ hex: '', cor: new THREE.Color() })

  const geoTaca = useMemo(() => criarTaca(), [])
  const geoVinho = useMemo(() => criarVinho(), [])
  const geoSuperficie = useMemo(() => criarSuperficieVinho(), [])
  const geoLagrimas = useMemo(() => criarParedeLagrimas(), [])
  const texOndulacao = useMemo(() => texturaOndulacao(), [])
  const texLagrimas = useMemo(() => texturaLagrimas(), [])
  const planoNivel = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), NIVEL_VAZIO), [])

  useFrame((_, deltaBruto) => {
    // Trava o passo em 50ms: sem isso, um quadro lento de verdade (aba fora
    // de foco, GPU sobrecarregada) faz `min(1, delta*k)` bater em 1 e a
    // animação "pula" direto pro alvo em vez de suavizar — vimos isso
    // acontecer de verdade sob Chrome headless/SwiftShader nos testes.
    const delta = Math.min(deltaBruto, 0.05)

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

    // Servir um rótulo novo nunca troca a cor de repente — a taça drena
    // quase até o fundo primeiro (fase 'drenando'), só então troca de vinho
    // e enche de novo (fase 'enchendo'). O nível-alvo em si é lido de
    // `vinho.nivelAlvo`/`nivelProximo`, escrito pela lista em Prova.tsx.
    if (vinho.fase === 'drenando') {
      nivelAtual.current += (NIVEL_VAZIO - nivelAtual.current) * Math.min(1, delta * 3.4)
      if (Math.abs(nivelAtual.current - NIVEL_VAZIO) < 0.008) {
        vinho.corAlvo = vinho.corProxima
        vinho.nivelAlvo = vinho.nivelProximo
        vinho.fase = 'enchendo'
      }
    } else {
      const vel = vinho.fase === 'enchendo' ? 2.2 : 3
      nivelAtual.current += (vinho.nivelAlvo - nivelAtual.current) * Math.min(1, delta * vel)
      if (vinho.fase === 'enchendo' && Math.abs(nivelAtual.current - vinho.nivelAlvo) < 0.004) vinho.fase = 'parado'
    }

    if (corAlvoCache.current.hex !== vinho.corAlvo) {
      corAlvoCache.current.hex = vinho.corAlvo
      corAlvoCache.current.cor.set(vinho.corAlvo)
    }
    corAtual.current.lerp(corAlvoCache.current.cor, Math.min(1, delta * 4))
    if (vinhoMaterial.current) vinhoMaterial.current.color.copy(corAtual.current)
    if (superficieMaterial.current) superficieMaterial.current.color.copy(corAtual.current).lerp(new THREE.Color('#fff8ea'), 0.35)

    planoNivel.constant = nivelAtual.current
    if (superficieRef.current) {
      const fator = Math.max(0.05, raioNaAltura(nivelAtual.current) / RAIO_MAX)
      superficieRef.current.position.y = nivelAtual.current + 0.001
      superficieRef.current.scale.setScalar(fator)
      superficieRef.current.rotation.z += delta * (0.15 + energia * 0.25)
    }

    if (grupo.current) grupo.current.rotation.y = taca.angulo
    if (vinhoGrupo.current) vinhoGrupo.current.rotation.y = vinhoRotacao.current
    if (lagrimasRef.current) lagrimasRef.current.opacity = taca.pernas * 0.8
  })

  return (
    <group ref={grupo}>
      <group ref={vinhoGrupo} renderOrder={1}>
        <mesh geometry={geoVinho} renderOrder={1}>
          <meshPhysicalMaterial
            ref={vinhoMaterial}
            color="#5a0e24"
            transparent
            opacity={0.92}
            roughness={0.12}
            metalness={0}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
            envMapIntensity={1.2}
            side={THREE.DoubleSide}
            clippingPlanes={[planoNivel]}
          />
        </mesh>
        <mesh ref={superficieRef} geometry={geoSuperficie} position={[0, 1.521, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={1}>
          <meshStandardMaterial ref={superficieMaterial} map={texOndulacao} roughness={0.15} metalness={0.1} />
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
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true
      }}
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
