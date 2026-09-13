import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  FogExp2,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  LatheGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Plane,
  PlaneGeometry,
  Points,
  Quaternion,
  Raycaster,
  ShaderMaterial,
  SpotLight,
  Vector2,
  Vector3,
} from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { mergulho } from '../estado'
import { corDaAgua, suave } from './agua'
import * as S from './shaders'

type Comum = {
  uTempo: { value: number }
  uNevoa: { value: Color }
  uDensidade: { value: number }
  uLuz: { value: number }
}

const reduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Oceano() {
  const leve = useMemo(() => window.matchMedia('(max-width: 767px), (pointer: coarse)').matches, [])
  return (
    // `flat` = sem tone mapping. Com ACES, a névoa dos objetos saía mais clara
    // que o fundo (que não passa pelo tone mapping) e marcava uma linha dura
    // no horizonte.
    <Canvas
      flat
      camera={{ fov: 55, near: 0.1, far: 170, position: [0, -1.5, 6] }}
      dpr={[1, leve ? 1.25 : 1.6]}
      gl={{ antialias: !leve }}
      fallback={null}
    >
      <Mar leve={leve} />
    </Canvas>
  )
}

// Rolar a página = descer. A câmera fica sempre em x≈0, z=6 olhando pro -z;
// só a altura muda (1 unidade = 1 metro; superfície em y = 0).
function Mar({ leve }: { leve: boolean }) {
  const { scene, camera } = useThree()
  const hemi = useRef<HemisphereLight>(null)
  const sol = useRef<DirectionalLight>(null)
  const semMovimento = useMemo(reduzido, [])

  const fundo = useMemo(() => new Color('#8fdde3'), [])
  const nevoa = useMemo(() => new FogExp2('#8fdde3', 0.016), [])
  const comum = useMemo<Comum>(
    () => ({ uTempo: { value: 0 }, uNevoa: { value: nevoa.color }, uDensidade: { value: 0.016 }, uLuz: { value: 1 } }),
    [nevoa],
  )

  useEffect(() => {
    scene.background = fundo
    scene.fog = nevoa
    return () => {
      scene.fog = null
    }
  }, [scene, fundo, nevoa])

  useFrame((state) => {
    const d = mergulho.atual
    const t = state.clock.elapsedTime
    corDaAgua(d, fundo)
    nevoa.color.copy(fundo)
    nevoa.density = 0.016 + 0.038 * suave(0, 40, d)
    comum.uDensidade.value = nevoa.density
    comum.uTempo.value = t
    comum.uLuz.value = 1 - 0.95 * suave(0, 30, d)

    // Respiração: sobe um pouco ao inspirar, afunda ao expirar (ciclo de 4,2 s).
    const respira = semMovimento ? 0 : Math.sin((t / 4.2) * Math.PI * 2) * 0.07
    camera.position.y = -1.5 - d + respira
    if (!semMovimento) camera.position.x += (mergulho.ponteiro.x * 0.45 - camera.position.x) * 0.03
    const olhar = 0.3 - 0.46 * suave(0, 12, d)
    camera.rotation.set(olhar + mergulho.ponteiro.y * 0.04, -mergulho.ponteiro.x * 0.05, 0, 'YXZ')

    if (hemi.current) hemi.current.intensity = 1.7 - 1.66 * suave(0, 30, d)
    if (sol.current) sol.current.intensity = 2.2 * (1 - suave(0, 22, d))
  })

  return (
    <>
      <hemisphereLight ref={hemi} args={['#d9fbff', '#0b2b3d', 1.7]} />
      <directionalLight ref={sol} position={[3, 20, 4]} intensity={2.2} color="#e9fdff" />
      <Superficie comum={comum} />
      <Raios comum={comum} />
      <Neve comum={comum} leve={leve} />
      <Bolhas />
      <Peixes leve={leve} />
      <Garoupas />
      <Plataforma comum={comum} />
      <Paredao />
      <Fundo />
      <Lanterna />
    </>
  )
}

/* ---------------- superfície vista de baixo ---------------- */

