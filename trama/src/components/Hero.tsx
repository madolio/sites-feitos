// Spread editorial de catálogo: título grande de um lado, legenda + CTA do
// outro (como uma página dupla de revista), não o bloco único centralizado
// que o resto do portfólio usa. O padrão de tecido vira uma faixa baixa,
// não um fundo full-bleed atrás do texto.
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-carvao/15">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-14">
        <h1 className="text-4xl leading-[1.05] sm:text-6xl lg:text-[3.9rem] xl:text-[4.4rem]">
          Roupa de todo dia, com a etiqueta que ensina a cuidar de cada peça.
        </h1>

        <div className="lg:pb-1.5">
          <p className="dado-etiqueta text-mostarda">loja de bairro · pronta-entrega</p>
          <p className="mt-4 max-w-sm text-lg text-carvao/80">
            A Trama é a loja do bairro Floresta pra quem quer se vestir sem drama: básico, jeans,
            vestido, moletom. E um jeito simples de saber o que aquele símbolo na etiqueta
            realmente significa antes de jogar a peça na máquina.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a href="#etiqueta" className="btn-ferrugem">
              Ver a etiqueta de cada tecido
            </a>
            <a
              href="#contato"
              className="text-sm font-semibold text-carvao underline decoration-carvao/30 underline-offset-4 hover:decoration-carvao"
            >
              Falar com a loja
            </a>
          </div>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-16 w-full text-jeans/15 sm:h-24"
      >
        <g className="tecido-flutua" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M 0 30 H 1000 M 0 70 H 1000 M 0 110 H 1000" />
          <path d="M 80 0 V 120 M 280 0 V 120 M 480 0 V 120 M 680 0 V 120 M 880 0 V 120" />
        </g>
      </svg>
    </section>
  )
}
