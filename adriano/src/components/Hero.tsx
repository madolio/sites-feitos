import { linkWhatsApp } from '../contato'
import { PROFISSIONAL } from '../dados'
import PurezaGauge from './PurezaGauge'

export default function Hero() {
  return (
    <section id="inicio" className="px-6 pt-24 pb-16 md:pb-24 lg:pt-20">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.35fr_0.8fr] md:items-end md:gap-14">
        <div>
          <p className="rotulo text-fumo">
            {PROFISSIONAL.regiao} · {PROFISSIONAL.anos} de experiência
          </p>

          <h1 className="mt-4 text-[2.25rem] leading-[1.05] sm:text-[2.75rem] md:text-[3.25rem]">
            Tratamento de água e serviços elétricos, feitos por quem entende dos dois.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-fumo">
            Há 22 anos atendo residências e clínicas — com experiência em água
            de altíssima pureza, do tipo que tratamento de hemodiálise exige,
            além de tratamento de água em geral e serviços elétricos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={linkWhatsApp(
                'Olá! Gostaria de saber mais sobre os serviços de tratamento de água e elétrica.',
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-escuro"
            >
              Falar no WhatsApp
            </a>
            <a href="#agua" className="btn-contorno">
              Ver os dois ofícios
            </a>
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <PurezaGauge />
        </div>
      </div>
    </section>
  )
}
