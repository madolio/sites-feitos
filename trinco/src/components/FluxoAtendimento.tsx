import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Reveal from './Reveal'

// O que acontece de verdade depois que a chamada já foi triada (ver
// Triagem.tsx) e aceita: do despacho até a chave entregue. O texto abaixo é
// o mesmo passo a passo real de um atendimento; a cena acima ilustra o
// miolo técnico — o que o chaveiro está de fato fazendo dentro da
// fechadura durante a etapa 3.
type Estagio = {
  numero: string
  titulo: string
  texto: string
}

const estagios: Estagio[] = [
  {
    numero: '01',
    titulo: 'Chamada recebida',
    texto: 'Endereço, tipo de fechadura e nível de urgência anotados antes de despachar alguém.',
  },
  {
    numero: '02',
    titulo: 'A caminho',
    texto: 'Técnico se desloca até o endereço; o tempo varia com a região da cidade e o trânsito.',
  },
  {
    numero: '03',
    titulo: 'Diagnóstico e reparo do cilindro',
    texto:
      'Chave testada nos pinos; quando um pino está gasto ou fora de posição, ele é trocado ali mesmo, na sua frente.',
  },
  {
    numero: '04',
    titulo: 'Teste de segurança',
    texto: 'Cilindro travado e destravado repetidas vezes pra confirmar que os pinos estão alinhados de verdade.',
  },
  {
    numero: '05',
    titulo: 'Serviço concluído',
    texto: 'Chave entregue, valor fechado na hora e atendimento encerrado.',
  },
]

type EstadoPino = 'ok' | 'alto' | 'baixo'

// Cinco pinos-pilha do cilindro. Dois nascem desalinhados (um "alto" — pino
// gasto que fica preso acima da linha de corte — e um "baixo" — mola fraca
// que não sobe o suficiente); os outros três já encaixam de primeira.
const pinos: { cx: number; estado: EstadoPino }[] = [
  { cx: 220, estado: 'ok' },
  { cx: 250, estado: 'alto' },
  { cx: 280, estado: 'ok' },
  { cx: 310, estado: 'baixo' },
  { cx: 340, estado: 'ok' },
]

const dentesChave = [220, 250, 280, 310, 340]

const CX_EIXO = 280
const CY_EIXO = 155
const Y_CORRETO = 135
const Y_REPOUSO = 195
const Y_ALTO = 120
const Y_BAIXO = 150