function Superficie({ comum }: { comum: Comum }) {
  const { camera } = useThree()
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { ...comum, uCamera: { value: new Vector3() }, uBrilho: { value: 1 } },
        vertexShader: S.superficieVert,
        fragmentShader: S.superficieFrag,
        side: DoubleSide,
      }),
    [comum],
  )
  useFrame(() => {
    mat.uniforms.uCamera.value.copy(camera.position)
  })
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -30]} material={mat}>
      <planeGeometry args={[320, 320]} />
    </mesh>
  )
}

/* ---------------- raios de sol ---------------- */

function Raios({ comum }: { comum: Comum }) {
  const { camera } = useThree()
  const raios = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const largura = 1.2 + Math.random() * 2.4
        const mat = new ShaderMaterial({
          uniforms: { uTempo: comum.uTempo, uOpacidade: { value: 0.5 }, uSemente: { value: Math.random() } },
          vertexShader: S.raioVert,
          fragmentShader: S.raioFrag,
          transparent: true,
          depthWrite: false,
          blending: AdditiveBlending,
          side: DoubleSide,
        })
        return { i, largura, mat, x: -16 + Math.random() * 32, z: -26 + Math.random() * 22 }
      }),
    [comum],
  )
  const refs = useRef<(Mesh | null)[]>([])

  useFrame(() => {
    const opacidade = 0.55 * (1 - suave(3, 24, mergulho.atual))
    raios.forEach((r, k) => {
      r.mat.uniforms.uOpacidade.value = opacidade
      const m = refs.current[k]
      if (m) {
        m.visible = opacidade > 0.01
        m.rotation.set(0, Math.atan2(camera.position.x - r.x, camera.position.z - r.z), 0.14)
      }
    })
  })

  return (
    <>
      {raios.map((r, k) => (
        <mesh
          key={r.i}
          ref={(m) => {
            refs.current[k] = m
          }}
          position={[r.x, -11, r.z]}
          scale={[r.largura, 24, 1]}
          material={r.mat}
        >
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </>
  )
}

/* ---------------- neve marinha ---------------- */

function Neve({ comum, leve }: { comum: Comum; leve: boolean }) {
  const { camera } = useThree()
  const [geo, mat] = useMemo(() => {
    const n = leve ? 1400 : 2800
    const pos = new Float32Array(n * 3)
    const semente = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      pos[i * 3] = -18 + Math.random() * 36
      pos[i * 3 + 1] = -22 + Math.random() * 44
      pos[i * 3 + 2] = -26 + Math.random() * 31
      semente[i] = Math.random()
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(pos, 3))
    g.setAttribute('aSemente', new BufferAttribute(semente, 1))
    const m = new ShaderMaterial({
      uniforms: {
        uTempo: comum.uTempo,
        uNevoa: comum.uNevoa,
        uDensidade: comum.uDensidade,
        uCamY: { value: 0 },
        uTamanho: { value: leve ? 1.3 : 1.6 },
        uAlfa: { value: 0.3 },
      },
      vertexShader: S.neveVert,
      fragmentShader: S.neveFrag,
      transparent: true,
      depthWrite: false,
    })
    return [g, m] as const
  }, [comum, leve])

  useFrame(() => {
    mat.uniforms.uCamY.value = camera.position.y
    mat.uniforms.uAlfa.value = 0.22 + 0.4 * suave(4, 30, mergulho.atual)
  })

  return <points geometry={geo} material={mat} frustumCulled={false} />
}

/* ---------------- bolhas da respiração ---------------- */

const BOLHAS = 160

function Bolhas() {
  const { camera } = useThree()
  const pontos = useRef<Points>(null)
  const sim = useMemo(
    () => ({
      pos: new Float32Array(BOLHAS * 3),
      tam: new Float32Array(BOLHAS),
      base: new Float32Array(BOLHAS),
      pressao0: new Float32Array(BOLHAS),
      vel: new Float32Array(BOLHAS),
      idade: new Float32Array(BOLHAS).fill(99),
      semente: Float32Array.from({ length: BOLHAS }, () => Math.random() * 10),
      proxima: 0,
      emitidas: 0,
      ciclo: -1,
    }),
    [],
  )
  const geo = useMemo(() => {
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(sim.pos, 3))
    g.setAttribute('aTamanho', new BufferAttribute(sim.tam, 1))
    return g
  }, [sim])
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: S.bolhaVert,
        fragmentShader: S.bolhaFrag,
        transparent: true,
        depthWrite: false,
      }),
    [],
  )
  const semMovimento = useMemo(reduzido, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    // expira entre 2,4 s e 3,1 s de cada ciclo de 4,2 s
    const ciclo = Math.floor(t / 4.2)
    const fase = t - ciclo * 4.2
    if (ciclo !== sim.ciclo && fase > 2.4) {
      sim.ciclo = ciclo
      sim.emitidas = 0
    }
    const porCiclo = semMovimento ? 6 : 22
    if (sim.ciclo === ciclo && fase > 2.4 && fase < 3.1 && sim.emitidas < porCiclo && camera.position.y < -0.6) {
      const quantas = Math.min(porCiclo - sim.emitidas, Math.ceil(porCiclo * (dt / 0.7)) + 1)
      for (let k = 0; k < quantas; k++) {
        const i = sim.proxima
        sim.proxima = (sim.proxima + 1) % BOLHAS
        sim.pos[i * 3] = camera.position.x + 0.35 + (Math.random() - 0.5) * 0.3
        sim.pos[i * 3 + 1] = camera.position.y - 0.55 + Math.random() * 0.2
        sim.pos[i * 3 + 2] = camera.position.z - 2.3 + (Math.random() - 0.5) * 0.4
        sim.base[i] = 0.045 + Math.random() * 0.07
        sim.pressao0[i] = 1 + Math.max(0, -sim.pos[i * 3 + 1]) / 10
        sim.vel[i] = 1.0 + Math.random() * 0.8
        sim.idade[i] = 0
        sim.emitidas++
      }
    }

    for (let i = 0; i < BOLHAS; i++) {
      if (sim.idade[i] > 8) {
        sim.tam[i] = 0
        continue
      }
      sim.idade[i] += dt
      const y = (sim.pos[i * 3 + 1] += sim.vel[i] * dt)
      sim.pos[i * 3] += Math.sin(sim.idade[i] * 7 + sim.semente[i]) * 0.3 * dt
      sim.pos[i * 3 + 2] += Math.cos(sim.idade[i] * 6 + sim.semente[i]) * 0.2 * dt
      if (y > -0.05) {
        sim.idade[i] = 99
        sim.tam[i] = 0
        continue
      }
      // Boyle: o volume cresce com a queda de pressão → raio ∝ raiz cúbica
      const pressao = 1 + Math.max(0, -y) / 10
      sim.tam[i] = sim.base[i] * Math.cbrt(sim.pressao0[i] / pressao)
    }
    const g = pontos.current?.geometry
    if (g) {
      g.getAttribute('position').needsUpdate = true
      g.getAttribute('aTamanho').needsUpdate = true
    }
  })

  return <points ref={pontos} geometry={geo} material={mat} frustumCulled={false} />
}

