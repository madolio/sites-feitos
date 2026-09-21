export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-jeans/15"
      >
        <g className="tecido-flutua" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M 0 120 H 1000 M 0 180 H 1000 M 0 240 H 1000 M 0 300 H 1000 M 0 360 H 1000" />
          <path d="M 80 0 V 500 M 280 0 V 500 M 480 0 V 500 M 680 0 V 500 M 880 0 V 500" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <p className="dado-etiqueta text-mostarda">loja de bairro · pronta-entrega</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Roupa de todo dia, com a etiqueta que ensina a cuidar de cada peça.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-carvao/80">
          A Trama é a loja do bairro Floresta pra quem quer se vestir sem drama: básico, jeans,
          vestido, moletom. E, pela primeira vez, um jeito simples de saber o que aquele símbolo
          na etiqueta realmente significa antes de jogar a peça na máquina.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#etiqueta" className="btn-ferrugem">
            Ver a etiqueta de cada tecido
          </a>
          <a href="#contato" className="btn-outline">
            Falar com a loja
          </a>
        </div>
      </div>
    </section>
  )
}
