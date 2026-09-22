import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Com que frequência preciso levar o relógio pra revisão?',
    resposta:
      'A cada quatro ou cinco anos, dependendo do uso. Um movimento mecânico não avisa quando está pedindo lubrificação nova, ele só vai perdendo precisão aos poucos. Fazemos a revisão completa aqui, com o mesmo relojoeiro que montou a peça.',
  },
  {
    pergunta: 'Qual é a garantia?',
    resposta:
      'Dois anos contra defeito de fabricação em caixa, mostrador e movimento. Não cobre queda, água além da resistência especificada nem desgaste normal de pulseira. Qualquer problema de montagem é por nossa conta.',
  },
  {
    pergunta: 'Vocês fazem peças sob encomenda, do zero?',
    resposta:
      'Sim, é onde a Calibre passa mais tempo. Partimos de uma conversa sobre o que você usa no dia a dia, desenhamos o mostrador junto com você e só depois escolhemos o movimento, pela proposta da peça.',
  },
  {
    pergunta: 'Quanto tempo demora uma encomenda sob medida?',
    resposta:
      'Entre dez e dezesseis semanas, do desenho aprovado à entrega. Caixa em metal menos comum ou complicação de cronógrafo empurram esse prazo pra perto de quatro meses.',
  },
  {
    pergunta: 'Que tipos de movimento vocês trabalham?',
    resposta:
      'Mecânico manual, automático e um quartzo de alta precisão japonês, pra quem prefere não dar corda. A escolha entra na conversa inicial, junto com caixa e mostrador.',
  },
  {
    pergunta: 'Se eu quiser trocar de relógio mais pra frente, vocês aceitam como parte do pagamento?',
    resposta:
      'Aceitamos peças Calibre anteriores como entrada numa encomenda nova, com avaliação presencial. Relógio de outra marca não entra na troca, mas indicamos pra onde levar.',
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
        <span className="font-heading text-lg font-medium text-cream">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-xl text-brass transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={aberto ? 'mt-3 max-w-xl text-sm text-cream/70' : 'hidden'}
      >
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-20 border-b border-line px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-heading text-4xl font-medium text-cream sm:text-5xl">Perguntas antes de encomendar</h2>
          <p className="mt-3 max-w-md text-cream/65">
            O que costuma vir à tona antes de fechar um calibre.
          </p>
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
