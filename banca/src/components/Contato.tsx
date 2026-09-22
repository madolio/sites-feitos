import { sendToWhatsApp } from '../demo'

// O rodapé é o papel de embrulho: kraft, com o "laço" final sendo o
// convite pra encomendar. É onde o aviso de negócio fictício mora.
export default function Contato() {
  return (
    <section id="contato" className="scroll-mt-24 lg:scroll-mt-28">
      <div className="textura-kraft bg-kraft px-6 py-20 text-ink lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm font-semibold tracking-wide text-folha-escuro">Encomendar</p>
          <h2 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">Amarra o laço no WhatsApp</h2>
          <p className="mx-auto mt-4 max-w-lg text-ink/85">
            Conta a ocasião, o orçamento e se tem alguma flor que precisa
            entrar (ou ficar de fora). A gente responde com opções do
            balde do dia.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => sendToWhatsApp('Olá! Quero encomendar um buquê da Banca.')}
              className="btn-primario bg-ink text-bg"
            >
              Chamar no WhatsApp
            </button>
          </div>
          <p className="mt-6 text-sm text-ink/85">
            Feira aberta de terça a domingo · retirada na banca ou entrega no mesmo dia
          </p>
        </div>
      </div>

      <footer className="bg-ink px-6 py-8 text-bg/70">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
          <p>Banca — floricultura de bairro</p>
          <p className="max-w-md">
            A Banca é uma floricultura fictícia: este site é um conceito
            criado pela{' '}
            <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-bg">
              Madolio
            </a>
            .
          </p>
        </div>
      </footer>
    </section>
  )
}
