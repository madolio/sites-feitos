import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import {
  AmbientLight,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  LatheGeometry,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Plane,
  Raycaster,
  Vector2,
  Vector3,
} from 'three'
import type { Esmalte } from '../data'
import { forno, MAX_H, MAX_R, MIN_H, MIN_R, N, peca, raioEm } from '../estado'
import { ehLateral } from '../lateral'
import { anel, atualizarGeometria, criarGeometria } from './geometria'
import { texturaPintas, texturaRoda } from './texturas'

export type Etapa = 'moldar' | 'esmaltar' | 'queimando' | 'pronta'

/** Linha até onde o pé fica sem esmalte (como no ateliê de verdade). */
export const PE = 0.09

const GIRO: Record<Etapa, number> = { moldar: 4.2, esmaltar: 1.2, queimando: 0.7, pronta: 0.35 }
const BARRO = new Color('#8e877d')
const BISCOITO = new Color('#bcae98')
const GESSO = new Color('#e8e4dd')
const DENTRO_DO_FORNO = new Color('#170703')
// Cerâmica esfriando muda de cor como metal: amarelo-laranja no pico,
// vermelho profundo quando já está baixando.
const BRASA_FRIA = new Color('#b81c00')
const BRASA_QUENTE = new Color('#ffab45')
const brasa = new Color()

// No forno o estúdio apaga e quem ilumina é a própria peça (emissão acima de
// 1.0 → bloom). Fora dele, luz de estúdio normal.
function Iluminacao({ etapa }: { etapa: Etapa }) {
  const amb = useRef<AmbientLight>(null)
  const chave = useRef<DirectionalLight>(null)
  const recorte = useRef<DirectionalLight>(null)

  useFrame(({ scene }) => {
    const calor = etapa === 'queimando' ? forno.calor : 0
    const escuro = calor * calor * (3 - 2 * calor)
    if (scene.background instanceof Color) scene.background.copy(GESSO).lerp(DENTRO_DO_FORNO, escuro * 0.94)
    scene.environmentIntensity = 1 - escuro * 0.8
    if (amb.current) amb.current.intensity = 0.3 * (1 - escuro * 0.8)
    if (chave.current) chave.current.intensity = 1.3 * (1 - escuro * 0.85)
    if (recorte.current) recorte.current.intensity = 2.6 * (1 - escuro * 0.6)
  })

  return (
    <>
      <ambientLight ref={amb} intensity={0.3} />
      <directionalLight ref={chave} position={[-3, 5, 4]} intensity={1.3} />
      <directionalLight ref={recorte} position={[4, 3, -3.5]} intensity={2.6} color="#fff0da" />
    </>
  )
}

type Props = { etapa: Etapa; esmalte: Esmalte; dicaRef: RefObject<HTMLDivElement | null> }

export default function Atelie({ etapa, esmalte, dicaRef }: Props) {
  const reduzido = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 24, near: 0.1, far: 80, position: [0, 4.3, 12.8] }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true
      }}
      style={{ touchAction: 'none' }}
      fallback={null}
    >
      <color attach="background" args={['#e8e4dd']} />
      <Enquadramento />
      <Iluminacao etapa={etapa} />

      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#6f6a63']} />
        <Lightformer form="rect" intensity={3.2} position={[-3, 3.4, 3]} scale={[3.6, 1.7, 1]} target={[0, 1, 0]} />
        <Lightformer form="rect" intensity={1.8} position={[3.6, 1.6, 2.4]} scale={[0.7, 4.2, 1]} target={[0, 1, 0]} />
        <Lightformer form="circle" intensity={1.4} position={[0, 5.5, -3]} scale={2.4} target={[0, 1, 0]} />
      </Environment>

      <Torno etapa={etapa} esmalte={esmalte} dicaRef={dicaRef} reduzido={reduzido} />
      <Maos ativo={etapa === 'moldar'} />

      <ContactShadows position={[0, 0.003, 0]} scale={3.4} blur={2.2} opacity={0.5} far={3} resolution={512} />

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={1} intensity={1.15} radius={0.72} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Vignette offset={0.28} darkness={0.42} />
      </EffectComposer>
    </Canvas>
  )
}