/* ---------------- o cardume ---------------- */

function geometriaPeixe() {
  const corpo = new LatheGeometry(
    [
      new Vector2(0, -0.17),
      new Vector2(0.03, -0.12),
      new Vector2(0.052, -0.03),
      new Vector2(0.047, 0.06),
      new Vector2(0.026, 0.13),
      new Vector2(0, 0.17),
    ],
    8,
  )
  corpo.rotateX(Math.PI / 2) // cabeça pra +z
  corpo.scale(0.5, 1.2, 1) // peixe é achatado dos lados
  const cauda = new BufferGeometry()
  cauda.setAttribute('position', new Float32BufferAttribute([0, 0, -0.15, 0, 0.07, -0.26, 0, -0.07, -0.26], 3))
  cauda.setAttribute('normal', new Float32BufferAttribute([1, 0, 0, 1, 0, 0, 1, 0, 0], 3))
  cauda.setAttribute('uv', new Float32BufferAttribute([0, 0, 1, 1, 1, 0], 2))
  return mergeGeometries([corpo.toNonIndexed(), cauda])!
}

// Boids simplificado: cada peixe persegue um ponto de uma "ciranda" em volta
// do centro do cardume (que passeia entre 12 e 20 m), se afasta dos vizinhos
// muito próximos, e foge do cursor.
function Peixes({ leve }: { leve: boolean }) {
  const { camera } = useThree()
  const n = leve ? 80 : 140
  const malha = useRef<InstancedMesh>(null)

  // Pouco metal (sem mapa de ambiente, metal só reflete escuridão) e um
  // emissivo fraquinho azul-petróleo: prateado, não silhueta preta.
  const [geo, mat] = useMemo(
    () =>
      [
        geometriaPeixe(),
        new MeshStandardMaterial({
          color: '#ffffff',
          metalness: 0.22,
          roughness: 0.38,
          emissive: '#1d4150',
          emissiveIntensity: 0.55,
          side: DoubleSide,
        }),
      ] as const,
    [],
  )

  const sim = useMemo(() => {
    const pos = new Float32Array(n * 3)
    const vel = new Float32Array(n * 3)
    const off = new Float32Array(n * 3)
    const semente = new Float32Array(n)
    const escala = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 1.2 + Math.random() * 2.6
      off[i * 3] = Math.cos(a) * r
      off[i * 3 + 1] = (Math.random() - 0.5) * 2.2
      off[i * 3 + 2] = Math.sin(a) * r
      pos[i * 3] = off[i * 3]
      pos[i * 3 + 1] = -16 + off[i * 3 + 1]
      pos[i * 3 + 2] = -8 + off[i * 3 + 2]
      vel[i * 3 + 2] = 2
      semente[i] = Math.random() * 10
      escala[i] = 1.3 + Math.random() * 0.6
    }
    return { pos, vel, off, semente, escala }
  }, [n])

  useEffect(() => {
    const m = malha.current
    if (!m) return
    const c = new Color()
    for (let i = 0; i < n; i++) m.setColorAt(i, c.set('#9fb4c2').lerp(new Color('#e2ecf1'), Math.random()))
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [n])

  const tmp = useMemo(
    () => ({
      o: new Object3D(),
      q: new Quaternion(),
      q2: new Quaternion(),
      frente: new Vector3(0, 0, 1),
      cima: new Vector3(0, 1, 0),
      dir: new Vector3(),
      ray: new Raycaster(),
      plano: new Plane(new Vector3(0, 0, 1), 0),
      ndc: new Vector2(),
      ptr: new Vector3(),
    }),
    [],
  )

  useFrame((state, delta) => {
    const m = malha.current
    if (!m) return
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    const d = mergulho.atual
    m.visible = d > 4 && d < 30
    if (!m.visible) return

    const cx = Math.sin(t * 0.11) * 5
    const cy = -16 + Math.sin(t * 0.07) * 2.5
    const cz = -8 + Math.cos(t * 0.09) * 3
    const giro = t * 0.35
    const cg = Math.cos(giro)
    const sg = Math.sin(giro)

    tmp.ndc.set(mergulho.ponteiro.x, mergulho.ponteiro.y)
    tmp.ray.setFromCamera(tmp.ndc, camera)
    tmp.plano.constant = -cz
    const temPtr = tmp.ray.ray.intersectPlane(tmp.plano, tmp.ptr) !== null

    const { pos, vel, off } = sim
    for (let i = 0; i < n; i++) {
      const i3 = i * 3
      const ox = off[i3] * cg - off[i3 + 2] * sg
      const oz = off[i3] * sg + off[i3 + 2] * cg
      let ax = (cx + ox - pos[i3]) * 1.1
      let ay = (cy + off[i3 + 1] - pos[i3 + 1]) * 1.1
      let az = (cz + oz - pos[i3 + 2]) * 1.1

      for (let j = 0; j < n; j++) {
        if (j === i) continue
        const j3 = j * 3
        const dx = pos[i3] - pos[j3]
        const dy = pos[i3 + 1] - pos[j3 + 1]
        const dz = pos[i3 + 2] - pos[j3 + 2]
        const dist2 = dx * dx + dy * dy + dz * dz
        if (dist2 < 0.2 && dist2 > 1e-6) {
          const dist = Math.sqrt(dist2)
          const f = ((0.45 - dist) / dist) * 7
          ax += dx * f
          ay += dy * f
          az += dz * f
        }
      }

      if (temPtr) {
        const dx = pos[i3] - tmp.ptr.x
        const dy = pos[i3 + 1] - tmp.ptr.y
        const dz = pos[i3 + 2] - tmp.ptr.z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 3.2 && dist > 1e-4) {
          const f = (22 * (1 - dist / 3.2)) / dist
          ax += dx * f
          ay += dy * f
          az += dz * f
        }
      }

      vel[i3] += ax * dt
      vel[i3 + 1] += ay * dt
      vel[i3 + 2] += az * dt
      let v = Math.hypot(vel[i3], vel[i3 + 1], vel[i3 + 2])
      const vAlvo = Math.min(4.6, Math.max(1.4, v))
      if (v > 1e-5) {
        vel[i3] *= vAlvo / v
        vel[i3 + 1] *= vAlvo / v
        vel[i3 + 2] *= vAlvo / v
        v = vAlvo
      }
      pos[i3] += vel[i3] * dt
      pos[i3 + 1] += vel[i3 + 1] * dt
      pos[i3 + 2] += vel[i3 + 2] * dt

      tmp.dir.set(vel[i3] / v, vel[i3 + 1] / v, vel[i3 + 2] / v)
      tmp.q.setFromUnitVectors(tmp.frente, tmp.dir)
      tmp.q2.setFromAxisAngle(tmp.cima, Math.sin(t * 13 + sim.semente[i] * 6) * 0.22)
      tmp.o.quaternion.copy(tmp.q).multiply(tmp.q2)
      tmp.o.position.set(pos[i3], pos[i3 + 1], pos[i3 + 2])
      tmp.o.scale.setScalar(sim.escala[i])
      tmp.o.updateMatrix()
      m.setMatrixAt(i, tmp.o.matrix)
    }
    m.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={malha} args={[geo, mat, n]} frustumCulled={false} />
}

/* ---------------- garoupas (só a lanterna mostra) ---------------- */

// Três peixes grandes e lentos girando em órbitas largas entre 28 e 37 m —
// é escuro demais pra vê-los sem a lanterna, e é pra isso que elas estão ali.
const ROTAS_GAROUPA = [
  { cx: -1.5, cy: -29.5, cz: -5, r: 4.2, vel: 0.13, fase: 0 },
  { cx: 3.5, cy: -33.5, cz: -8, r: 5.2, vel: -0.1, fase: 2.1 },
  { cx: -3, cy: -37, cz: -3, r: 3.4, vel: 0.16, fase: 4.2 },
]

function Garoupas() {
  const refs = useRef<(Mesh | null)[]>([])
  const geo = useMemo(geometriaPeixe, [])
  const mat = useMemo(() => new MeshStandardMaterial({ color: '#7d8a6f', roughness: 0.75, side: DoubleSide }), [])
  const tmp = useMemo(() => ({ dir: new Vector3(), frente: new Vector3(0, 0, 1), q: new Quaternion(), q2: new Quaternion(), cima: new Vector3(0, 1, 0) }), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const visivel = mergulho.atual > 20
    ROTAS_GAROUPA.forEach((r, i) => {
      const m = refs.current[i]
      if (!m) return
      m.visible = visivel
      if (!visivel) return
      const a = r.fase + t * r.vel
      m.position.set(r.cx + Math.cos(a) * r.r, r.cy + Math.sin(a * 2.3) * 0.4, r.cz + Math.sin(a) * r.r)
      // tangente da órbita = direção do nado
      const s = Math.sign(r.vel)
      tmp.dir.set(-Math.sin(a) * s, Math.cos(a * 2.3) * 0.08, Math.cos(a) * s).normalize()
      tmp.q.setFromUnitVectors(tmp.frente, tmp.dir)
      tmp.q2.setFromAxisAngle(tmp.cima, Math.sin(t * 3 + i) * 0.12)
      m.quaternion.copy(tmp.q).multiply(tmp.q2)
    })
  })

  return (
    <>
      {ROTAS_GAROUPA.map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            refs.current[i] = m
          }}
          geometry={geo}
          material={mat}
          scale={[5.5, 5.5, 5.5]}
        />
      ))}
    </>
  )
}

