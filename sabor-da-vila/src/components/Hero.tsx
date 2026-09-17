import RisoBurger from './RisoBurger'
import StickerPeel from './StickerPeel'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* Entrada escalonada (título, texto, botões) pra página não "aparecer
            pronta" de uma vez — mesmo mecanismo do Reveal usado no resto da
            página, só que aqui sem scroll trigger (já está acima da dobra),
            delay curto pra não competir com a animação de registro do
            RisoBurger ao lado. */}
        <Reveal as="div" className="relative z-10" stagger={0.12} delay={0.15} y={18}>
          <h1 className="poster text-blue">
            <span className="riso-type text-[4.4rem] leading-[0.88] sm:text-8xl lg:text-[8.6rem]">
              <span>Sabor da Vila</span>
              <span className="riso-pink" aria-hidden="true">
                Sabor da Vila
              </span>
            </span>
          </h1>
          <p className="mt-7 max-w-md text-xl font-medium">
            Smash e hambúrguer da casa feitos na chapa, na hora, de terça a
            domingo. Na esquina da Vila Pompeia ou na sua porta.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#cardapio" className="btn-blue text-lg">
              Ver o cardápio
            </a>
            <a href="#onde" className="btn-paper">
              Horário e entrega
            </a>
          </div>
        </Reveal>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <RisoBurger />
          {/* O StickerPeel se posiciona dentro do pai (limites do arraste). */}
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute inset-0">
              <StickerPeel
                imageSrc="/adesivo-terca.svg"
                alt="Promoção de terça: 2 smash com fritas por R$ 49"
                width={128}
                rotate={-14}
                peelBackHoverPct={24}
                peelBackActivePct={36}
                shadowIntensity={0.35}
                lightingIntensity={0.08}
                initialPosition={{ x: 16, y: 8 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
