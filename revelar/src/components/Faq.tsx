import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Quanto tempo até eu ver as fotos?',
    resposta:
      'A seleção prévia sai em até 5 dias úteis, direto no seu celular. O material tratado e finalizado do pacote fecha em até 15 dias corridos. Casamento no fim de semana costuma andar mais rápido, porque já entra na fila de segunda.',
  },
  {
    pergunta: 'As fotos vêm em qual formato e resolução?',
    resposta:
      'Entrega em JPEG de alta resolução, pronto pra imprimir em até 40x60cm sem perder qualidade. Se quiser o arquivo bruto (RAW) de alguma foto específica, é só pedir depois da entrega — cobramos à parte, porque tratamos cada RAW individualmente.',
  },
  {
    pergunta: 'Precisa reservar um horário fixo ou vocês encaixam no meu dia?',
    resposta:
      'Casamento e evento seguem o roteiro do seu dia, sem hora marcada nossa. Ensaio e still têm horário combinado com uma semana de antecedência, porque dependem de luz e de agenda do estúdio.',
  },
  {
    pergunta: 'E se eu não gostar de nenhuma foto da seleção?',
    resposta:
      'Todo pacote inclui revisão. Você aponta o que não bateu e ajustamos enquadramento, cor ou corte sem custo extra, dentro do que já foi fotografado. O que não dá pra fazer é refazer o dia, e é por isso que a seleção prévia existe: pra pegar isso cedo.',
  },
  {
    pergunta: 'Vocês entregam fotos impressas ou só arquivo digital?',
    resposta:
      'O padrão é entrega digital, por link de download que fica ativo por 90 dias. Álbum impresso é opcional, orçado à parte depois que você escolhe as fotos, assim ninguém paga por página que não vai usar.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Sinal de 30% pra reservar a data, e o restante até 48h antes do evento. Pra ensaio e still, que têm agenda mais curta, o pagamento é integral na confirmação do horário.',
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
          className="font-display shrink-0 text-lg text-amber-ink transition-transform motion-reduce:transition-none"
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
    <section id="duvidas" className="scroll-mt-24 border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <span className="font-display text-sm text-ink/50">quadro extra</span>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">O que perguntam antes de fechar a data</h2>
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