// Painel ao lado: peça à esquerda do centro. Celular em pé: peça na metade de
// cima (o painel vira folha embaixo). Lente longa e câmera um pouco acima: a
// bacia vira uma elipse fina em volta da peça (em vez de uma massa escura na
// frente) e a silhueta continua de perfil o bastante pra moldar arrastando.
function Enquadramento() {
  const { camera, size } = useThree()
  useEffect(() => {
    const retrato = size.width / size.height < 0.85
    if (ehLateral(size.width, size.height)) {
      // desloca a câmera (não a peça) — assim o raio de moldar continua no
      // plano z = 0 do eixo do torno
      camera.position.set(1.4, 4.1, 11.4)
      camera.lookAt(1.4, 0.95, 0)
    } else if (retrato) {
      camera.position.set(0, 5.4, 15.5)
      camera.lookAt(0, -0.35, 0)
    } else {
      camera.position.set(0, 4.3, 12.8)
      camera.lookAt(0, 0.7, 0)
    }
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function Torno({ etapa, esmalte, dicaRef, reduzido }: Props & { reduzido: boolean }) {
  const giro = useRef<Group>(null)
  const velocidade = useRef(GIRO[etapa])
  const anelFogo = useRef<Mesh>(null)

  const geo = useMemo(criarGeometria, [])
  const pintas = useMemo(texturaPintas, [])
  const texRoda = useMemo(texturaRoda, [])

  const planos = useMemo(
    () => ({
      abaixoDoPe: new Plane(new Vector3(0, -1, 0), PE),
      acimaDoPe: new Plane(new Vector3(0, 1, 0), -PE),
      acimaDaFrente: new Plane(new Vector3(0, 1, 0), -PE),
      abaixoDaFrente: new Plane(new Vector3(0, -1, 0), PE),
    }),
    [],
  )

  const mat = useMemo(() => {
    const barro = new MeshStandardMaterial({ color: BARRO, roughness: 0.42, map: pintas })
    const pe = new MeshStandardMaterial({ color: BARRO, roughness: 0.9, map: pintas, clippingPlanes: [planos.abaixoDoPe] })
    const cru = new MeshStandardMaterial({
      roughness: 0.96,
      map: pintas,
      clippingPlanes: [planos.acimaDaFrente, planos.acimaDoPe],
    })
    const queimado = new MeshPhysicalMaterial({
      map: pintas,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.25,
      clippingPlanes: [planos.abaixoDaFrente, planos.acimaDoPe],
    })
    return { barro, pe, cru, queimado }
  }, [pintas, planos])

  const rodaMats = useMemo(
    () => [
      new MeshStandardMaterial({ color: '#4d4943', metalness: 0.55, roughness: 0.38 }),
      new MeshStandardMaterial({ map: texRoda, metalness: 0.35, roughness: 0.5 }),
      new MeshStandardMaterial({ color: '#3a3632' }),
    ],
    [texRoda],
  )

  const bacia = useMemo(
    () =>
      new LatheGeometry(
        [
          new Vector2(1.62, -0.4),
          new Vector2(1.7, -0.03),
          new Vector2(2.02, 0.1),
          new Vector2(2.16, 0.17),
          new Vector2(2.23, 0.13),
          new Vector2(2.08, -0.26),
          new Vector2(1.92, -0.5),
        ],
        96,
      ),
    [],
  )

  useEffect(() => {
    const cor = new Color(esmalte.cor)
    // Cru, o esmalte é um pó claro e fosco — a cor de verdade só aparece no forno.
    mat.cru.color.copy(cor).lerp(new Color('#ffffff'), 0.58)
    mat.queimado.color.copy(cor)
    mat.queimado.roughness = esmalte.aspereza
  }, [esmalte, mat])

  const ultimaOndulacao = useRef(0)
  const alvo = useMemo(() => new Vector3(), [])

  useFrame((state, dt) => {
    // Forma pronta escolhida: o perfil desliza até ela em vez de pular.
    if (peca.alvo) {
      const k = 1 - Math.exp(-dt * 7)
      let resta = 0
      for (let i = 0; i < N; i++) {
        peca.raio[i] += (peca.alvo.raio[i] - peca.raio[i]) * k
        resta += Math.abs(peca.alvo.raio[i] - peca.raio[i])
      }
      peca.altura += (peca.alvo.altura - peca.altura) * k
      if (resta < 0.004 && Math.abs(peca.alvo.altura - peca.altura) < 0.002) peca.alvo = null
      peca.sujo = true
    }

    const ondulacao = etapa === 'moldar' ? 0.0045 : 0.0022
    if (peca.sujo || ondulacao !== ultimaOndulacao.current) {
      atualizarGeometria(geo, ondulacao)
      ultimaOndulacao.current = ondulacao
      peca.sujo = false
    }

    velocidade.current += (GIRO[etapa] * (reduzido ? 0.4 : 1) - velocidade.current) * Math.min(1, dt * 2.5)
    if (giro.current) giro.current.rotation.y += dt * velocidade.current

    const frente = etapa === 'queimando' ? forno.frente : etapa === 'pronta' ? 99 : PE
    planos.acimaDaFrente.constant = -frente
    planos.abaixoDaFrente.constant = frente

    const calor = etapa === 'queimando' ? forno.calor : 0
    brasa.copy(BRASA_FRIA).lerp(BRASA_QUENTE, calor)
    const intensidade = calor ** 0.8 * 5.5
    for (const m of [mat.pe, mat.cru, mat.queimado]) {
      m.emissive.copy(brasa)
      m.emissiveIntensity = intensidade
    }
    const cozido = etapa === 'pronta' ? 1 : etapa === 'queimando' ? Math.min(1, forno.temperatura / 1250) : 0
    mat.pe.color.copy(BARRO).lerp(BISCOITO, cozido)

    const anelM = anelFogo.current
    if (anelM) {
      const visivel = etapa === 'queimando' && frente > PE + 0.01 && frente < peca.altura
      anelM.visible = visivel
      if (visivel) {
        const r = raioEm(frente) + anel(frente, ondulacao) + 0.012
        anelM.position.y = frente
        anelM.scale.set(r, r, 1)
      }
    }

    // A dica do dedo acompanha a silhueta até a primeira arrastada.
    const dica = dicaRef.current
    if (dica) {
      const mostrar = etapa === 'moldar' && !peca.tocou
      dica.style.opacity = mostrar ? '1' : '0'
      if (mostrar) {
        const y = peca.altura * 0.5
        alvo.set(raioEm(y) + 0.1, y, 0).project(state.camera)
        dica.style.left = `${((alvo.x + 1) / 2) * state.size.width}px`
        dica.style.top = `${((1 - alvo.y) / 2) * state.size.height}px`
      }
    }
  })

  const moldando = etapa === 'moldar'

  return (
    <>
      <group ref={giro}>
        <mesh position={[0, -0.07, 0]} material={rodaMats}>
          <cylinderGeometry args={[1.45, 1.45, 0.14, 96]} />
        </mesh>
        <mesh geometry={geo} material={mat.barro} visible={moldando} />
        <mesh geometry={geo} material={mat.pe} visible={!moldando} />
        <mesh geometry={geo} material={mat.cru} visible={!moldando} />
        <mesh geometry={geo} material={mat.queimado} visible={!moldando} />
      </group>

      <mesh ref={anelFogo} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[1, 0.016, 10, 128]} />
        <meshBasicMaterial color={[6, 2.2, 0.5]} toneMapped={false} />
      </mesh>

      <mesh geometry={bacia}>
        <meshStandardMaterial color="#5d5850" roughness={0.7} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[1.98, 2.35, 1.2, 64]} />
        <meshStandardMaterial color="#4b4741" roughness={0.85} />
      </mesh>
    </>
  )
}

// Moldar: arrasta na silhueta e o barro segue o dedo naquela altura (com
// queda gaussiana pros lados, como a pressão da mão). Começar a arrastada
// perto da borda de cima puxa a peça pra cima (ou achata).
function Maos({ ativo }: { ativo: boolean }) {
  const { camera, gl } = useThree()

  useEffect(() => {
    if (!ativo) return
    const el = gl.domElement
    const raio = new Raycaster()
    const plano = new Plane(new Vector3(0, 0, 1), 0)
    const ndc = new Vector2()
    const hit = new Vector3()
    let modo: null | 'parede' | 'altura' = null

    const ponto = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
      raio.setFromCamera(ndc, camera)
      return raio.ray.intersectPlane(plano, hit)
    }

    const perto = (p: Vector3) =>
      p.y > -0.15 && p.y < peca.altura + 0.6 && Math.abs(p.x) < raioEm(Math.min(p.y, peca.altura)) + 0.5

    const aplicar = (p: Vector3) => {
      if (modo === 'altura') {
        const h = Math.min(MAX_H, Math.max(MIN_H, p.y))
        peca.altura += (h - peca.altura) * 0.35
      } else {
        const y = Math.min(peca.altura, Math.max(0, p.y))
        const alvo = Math.min(MAX_R, Math.max(MIN_R, Math.abs(p.x)))
        const sigma2 = 2 * 0.17 * 0.17
        for (let i = 0; i < N; i++) {
          const yi = (i / (N - 1)) * peca.altura
          const w = Math.exp(-((yi - y) ** 2) / sigma2)
          peca.raio[i] += (alvo - peca.raio[i]) * w * 0.3
        }
        for (let i = 1; i < N - 1; i++) {
          peca.raio[i] = peca.raio[i] * 0.9 + (peca.raio[i - 1] + peca.raio[i + 1]) * 0.05
        }
        peca.raio[0] = Math.max(peca.raio[0], 0.3)
        peca.raio[1] = Math.max(peca.raio[1], 0.3)
      }
      peca.sujo = true
    }

    const down = (e: PointerEvent) => {
      const p = ponto(e)
      if (!p || !perto(p)) return
      modo = p.y > peca.altura - 0.14 ? 'altura' : 'parede'
      peca.tocou = true
      peca.alvo = null
      el.setPointerCapture(e.pointerId)
      el.style.cursor = 'grabbing'
      aplicar(p)
    }
    const move = (e: PointerEvent) => {
      const p = ponto(e)
      if (!p) return
      if (modo) aplicar(p)
      else el.style.cursor = perto(p) ? 'grab' : 'default'
    }
    const up = (e: PointerEvent) => {
      modo = null
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
      el.style.cursor = 'grab'
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      el.style.cursor = 'default'
    }
  }, [ativo, camera, gl])

  return null
}
