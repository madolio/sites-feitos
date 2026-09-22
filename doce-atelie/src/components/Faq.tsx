import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    swatch: '#f2e2b3',
    pergunta: 'Com quanto tempo de antecedência preciso encomendar?',
    resposta:
      'Pra bolo de um andar, 3 dias bastam. Bolo de andar ou festa com mais de 60 convidados, o ideal é fechar com 7 dias, porque a decoração leva mais etapas.',
  },
  {
    swatch: '#a2bb6f',
    pergunta: 'Fazem bolo sem glúten ou sem lactose?',
    resposta:
      'Sim, massa sem glúten e recheios sem lactose sob encomenda. Avise na hora de montar o pedido: essas versões são preparadas em outro dia, pra não cruzar com o restante da produção.',
  },
  {
    swatch: '#c98646',
    pergunta: 'Posso misturar qualquer massa com qualquer recheio?',
    resposta:
      'Dentro da cartela, sim, inclusive até dois recheios no mesmo bolo. Um sabor fora da cartela a gente conversa antes de confirmar, porque nem toda combinação segura a estrutura de um bolo de andar.',
  },
  {
    swatch: '#f5c93a',
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Pix, cartão ou dinheiro. 50% de sinal garante a data na agenda, o restante é pago na retirada ou na entrega.',
  },
  {
    swatch: '#c4213a',
    pergunta: 'Vocês entregam ou é só retirada?',
    resposta:
      'Retirada no ateliê, na Vila Mariana, com horário marcado. Entregamos em outros bairros de São Paulo mediante taxa, calculada pela distância.',
  },
  {
    swatch: '#a3243a',
    pergunta: 'Dá pra escrever uma mensagem no bolo?',
    resposta:
      'Dá, até 40 caracteres, sem custo. É um campo opcional no formulário de encomenda: "Feliz 7 anos, Lia" cabe tranquilo.',
  },
]

function ItemFaq({ swatch, pergunta, resposta }: { swatch: string; pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-line py-5">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center gap-4 text-left"
      >
        <span
          aria-hidden="true"
          className="h-6 w-2.5 shrink-0 rounded-[2px]"
          style={{ background: swatch }}
        />
        <span className="flex-1 font-semibold">{pergunta}</span>
        <span
          aria-hidden="true"
          className="display shrink-0 text-2xl text-ink/50 transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 pl-[2.35rem] text-ink/75' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <h2 className="display text-5xl md:text-7xl">Perguntas antes de encomendar</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-12">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} swatch={p.swatch} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
