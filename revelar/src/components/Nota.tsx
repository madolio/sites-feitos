import Reveal from './Reveal'

export default function Nota() {
  return (
    <section className="border-t-2 border-ink bg-ink py-20 text-paper md:py-28">
      <Reveal as="div" className="mx-auto max-w-2xl px-6 text-center">
        <p className="grease text-3xl leading-snug text-amber sm:text-4xl">
          "Eu edito no dia seguinte. Casamento não espera duas semanas pra
          virar lembrança."
        </p>
        <p className="mt-5 text-paper/75">Marina Kessler, fotógrafa responsável</p>
      </Reveal>
    </section>
  )
}