/* ---------------- platô de areia a 14 m ---------------- */

function Plataforma({ comum }: { comum: Comum }) {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { ...comum, uCaustica: { value: 0.75 } },
        vertexShader: S.areiaVert,
        fragmentShader: S.areiaFrag,
      }),
    [comum],
  )
  const pedras = useMemo(() => pedrasAleatorias(9, [-13, -7.5], [-16.2, -15.6], [-22, 0], 0.35, 1.1), [])
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-26.5, -16, -18]} material={mat}>
        <planeGeometry args={[40, 50]} />
      </mesh>
      <Pedras lista={pedras} cor="#5b6b62" />
    </>
  )
}

/* ---------------- paredão do platô até o fundo ---------------- */

function Paredao() {
  const geo = useMemo(() => {
    const g = new PlaneGeometry(50, 28, 60, 34)
    const p = g.getAttribute('position') as BufferAttribute
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i)
      const y = p.getY(i)
      const z =
        Math.sin(x * 0.55) * 0.6 + Math.sin(y * 0.8 + x * 0.3) * 0.5 + Math.sin(x * 1.7 + y * 1.3) * 0.22 + (Math.random() - 0.5) * 0.25
      p.setZ(i, z)
    }
    g.computeVertexNormals()
    return g
  }, [])
  // topo 0,4 m abaixo da areia do platô: o relevo não fura a borda
  return (
    <mesh geometry={geo} position={[-7.2, -30.4, -18]} rotation={[0, Math.PI / 2, 0]}>
      <meshStandardMaterial color="#44616b" roughness={1} flatShading />
    </mesh>
  )
}

