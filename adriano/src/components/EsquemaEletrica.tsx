import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP)

// Diagrama unifilar (one-line diagram) — o irmão exato do P&ID no ofício
// elétrico: a mesma ideia de desenhar o caminho de uma coisa que corre por
// dentro de uma instalação, só que corrente em vez de água. Símbolos no
// padrão IEC 60617 / NBR (disjuntor com o "×" no contato fixo, DPS com a
// seta, toroide do DR, barramento, aterramento em três barras decrescentes,
// ponto de luz e tomada da NBR 5444).
//
// É a mesma gramática do EsquemaAgua — condutor grosso e claro com o
// tracejado correndo dentro — só que em âmbar, nunca em azul.
const etapas = [
  { nome: 'Entrada', texto: 'Da rede até o medidor.' },
  { nome: 'Disjuntor geral', texto: 'Protege e desliga a instalação inteira.' },
  { nome: 'DPS e aterramento', texto: 'Manda o surto pra terra antes que ele entre.' },
  { nome: 'Quadro de distribuição', texto: 'DR e barramento, o centro da instalação.' },
  { nome: 'Circuitos terminais', texto: 'Cada carga no seu próprio disjuntor.' },
] as const

// Espelham os tokens do index.css: linha, grafite, elétrica e elétrica-luz.
const ELETRODUTO = '#c8d5d9'
const TRACO = '#0f2430'
const CORRENTE = '#95590c'
const BRILHO = '#f0b429'

const VELOCIDADE = 150 // unidades do viewBox por segundo

// Os três circuitos terminais: mesma posição no barramento, no disjuntor e
// na carga, pra que a legenda embaixo caia alinhada.
const circuitos = [580, 720, 860]

function Disjuntor({ x, y }: { x: number; y: number }) {
  // Chave com o "×" no contato fixo: o símbolo de disjuntor. Vertical,
  // porque desce do barramento pro circuito.
  return (
    <g fill="none" stroke={TRACO} strokeWidth="2.5" strokeLinecap="round">
      <circle cx={x} cy={y} r="3.5" fill={TRACO} />
      <line x1={x} y1={y} x2={x + 22} y2={y + 28} />
      <circle cx={x} cy={y + 36} r="3.5" fill={TRACO} />
      <path
        d={`M${x - 6},${y + 30} L${x + 6},${y + 42} M${x + 6},${y + 30} L${x - 6},${y + 42}`}
        strokeWidth="2"
      />
    </g>
  )
}

