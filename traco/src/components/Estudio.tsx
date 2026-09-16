import Reveal from './Reveal'

export default function Estudio() {
  return (
    <section id="estudio" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <p className="font-serif text-2xl leading-relaxed md:text-3xl">
          "A gente desenha a planta depois de entender a rotina de quem vai
          morar ali — não o contrário."
        </p>
        <p className="mt-6 text-ink/75">Marina Coutinho, arquiteta responsável, à frente do Traço desde 2016</p>
      </Reveal>
    </section>
  )
}