/* ---------------- fundo a 42 m, com o naufrágio ---------------- */

function Fundo() {
  const chao = useMemo(() => {
    const g = new PlaneGeometry(140, 140, 70, 70)
    const p = g.getAttribute('position') as BufferAttribute
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i)
      const y = p.getY(i)
      p.setZ(i, Math.sin(x * 0.21) * 0.45 + Math.sin(y * 0.17 + x * 0.1) * 0.5 + Math.sin(x * 0.9 + y * 0.7) * 0.12)
    }
    g.computeVertexNormals()
    return g
  }, [])
  // nenhuma pedra no corredor entre a câmera e o naufrágio
  const pedras = useMemo(
    () =>
      pedrasAleatorias(40, [-16, 16], [-43.4, -42.8], [-24, 1], 0.5, 1.5)
        .filter((p) => !(Math.abs(p.pos[0] - 2.5) < 6 && p.pos[2] > -12))
        .slice(0, 14),
    [],
  )

  return (
    <>
      <mesh geometry={chao} rotation={[-Math.PI / 2, 0, 0]} position={[0, -43.6, -20]}>
        <meshStandardMaterial color="#6f756c" roughness={1} />
      </mesh>
      <Pedras lista={pedras} cor="#4b5650" />
      <Naufragio />
    </>
  )
}