export default function EsquemaEletrica() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Com `prefers-reduced-motion` nada disso roda: o diagrama já nasce
      // desenhado, com a corrente parada no lugar.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(raiz)

        const fluxo = gsap.timeline({ paused: true })
        fluxo.to(
          q('[data-corrente]'),
          { strokeDashoffset: -32, duration: 32 / VELOCIDADE, ease: 'none', repeat: -1 },
          0,
        )
        fluxo.to(
          q('[data-brilho]'),
          {
            opacity: 0.22,
            duration: 1.1,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 0.35,
          },
          0,
        )

        const entrada = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: { trigger: raiz.current, start: 'top 80%', once: true },
        })
        entrada
          .from(q('[data-condutor]'), { drawSVG: '0%', duration: 0.35, stagger: 0.14, ease: 'none' })
          .from(q('[data-equipamento]'), { opacity: 0, y: 10, duration: 0.45, stagger: 0.16 }, 0.05)
          .from(q('[data-carga]'), { opacity: 0, scale: 0.86, transformOrigin: '50% 50%', duration: 0.5, stagger: 0.12 }, '-=0.4')
          .from(q('[data-etapa]'), { opacity: 0, y: 8, duration: 0.45, stagger: 0.16 }, 0.2)
          .from(q('[data-corrente]'), { opacity: 0, duration: 0.4 }, '-=0.5')
          .add(() => {
            fluxo.play()
          }, '<')

        ScrollTrigger.create({
          trigger: raiz.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (entrada.progress() < 1) return
            if (self.isActive) fluxo.play()
            else fluxo.pause()
          },
        })
      })
    },
    { scope: raiz },
  )

  return (
    <figure ref={raiz}>
      <figcaption className="mb-4 text-[0.9375rem] text-fumo">
        <span className="font-semibold text-grafite">Diagrama unifilar</span> — a
        notação com que uma instalação elétrica é desenhada, da entrada de
        energia até cada circuito.
      </figcaption>

      <div className="prancha px-4 py-6 sm:px-8 sm:py-10">
        <svg
          viewBox="0 0 1000 250"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Diagrama unifilar de uma instalação elétrica: da rede a corrente passa pelo medidor de energia e pelo disjuntor geral, um DPS aterrado protege a entrada, e dentro do quadro de distribuição o DR alimenta o barramento, que se divide em três circuitos terminais — iluminação, tomadas e chuveiro — cada um com seu disjuntor, com o barramento de terra ligado ao aterramento."
        >
          {/* Eletrodutos (parede) e corrente correndo dentro (tracejado) */}
          <g fill="none" strokeLinecap="butt">
            <path data-condutor d="M0,62 H96" stroke={ELETRODUTO} strokeWidth="8" />
            <path data-condutor d="M154,62 H236" stroke={ELETRODUTO} strokeWidth="8" />
            <path data-condutor d="M306,62 H430" stroke={ELETRODUTO} strokeWidth="8" />
            <path data-condutor d="M340,62 V96 M340,132 V172" stroke={ELETRODUTO} strokeWidth="6" />
            <path data-condutor d="M494,62 H938" stroke={TRACO} strokeWidth="8" />
            {circuitos.map((x) => (
              <path
                key={x}
                data-condutor
                d={`M${x},62 V96 M${x},132 V196`}
                stroke={ELETRODUTO}
                strokeWidth="6"
              />
            ))}
            <path data-condutor d="M534,160 V196" stroke={ELETRODUTO} strokeWidth="6" />

            <g strokeWidth="3" strokeDasharray="12 20" stroke={CORRENTE}>
              <path data-corrente d="M0,62 H96" />
              <path data-corrente d="M154,62 H236" />
              <path data-corrente d="M306,62 H430" />
              <path data-corrente d="M494,62 H938" />
              {circuitos.map((x) => (
                <path key={x} data-corrente d={`M${x},132 V196`} />
              ))}
            </g>
          </g>

          {/* 1. Medidor de energia (instrumento: círculo com a grandeza) */}
          <g data-equipamento>
            <circle cx="126" cy="62" r="28" fill="#fff" stroke={TRACO} strokeWidth="2.5" />
            <text
              x="126"
              y="67"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={TRACO}
            >
              kWh
            </text>
          </g>

          {/* 2. Disjuntor geral — chave com o "×" no contato fixo */}
          <g data-equipamento fill="none" stroke={TRACO} strokeWidth="2.5" strokeLinecap="round">
            <circle cx="240" cy="62" r="3.5" fill={TRACO} />
            <line x1="240" y1="62" x2="294" y2="38" />
            <circle cx="302" cy="62" r="3.5" fill={TRACO} />
            <path d="M295,55 L309,69 M309,55 L295,69" strokeWidth="2" />
          </g>

          {/* 3. DPS (para-raios de linha) descarregando no aterramento */}
          <g data-equipamento fill="none" stroke={TRACO} strokeWidth="2.5" strokeLinecap="round">
            <rect x="324" y="96" width="32" height="36" fill="#fff" />
            <path d="M332,126 L348,104" strokeWidth="2" />
            <path d="M348,104 L341,105 M348,104 L347,111" strokeWidth="2" />
            <path d="M326,172 H354 M330,180 H350 M334,188 H346" />
          </g>

          {/* 4. Quadro de distribuição: envoltória tracejada, DR e barramento */}
          <g data-equipamento>
            <rect
              x="386"
              y="32"
              width="580"
              height="144"
              rx="6"
              fill="none"
              stroke={TRACO}
              strokeWidth="2"
              strokeDasharray="9 7"
              strokeOpacity="0.55"
            />
            {/* DR: o toroide que mede a diferença entre ida e volta, e a chave */}
            <g fill="none" stroke={TRACO} strokeWidth="2.5" strokeLinecap="round">
              <ellipse cx="412" cy="62" rx="14" ry="10" strokeWidth="2" />
              <circle cx="434" cy="62" r="3.5" fill={TRACO} />
              <line x1="434" y1="62" x2="486" y2="40" />
              <circle cx="494" cy="62" r="3.5" fill={TRACO} />
              <path d="M487,55 L501,69 M501,55 L487,69" strokeWidth="2" />
            </g>
            {/* Barramento de terra, com os saltos onde os circuitos cruzam
                sem se ligar — a convenção de desenho pra cruzamento livre. */}
            <path
              d="M506,160 H572 A8 8 0 0 1 588,160 H712 A8 8 0 0 1 728,160 H852 A8 8 0 0 1 868,160 H938"
              fill="none"
              stroke={TRACO}
              strokeWidth="4"
            />
          </g>

          {/* 5. Disjuntores dos circuitos terminais */}
          {circuitos.map((x) => (
            <g key={x} data-equipamento>
              <Disjuntor x={x} y={96} />
            </g>
          ))}

          {/* Aterramento do quadro */}
          <g data-equipamento fill="none" stroke={TRACO} strokeWidth="2.5" strokeLinecap="round">
            <path d="M520,196 H548 M524,204 H544 M528,212 H540" />
          </g>

          {/* Cargas: ponto de luz, tomada e carga resistiva (chuveiro) */}
          <circle data-brilho cx="580" cy="212" r="28" fill={BRILHO} opacity="0" />
          <circle data-brilho cx="720" cy="212" r="28" fill={BRILHO} opacity="0" />
          <circle data-brilho cx="860" cy="212" r="30" fill={BRILHO} opacity="0" />

          <g data-carga>
            <circle cx="580" cy="212" r="16" fill="#fff" stroke={TRACO} strokeWidth="2.5" />
            <path
              d="M569,201 L591,223 M591,201 L569,223"
              fill="none"
              stroke={TRACO}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          <g data-carga>
            <circle cx="720" cy="212" r="16" fill="#fff" stroke={TRACO} strokeWidth="2.5" />
            <path d="M704,212 A16 16 0 0 0 736,212 Z" fill={TRACO} />
            <path d="M704,212 H736" fill="none" stroke={TRACO} strokeWidth="2" />
          </g>

          <g data-carga>
            <rect x="838" y="198" width="44" height="28" fill="#fff" stroke={TRACO} strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      <ol className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-5 sm:text-center">
        {etapas.map((etapa, i) => (
          <li key={etapa.nome} data-etapa className="flex gap-3 sm:block">
            <span className="w-5 shrink-0 font-semibold tabular-nums text-grafite/45 sm:block sm:w-auto">
              {i + 1}
            </span>
            <span>
              <span className="block font-semibold text-grafite">{etapa.nome}</span>
              <span className="mt-1 block text-[0.9375rem] leading-snug text-fumo">
                {etapa.texto}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
