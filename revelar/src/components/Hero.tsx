export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-24 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-sm tracking-[0.3em] text-amber-ink">ISO 400 · 50MM · F/1.8</p>
        <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">
          A foto boa é a que ninguém percebeu que foi tirada.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ink/70 normal-case">
          Casamento, ensaio e evento fotografados sem pose de cerimônia — o
          registro de verdade do que aconteceu.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#contato" className="btn-amber">
            Pedir orçamento
          </a>
          <a href="#servicos" className="btn-line">
            Ver a folha de contato
          </a>
        </div>
      </div>
    </section>
  )
}
