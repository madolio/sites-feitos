import CalculadoraRM from './CalculadoraRM'

export default function Hero() {
  return (
    <section id="inicio" className="border-b-2 border-preto bg-branco px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="rotulo text-lima-escuro">Treino orientado a dado</p>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">
            Treine com número, não com achismo
          </h1>
          <p className="mt-6 max-w-md text-lg text-fumo">
            Musculação, força e condicionamento em Ferro — cada carga é
            calculada, não chutada. Comece medindo sua carga máxima aqui do
            lado.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#calculadora" className="btn-lima">
              Calcular minha carga
            </a>
            <a href="#planos" className="btn-contorno">
              Ver planos
            </a>
          </div>
        </div>

        <div id="calculadora">
          <CalculadoraRM />
        </div>
      </div>
    </section>
  )
}