function Naufragio() {
  const casco = useMemo(() => {
    const g = new BoxGeometry(7.5, 1.9, 2.6, 16, 4, 6)
    const p = g.getAttribute('position') as BufferAttribute
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i)
      let y = p.getY(i)
      let z = p.getZ(i)
      if (x > 1.5) {
        const k = (x - 1.5) / 2.25
        z *= 1 - k * 0.92 // proa afinando
        if (y > 0) y += k * 0.3
      }
      if (x < -2.5) z *= 1 - ((-2.5 - x) / 1.25) * 0.25
      if (y < 0) {
        const k = -y / 0.95
        z *= 1 - k * k * 0.55 // fundo arredondado
      }
      p.setY(i, y)
      p.setZ(i, z)
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <group position={[3.4, -42.9, -4]} rotation={[0.05, -0.62, 0.3]}>
      <mesh geometry={casco}>
        <meshStandardMaterial color="#4f3d31" roughness={0.95} metalness={0.25} flatShading />
      </mesh>
      <mesh position={[-1.4, 1.35, 0]}>
        <boxGeometry args={[1.7, 1.1, 1.7]} />
        <meshStandardMaterial color="#44352b" roughness={1} flatShading />
      </mesh>
      <mesh position={[0.9, 2.9, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.07, 0.1, 5.4, 8]} />
        <meshStandardMaterial color="#3a2e26" roughness={1} />
      </mesh>
    </group>
  )
}

