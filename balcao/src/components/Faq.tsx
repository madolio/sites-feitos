import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Tem pedido mínimo pra entrega?',
    resposta:
      'Sim, R$ 25 em itens do cardápio, sem contar a taxa de entrega. Abaixo disso só na retirada no balcão.',
  },
  {
    pergunta: 'Quanto tempo demora entre pedir e retirar?',
    resposta:
      'Em horário de pico (12h-14h e 19h-21h) fica em uns 20 minutos. Fora desses horários, geralmente sai em 10.',
  },
  {
    pergunta: 'Dá pra pagar no cartão na hora de retirar?',
    resposta:
      'Dá. Aceitamos cartão, Pix e dinheiro no balcão. Pedido feito pelo WhatsApp você paga na retirada ou na entrega, não é preciso adiantar nada.',
  },
  {
    pergunta: 'Algum lanche vem sem glúten ou sem lactose?',
    resposta:
      'O wrap de frango sai sem glúten se trocar o pão por alface, é só avisar no pedido. Pra lactose, dá pra tirar queijo e maionese dos burgers. A cozinha não é separada pra alergia grave, então quem tem restrição séria melhor confirmar pelo WhatsApp antes de pedir.',
  },
  {
    pergunta: 'Fazem entrega pra empresa, tipo pedido grande pra reunião?',
    resposta:
      'Fazemos, mas pede com um dia de antecedência se for mais de 8 lanches, pra garantir que sai tudo quente e junto.',
  },
  {
    pergunta: 'Qual o raio de entrega?',
    resposta:
      'Até 3 km do balcão. Fora dessa área só retirada mesmo.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-line py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-lg text-leaf transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-ink/75' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-t border-line py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold text-leaf">Perguntas frequentes</p>
          <h2 className="mt-2 max-w-xl text-2xl sm:text-3xl">
            O que a galera pergunta antes de fechar o pedido
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-6">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
