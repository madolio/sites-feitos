import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Vocês aceitam meu carro atual como parte do pagamento?',
    resposta:
      'Avaliamos qualquer usado na hora, com laudo por escrito. O valor entra como entrada no financiamento ou abate direto do preço à vista.',
  },
  {
    pergunta: 'Posso levar o carro pra uma inspeção independente antes de fechar?',
    resposta:
      'Pode, e é recomendado. Agenda a vistoria em qualquer oficina ou perito de confiança antes de assinar qualquer papel. O carro fica disponível no horário que você marcar.',
  },
  {
    pergunta: 'O preço anunciado já inclui documentação e taxa de transferência?',
    resposta:
      'Sim, o valor do estoque já cobre DUT, transferência e despachante. Não aparece taxa nova depois que você decidiu comprar.',
  },
  {
    pergunta: 'Como funciona o test-drive?',
    resposta:
      'Marca pelo WhatsApp, leva CNH e deixa um documento com a gente durante o trajeto. Não precisa agendar com dias de antecedência, geralmente dá pra fazer no mesmo dia.',
  },
  {
    pergunta: 'Carro usado sai com garantia?',
    resposta:
      'Os certificados saem com 90 dias de garantia de motor e câmbio. Os demais têm a garantia legal de 90 dias prevista em lei, e mostramos o laudo da vistoria antes da venda pra você conhecer o estado real do carro.',
  },
  {
    pergunta: 'Como funciona a aprovação do financiamento?',
    resposta:
      'Simula na calculadora do site pra ter uma ideia da parcela. Depois manda os documentos. O banco analisa e a resposta costuma sair em 1 a 2 dias úteis.',
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
        <span className="font-display text-marfim">{pergunta}</span>
        <span
          aria-hidden="true"
          className="font-mono shrink-0 text-acento transition-transform motion-reduce:transition-none"
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

export function Faq() {
  return (
    <section id="duvidas" className="bg-carvao px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Dúvidas frequentes</p>
          <h2 className="mt-3 max-w-xl text-3xl text-marfim sm:text-4xl">
            O que quem está pensando em comprar costuma perguntar
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