type Pedra = { pos: [number, number, number]; r: number; rot: [number, number, number] }

function pedrasAleatorias(n: number, xs: [number, number], ys: [number, number], zs: [number, number], rMin: number, rMax: number) {
  return Array.from<unknown, Pedra>({ length: n }, () => ({
    pos: [
      xs[0] + Math.random() * (xs[1] - xs[0]),
      ys[0] + Math.random() * (ys[1] - ys[0]),
      zs[0] + Math.random() * (zs[1] - zs[0]),
    ],
    r: rMin + Math.random() * (rMax - rMin),
    rot: [Math.random() * 3, Math.random() * 3, Math.random() * 3],
  }))
}

function Pedras({ lista, cor }: { lista: Pedra[]; cor: string }) {
  const geo = useMemo(() => {
    const g = new IcosahedronGeometry(1, 1)
    const p = g.getAttribute('position') as BufferAttribute
    for (let i = 0; i < p.count; i++) {
      const k = 0.78 + Math.random() * 0.4
      p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * 0.7, p.getZ(i) * k)
    }
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <>
      {lista.map((p, i) => (
        <mesh key={i} geometry={geo} position={p.pos} rotation={p.rot} scale={p.r}>
          <meshStandardMaterial color={cor} roughness={1} flatShading />
        </mesh>
      ))}
    </>
  )
}

/* ---------------- a lanterna ---------------- */

// Abaixo de ~24 m a luz do sol some e o cursor vira a lanterna: um SpotLight
// saindo da "mão" (um pouco à direita e abaixo da câmera) + um cone aditivo
// pro facho aparecer na água.
function Lanterna() {
  const { camera, scene } = useThree()
  const facho = useRef<Mesh>(null)
  const luz = useMemo(() => new SpotLight('#ffe2a1', 0, 0, 0.34, 0.55, 1.3), [])
  const alvo = useMemo(() => new Object3D(), [])
  const cone = useMemo(() => {
    const g = new ConeGeometry(2.6, 14, 40, 1, true)
    g.translate(0, -7, 0) // ponta na origem, abrindo pra -y
    return g
  }, [])
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { uIntensidade: { value: 0 } },
        vertexShader: S.fachoVert,
        fragmentShader: S.fachoFrag,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: DoubleSide,
      }),
    [],
  )
  const tmp = useMemo(
    () => ({ dir: new Vector3(0, -0.2, -1).normalize(), alvoDir: new Vector3(), mao: new Vector3(), baixo: new Vector3(0, -1, 0), q: new Quaternion() }),
    [],
  )

  useEffect(() => {
    luz.target = alvo
    scene.add(luz)
    scene.add(alvo)
    return () => {
      scene.remove(luz)
      scene.remove(alvo)
    }
  }, [scene, luz, alvo])

  useFrame(() => {
    const liga = suave(21, 27, mergulho.atual)
    tmp.alvoDir.set(mergulho.ponteiro.x, mergulho.ponteiro.y, 0.5).unproject(camera).sub(camera.position).normalize()
    tmp.dir.lerp(tmp.alvoDir, 0.12).normalize()
    tmp.mao.set(0.35, -0.32, 0).applyQuaternion(camera.quaternion).add(camera.position)

    luz.intensity = liga * 72
    luz.position.copy(tmp.mao)
    alvo.position.copy(tmp.mao).addScaledVector(tmp.dir, 10)

    const f = facho.current
    if (f) {
      f.visible = liga > 0.01
      f.position.copy(tmp.mao)
      f.quaternion.copy(tmp.q.setFromUnitVectors(tmp.baixo, tmp.dir))
      mat.uniforms.uIntensidade.value = liga * 0.28
    }
  })

  return <mesh ref={facho} geometry={cone} material={mat} frustumCulled={false} />
}
