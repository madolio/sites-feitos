import Credencial from './Credencial'
import Reveal from './Reveal'

export default function Equipe() {
  return (
    <section id="equipe" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="font-serif text-2xl leading-relaxed md:text-3xl">
              "Nosso trabalho não é prever o mercado. É garantir que uma queda de
              um trimestre não mude o seu plano de vinte anos."
            </p>
            <p className="mt-6 text-indigo/75">Renato Vilas Boas, sócio-fundador, CFP® desde 2011</p>
          </div>

          <Credencial />
        </Reveal>
      </div>
    </section>
  )
}
