import { useEffect, useRef } from 'react'

// Diagrama técnico do processo Bruma — reaproveita o princípio já usado nos
// projetos-irmãos (traço fino, grade, elementos numerados e conectados, um
// movimento controlado que só existe quando corresponde a algo real), mas
// redesenhado do zero pra perfumaria. O centro é a pirâmide olfativa: o
// diagrama que perfumistas de fato usam pra mostrar que topo, coração e
// fundo evaporam em velocidades diferentes — por isso os pontinhos de vapor
// sobem em ritmos diferentes por faixa, e a maceração pulsa devagar porque
// ali o que "acontece" é tempo passando, não movimento.

const etapas = [
  {
    titulo: 'Conversa olfativa',
    texto: 'Contamos memórias e preferências — não escolhemos num catálogo de amostras.',
  },
  {
    titulo: 'Composição',
    texto: 'Montamos a pirâmide (topo, coração, fundo) e testamos a concentração certa.',
  },
  {
    titulo: 'Maceração',
    texto: 'A mistura descansa semanas pra os óleos se estabilizarem antes do engarrafamento.',
  },
  {
    titulo: 'Entrega',
    texto: 'Frasco numerado, com a ficha de composição da sua fragrância.',
  },
] as const

// Espelham os tokens do index.css.
const TRACO = 'var(--color-fio)'
const LINHA = 'var(--color-fumo)'
const ACENTO = 'var(--color-acento)'
const FUNDO = 'var(--color-carvao)'

const COLUNAS = [130, 370, 610, 850]

