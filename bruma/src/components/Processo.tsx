import { useEffect, useRef } from 'react'

// Cena única do processo Bruma — não é mais um diagrama de quatro paradas
// que aparecem uma a uma. É uma sequência contínua: notas convergem para um
// ponto, esse ponto se resolve nas três camadas da pirâmide olfativa
// (topo/coração/fundo — cada uma com peso e velocidade de evaporação
// diferentes, de verdade), as camadas assentam dentro de um frasco que se
// desenha ao redor delas, o tempo passa (marcas de semana acendendo devagar,
// nível de líquido baixando um triz), e o frasco se sela com um rótulo
// numerado e um brilho único. Tudo disparado por um único gatilho
// (IntersectionObserver) e encadeado por classes de fase — nunca reveals
// independentes por elemento.

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

// Notas que convergem — cada uma já "pertence" a uma camada futura, o que
// dá continuidade real entre a conversa (notas soltas) e a pirâmide
// (camadas): bergamota e pimenta-rosa são topo, jasmim é coração, âmbar e
// sândalo são fundo.
const CENTRO = { x: 450, y: 110 }
const notas = [
  { nome: 'bergamota', dx: -380, dy: -70, dur: 1200 },
  { nome: 'pimenta-rosa', dx: 380, dy: -60, dur: 1300 },
  { nome: 'jasmim', dx: -410, dy: 70, dur: 1150 },
  { nome: 'âmbar', dx: 410, dy: 80, dur: 1400 },
  { nome: 'sândalo', dx: 0, dy: -90, dur: 1500 },
] as const

const TICKS = [150, 168, 186, 204, 222, 240]

