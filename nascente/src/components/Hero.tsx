import { Link } from 'react-router-dom'
import { sendToWhatsApp } from '../demo'
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
              indústrias — do projeto à instalação.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  sendToWhatsApp('Olá, Nascente! Quero um orçamento pros equipamentos de tratamento de água.')
                }
                className="btn-primary"
              >
                Falar no WhatsApp
              </button>
              <Link to="/produtos" className="btn-outline">
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>

        <TreatmentDiagram />
      </div>
    </section>
  )
}
