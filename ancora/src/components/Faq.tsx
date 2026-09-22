import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Qual o patrimônio mínimo pra começar?',
    resposta:
      'Não trabalhamos com piso fixo. O diagnóstico inicial serve justamente pra ver se faz sentido pra você agora — às vezes o caminho certo é planejamento financeiro puro, sem gestão de carteira, até o patrimônio crescer.',
  },
  {
    pergunta: 'Como funciona a cobrança: comissão sobre os investimentos ou um valor fixo?',
    resposta:
      'Cobramos um honorário fixo, combinado no plano. Não recebemos comissão de banco, corretora ou gestora, então não tem incentivo pra te empurrar o produto que paga melhor pra nós em vez do que serve pra você.',
  },
  {
    pergunta: 'Vocês têm acesso ao meu dinheiro?',
    resposta:
      'Não. Suas contas e investimentos continuam nas instituições que você já usa. A gente orienta a alocação e acompanha; quem movimenta é você, ou seu operador de conta, nunca nós.',
  },
  {
    pergunta: 'Com que frequência eu fico sabendo como está o patrimônio?',
    resposta:
      'Revisão formal a cada trimestre, com relatório e conversa marcada. Fora isso, respondemos dúvidas pontuais por telefone ou e-mail sem precisar esperar o próximo trimestre.',
  },
  {
    pergunta: 'E se eu quiser encerrar o contrato?',
    resposta:
      'Aviso com 30 dias, sem multa. O plano e o histórico de decisões ficam documentados com você, então o trabalho já feito não se perde.',
  },
  {
    pergunta: 'Vocês entram em holding e sucessão, ou só em investimento do dia a dia?',
    resposta:
      'As duas coisas. Planejamento sucessório costuma vir depois que o plano financeiro básico já está rodando, mas se sua prioridade agora é estrutura de holding ou testamento, começamos por aí.',
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
        <span className="font-semibold text-indigo">{pergunta}</span>
        <span
          aria-hidden="true"
          className="mono shrink-0 text-brass transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-indigo/75' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <p className="mono text-brass">Dúvidas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl md:text-4xl">
            O que quem está avaliando fechar costuma perguntar
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
