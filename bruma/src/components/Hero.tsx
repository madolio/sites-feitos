import { ShaderBackground } from './ShaderBackground'

export default function Hero() {
  return (
    <section className="relative flex h-svh w-full items-center overflow-hidden">
      <div className="absolute inset-0">
        <ShaderBackground className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noite/40 via-transparent to-noite" />

      <header className="absolute inset-x-0 top-0 z-10 p-5 sm:p-8">
        <h1 className="font-display text-3xl">Bruma</h1>
        <p className="mt-1 text-sm text-fumo">perfumaria artesanal sob medida</p>
      </header>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <p className="text-sm text-fumo">Concentração e pirâmide olfativa reais — não um rótulo bonito.</p>
        <h2 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">
          Uma fragrância composta pra você, não escolhida numa vitrine.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-fumo">
          Role pra ver como cada camada de aroma se sustenta com a concentração certa de óleo essencial.
        </p>
      </div>
    </section>
  )
}
