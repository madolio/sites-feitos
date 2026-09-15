import { linkWhatsApp } from '../contato'
import PurezaGauge from './PurezaGauge'

export default function Hero() {
  return (
    <section id="inicio" className="bg-papel px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.2fr_auto] md:items-center">
        <div>
          <p className="rotulo text-agua">São Paulo e região · 22 anos de experiência</p>

          <h1 className="mt-4 text-4xl leading-[1.1] text-grafite sm:text-5xl">
            Tratamento de água e serviços elétricos, feitos por quem entende dos dois.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-fumo">
            Adriano Souza Passos atende residências e clínicas há 22 anos —
            com experiência em água de altíssima pureza, do tipo que
            tratamento de hemodiálise exige, além de tratamento de água em
            geral e serviços elétricos.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={linkWhatsApp('Olá! Gostaria de saber mais sobre os serviços de tratamento de água e elétrica.')}
              target="_blank"
              rel="noreferrer"
              className="btn-agua"
            >
              Falar no WhatsApp
            </a>
            <a href="#servicos" className="btn-contorno">
              Ver serviços
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <PurezaGauge />
        </div>
      </div>
    </section>
  )
}
