import Reveal from './Reveal'

export default function Equipe() {
  return (
    <section id="equipe" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <p className="font-serif text-2xl leading-relaxed md:text-3xl">
          "Nosso trabalho não é prever o mercado. É garantir que uma queda de
          um trimestre não mude o seu plano de vinte anos."
        </p>
        <p className="mt-6 text-indigo/75">Renato Vilas Boas, sócio-fundador, CFP® desde 2011</p>
      </Reveal>
    </section>
  )
}
