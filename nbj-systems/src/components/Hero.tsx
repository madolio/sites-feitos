import { PHONE_PRIMARY, PHONE_PRIMARY_HREF, WHATSAPP_URL } from '../constants'
import TreatmentDiagram from './TreatmentDiagram'

export default function Hero() {
  return (
    <section className="overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-16">
          <h1 className="text-[2.5rem] font-extrabold leading-[1.02] text-ink md:text-[3.75rem]">
            Equipamentos para filtração e purificação de água
          </h1>

          <div>
            <p className="max-w-md text-ink/75">
              Bancadas reprocessadoras, elementos filtrantes, tanques em PRFV
              e osmose reversa para clínicas de hemodiálise, hospitais e
              indústrias. Fabricamos em Taboão da Serra (SP) desde 1990.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary">
                Falar no WhatsApp
              </a>
              <a href={PHONE_PRIMARY_HREF} className="btn-outline">
                Ligar {PHONE_PRIMARY}
              </a>
            </div>
          </div>
        </div>

        <TreatmentDiagram />
      </div>
    </section>
  )
}
