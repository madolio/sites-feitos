import { sendToWhatsApp } from '../demo'
import { Mark } from './Mark'

export default function Footer() {
  return (
    <footer className="bg-ink text-gesso">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-6 md:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            <Mark className="h-14 w-14" />
            <p className="text-5xl font-medium tracking-tight md:text-7xl">estúdio alma</p>
          </div>
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá, Estúdio Alma! Queria tirar uma dúvida sobre as aulas.')}
            className="inline-flex items-center justify-center bg-gesso px-6 py-3.5 font-medium text-ink transition-colors hover:bg-amarela"
          >
            Falar no WhatsApp
          </button>
        </div>

        <dl className="mt-12 grid gap-6 border-t border-gesso/20 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-gesso/70">Onde</dt>
            <dd className="mt-1">Vila Madalena, São Paulo</dd>
          </div>
          <div>
            <dt className="text-sm text-gesso/70">Quando</dt>
            <dd className="mt-1">Segunda a sexta, 7h às 21h. Sábado, 8h às 12h.</dd>
          </div>
          <div>
            <dt className="text-sm text-gesso/70">Turmas</dt>
            <dd className="mt-1">Até 3 alunos nos aparelhos, até 6 no solo</dd>
          </div>
        </dl>

        <p className="mt-14 text-sm text-gesso/75">
          O Estúdio Alma é um negócio fictício: um conceito feito com{' '}
          <span aria-hidden="true" className="text-amarela">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-medium text-gesso underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
