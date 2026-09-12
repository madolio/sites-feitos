import { frames } from '../data'
import FrameIcon from './FrameIcon'

// A folha de contato — cada serviço é um quadro numerado de negativo, com o
// texto como se fosse a anotação de lápis de cera embaixo do quadro. Sem
// fotos: os quadros são ilustrados (FrameIcon), porque o estúdio não existe.
export default function ContactSheet() {
  return (
    <section id="servicos" className="scroll-mt-24 border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl sm:text-4xl">Folha de contato</h2>
        <p className="mt-3 max-w-md text-ink/70">
          Seis quadros, seis jeitos de te fotografar.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {frames.map((f) => (
            <div key={f.numero} className="bg-paper p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm text-ink/50">{f.numero}</span>
                <FrameIcon tipo={f.tipo} className="h-9 w-9 text-ink" />
              </div>
              <h3 className="mt-4 text-xl">{f.titulo}</h3>
              <p className="grease mt-2 text-amber-ink">{f.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
