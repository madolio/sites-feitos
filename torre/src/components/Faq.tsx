import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Como funciona o teste grátis?',
    resposta:
      '14 dias em qualquer plano, sem cartão de crédito no cadastro. Ao fim do período você escolhe um plano pago ou a conta passa pra modo leitura (seus agendamentos continuam salvos, só não recebe novos).',
  },
  {
    pergunta: 'Dá pra cancelar quando quiser?',
    resposta:
      'Sim, direto no painel, sem precisar falar com suporte nem justificar. O cancelamento vale a partir do fim do ciclo já pago — não cobramos proporcional nem devolvemos proporcional.',
  },
  {
    pergunta: 'A Torre integra com o Google Agenda e o Outlook?',
    resposta:
      'Sim, os dois têm integração nativa de mão dupla: um agendamento criado na Torre aparece na sua agenda externa e vice-versa, com sincronização em até um minuto.',
  },
  {
    pergunta: 'Consigo migrar meus agendamentos de outra plataforma?',
    resposta:
      'Importamos CSV de agenda com data, cliente e serviço direto no onboarding. Pra bases maiores ou formatos fora do padrão, o time técnico ajuda na migração sem custo extra nos planos Equipe e acima.',
  },
  {
    pergunta: 'Onde ficam armazenados os dados dos meus clientes?',
    resposta:
      'Em servidores no Brasil, com backup diário e criptografia em repouso. Você é o controlador dos dados dos seus clientes conforme a LGPD; a Torre atua como operadora e não vende nem compartilha esses dados com terceiros.',
  },
  {
    pergunta: 'Que tipo de suporte vem incluso?',
    resposta:
      'Chat com resposta em horário comercial em todos os planos. Planos Equipe e Escala têm SLA de resposta em até 4h e um canal direto, sem passar por triagem automática.',
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
        <span className="font-medium text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="mono shrink-0 text-lg text-cyan transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-ink-dim' : 'hidden'}>
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
          <p className="mono text-sm text-amber">Perguntas frequentes</p>
          <h2 className="mt-2 text-4xl font-medium tracking-tight md:text-5xl">Antes de assinar</h2>
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
