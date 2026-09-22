import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso encomendar com antecedência ou dá pra chegar e levar?',
    resposta:
      'Pão do dia e o que está na fornada é só chegar e levar, enquanto durar. Bolo, torta e encomenda de mais de 4 pães do mesmo tipo pedimos com 1 dia de antecedência — pra festa ou encomenda grande, 3 dias.',
  },
  {
    pergunta: 'Vocês fazem pão sem glúten ou vegano?',
    resposta:
      'Focaccia e pão de forma integral saem sem leite e sem ovo, mas a cozinha não é livre de glúten — não recomendamos pra quem tem doença celíaca. Avisa antes se for o seu caso, pra gente indicar o que dá pra comer com segurança.',
  },
  {
    pergunta: 'Como funciona a encomenda de bolo de aniversário?',
    resposta:
      'Fechamos recheio, tamanho e data com pelo menos 3 dias de antecedência e pedimos metade do valor pra reservar a vaga na produção. O resto você paga na retirada.',
  },
  {
    pergunta: 'O pão de fermentação natural dura quantos dias?',
    resposta:
      'Em saco de papel, na bancada, uns 3 dias com a casca ainda crocante. Depois disso ainda presta pra torrada. Fatiado e congelado aguenta um mês tranquilo.',
  },
  {
    pergunta: 'Vocês entregam ou é só retirada no balcão?',
    resposta:
      'Por enquanto é só retirada. Pros bairros aqui perto, combinamos entrega no WhatsApp caso a encomenda seja grande — mas não é padrão, é caso a caso.',
  },
  {
    pergunta: 'Que horas o pão sai fresco do forno?',
    resposta:
      'A primeira fornada sai às 6h30. Tem mais uma leva de croissant e folhado às 9h e o pão do dia seguinte já fermentando à tarde. Quem quer pegar quente, vem cedo.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b-2 border-crosta/15 py-5">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-lg font-semibold">{pergunta}</span>
        <span
          aria-hidden="true"
          className="tally shrink-0 text-xl text-forno transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-crosta/70' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal as="h2" className="text-3xl md:text-4xl">
          Perguntas de quem ainda não veio
        </Reveal>

        <Reveal as="div" delay={0.05} className="mt-8">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
