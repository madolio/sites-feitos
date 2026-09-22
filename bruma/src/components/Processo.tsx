import { useEffect, useRef } from 'react'

// Cena única do processo Bruma — sequência contínua, um único gatilho
// (IntersectionObserver) encadeado por classes de fase, nunca reveals
// independentes por elemento:
//
//   notas (matéria-prima) convergem para a pipeta → a pipeta libera uma
//   gota → a gota cai no frasco e provoca uma ondulação → as três camadas
//   da pirâmide olfativa (topo/coração/fundo, cada uma com peso e
//   velocidade de evaporação diferentes) se formam a partir dali → o
//   contorno do frasco se desenha ao redor → o tempo passa (marcas de
//   semana acendendo devagar, nível assentando) → a tampa desce e o
//   rótulo numerado carimba → um brilho único varre o vidro.
//
// Reescrita depois de comparar com um screenshot real da página: a versão
// anterior lia como "frasco verde plano sobre grade pontilhada escura" —
// mais interface técnica que ateliê de perfumaria. Esta versão corrige
// isso com um frasco de vidro facetado de verdade (ombros angulados,
// cintura, tampa com proporção própria, friso de reflexo de luz), um
// segundo tom quente — âmbar — reservado só para o líquido (o verde
// continua para estrutura/ambiente: grade de tempo, linhas, UI), fundo
// substituído por vinheta radial + sugestão de bancada em vez de grade de
// pontos, e um gesto físico real de entrega de matéria-prima (a pipeta).

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

// Espelham os tokens do index.css. Verde = estrutura/ambiente (linhas,
// grade de tempo, brilho de vidro, contorno). Âmbar = a matéria em si —
// o líquido, do topo claro ao fundo denso.
const TRACO = 'var(--color-fio)'
const LINHA = 'var(--color-fumo)'
const ACENTO = 'var(--color-acento)'
const FUNDO = 'var(--color-carvao)'
const ESSENCIA = 'var(--color-essencia)'
const ESSENCIA_FUNDA = 'var(--color-essencia-funda)'

// Notas (matéria-prima) que convergem para o bulbo da pipeta — cada uma
// já "pertence" a uma camada futura: bergamota e pimenta-rosa são topo,
// jasmim é coração, âmbar e sândalo são fundo.
const CENTRO = { x: 450, y: 40 }
const notas = [
  { nome: 'bergamota', dx: -370, dy: -30, dur: 1200 },
  { nome: 'pimenta-rosa', dx: 370, dy: -25, dur: 1300 },
  { nome: 'jasmim', dx: -400, dy: 60, dur: 1150 },
  { nome: 'âmbar', dx: 400, dy: 65, dur: 1400 },
  { nome: 'sândalo', dx: 0, dy: -55, dur: 1500 },
] as const

