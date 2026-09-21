export default function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-linha bg-tinta px-6 pt-28 pb-20 text-marfim sm:px-10">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-6 h-40 w-40 opacity-70 sm:h-56 sm:w-56"
        viewBox="0 0 200 200"
        fill="none"
      >
        <rect x="30" y="20" width="140" height="30" rx="10" fill="#7c5cff" className="lampada-brilho" />
        <rect x="45" y="50" width="110" height="10" fill="#3a2a3c" />
        <path
          d="M70 60 L70 100 C70 112 58 116 58 132 C58 148 76 158 100 158 C124 158 142 148 142 132 C142 116 130 112 130 100 L130 60"
          stroke="#ff6f91"
          strokeWidth="4"
          fill="none"
          strokeLinejoin="round"
          className="esmalte-gota"
        />
      </svg>

      <div className="relative mx-auto max-w-3xl">
        <p className="rotulo-mono text-uv">Uberlândia · MG</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">Renata Bastos Nail Studio</h1>
        <p className="mt-6 max-w-xl text-lg text-marfim/80">
          Esmalteria de bairro que leva o tempo de cura a sério: cada técnica sai da cabine no
          segundo certo, nem antes (risco de manchar), nem depois (desperdício da sua tarde).
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#cura" className="btn-coral">
            Ver o tempo de cura
          </a>
          <a href="#contato" className="btn-outline border-marfim/30 text-marfim hover:border-uv hover:text-uv">
            Agendar horário
          </a>
        </div>
      </div>
    </header>
  )
}
