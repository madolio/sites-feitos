import { linkWhatsApp } from '../contato'
import { PROFISSIONAL } from '../dados'
import Reveal from './Reveal'

// O rodapé é o bloco de contato, sobre o grafite — substitui a faixa de CTA
// que existia antes e o rodapé separado. Só a região aparece: o endereço
// completo nunca entra no site (decisão do cliente, ver CLAUDE.md).
export default function Contato() {
  return (
    <footer id="contato" className="escuro bg-grafite text-white">
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-10 md:pt-24">
        <Reveal className="grid gap-8 md:grid-cols-[1.4fr_auto] md:items-end md:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl">Precisa de orçamento?</h2>
            <p className="mt-4 max-w-md text-white/75">
              Me chame no WhatsApp e conta o que você precisa — água ou
              elétrica.
            </p>
          </div>

          <a
            href={linkWhatsApp('Olá! Gostaria de um orçamento.')}
            target="_blank"
            rel="noreferrer"
            className="btn-claro justify-self-start"
          >
            Falar no WhatsApp
          </a>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/65">
          <span className="font-heading font-semibold text-white">{PROFISSIONAL.nome}</span>
          <span>Tratamento de água e serviços elétricos · {PROFISSIONAL.regiao}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <p className="mt-3 text-sm text-white/65">
          feito com <span aria-hidden="true" className="text-agua-luz">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-agua-luz/50 underline-offset-4">
            madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
