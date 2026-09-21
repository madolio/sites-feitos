export default function Hero() {
  return (
    <header className="border-b border-linha bg-tinta px-6 pt-28 pb-20 text-marfim sm:px-10">
      <div className="mx-auto max-w-3xl">
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
