import { START_TICKET } from '../data'
import PosteBarbeiro from './PosteBarbeiro'
import TicketStub from './TicketStub'

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-16 pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <PosteBarbeiro />
        <h1 className="mt-6 text-4xl leading-[1.15] sm:text-5xl">
          Sem fila de espera. Só a sua senha.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-ink/70">
          Corte, barba, coloração e tratamento com horário marcado — você
          chega, é chamado, sai pronto.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#agendar" className="btn-vermelho">
            Marcar horário
          </a>
          <a href="#menu" className="btn-line">
            Ver serviços e preços
          </a>
        </div>
      </div>

      <div className="mt-14">
        <TicketStub numeroInicial={START_TICKET + 1} />
      </div>
    </section>
  )
}