const TICKS = [200, 215, 230, 245, 260, 275]

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

        raiz.classList.add('cena-armada')
        raf = requestAnimationFrame(() => {
          raiz.classList.add('fase-1') // notas convergem para a pipeta
          timers.push(
            window.setTimeout(() => raiz.classList.add('fase-2'), 1300), // pipeta libera a gota
            window.setTimeout(() => raiz.classList.add('fase-3'), 1900), // camadas se formam a partir da gota
            window.setTimeout(() => raiz.classList.add('fase-4'), 2900), // maceração / tempo passa
            window.setTimeout(() => raiz.classList.add('fase-5'), 5300), // tampa desce, rótulo carimba
            window.setTimeout(() => raiz.classList.add('fase-6'), 6500), // vapor esparso contínuo
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
          aria-label="Cena animada mostrando matérias-primas convergindo para uma pipeta, uma gota caindo num frasco de vidro facetado, formando as camadas de topo, coração e fundo em tons de âmbar, macerando em repouso e sendo selado com tampa e rótulo numerado."
        >
          <defs>
            <path
              id="processo-vaso-forma"
              d="M434,186 L466,186 L505,208 L512,240 L500,275 Q495,300 472,300 L428,300 Q405,300 400,275 L388,240 L395,208 Z"
            />
            <clipPath id="processo-vaso-clip">
              <use href="#processo-vaso-forma" />
            </clipPath>
            <linearGradient id="processo-brilho" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={ACENTO} stopOpacity="0" />
              <stop offset="50%" stopColor={ACENTO} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ACENTO} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="processo-vinheta" cx="50%" cy="46%" r="70%">
              <stop offset="0%" stopColor={TRACO} stopOpacity="0.32" />
              <stop offset="55%" stopColor={FUNDO} stopOpacity="0.15" />
              <stop offset="100%" stopColor={FUNDO} stopOpacity="0.65" />
            </radialGradient>
            <linearGradient id="processo-bancada" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={TRACO} stopOpacity="0" />
              <stop offset="100%" stopColor={TRACO} stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Fundo: vinheta radial + sugestão de bancada — não mais grade
              de pontos técnica. */}
          <rect x="0" y="0" width="900" height="420" fill="url(#processo-vinheta)" />
          <rect x="0" y="300" width="900" height="120" fill="url(#processo-bancada)" />
          <line x1="120" y1="302" x2="780" y2="302" stroke={TRACO} strokeOpacity="0.4" strokeWidth="1" />

          {/* Notas: matéria-prima convergindo para o bulbo da pipeta. */}
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
                <circle cx={CENTRO.x} cy={CENTRO.y} r="4" fill={ESSENCIA} />
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

          {/* Pipeta: recebe as notas, esguicha e some — o gesto físico de
              "matéria-prima entra". */}
          <g className="cena-pipeta">
            <ellipse cx="450" cy="40" rx="14" ry="12" fill={FUNDO} stroke={ACENTO} strokeWidth="1.6" />
            <rect x="442" y="50" width="16" height="40" rx="6" fill={FUNDO} stroke={ACENTO} strokeWidth="1.4" />
            <path className="cena-pipeta-bico" d="M442,90 L458,90 L450,104 Z" fill={FUNDO} stroke={ACENTO} strokeWidth="1.4" />
          </g>

          {/* Gota: cai da pipeta até o ombro do frasco. */}
          <circle className="cena-gota" cx="450" cy="104" r="3.4" fill={ESSENCIA} />
          {/* Onda: reação visível no instante em que a gota chega. */}
          <ellipse className="cena-onda" cx="450" cy="186" rx="6" ry="2.4" fill="none" stroke={ESSENCIA} strokeWidth="1.4" />

          {/* Camadas: formam-se a partir do ponto onde a gota caiu — topo
              clara e fina, fundo densa e âmbar-escura. Tons quentes, não
              três variações do mesmo verde. */}
          <g clipPath="url(#processo-vaso-clip)">
            <rect data-banda="topo" className="cena-banda" x="380" y="186" width="140" height="20" fill={ESSENCIA} fillOpacity="0.75" />
            <rect data-banda="coracao" className="cena-banda cena-banda-2" x="380" y="206" width="140" height="44" fill={ESSENCIA} fillOpacity="0.48" />
            <rect data-banda="fundo" className="cena-banda cena-banda-3" x="380" y="250" width="140" height="50" fill={ESSENCIA_FUNDA} fillOpacity="0.78" />

            {/* Linhas finas entre as camadas — marcam a separação de peso
                que a pirâmide olfativa descreve, em vez de um bloco só. */}
            <line className="cena-banda-linha" x1="384" y1="206" x2="516" y2="206" stroke={FUNDO} strokeOpacity="0.5" strokeWidth="1" />
            <line className="cena-banda-linha" x1="384" y1="250" x2="516" y2="250" stroke={FUNDO} strokeOpacity="0.5" strokeWidth="1" />

            {/* Vapor: topo evapora rápido, fundo quase não se move. */}
            <circle data-vapor="topo" className="cena-vapor" cx="415" cy="194" r="1.8" fill={ESSENCIA} />
            <circle data-vapor="coracao" className="cena-vapor" cx="450" cy="222" r="1.8" fill={ESSENCIA} />
            <circle data-vapor="fundo" className="cena-vapor" cx="485" cy="268" r="1.8" fill={ESSENCIA_FUNDA} />

            <rect className="cena-unificar" x="380" y="186" width="140" height="114" fill={ESSENCIA} />

            {/* Friso de vidro: reflexo diagonal ao longo da borda —
                é isso que faz o frasco ler como vidro, não como forma
                plana contornada. */}
            <polygon className="cena-vidro-brilho" points="393,190 405,190 386,296 374,296" fill="#ffffff" fillOpacity="0.22" />
          </g>

          {/* Frasco: ombros angulados, leve cintura, base arredondada —
              não mais um retângulo simples. Desenha-se (stroke-dasharray)
              ao redor das camadas. */}
          <g>
            <rect
              className="cena-vaso-gargalo"
              x="434"
              y="150"
              width="32"
              height="36"
              rx="4"
              fill="none"
              stroke={TRACO}
              strokeWidth="1.8"
            />
            <use href="#processo-vaso-forma" className="cena-vaso-bulbo" fill="none" stroke={TRACO} strokeWidth="1.8" />
          </g>

          {/* Maceração: nível que assenta um triz + marcas de semana que
              acendem uma a uma. */}
          <line className="cena-nivel" x1="400" y1="190" x2="505" y2="190" stroke={ESSENCIA} strokeWidth="1.4" />
          <g>
            {TICKS.map((y, i) => (
              <line
                key={y}
                data-tick
                className="cena-tick"
                style={{ ['--i' as string]: i }}
                x1="522"
                y1={y}
                x2="533"
                y2={y}
                stroke={LINHA}
                strokeWidth="1.2"
              />
            ))}
          </g>

          {/* Tampa: desce sobre o gargalo só na entrega final — não fica
              ali o tempo todo como um retângulo pousado. Proporção própria:
              base larga + botão. */}
          <g className="cena-tampa">
            <rect x="440" y="104" width="20" height="20" rx="6" fill={FUNDO} stroke={ACENTO} strokeWidth="1.4" />
            <rect x="418" y="122" width="64" height="28" rx="8" fill={FUNDO} stroke={ACENTO} strokeWidth="1.6" />
          </g>

          {/* Rótulo numerado — carimbado, uma única vez, sem quicar. */}
          <g className="cena-selo">
            <rect x="410" y="265" width="80" height="20" fill={FUNDO} stroke={ACENTO} strokeWidth="1.2" />
            <text
              x="450"
              y="279"
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

          {/* Brilho: um único varrido, marca o fim. */}
          <rect
            className="cena-brilho"
            x="380"
            y="186"
            width="46"
            height="150"
            transform="rotate(24 450 240)"
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
           parada — frasco selado, camadas assentadas, sem notas/pipeta/gota
           soltas. */
        .cena-nota { opacity: 0; }
        .cena-pipeta { opacity: 0; }
        .cena-gota { opacity: 0; }
        .cena-onda { opacity: 0; }
        .cena-vaso-gargalo,
        .cena-vaso-bulbo { stroke-width: 2.2; }
        .cena-unificar { opacity: 0.14; }
        .cena-vidro-brilho { opacity: 1; }
        .cena-banda-linha { opacity: 1; }
        .cena-tampa { opacity: 1; transform: none; }
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
        .processo-cena.cena-armada .cena-pipeta,
        .processo-cena.cena-armada .cena-gota,
        .processo-cena.cena-armada .cena-onda { opacity: 0; }
        .processo-cena.cena-armada .cena-banda {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: top;
          transform: scaleY(0);
        }
        .processo-cena.cena-armada .cena-banda-linha { opacity: 0; }
        .processo-cena.cena-armada .cena-vaso-gargalo,
        .processo-cena.cena-armada .cena-vaso-bulbo {
          stroke-width: 1.8;
          stroke-dasharray: 320;
          stroke-dashoffset: 320;
        }
        .processo-cena.cena-armada .cena-unificar { opacity: 0; }
        .processo-cena.cena-armada .cena-vidro-brilho { opacity: 0; }
        .processo-cena.cena-armada .cena-nivel { transform: translateY(0); opacity: 0; }
        .processo-cena.cena-armada .cena-tick { stroke: ${LINHA}; opacity: 0.4; }
        .processo-cena.cena-armada .cena-tampa {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: translateY(-14px);
        }
        .processo-cena.cena-armada .cena-selo {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.7);
        }
        .processo-cena.cena-armada .cena-brilho { opacity: 0; }
        .processo-cena.cena-armada .cena-vapor { opacity: 0; }

        /* Fase 1 — notas (matéria-prima) convergem para o bulbo da pipeta. */
        .processo-cena.cena-armada.fase-1 .cena-pipeta {
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        .processo-cena.cena-armada.fase-1 .cena-nota {
          opacity: 0.9;
          transform: translate(0, 0);
          transition: transform var(--dur, 1.3s) cubic-bezier(0.25, 0.7, 0.3, 1), opacity 0.4s ease;
        }

        /* Fase 2 — a pipeta esguicha: notas somem, bico comprime, gota cai. */
        .processo-cena.cena-armada.fase-2 .cena-nota {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .processo-cena.cena-armada.fase-2 .cena-pipeta-bico {
          transform: scaleY(0.85);
          transform-box: fill-box;
          transform-origin: top;
          transition: transform 0.25s ease-out;
        }
        .processo-cena.cena-armada.fase-2 .cena-gota {
          opacity: 1;
          animation: processo-gota-cai 0.55s ease-in forwards;
        }
        .processo-cena.cena-armada.fase-2 .cena-onda {
          animation: processo-onda 0.7s ease-out 0.45s forwards;
        }

        /* Fase 3 — a gota chega: as camadas se formam a partir dali, e o
           contorno do frasco se desenha ao redor. */
        .processo-cena.cena-armada.fase-3 .cena-pipeta {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .processo-cena.cena-armada.fase-3 .cena-banda {
          opacity: 1;
          transform: scaleY(1);
        }
        .processo-cena.cena-armada.fase-3 .cena-banda-linha {
          opacity: 1;
          transition: opacity 0.6s ease 0.5s;
        }
        .processo-cena.cena-armada.fase-3 [data-banda='topo'] {
          transition: transform 0.5s ease-out, opacity 0.5s ease-out;
        }
        .processo-cena.cena-armada.fase-3 [data-banda='coracao'] {
          transition: transform 0.7s ease-out 0.15s, opacity 0.7s ease-out 0.15s;
        }
        .processo-cena.cena-armada.fase-3 [data-banda='fundo'] {
          transition: transform 0.9s ease-out 0.3s, opacity 0.9s ease-out 0.3s;
        }
        .processo-cena.cena-armada.fase-3 .cena-vaso-gargalo,
        .processo-cena.cena-armada.fase-3 .cena-vaso-bulbo {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.9s ease;
        }
        .processo-cena.cena-armada.fase-3 .cena-vidro-brilho {
          opacity: 1;
          transition: opacity 0.8s ease 0.4s;
        }

        /* Fase 4 — maceração: o nível assenta, o tempo passa. */
        .processo-cena.cena-armada.fase-4 .cena-nivel {
          opacity: 1;
          transform: translateY(5px);
          transition: opacity 0.4s ease, transform 1.8s ease-in-out;
        }
        .processo-cena.cena-armada.fase-4 .cena-tick {
          stroke: ${ACENTO};
          opacity: 1;
          transition: stroke 0.4s ease, opacity 0.4s ease;
          transition-delay: calc(var(--i, 0) * 0.25s);
        }

        /* Fase 5 — entrega: a tampa desce, o vidro fica denso, o rótulo
           carimba. */
        .processo-cena.cena-armada.fase-5 .cena-vaso-gargalo,
        .processo-cena.cena-armada.fase-5 .cena-vaso-bulbo {
          stroke-width: 2.2;
          transition: stroke-width 0.6s ease;
        }
        .processo-cena.cena-armada.fase-5 .cena-unificar {
          opacity: 0.14;
          transition: opacity 0.6s ease;
        }
        .processo-cena.cena-armada.fase-5 .cena-tampa {
          opacity: 1;
          transform: translateY(0);
          transition: transform 0.5s cubic-bezier(0.3, 1.2, 0.4, 1), opacity 0.4s ease;
        }
        .processo-cena.cena-armada.fase-5 .cena-selo {
          opacity: 1;
          transform: scale(1);
          transition: transform 0.45s cubic-bezier(0.3, 1.4, 0.5, 1) 0.3s, opacity 0.45s ease 0.3s;
        }

        @media (prefers-reduced-motion: no-preference) {
          .processo-cena.cena-armada.fase-5 .cena-brilho {
            animation: processo-brilho-varrer 0.9s ease-out 0.5s forwards;
          }
          .processo-cena.cena-armada.fase-6 [data-vapor='topo'] {
            animation: processo-subir 4s ease-in infinite;
          }
          .processo-cena.cena-armada.fase-6 [data-vapor='coracao'] {
            animation: processo-subir 7.5s ease-in infinite;
            animation-delay: 1.2s;
          }
          .processo-cena.cena-armada.fase-6 [data-vapor='fundo'] {
            animation: processo-subir 13s ease-in infinite;
            animation-delay: 2.4s;
          }
        }

        @keyframes processo-gota-cai {
          0% { transform: translateY(0); opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(82px); opacity: 0; }
        }
        @keyframes processo-onda {
          0% { opacity: 0; transform: scale(0.4); }
          30% { opacity: 0.9; }
          100% { opacity: 0; transform: scale(2.6); }
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
