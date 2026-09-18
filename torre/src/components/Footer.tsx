import { sendToEmail } from '../demo'
import Reveal from './Reveal'
import { Mark } from './Sidebar'

// Antes: bloco escuro "fale com a gente" com CTA grande — mas o CTA já é
// permanente (fixo na Sidebar), então repetir um bloco de call-to-action
// aqui seria redundante. Vira um painel de "sessão" mais discreto, no
// mesmo espírito de instrumento do resto da página.
export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-16 border-t border-line py-10">
      <Reveal className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 sm:px-6">
        <div className="mono flex items-center gap-2.5 text-sm text-ink-dim">
          <Mark className="h-5 w-5" />
          <span>
            Torre —{' '}
            <button
              type="button"
              onClick={() => sendToEmail('contato@torre.app')}
              className="text-cyan underline underline-offset-4"
            >
              contato@torre.app
            </button>
          </span>
        </div>
        <p className="mono text-xs text-ink-dim">
          Produto fictício — conceito criado pela{' '}
          <a href="https://madolio.com.br" className="text-cyan underline underline-offset-4">
            Madolio
          </a>
        </p>
        <p className="mono basis-full text-xs text-ink-dim">
          feito com <span aria-hidden="true" className="text-amber">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-amber/50 underline-offset-4">
            madolio
          </a>
        </p>
      </Reveal>
    </footer>
  )
}
