import { LAWYER_NAME } from '../config/site'
import Reveal from './Reveal'

export default function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Reveal>
          <p className="font-heading text-2xl leading-relaxed text-ink md:text-3xl">
            "Boa parte dos processos que eu vejo começou com um contrato mal
            escrito. Meu trabalho é resolver isso antes — não depois."
          </p>
          <p className="mt-6 text-sm text-ink/70">
            {LAWYER_NAME}, à frente do escritório desde 2013
          </p>
        </Reveal>
      </div>
    </section>
  )
}
