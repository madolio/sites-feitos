import { sendToWhatsApp } from '../demo'
import { Mark } from './Varal'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer className="bg-blue text-paper">
      <Reveal as="div" className="mx-auto max-w-6xl px-5 pt-14 pb-8 sm:px-6 md:pt-18">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex items-center gap-3">
            <Mark className="h-14 w-14" />
            <p className="poster text-5xl md:text-7xl">Sabor da Vila</p>
          </div>
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá, Sabor da Vila! Queria tirar uma dúvida sobre o cardápio.')}
            className="inline-flex items-center justify-center rounded-full bg-yellow px-6 py-3 font-bold text-blue transition-transform hover:-rotate-2"
          >
            Falar no WhatsApp
          </button>
        </div>

        <p className="mt-12 text-sm text-paper/90">
          A Sabor da Vila é um negócio fictício: este site é um conceito criado
          pela{' '}
          <a href="https://madolio.com.br" className="font-bold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-paper/90">
          feito com <span aria-hidden="true" className="text-yellow">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-paper/50 underline-offset-4">
            madolio
          </a>
        </p>
      </Reveal>
    </footer>
  )
}
