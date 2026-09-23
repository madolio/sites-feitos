import Reveal from './Reveal'

// Quebra visual em faixa cheia de cor, com o wordmark gigante sangrando pra
// fora da tela ao fundo — o dispositivo mais marcante da referência
// (agenciasmk.com.br usa a mesma coisa em lima, com ".SMK" sangrando). Não é
// numerada como as outras seções: na referência esse bloco também interrompe
// a numeração, funciona como respiro/afirmação, não como conteúdo novo.
// A frase é só reafirmação de fatos já estabelecidos em Benefits/Sobre (1
// pessoa só, sem repasse), não um texto novo inventado.
export default function Faixa() {
  return (
    <section className="relative overflow-hidden bg-accent py-20 md:py-28">
      {/* Marca-d'água decorativa via ::before — texto real aqui seria auditado por
          contraste (1.23:1, de propósito) mesmo com aria-hidden. */}
      <span
        aria-hidden="true"
        className="font-poster pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 translate-x-[18%] text-[13rem] leading-none text-white/10 uppercase select-none before:content-['madolio.'] sm:text-[20rem]"
      />

      <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-poster text-3xl leading-tight tracking-tight text-white uppercase sm:text-4xl md:text-5xl">
          Direto com quem faz. <span className="text-white/60">Sem repasse, sem triagem.</span>
        </p>
      </Reveal>
    </section>
  )
}
