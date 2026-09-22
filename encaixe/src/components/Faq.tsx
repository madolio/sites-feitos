import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Quantas provas eu preciso fazer?',
    resposta:
      'Duas: a primeira prova, logo depois que o molde vira peça costurada em linha reta (sem acabamento), e a prova final, já com o caimento ajustado e os detalhes fechados. Se alguma coisa pedir um terceiro encontro (ombro puxando, manga curta), marcamos sem custo extra.',
  },
  {
    pergunta: 'Quanto tempo demora do pedido até a entrega?',
    resposta:
      'Da medição à entrega, entre três e cinco semanas, dependendo da peça e da fila de costura do momento. Colete costuma sair mais rápido; blazer é o que mais tempo leva, por causa da entretela e do acabamento interno.',
  },
  {
    pergunta: 'Posso levar meu próprio tecido?',
    resposta:
      'Pode. Conferimos a gramatura e a largura do rolo antes de cortar, porque isso muda quanto sobra pra ajuste futuro. Se o tecido for muito fino ou instável pra determinada peça, avisamos antes de começar. Melhor trocar de plano no início do que no meio da costura.',
  },
  {
    pergunta: 'E se eu não gostar do caimento depois de pronto?',
    resposta:
      'Ajustamos sem custo em até 15 dias após a entrega, desde que a peça não tenha sido alterada por fora daqui. O molde já é feito nas suas medidas, então erro de corte é raro, mas caimento é sempre negociável até você aprovar.',
  },
  {
    pergunta: 'Fazem ajuste em peça que não foi feita aqui?',
    resposta:
      'Fazemos, sim, com orçamento à parte depois de ver a peça pessoalmente. Sem ver o corte original não dá pra saber se o ajuste é simples ou exige desmontar forro e entretela.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Metade na medição, pra entrar na fila de corte, e metade na entrega. Parcelamos no cartão em até três vezes sem juros; à vista tem 5% de desconto.',
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
        <span className="font-heading font-medium text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 font-heading text-lg text-fio transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-ink/70' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-24 border-b border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="rotulo text-fio">Dúvidas frequentes</p>
          <h2 className="mt-2 max-w-xl font-heading text-3xl font-medium text-ink sm:text-4xl">
            O que quem está fechando a primeira peça costuma perguntar
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
