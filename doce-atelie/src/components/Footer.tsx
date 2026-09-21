import { sendToWhatsApp } from '../demo'

export default function Footer() {
  return (
    <footer className="bg-cherry text-white">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-6 md:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="display text-6xl md:text-8xl">Doce Ateliê</p>
            <p className="mt-4 text-lg">Bolos e docinhos sob encomenda, na Vila Mariana, São Paulo.</p>
          </div>
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá, Doce Ateliê! Queria tirar uma dúvida sobre encomenda.')}
            className="inline-flex items-center justify-center rounded-[0.6rem] bg-white px-6 py-3 font-semibold text-cherry transition-colors hover:bg-white/90"
          >
            Falar no WhatsApp
          </button>
        </div>

        <dl className="mt-12 grid gap-6 border-t border-white/30 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-white/90">Horário</dt>
            <dd className="mt-1 font-semibold">Terça a sábado, 9h às 18h</dd>
          </div>
          <div>
            <dt className="text-sm text-white/90">Retirada</dt>
            <dd className="mt-1 font-semibold">No ateliê, com hora marcada</dd>
          </div>
          <div>
            <dt className="text-sm text-white/90">Encomendas</dt>
            <dd className="mt-1 font-semibold">Pelo WhatsApp, com 3 dias de antecedência</dd>
          </div>
        </dl>

        <p className="mt-14 text-sm text-white/90">
          A Doce Ateliê é um negócio fictício: um conceito feito com{' '}
          <span aria-hidden="true" className="text-frosting">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