export default function Processo() {
  const raizRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const raiz = raizRef.current
    if (!raiz) return
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    const timers: number[] = []
    let raf = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        // Estado inicial (escondido/recolhido) primeiro...
        raiz.classList.add('cena-armada')
        // ...e só no quadro seguinte começamos a sequência, pra garantir que
        // o navegador pinte o estado inicial antes de disparar a transição.
        raf = requestAnimationFrame(() => {
          raiz.classList.add('fase-1') // notas convergem
          timers.push(
            window.setTimeout(() => raiz.classList.add('fase-2'), 1300), // camadas se resolvem
            window.setTimeout(() => raiz.classList.add('fase-3'), 2300), // maceração / tempo passa
            window.setTimeout(() => raiz.classList.add('fase-4'), 4700), // frasco sela
            window.setTimeout(() => raiz.classList.add('fase-5'), 5900), // vapor esparso contínuo
          )
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(raiz)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  return (
    <section ref={raizRef} className="processo px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Da conversa ao frasco</h2>

      <figure className="processo-cena mt-10 rounded-2xl border border-fio bg-carvao/50 p-4 sm:p-8">
        <svg
          viewBox="0 0 900 420"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Cena animada mostrando notas de perfume convergindo, virando as camadas de topo, coração e fundo dentro de um frasco que macera em repouso e é selado com um rótulo numerado."
        >
          <defs>
            <pattern id="processo-grade" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill={LINHA} fillOpacity="0.35" />
            </pattern>
            <clipPath id="processo-vaso-clip">
              <rect x="380" y="150" width="140" height="112" rx="16" />
            </clipPath>
            <linearGradient id="processo-brilho" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={ACENTO} stopOpacity="0" />
              <stop offset="50%" stopColor={ACENTO} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ACENTO} stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="900" height="420" fill="url(#processo-grade)" opacity="0.5" />

          {/* Notas: convergem de bordas diferentes até o mesmo ponto — o
              gargalo do frasco nasce exatamente aí. */}
          <g>
            {notas.map((n) => (
              <g
                key={n.nome}
                data-nota
                className="cena-nota"
                style={{
                  ['--nx' as string]: `${n.dx}px`,
                  ['--ny' as string]: `${n.dy}px`,
                  ['--dur' as string]: `${n.dur}ms`,
                }}
              >
                <circle cx={CENTRO.x} cy={CENTRO.y} r="4" fill={ACENTO} />
                <text
                  x={CENTRO.x}
                  y={CENTRO.y - 10}
                  textAnchor="middle"
                  style={{
                    fill: LINHA,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: 10,
                  }}
                >
                  {n.nome}
                </text>
              </g>
            ))}
          </g>

          {/* Camadas: a mesma massa convergida se resolve em três bandas —
              topo fina e leve, fundo grossa e pesada. */}
          <g clipPath="url(#processo-vaso-clip)">
            <rect data-banda="topo" className="cena-banda" x="380" y="150" width="140" height="15" fill={ACENTO} fillOpacity="0.5" />
            <rect data-banda="coracao" className="cena-banda cena-banda-2" x="380" y="165" width="140" height="35" fill={ACENTO} fillOpacity="0.38" />
            <rect data-banda="fundo" className="cena-banda cena-banda-3" x="380" y="200" width="140" height="60" fill={ACENTO} fillOpacity="0.28" />

            {/* Vapor: continua durante a maceração e depois vira o loop
                esparso — topo evapora rápido, fundo quase não se move. */}
            <circle data-vapor="topo" className="cena-vapor" cx="410" cy="158" r="1.8" fill={ACENTO} />
            <circle data-vapor="coracao" className="cena-vapor" cx="450" cy="178" r="1.8" fill={ACENTO} />
            <circle data-vapor="fundo" className="cena-vapor" cx="490" cy="222" r="1.8" fill={ACENTO} />

            <rect className="cena-unificar" x="380" y="150" width="140" height="112" fill={ACENTO} />
          </g>

          {/* Frasco: se desenha ao redor das camadas — o gargalo passa
              exatamente pelo ponto onde as notas convergiram. */}
          <g>
            <rect
              className="cena-vaso-gargalo"
              x="436"
              y="90"
              width="28"
              height="62"
              rx="4"
              fill="none"
              stroke={TRACO}
              strokeWidth="1.8"
            />
            <rect
              className="cena-vaso-bulbo"
              x="380"
              y="150"
              width="140"
              height="112"
              rx="16"
              fill="none"
              stroke={TRACO}
              strokeWidth="1.8"
            />
          </g>

          {/* Maceração: nível que assenta um triz + marcas de semana que
              acendem uma a uma — tempo passando, não um spinner. */}
          <line className="cena-nivel" x1="392" y1="158" x2="508" y2="158" stroke={ACENTO} strokeWidth="1.4" />
          <g>
            {TICKS.map((y, i) => (
              <line
                key={y}
                data-tick
                className="cena-tick"
                style={{ ['--i' as string]: i }}
                x1="528"
                y1={y}
                x2="538"
                y2={y}
                stroke={LINHA}
                strokeWidth="1.2"
              />
            ))}
          </g>

          {/* Rótulo numerado — carimbado, uma única vez, sem quicar. */}
          <g className="cena-selo">
            <rect x="430" y="236" width="40" height="20" fill={FUNDO} stroke={ACENTO} strokeWidth="1.2" />
            <text
              x="450"
              y="250"
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

          {/* Brilho: um único varrido, marca o fim — não um glow em loop. */}
          <rect
            className="cena-brilho"
            x="380"
            y="150"
            width="46"
            height="150"
            transform="rotate(24 450 206)"
            fill="url(#processo-brilho)"
            clipPath="url(#processo-vaso-clip)"
          />
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
        /* Estado padrão (sem JS / motion reduzido): a cena já composta e
           parada — frasco selado, camadas assentadas, sem notas soltas. */
        .cena-nota { opacity: 0; }
        .cena-vaso-gargalo,
        .cena-vaso-bulbo { stroke-width: 2.2; }
        .cena-unificar { opacity: 0.16; }
        .cena-selo { opacity: 1; transform: none; }
        .cena-brilho { opacity: 0; }
        .cena-tick { stroke: ${ACENTO}; opacity: 1; }
        .cena-nivel { transform: translateY(5px); }
        .cena-vapor { opacity: 0.35; }

        /* Estado inicial armado: antes da fase 1 começar. */
        .processo-cena.cena-armada .cena-nota {
          opacity: 0.9;
          transform: translate(var(--nx), var(--ny));
        }
        .processo-cena.cena-armada .cena-banda {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: top;
          transform: scaleY(0);
        }
        .processo-cena.cena-armada .cena-vaso-gargalo,
        .processo-cena.cena-armada .cena-vaso-bulbo {
          stroke-width: 1.8;
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
        }
        .processo-cena.cena-armada .cena-unificar { opacity: 0; }
        .processo-cena.cena-armada .cena-nivel { transform: translateY(0); }
        .processo-cena.cena-armada .cena-tick { stroke: ${LINHA}; opacity: 0.4; }
        .processo-cena.cena-armada .cena-selo {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.7);
        }
        .processo-cena.cena-armada .cena-brilho { opacity: 0; }
        .processo-cena.cena-armada .cena-vapor { opacity: 0; }

        /* Fase 1 — notas convergem para o gargalo. */
        .processo-cena.cena-armada.fase-1 .cena-nota {
          opacity: 0.9;
          transform: translate(0, 0);
          transition: transform var(--dur, 1.3s) cubic-bezier(0.25, 0.7, 0.3, 1), opacity 0.4s ease;
        }

        /* Fase 2 — a mesma massa se resolve em três camadas; as notas somem. */
        .processo-cena.cena-armada.fase-2 .cena-nota {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .processo-cena.cena-armada.fase-2 .cena-banda {
          opacity: 1;
          transform: scaleY(1);
        }
        .processo-cena.cena-armada.fase-2 [data-banda='topo'] {
          transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        }
        .processo-cena.cena-armada.fase-2 [data-banda='coracao'] {
          transition: transform 0.7s ease-out 0.15s, opacity 0.7s ease-out 0.15s;
        }
        .processo-cena.cena-armada.fase-2 [data-banda='fundo'] {
          transition: transform 0.9s ease-out 0.3s, opacity 0.9s ease-out 0.3s;
        }

        /* Fase 3 — o frasco se desenha ao redor, o tempo passa. */
        .processo-cena.cena-armada.fase-3 .cena-vaso-gargalo,
        .processo-cena.cena-armada.fase-3 .cena-vaso-bulbo {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.9s ease;
        }
        .processo-cena.cena-armada.fase-3 .cena-nivel {
          transform: translateY(5px);
          transition: transform 1.8s ease-in-out;
        }
        .processo-cena.cena-armada.fase-3 .cena-tick {
          stroke: ${ACENTO};
          opacity: 1;
          transition: stroke 0.4s ease, opacity 0.4s ease;
          transition-delay: calc(var(--i, 0) * 0.25s);
        }

        /* Fase 4 — o frasco sela: bolde, tom único, selo, brilho único. */
        .processo-cena.cena-armada.fase-4 .cena-vaso-gargalo,
        .processo-cena.cena-armada.fase-4 .cena-vaso-bulbo {
          stroke-width: 2.2;
          transition: stroke-width 0.6s ease;
        }
        .processo-cena.cena-armada.fase-4 .cena-unificar {
          opacity: 0.16;
          transition: opacity 0.6s ease;
        }
        .processo-cena.cena-armada.fase-4 .cena-selo {
          opacity: 1;
          transform: scale(1);
          transition: transform 0.45s cubic-bezier(0.3, 1.4, 0.5, 1), opacity 0.45s ease;
        }

        @media (prefers-reduced-motion: no-preference) {
          .processo-cena.cena-armada.fase-4 .cena-brilho {
            animation: processo-brilho-varrer 0.9s ease-out forwards;
          }
          .processo-cena.cena-armada.fase-5 [data-vapor='topo'] {
            animation: processo-subir 4s ease-in infinite;
          }
          .processo-cena.cena-armada.fase-5 [data-vapor='coracao'] {
            animation: processo-subir 7.5s ease-in infinite;
            animation-delay: 1.2s;
          }
          .processo-cena.cena-armada.fase-5 [data-vapor='fundo'] {
            animation: processo-subir 13s ease-in infinite;
            animation-delay: 2.4s;
          }
        }

        @keyframes processo-brilho-varrer {
          0% { opacity: 0; transform: rotate(24deg) translateX(-120px); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: rotate(24deg) translateX(160px); }
        }
        @keyframes processo-subir {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
