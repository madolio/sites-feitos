import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-24">
        <Reveal className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Fale com a nossa equipe
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Conte o que você precisa tratar e receba uma orientação rápida
              sobre a melhor solução para o seu caso.
            </p>
          </div>

          <div className="space-y-8 md:pt-3">
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="mt-1 text-white/70">Resposta rápida, direto com a equipe técnica.</p>
              <button
                type="button"
                onClick={() =>
                  sendToWhatsApp('Olá, Nascente! Quero um orçamento pros equipamentos de tratamento de água.')
                }
                className="mt-4 inline-flex items-center justify-center rounded-sm bg-white px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-white/85"
              >
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/50">
          <span>© {new Date().getFullYear()} Nascente</span>
          <span>Equipamentos para tratamento de água</span>
        </div>

        <p className="mt-4 text-sm text-white/40">
          A Nascente é uma empresa fictícia: este site é um conceito criado
          pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/20 transition-colors hover:text-white/70 hover:decoration-white/50"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