export default function Processo() {
  const raizRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const raiz = raizRef.current
    if (!raiz) return
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    // Só arma o estado "escondido" quando sabemos que a animação vai rodar —
    // sem isso, quem prefere movimento reduzido já vê tudo desenhado.
    raiz.classList.add('processo-armado')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        raiz.classList.add('processo-visivel')
        observer.disconnect()
      },
      { threshold: 0.3 },
    )
    observer.observe(raiz)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={raizRef} className="processo px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Da conversa ao frasco</h2>

      <figure className="mt-10 rounded-2xl border border-fio bg-carvao/50 p-4 sm:p-8">
        <svg
          viewBox="0 0 960 300"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Diagrama do processo: uma conversa olfativa vira uma pirâmide de fragrância com notas de topo, coração e fundo que evaporam em velocidades diferentes, a mistura macera em repouso por semanas, e o resultado é entregue num frasco numerado com ficha de composição."
        >
          <defs>
            <pattern id="processo-grade" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={LINHA} fillOpacity="0.35" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="960" height="300" fill="url(#processo-grade)" opacity="0.5" />

          {/* Trilho: liga as quatro etapas em sequência. */}
          <g>
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                data-rail
                style={{ ['--i' as string]: i }}
                x1={COLUNAS[i]}
                y1="250"
                x2={COLUNAS[i + 1]}
                y2="250"
                stroke={LINHA}
                strokeWidth="1.5"
              />
            ))}
            {COLUNAS.map((cx, i) => (
              <g key={cx} data-entrada style={{ ['--i' as string]: i }}>
                <line x1={cx} y1="220" x2={cx} y2="250" stroke={LINHA} strokeWidth="1.5" />
                <circle cx={cx} cy="250" r="5" fill={FUNDO} stroke={ACENTO} strokeWidth="2" />
                <text
                  x={cx}
                  y="26"
                  textAnchor="middle"
                  style={{
                    fill: ACENTO,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {String(i).padStart(2, '0')}
                </text>
              </g>
            ))}
          </g>

          {/* 00 — Conversa olfativa: dois pontos de vista que se encontram. */}
          <g data-entrada style={{ ['--i' as string]: 0 }}>
            <circle cx="116" cy="140" r="24" fill="none" stroke={TRACO} strokeWidth="1.8" />
            <circle cx="144" cy="140" r="24" fill="none" stroke={TRACO} strokeWidth="1.8" />
            <path
              d="M130,132 L133,138 L139,140 L133,142 L130,148 L127,142 L121,140 L127,138 Z"
              fill={ACENTO}
              fillOpacity="0.9"
            />
          </g>

          {/* 01 — Composição: a pirâmide olfativa, topo / coração / fundo. */}
          <g data-entrada style={{ ['--i' as string]: 1 }}>
            <path
              d="M370,60 L440,210 L300,210 Z"
              fill="none"
              stroke={TRACO}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <line x1="346.67" y1="110" x2="393.33" y2="110" stroke={ACENTO} strokeOpacity="0.6" strokeWidth="1.2" />
            <line x1="323.33" y1="160" x2="416.67" y2="160" stroke={ACENTO} strokeOpacity="0.6" strokeWidth="1.2" />

            {/* Vapor: topo evapora mais rápido, fundo é o mais lento — de verdade. */}
            <circle data-vapor="topo" cx="365" cy="100" r="2" fill={ACENTO} fillOpacity="0.6" />
            <circle data-vapor="topo" cx="377" cy="95" r="1.6" fill={ACENTO} fillOpacity="0.55" />
            <circle data-vapor="coracao" cx="345" cy="150" r="2" fill={ACENTO} fillOpacity="0.6" />
            <circle data-vapor="coracao" cx="372" cy="144" r="1.8" fill={ACENTO} fillOpacity="0.55" />
            <circle data-vapor="coracao" cx="397" cy="150" r="2" fill={ACENTO} fillOpacity="0.5" />
            <circle data-vapor="fundo" cx="330" cy="200" r="2.2" fill={ACENTO} fillOpacity="0.55" />
            <circle data-vapor="fundo" cx="370" cy="196" r="1.8" fill={ACENTO} fillOpacity="0.5" />
            <circle data-vapor="fundo" cx="410" cy="200" r="2.2" fill={ACENTO} fillOpacity="0.5" />
          </g>

          {/* 02 — Maceração: o frasco descansa, o nível é o que "acontece". */}
          <g data-entrada style={{ ['--i' as string]: 2 }}>
            <rect x="570" y="70" width="80" height="140" rx="10" fill="none" stroke={TRACO} strokeWidth="1.8" />
            <rect x="571.5" y="110" width="77" height="98" fill={ACENTO} fillOpacity="0.14" />
            <line data-pulso x1="571.5" y1="110" x2="648.5" y2="110" stroke={ACENTO} strokeWidth="1.5" />
            {[120, 140, 160, 180].map((y) => (
              <line key={y} x1="654" y1={y} x2="662" y2={y} stroke={LINHA} strokeWidth="1" strokeOpacity="0.6" />
            ))}
          </g>

          {/* 03 — Entrega: frasco numerado com a ficha de composição. */}
          <g data-entrada style={{ ['--i' as string]: 3 }}>
            <rect x="841" y="50" width="18" height="12" rx="2" fill="none" stroke={TRACO} strokeWidth="1.8" />
            <rect x="844" y="62" width="12" height="23" fill="none" stroke={TRACO} strokeWidth="1.8" />
            <rect x="822" y="85" width="56" height="125" rx="8" fill="none" stroke={TRACO} strokeWidth="1.8" />
            <rect x="833" y="140" width="34" height="26" fill={FUNDO} stroke={ACENTO} strokeWidth="1.2" />
            <text
              x="850"
              y="157"
              textAnchor="middle"
              style={{
                fill: ACENTO,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              001
            </text>
          </g>
        </svg>

        <figcaption className="mt-4 text-[0.9375rem] text-fumo">
          <span className="font-semibold text-marfim">Pirâmide olfativa</span> — as notas de
          topo evaporam primeiro, o coração vem em seguida, e o fundo é o que fica na pele por
          mais tempo.
        </figcaption>
      </figure>

      <ol className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map((e, i) => (
          <li key={e.titulo} className="flex gap-3 lg:block">
            <span
              className="w-8 shrink-0 text-sm text-acento lg:block"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
            >
              {String(i).padStart(2, '0')}
            </span>
            <span>
              <h3 className="font-display text-xl">{e.titulo}</h3>
              <p className="mt-1 text-sm text-fumo">{e.texto}</p>
            </span>
          </li>
        ))}
      </ol>

      <style>{`
        .processo.processo-armado [data-entrada] {
          opacity: 0;
          transform: translateY(10px);
        }
        .processo.processo-armado.processo-visivel [data-entrada] {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.6s ease;
          transition-delay: calc(var(--i, 0) * 0.12s);
        }
        .processo.processo-armado [data-rail] {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
        }
        .processo.processo-armado.processo-visivel [data-rail] {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.7s ease;
          transition-delay: calc(var(--i, 0) * 0.12s);
        }
        @media (prefers-reduced-motion: no-preference) {
          .processo [data-vapor='topo'] {
            animation: processo-subir 1.8s ease-in infinite;
          }
          .processo [data-vapor='coracao'] {
            animation: processo-subir 3.2s ease-in infinite;
          }
          .processo [data-vapor='fundo'] {
            animation: processo-subir 5.4s ease-in infinite;
          }
          .processo [data-pulso] {
            animation: processo-respirar 4s ease-in-out infinite;
          }
        }
        @keyframes processo-subir {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0;
          }
          100% {
            transform: translateY(-26px);
            opacity: 0;
          }
        }
        @keyframes processo-respirar {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.95;
          }
        }
      `}</style>
    </section>
  )
}
