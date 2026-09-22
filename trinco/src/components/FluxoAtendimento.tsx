import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Reveal from './Reveal'

// O que acontece de verdade depois que a chamada já foi triada (ver
// Triagem.tsx) e aceita: do despacho até a chave entregue. Cada etapa é um
// passo real do atendimento, não uma decoração — inclusive o teste de
// segurança, que todo chaveiro sério faz antes de ir embora.
type Estagio = {
  tipo: 'chamada' | 'deslocamento' | 'fechadura' | 'teste' | 'concluido'
  numero: string
  titulo: string
  texto: string
}

const estagios: Estagio[] = [
  {
    tipo: 'chamada',
    numero: '01',
    titulo: 'Chamada recebida',
    texto: 'Endereço, tipo de fechadura e nível de urgência anotados antes de despachar alguém.',
  },
  {
    tipo: 'deslocamento',
    numero: '02',
    titulo: 'A caminho',
    texto: 'Técnico se desloca até o endereço; o tempo varia com a região da cidade e o trânsito.',
  },
  {
    tipo: 'fechadura',
    numero: '03',
    titulo: 'Abertura ou troca da fechadura',
    texto: 'Trabalho técnico no local: gazua, pistola de impressão ou troca do cilindro, conforme o caso.',
  },
  {
    tipo: 'teste',
    numero: '04',
    titulo: 'Teste de segurança',
    texto: 'Fechadura é travada e destravada na frente do cliente pra confirmar que está segurando de verdade.',
  },
  {
    tipo: 'concluido',
    numero: '05',
    titulo: 'Serviço concluído',
    texto: 'Chave entregue, valor fechado na hora e atendimento encerrado.',
  },
]

// Coordenadas dos nós no viewBox horizontal (desktop) e vertical (mobile).
// Espaçamento igual entre os cinco pontos em cada eixo.
const coordsHorizontal = [80, 290, 500, 710, 920]
const coordsVertical = [70, 260, 450, 640, 830]

