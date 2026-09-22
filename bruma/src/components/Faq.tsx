import { useId, useState } from 'react'

const perguntas = [
  {
    pergunta: 'Quanto tempo leva do primeiro contato até o frasco pronto?',
    resposta:
      'A maceração sozinha já pede algumas semanas pros óleos se estabilizarem, então contamos de quatro a seis semanas do dia da conversa olfativa até a entrega. Fragrância sob medida não é coisa que se apressa sem perder qualidade.',
  },
  {
    pergunta: 'Posso pedir ajuste se o resultado não ficar do jeito que eu imaginei?',
    resposta:
      'Sim, uma rodada de ajuste está incluída. Se a concentração ficou forte demais ou uma nota de fundo não combinou com o esperado, reformulamos essa parte específica sem recomeçar o processo inteiro.',
  },
  {
    pergunta: 'Qual a diferença entre pedir um Eau de Toilette e um Extrait?',
    resposta:
      'É a concentração de óleo essencial: EDT fica entre 5% e 15% e dura de três a cinco horas, já pensada pra reaplicar ao longo do dia. Extrait vai de 20% a 30%, quase sem álcool, e segura de dez a doze horas na pele. Na conversa inicial ajudamos a escolher conforme o seu jeito de usar.',
  },
  {
    pergunta: 'Dá pra reencomendar a mesma fragrância depois que o frasco acabar?',
    resposta:
      'Cada composição fica registrada com a ficha técnica dela, então sim: é só avisar o nome ou o código do frasco numerado e recriamos exatamente a mesma pirâmide olfativa.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Metade na aprovação da composição, depois da conversa olfativa, e o restante na entrega do frasco. Aceitamos Pix e cartão.',
  },
  {
    pergunta: 'Vocês entregam em outras cidades ou só atendem local?',
    resposta:
      'A conversa olfativa e os testes são presenciais, mas o frasco final pode ser enviado por transportadora pra qualquer lugar do Brasil depois de pronto.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-fio py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-display text-lg text-marfim">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-2xl text-acento transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-fumo' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Perguntas antes de encomendar</h2>

      <div className="mt-10 max-w-2xl">
        {perguntas.map((p) => (
          <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
        ))}
      </div>
    </section>
  )
}
