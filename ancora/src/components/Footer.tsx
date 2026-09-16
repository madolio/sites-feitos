import { sendToEmail } from '../demo'
import { Mark } from './Fundeio'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-16 border-t border-line py-16">
      <Reveal as="div" className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl">Vamos organizar o seu patrimônio?</h2>
            <p className="mt-4 max-w-md text-indigo/75">
              O primeiro diagnóstico é sem custo e sem compromisso — só pra
              entender o seu momento.
            </p>
            <button
              type="button"
              onClick={() => sendToEmail('contato@ancorapatrimonio.com.br')}
              className="btn-brass mt-7 inline-flex"
            >
              contato@ancorapatrimonio.com.br
            </button>
          </div>

          <div className="md:pt-1">
            <div className="flex items-center gap-2.5">
              <Mark className="h-7 w-7" />
              <span className="font-serif text-xl">Âncora</span>
            </div>
            <p className="mt-4 text-indigo/75">São Paulo, SP — atendimento remoto em todo o Brasil</p>
          </div>
        </div>

        <p className="mt-16 border-t border-line pt-6 text-sm text-indigo/70">
          A Âncora é uma consultoria fictícia: este site é um conceito criado
          pela{' '}
          <a href="https://madolio.com.br" className="underline decoration-brass/50 underline-offset-4">
            Madolio
          </a>
          . Números e carteiras são ilustrativos, não recomendação de
          investimento.
        </p>
      </Reveal>
    </footer>
  )
}