function IconeEstagio({ tipo, cx, cy }: { tipo: Estagio['tipo']; cx: number; cy: number }) {
  const placa = (
    <rect
      x="-15"
      y="-15"
      width="30"
      height="30"
      fill={tipo === 'concluido' ? 'var(--color-seguro)' : 'var(--color-limalha-forte)'}
      stroke="var(--color-linha)"
      strokeWidth="1.5"
    />
  )

  let miolo: React.ReactNode = null

  switch (tipo) {
    case 'chamada':
      miolo = (
        <g fill="none" stroke="var(--color-latao)" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="-6" cy="6" r="2.5" fill="var(--color-latao)" stroke="none" />
          <path d="M-2,2 A8,8 0 0,1 6,-6" />
          <path d="M2,-2 A13,13 0 0,1 11,-11" opacity="0.55" />
        </g>
      )
      break
    case 'deslocamento':
      miolo = (
        <g fill="none" stroke="var(--color-grafite)" strokeWidth="1.5" strokeLinejoin="miter">
          <path d="M-10,5 H9 V-3 H1 L-4,-8 H-10 Z" />
          <circle cx="-6" cy="6" r="2" fill="var(--color-grafite)" stroke="none" />
          <circle cx="5" cy="6" r="2" fill="var(--color-grafite)" stroke="none" />
        </g>
      )
      break
    case 'fechadura':
      miolo = (
        <g stroke="var(--color-grafite)" strokeWidth="1.5" fill="none">
          <path d="M-5,-2 V-6 a5,5 0 0 1 10,0 v4" />
          <rect x="-7" y="-2" width="14" height="11" fill="var(--color-limalha)" strokeWidth="1.5" />
          <circle cx="0" cy="2" r="1.6" fill="var(--color-grafite)" stroke="none" />
          <line x1="0" y1="3.4" x2="0" y2="6" />
        </g>
      )
      break
    case 'teste':
      miolo = (
        <g fill="none">
          <path
            d="M0,-9 L8,-6 V2 C8,7 4,10 0,11 C-4,10 -8,7 -8,2 V-6 Z"
            stroke="var(--color-grafite)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M-4,0.5 L-1,4 L5,-3.5"
            stroke="var(--color-seguro)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )
      break
    case 'concluido':
      miolo = (
        <path
          d="M-6,0.5 L-2,5.5 L7,-6"
          fill="none"
          stroke="var(--color-limalha)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )
      break
  }

  return (
    <g data-no transform={`translate(${cx} ${cy})`}>
      {placa}
      {miolo}
    </g>
  )
}

export default function FluxoAtendimento() {
  const raizRef = useRef<HTMLElement>(null)
  const [fluindo, setFluindo] = useState(false)

  useEffect(() => {
    const raiz = raizRef.current
    if (!raiz) return

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) return // já nasce completo, sem animação

    const rotas = raiz.querySelectorAll<SVGPathElement>('[data-rota]')
    const nos = raiz.querySelectorAll<SVGGElement>('[data-no]')
    const legenda = raiz.querySelectorAll<HTMLLIElement>('[data-legenda]')

    rotas.forEach((rota) => {
      const comprimento = rota.getTotalLength()
      gsap.set(rota, { strokeDasharray: comprimento, strokeDashoffset: comprimento })
    })
    gsap.set(nos, { opacity: 0, y: 8 })
    gsap.set(legenda, { opacity: 0, y: 10 })

    let disparado = false
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && !disparado) {
            disparado = true
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
            tl.to(rotas, { strokeDashoffset: 0, duration: 0.9, stagger: 0.15, ease: 'none' })
              .to(nos, { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 }, '-=0.55')
              .to(legenda, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.45')
              .add(() => setFluindo(true))
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
    'Diagrama do fluxo de atendimento do chaveiro: chamada recebida, deslocamento até o endereço, abertura ou troca da fechadura, teste de segurança e serviço concluído.'

  return (
    <section
      id="fluxo"
      ref={raizRef as React.RefObject<HTMLElement>}
      className="border-b border-linha bg-limalha py-20"
    >
      <style>{`
        @keyframes fluxo-atendimento-desloc {
          to { stroke-dashoffset: -32; }
        }
        .fluxo-atendimento-anim {
          animation: fluxo-atendimento-desloc 2.4s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-placa text-latao">como o atendimento acontece</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Da chamada até a chave entregue</h2>
          <p className="mt-4 max-w-2xl text-grafite/75">
            Depois que a triagem separa o seu caso, é assim que o técnico conduz o serviço no
            local, do despacho até o teste final na sua frente.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 border border-linha bg-limalha-forte px-4 py-8 sm:px-8 sm:py-10">
          {/* Desktop / tablet: rota horizontal */}
          <svg
            viewBox="0 0 1000 200"
            className="hidden h-auto w-full overflow-visible sm:block"
            role="img"
            aria-label={rotulo}
          >
            <line x1="40" y1="110" x2="960" y2="110" stroke="var(--color-linha)" strokeWidth="1.5" />
            <path data-rota d="M40,110 H960" fill="none" stroke="var(--color-grafite)" strokeWidth="2" />
            <path
              d="M40,110 H960"
              fill="none"
              stroke="var(--color-latao)"
              strokeWidth="2"
              strokeDasharray="6 10"
              strokeLinecap="round"
              opacity="0.55"
              className={fluindo ? 'fluxo-atendimento-anim' : undefined}
            />
            <line x1="945" y1="98" x2="945" y2="122" stroke="var(--color-grafite)" strokeWidth="1.5" />
            <line x1="953" y1="98" x2="953" y2="122" stroke="var(--color-grafite)" strokeWidth="1.5" />

            {estagios.map((estagio, i) => (
              <g key={estagio.tipo}>
                <IconeEstagio tipo={estagio.tipo} cx={coordsHorizontal[i]} cy={110} />
                <foreignObject x={coordsHorizontal[i] - 22} y={132} width="44" height="18">
                  <div className="dado-placa text-center text-latao">{estagio.numero}</div>
                </foreignObject>
              </g>
            ))}
          </svg>

          {/* Mobile: rota vertical empilhada */}
          <svg
            viewBox="0 0 240 900"
            className="h-auto w-full overflow-visible sm:hidden"
            role="img"
            aria-label={rotulo}
          >
            <line x1="70" y1="30" x2="70" y2="870" stroke="var(--color-linha)" strokeWidth="1.5" />
            <path data-rota d="M70,30 V870" fill="none" stroke="var(--color-grafite)" strokeWidth="2" />
            <path
              d="M70,30 V870"
              fill="none"
              stroke="var(--color-latao)"
              strokeWidth="2"
              strokeDasharray="6 10"
              strokeLinecap="round"
              opacity="0.55"
              className={fluindo ? 'fluxo-atendimento-anim' : undefined}
            />
            <line x1="58" y1="855" x2="82" y2="855" stroke="var(--color-grafite)" strokeWidth="1.5" />
            <line x1="58" y1="863" x2="82" y2="863" stroke="var(--color-grafite)" strokeWidth="1.5" />

            {estagios.map((estagio, i) => (
              <g key={estagio.tipo}>
                <IconeEstagio tipo={estagio.tipo} cx={70} cy={coordsVertical[i]} />
                <foreignObject x={100} y={coordsVertical[i] - 9} width="120" height="18">
                  <div className="dado-placa text-latao">{estagio.numero}</div>
                </foreignObject>
              </g>
            ))}
          </svg>
        </Reveal>

        <ol className="mt-8 flex flex-col gap-6 sm:grid sm:grid-cols-5 sm:gap-5">
          {estagios.map((estagio) => (
            <li key={estagio.tipo} data-legenda className="flex gap-3 sm:block">
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
