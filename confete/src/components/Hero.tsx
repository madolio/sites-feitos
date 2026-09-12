import Sticker from './Sticker'

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <Sticker shape="star" color="sun" rotate={-12} className="absolute top-24 left-[6%] h-10 w-10 sm:h-14 sm:w-14" />
      <Sticker shape="blob" color="sky" rotate={8} className="absolute top-40 right-[8%] h-14 w-14 sm:h-20 sm:w-20" />
      <Sticker shape="bolt" color="ember" rotate={15} className="absolute bottom-16 left-[12%] h-10 w-10 sm:h-14 sm:w-14" />
      <Sticker shape="balloon" color="mint" rotate={-6} className="absolute right-[14%] bottom-24 h-12 w-12 sm:h-16 sm:w-16" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <h1 className="font-display text-5xl leading-[0.95] font-extrabold sm:text-7xl">
          Festa pronta.
          <br />
          Você só{' '}
          <span className="inline-block rounded-xl border-[1.5px] border-carbon bg-ember px-2.5 py-0.5 -rotate-2">
            chega
          </span>
          .
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-carbon/80">
          Buffet, decoração e recreação pra festa infantil — combinados num
          pacote só, sem você correr atrás de fornecedor nenhum.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#contato" className="btn-sticker">
            Peça um orçamento
          </a>
          <a href="#pacotes" className="btn-ghost">
            Ver pacotes
          </a>
        </div>
      </div>
    </section>
  )
}
