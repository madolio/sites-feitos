// Cena autoral em SVG: a serra da Mantiqueira contra um ceu noturno. Sem foto de
// banco de imagens, mesma convencao do resto do portfolio.
//
// O campo de estrelas sai de um PRNG deterministico (mesmo ceu a cada
// carregamento, sem depender de Math.random). Antes as posicoes vinham de
// `i * 137.5 % 100`, uma formula que gera uma GRADE regular — dava pra ver as
// colunas de pontos — e a serra tinha a mesma cor do fundo, entao nem aparecia.
function mulberry32(semente: number) {
  let a = semente
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rnd = mulberry32(20260923)

// Campo geral: muitas estrelas fracas, poucas brilhantes (a magnitude aparente
// segue uma cauda longa, entao o raio cresce com rnd^4).
const CAMPO = Array.from({ length: 230 }, (_, i) => ({
  key: i,
  x: rnd() * 400,
  y: rnd() * 158,
  r: 0.22 + Math.pow(rnd(), 4) * 1.15,
  o: 0.3 + rnd() * 0.65,
}))

// Via Lactea: uma banda diagonal densa. Cada ponto e sorteado ao longo da reta
// e espalhado na perpendicular com distribuicao aproximadamente normal (soma de
// uniformes), entao a densidade cai do centro pras bordas.
const VIA_LACTEA = Array.from({ length: 340 }, (_, i) => {
  const t = rnd()
  const desvio = (rnd() + rnd() + rnd() - 1.5) * 34
  const x = -20 + t * 440
  const y = 128 - t * 100 + desvio
  return { key: i, x, y, r: 0.18 + rnd() * 0.42, o: 0.25 + rnd() * 0.5 }
})

// Estrelas que cintilam (as mais brilhantes), com atraso proprio.
const CINTILANTES = Array.from({ length: 14 }, (_, i) => ({
  key: i,
  x: 12 + rnd() * 376,
  y: 8 + rnd() * 120,
  r: 0.9 + rnd() * 0.9,
  atraso: (rnd() * 5).toFixed(2),
  dur: (3 + rnd() * 3).toFixed(2),
}))

function CeuNoturno() {
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ceu-fundo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04070e" />
          <stop offset="55%" stopColor="#0a1220" />
          <stop offset="100%" stopColor="#1b2b45" />
        </linearGradient>
        <radialGradient id="via-lactea-brilho" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0e9da" stopOpacity="0.2" />
          <stop offset="45%" stopColor="#9fc4ff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#9fc4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="estrela-brilho" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0e9da" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f0e9da" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="horizonte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fd9a0" stopOpacity="0" />
          <stop offset="100%" stopColor="#7fd9a0" stopOpacity="0.16" />
        </linearGradient>
        <filter id="desfoque-via" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <rect x="0" y="0" width="400" height="260" fill="url(#ceu-fundo)" />

      {/* brilho difuso da Via Lactea por tras das estrelas dela */}
      <g transform="rotate(-14 200 100)" filter="url(#desfoque-via)">
        <ellipse cx="200" cy="100" rx="260" ry="26" fill="url(#via-lactea-brilho)" />
      </g>

      {VIA_LACTEA.map((e) => (
        <circle key={`v${e.key}`} cx={e.x} cy={e.y} r={e.r} fill="#f0e9da" opacity={e.o} />
      ))}
      {CAMPO.map((e) => (
        <circle key={e.key} cx={e.x} cy={e.y} r={e.r} fill="#f0e9da" opacity={e.o} />
      ))}

      {CINTILANTES.map((e) => (
        <g key={`c${e.key}`} className="estrela-cintila" style={{ animationDelay: `${e.atraso}s`, animationDuration: `${e.dur}s` }}>
          <circle cx={e.x} cy={e.y} r={e.r * 4.5} fill="url(#estrela-brilho)" />
          <circle cx={e.x} cy={e.y} r={e.r} fill="#fff" />
        </g>
      ))}

      {/* brilho de horizonte: e ele que faz a silhueta da serra aparecer */}
      <rect x="0" y="120" width="400" height="140" fill="url(#horizonte)" />

      {/* serra distante, mais clara, e serra proxima, quase preta */}
      <path
        d="M0,260 L0,178 L40,150 L78,168 L120,132 L160,160 L205,140 L245,166 L290,126 L335,158 L400,138 L400,260 Z"
        fill="#0d1a2b"
      />
      <path
        d="M0,260 L0,200 L30,176 L62,194 L104,150 L140,186 L178,166 L214,196 L250,158 L290,192 L326,146 L364,184 L400,170 L400,260 Z"
        fill="#04070d"
        stroke="#2a4266"
        strokeWidth="0.7"
        strokeOpacity="0.7"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <header className="relative isolate flex min-h-[92vh] flex-col justify-end overflow-hidden px-5 pb-16 sm:px-8">
      <CeuNoturno />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noturno/85 via-noturno/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <p className="font-display text-sm tracking-wide text-latao">
          Zênite · São Bento do Sapucaí, Serra da Mantiqueira
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-marfim sm:text-5xl md:text-6xl">
          O céu daqui de cima ainda é escuro o suficiente pra se ver por inteiro
        </h1>
        <p className="mt-5 max-w-xl text-lg text-neblina">
          Sessões guiadas de telescópio a 1.100 m de altitude, longe da poluição luminosa da Grande São Paulo.
          Cada objeto observado vem com a distância, a magnitude e o tamanho reais — não um passeio de "olhar
          pra cima e admirar".
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#sessoes" className="btn-fosforo">
            Ver sessões disponíveis
          </a>
          <a href="#foco" className="btn-contorno">
            Como é observar por aqui
          </a>
        </div>
      </div>
    </header>
  )
}