export default function FluxoAtendimento() {
  const raizRef = useRef<HTMLElement>(null)
  const chaveRef = useRef<SVGGElement>(null)
  const giroRef = useRef<SVGGElement>(null)
  const pinoRefs = useRef<(SVGGElement | null)[]>([])
  const pinoChaveRefs = useRef<(SVGRectElement | null)[]>([])
  const pinoMotorRefs = useRef<(SVGRectElement | null)[]>([])
  const linhaCorteConfirmRef = useRef<SVGLineElement>(null)
  const okRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const raiz = raizRef.current
    if (!raiz) return

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) return // já nasce completo, sem animação

    const chave = chaveRef.current
    const giro = giroRef.current
    const linhaConfirm = linhaCorteConfirmRef.current
    const ok = okRef.current
    const grupos = pinoRefs.current
    const partesChave = pinoChaveRefs.current
    const partesMotor = pinoMotorRefs.current

    if (
      !chave ||
      !giro ||
      !linhaConfirm ||
      !ok ||
      grupos.some((g) => !g) ||
      partesChave.some((p) => !p) ||
      partesMotor.some((p) => !p)
    ) {
      return
    }

    // Estado inicial: fechadura travada, sem chave — pinos caídos no fundo
    // do canal, cilindro destravado visualmente alinhado a 0°.
    gsap.set(chave, { x: -320 })
    gsap.set(giro, { rotation: 0, transformOrigin: `${CX_EIXO}px ${CY_EIXO}px` })
    gsap.set(grupos, { y: Y_REPOUSO })
    gsap.set(linhaConfirm, { opacity: 0 })
    gsap.set(ok, { opacity: 0, y: 10 })

    let disparado = false
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && !disparado) {
            disparado = true
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

            // 1) a chave desliza pra dentro do canal da chave
            tl.to(chave, { x: 0, duration: 1.3, ease: 'power2.inOut' }, 0)

            // 2) cada pino reage exatamente quando os dentes da chave
            //    passam por baixo dele — o dente empurra o pino pra cima
            const chegada = [0.35, 0.55, 0.75, 0.95, 1.15]
            pinos.forEach((pino, i) => {
              const alvo = pino.estado === 'alto' ? Y_ALTO : pino.estado === 'baixo' ? Y_BAIXO : Y_CORRETO
              tl.to(grupos[i], { y: alvo, duration: 0.32, ease: 'power2.out' }, chegada[i])
              if (pino.estado !== 'ok') {
                // 3) diagnóstico: pino que não assentou na linha de corte
                //    acende em tom de emergência, brevemente
                tl.set(
                  [partesChave[i], partesMotor[i]],
                  { attr: { fill: 'var(--color-emergencia)', stroke: 'var(--color-emergencia)' } },
                  chegada[i],
                )
              }
            })

            // 4) reparo: os pinos desalinhados saem (sobem, somem) e um
            //    pino novo desce no lugar, já certo na linha de corte
            pinos.forEach((pino, i) => {
              if (pino.estado === 'ok') return
              tl.to(grupos[i], { y: '-=30', opacity: 0, duration: 0.4, ease: 'power2.in' }, 2.1)
              tl.set(grupos[i], { y: Y_CORRETO - 35 }, 2.55)
              tl.set(partesChave[i], { attr: { fill: 'var(--color-latao)', stroke: 'var(--color-grafite)' } }, 2.55)
              tl.set(
                partesMotor[i],
                { attr: { fill: 'var(--color-limalha-forte)', stroke: 'var(--color-grafite)' } },
                2.55,
              )
              tl.to(grupos[i], { y: Y_CORRETO, opacity: 1, duration: 0.45, ease: 'power2.out' }, 2.6)
            })

            // 5) linha de corte confirma alinhamento total
            tl.to(linhaConfirm, { opacity: 1, duration: 0.35 }, 3.1)

            // 6) a chave gira, levando o núcleo do cilindro junto — o giro
            //    só é possível porque todos os pinos já estão na linha
            tl.to(giro, { rotation: 90, duration: 0.6, ease: 'power3.inOut' }, 3.55)

            // 7) teste de segurança confirmado
            tl.to(ok, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 4.25)

            observer.disconnect()
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(raiz)
    return () => observer.disconnect()
  }, [])

  const rotulo =
    'Animação do miolo de um cilindro pino-tumbler: a chave entra, os pinos internos reagem aos seus dentes, um pino gasto é trocado por um novo, e a chave gira o núcleo do cilindro para confirmar o reparo.'

  return (
    <section
      id="fluxo"
      ref={raizRef as React.RefObject<HTMLElement>}
      className="border-b border-linha bg-limalha py-20"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-placa text-latao">o que acontece dentro da fechadura</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">O miolo do cilindro, em reparo</h2>
          <p className="mt-4 max-w-2xl text-grafite/75">
            Isto é o que o técnico está fazendo de verdade quando abre ou troca uma fechadura no
            local: testar cada pino contra a chave e substituir o que estiver gasto, antes de
            fechar o serviço.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 border border-linha bg-limalha-forte px-4 py-8 sm:px-8 sm:py-10">
          <svg
            viewBox="0 0 520 300"
            className="mx-auto h-auto w-full max-w-2xl"
            role="img"
            aria-label={rotulo}
          >
            {/* corpo do cilindro (fixo) */}
            <rect
              x={180}
              y={15}
              width={200}
              height={215}
              fill="var(--color-limalha)"
              stroke="var(--color-grafite)"
              strokeWidth={2}
            />

            {/* linha de corte — fronteira entre o corpo (fixo) e o núcleo (gira) */}
            <line
              x1={188}
              y1={105}
              x2={372}
              y2={105}
              stroke="var(--color-linha)"
              strokeWidth={1.5}
              strokeDasharray="4 5"
            />
            <line
              ref={linhaCorteConfirmRef}
              x1={188}
              y1={105}
              x2={372}
              y2={105}
              stroke="var(--color-latao)"
              strokeWidth={2.5}
            />

            {/* núcleo do cilindro — gira junto com a chave depois que os pinos alinham */}
            <g ref={giroRef}>
              <rect
                x={190}
                y={105}
                width={180}
                height={100}
                fill="var(--color-limalha-forte)"
                stroke="var(--color-grafite)"
                strokeWidth={2}
              />
              {/* marca de índice do núcleo — evidencia visualmente o giro */}
              <line x1={CX_EIXO} y1={108} x2={CX_EIXO} y2={96} stroke="var(--color-latao)" strokeWidth={3} strokeLinecap="round" />

              {/* chave: entra deslizando e depois gira com o núcleo */}
              <g ref={chaveRef}>
                <rect x={60} y={160} width={50} height={30} fill="var(--color-latao)" stroke="var(--color-grafite)" strokeWidth={2} />
                <rect x={110} y={170} width={250} height={10} fill="var(--color-latao)" stroke="var(--color-grafite)" strokeWidth={1.5} />
                {dentesChave.map((x) => (
                  <path key={x} d={`M ${x - 6},180 L ${x},172 L ${x + 6},180 Z`} fill="var(--color-limalha)" stroke="none" />
                ))}
              </g>
            </g>

            {/* pilhas de pinos — cada uma reage à passagem da chave por baixo dela */}
            {pinos.map((pino, i) => (
              <g
                key={i}
                ref={(el) => {
                  pinoRefs.current[i] = el
                }}
                style={{ transform: `translate(${pino.cx}px, ${Y_CORRETO}px)` }}
              >
                <rect
                  ref={(el) => {
                    pinoMotorRefs.current[i] = el
                  }}
                  x={-7}
                  y={-65}
                  width={14}
                  height={35}
                  fill="var(--color-limalha-forte)"
                  stroke="var(--color-grafite)"
                  strokeWidth={1.5}
                />
                <g stroke="var(--color-linha)" strokeWidth={1.5} strokeLinecap="round">
                  <line x1={-4} y1={-70} x2={4} y2={-70} />
                  <line x1={-4} y1={-74} x2={4} y2={-74} />
                  <line x1={-4} y1={-78} x2={4} y2={-78} />
                </g>
                <rect
                  ref={(el) => {
                    pinoChaveRefs.current[i] = el
                  }}
                  x={-7}
                  y={-30}
                  width={14}
                  height={30}
                  fill="var(--color-latao)"
                  stroke="var(--color-grafite)"
                  strokeWidth={1.5}
                />
              </g>
            ))}

            {/* placa de confirmação do teste de segurança */}
            <g ref={okRef}>
              <rect x={392} y={30} width={90} height={44} fill="var(--color-seguro)" stroke="var(--color-grafite)" strokeWidth={2} />
              <path
                d="M 405,52 L 416,63 L 435,40"
                fill="none"
                stroke="var(--color-limalha)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <foreignObject x={392} y={76} width={90} height={16}>
                <div className="dado-placa text-center text-grafite/70">testado</div>
              </foreignObject>
            </g>
          </svg>
        </Reveal>

        <ol className="mt-8 flex flex-col gap-6 sm:grid sm:grid-cols-5 sm:gap-5">
          {estagios.map((estagio) => (
            <li key={estagio.numero} className="flex gap-3 sm:block">
              <span className="dado-placa w-7 shrink-0 text-grafite/45 sm:block sm:w-auto">
                {estagio.numero}
              </span>
              <span>
                <span className="block font-semibold text-grafite">{estagio.titulo}</span>
                <span className="mt-1 block text-[0.9375rem] leading-snug text-grafite/70">
                  {estagio.texto}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
