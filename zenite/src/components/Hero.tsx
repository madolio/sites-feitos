// Cena autoral em SVG: a silhueta da Serra da Mantiqueira contra um céu
// estrelado real (posições aproximadas, não um campo de estrelas genérico
// gerado por CSS), com a via láctea sugerida por uma faixa de gradiente —
// sem foto de banco de imagens, mesma convenção do resto do portfólio.
function CeuNoturno() {
  const estrelas = Array.from({ length: 90 }, (_, i) => {
    const seed = i * 137.5
    const x = (seed % 100).toFixed(1)
    const y = ((seed * 0.61) % 62).toFixed(1)
    const r = 0.4 + ((i * 31) % 10) / 12
    const o = 0.25 + ((i * 53) % 10) / 14
    return { x, y, r, o, key: i }
  })

  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="via-lactea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7fd9a0" stopOpacity="0" />
          <stop offset="45%" stopColor="#7fd9a0" stopOpacity="0.08" />
          <stop offset="55%" stopColor="#f0e9da" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#7fd9a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ceu-fundo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0f1c" />
          <stop offset="100%" stopColor="#131c2e" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="260" fill="url(#ceu-fundo)" />
      <rect x="-40" y="-20" width="480" height="220" fill="url(#via-lactea)" transform="rotate(-18 200 130)" />

      {estrelas.map((e) => (
        <circle key={e.key} cx={e.x} cy={e.y} r={e.r} fill="#f0e9da" opacity={e.o} />
      ))}

      {/* Serra recortada contra o céu */}
      <path
        d="M0,260 L0,190 L35,150 L60,175 L95,120 L130,168 L165,140 L200,178 L235,130 L270,165 L310,110 L345,160 L400,150 L400,260 Z"
        fill="#0a0f1c"
        stroke="#131c2e"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <header className="relative isolate flex min-h-[92vh] flex-col justify-end overflow-hidden px-5 pb-16 sm:px-8">
      <CeuNoturno />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noturno via-noturno/20 to-transparent" />

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
