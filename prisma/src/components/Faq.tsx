import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Quanto tempo leva pra fazer uma peça sob encomenda?',
    resposta:
      'Da aprovação do desenho até a entrega, entre seis e dez semanas, dependendo da pedra escolhida e da complexidade do engaste. Pedra rara ou lapidação especial empurram esse prazo, e avisamos antes de fechar, não depois.',
  },
  {
    pergunta: 'As pedras vêm com certificado de qualidade?',
    resposta:
      'Toda pedra acima de meio quilate sai com laudo gemológico independente: origem, quilate, cor e clareza, quando aplicável. Pra diamante, o laudo inclui os 4 Cs completos, e o documento vai junto com a peça, não por fora.',
  },
  {
    pergunta: 'E se o aro não ficar perfeito depois de pronto?',
    resposta:
      'O primeiro ajuste de aro é por nossa conta, sem custo, dentro de trinta dias da entrega. Depois disso cobramos só a mão de obra; a pedra e o engaste continuam garantidos.',
  },
  {
    pergunta: 'Vocês fornecem documentação pra seguro?',
    resposta:
      'Sim, um laudo de avaliação com valor de reposição, separado do laudo gemológico da pedra. É o documento que a seguradora pede pra apólice de joia, e mandamos em PDF assinado.',
  },
  {
    pergunta: 'Como funciona o pagamento? Preciso pagar tudo antes?',
    resposta:
      'Sinal de 40% pra reservar a pedra e iniciar o desenho, o restante na entrega. Peça de valor mais alto pode ser parcelada em até três etapas, conversamos isso antes de fechar.',
  },
  {
    pergunta: 'O engaste tem garantia?',
    resposta:
      'Um ano contra defeito de fabricação no engaste e na estrutura do aro; não cobre queda ou uso indevido. Revisão de garras a cada dois anos é de graça, pra evitar perda de pedra por desgaste.',
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
        <span className="font-display text-lg font-medium text-marfim">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-xl text-acento transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 max-w-xl text-sm text-fumo' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal as="h2" className="font-display text-3xl sm:text-4xl">
          Perguntas antes de encomendar
        </Reveal>
        <Reveal delay={0.08} as="p" className="mt-3 max-w-md text-fumo">
          O que costuma vir à tona antes de fechar uma peça sob medida.
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
