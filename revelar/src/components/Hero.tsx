import Reveal from './Reveal'

// Três provas recém-reveladas, espalhadas como numa mesa de luz — cada uma
// com a borda branca de papel fotográfico. Substitui o hero só-texto por um
// registro real do que o estúdio entrega.
export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-24 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="text-center lg:text-left">
            <p className="font-display text-sm tracking-[0.3em] text-amber-ink">ISO 400 · 50MM · F/1.8</p>
            <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">
              A foto boa é a que ninguém percebeu que foi tirada.
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-ink/70 normal-case lg:mx-0">
              Casamento, ensaio e evento fotografados sem pose de cerimônia — o
              registro de verdade do que aconteceu.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a href="#contato" className="btn-amber">
                Pedir orçamento
              </a>
              <a href="#servicos" className="btn-line">
                Ver a folha de contato
              </a>
            </div>
          </div>

          <Reveal delay={0.1} className="relative mx-auto h-[380px] w-full max-w-sm sm:h-[440px] lg:mx-0 lg:h-[480px] lg:max-w-none">
            <div className="absolute left-0 top-0 w-[56%] -rotate-6 border-8 border-paper bg-paper shadow-xl">
              <img
                src="https://images.pexels.com/photos/37045029/pexels-photo-37045029.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Retrato em preto e branco de um casal de noivos em momento íntimo, testas coladas e olhos fechados."
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[50%] rotate-6 border-8 border-paper bg-paper shadow-xl">
              <img
                src="https://images.pexels.com/photos/19222076/pexels-photo-19222076.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fotógrafo agachado fotografando uma modelo em estúdio, com softbox octagonal ao fundo."
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 z-10 w-[62%] -translate-x-1/2 -translate-y-1/2 -rotate-2 border-8 border-paper bg-paper shadow-2xl">
              <img
                src="https://images.pexels.com/photos/19816937/pexels-photo-19816937.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Noivo e noiva se entreolhando ao ar livre, luz natural e fundo desfocado de vegetação."
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
