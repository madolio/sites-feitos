export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-contorno/25"
      >
        <g className="contorno-deriva" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M -50 420 C 80 380, 160 440, 260 400 S 420 320, 520 340 S 680 260, 780 280 S 960 200, 1080 220" />
          <path d="M -50 360 C 100 320, 190 380, 300 340 S 470 260, 570 280 S 730 200, 840 220 S 1000 150, 1080 170" />
          <path d="M -50 300 C 120 260, 220 320, 340 280 S 520 200, 620 220 S 780 150, 890 170 S 1020 110, 1080 120" />
          <path d="M -50 240 C 140 200, 250 260, 380 220 S 560 150, 660 170 S 820 100, 930 120 S 1030 80, 1080 90" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <p className="dado-mapa text-altitude">reabilitação · trilha topográfica</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          A sua recuperação, vista como um percurso que dá pra acompanhar.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-tinta/80">
          Cada fase do seu tratamento é um trecho de trilha real: dor sob controle, amplitude de
          volta, força reconstruída, retorno ao que você fazia antes. Você vê em que ponto está e
          quanto falta pra chegar lá.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#trilha" className="btn-trilha">
            Ver o mapa da recuperação
          </a>
          <a href="#contato" className="btn-outline">
            Agendar avaliação
          </a>
        </div>
      </div>
    </section>
  )
}
