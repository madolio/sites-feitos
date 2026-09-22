import { abrirDemoWhatsApp, SEBO_WHATSAPP_FICTICIO } from '../demo'

export default function Contato() {
  return (
    <section id="contato" className="scroll-mt-10 px-6 py-20 sm:px-10 lg:pl-16">
      <div className="mx-auto max-w-6xl">
        <div className="ficha textura-papel grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="rotulo-mao text-2xl text-carimbo/90">separe o que você quer</p>
            <h2 className="mt-2 text-3xl text-tinta sm:text-4xl">Manda a lista pelo WhatsApp</h2>
            <p className="mt-3 max-w-md text-tinta/75">
              Separamos o exemplar no balcão e combinamos retirada ou entrega. Também compramos acervos — manda foto
              da estante que a gente já dá uma estimativa.
            </p>

            <button
              type="button"
              onClick={() => abrirDemoWhatsApp('Olá! Vi o acervo e queria separar alguns livros.')}
              className="btn-tinta mt-7"
            >
              Chamar no WhatsApp
            </button>
          </div>

          <div className="border-t border-tinta/12 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <dl className="space-y-4 text-sm text-tinta/75">
              <div>
                <dt className="text-xs tracking-wide text-tinta/50 uppercase">WhatsApp</dt>
                <dd className="mt-1">{SEBO_WHATSAPP_FICTICIO}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-tinta/50 uppercase">Onde fica</dt>
                <dd className="mt-1">Rua dos Alfarrabistas, 214 — térreo, fundos da livraria</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-tinta/50 uppercase">Horário</dt>
                <dd className="mt-1">Terça a sábado, 10h às 19h</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-tinta/50 uppercase">Sarau de troca</dt>
                <dd className="mt-1">Última sexta do mês, 18h</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
