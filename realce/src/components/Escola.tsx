import { sendToWhatsApp } from '../demo'

export default function Escola() {
  return (
    <section id="escola" className="bg-noite py-20 text-luz md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="revelar">
          <p className="rotulo text-latao">Escola</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            Aqui também se forma cabeleireiro.
          </h2>
          <p className="mt-5 max-w-2xl text-fumo">
            O Realce &amp; Cia é salão e escola desde 2004 — as duas coisas, no
            mesmo endereço. Isso muda o atendimento de um jeito que não aparece
            na vitrine: quando a casa precisa explicar a técnica em voz alta
            todo mês, ela não pode trabalhar no automático.
          </p>
        </div>

        <div className="revelar mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-xl">Pra quem senta na cadeira</h3>
            <p className="mt-2 text-fumo">
              Técnica revisada, material conferido e o passo a passo explicado
              enquanto acontece. Você pode perguntar por que aquele produto
              está sendo usado — e receber uma resposta de verdade.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl">Pra quem quer aprender</h3>
            <p className="mt-2 text-fumo">
              Formação de cabeleireiro com prática dentro de um salão em
              funcionamento, não em sala fechada. Turmas e datas mudam ao longo
              do ano — pergunte a próxima.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            sendToWhatsApp(
              'Olá! Queria saber sobre os cursos da escola do Realce & Cia — ' +
                'quais turmas estão abrindo e como funciona a inscrição.',
            )
          }
          className="btn-luz revelar mt-10"
        >
          Saber das próximas turmas
        </button>
      </div>
    </section>
  )
}
