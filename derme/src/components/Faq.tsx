import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso de indicação médica pra fazer os procedimentos?',
    resposta:
      'Não. Pra procedimentos estéticos (limpeza de pele, peelings, microagulhamento, skinbooster, toxina botulínica) a própria consulta com a Dra. Marina já é a avaliação que indica ou não o procedimento. Se aparecer alguma lesão ou queixa que peça investigação dermatológica clínica, isso é conversado à parte, com pedido de exame se for o caso.',
  },
  {
    pergunta: 'Quanto tempo de afastamento eu preciso considerar depois de um procedimento?',
    resposta:
      'Varia por procedimento. Limpeza de pele e peeling superficial não tiram o paciente da rotina, no máximo uma vermelhidão passageira. Peeling médio e microagulhamento deixam a pele mais sensível ou descamando por alguns dias, então vale evitar compromisso importante logo no dia seguinte. Os detalhes ficam claros na consulta, procedimento por procedimento, junto com a linha do tempo de recuperação.',
  },
  {
    pergunta: 'Quantas sessões costuma levar até ver resultado?',
    resposta:
      'Depende do procedimento e do objetivo. Toxina botulínica e skinbooster costumam ser sessão única, com repetição depois de alguns meses pra manter o efeito. Peeling superficial e microagulhamento normalmente pedem um protocolo de várias sessões espaçadas. Isso só fica definido na avaliação inicial.',
  },
  {
    pergunta: 'Vocês fazem consulta antes de fechar qualquer procedimento?',
    resposta:
      'Sim, sempre. Nenhum procedimento é agendado sem passar antes por avaliação presencial com a Dra. Marina, que decide na consulta se ele é indicado pra pele e pro objetivo do paciente.',
  },
  {
    pergunta: 'Como funciona o pagamento? Vocês atendem por convênio?',
    resposta:
      'O atendimento é particular. Aceitamos pix, cartão e parcelamento. Convênio geralmente não cobre procedimento estético, então vale confirmar direto com seu plano se tiver dúvida.',
  },
  {
    pergunta: 'Tem idade mínima pra procedimentos estéticos?',
    resposta:
      'Sim, os procedimentos estéticos (peelings, microagulhamento, skinbooster, toxina) são pra maiores de 18 anos. A exceção é quando existe indicação clínica dermatológica documentada, aí a avaliação é caso a caso, com acompanhamento dos responsáveis.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-linha py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-noturno">{pergunta}</span>
        <span
          aria-hidden="true"
          className="dado-clinico shrink-0 text-clinico transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={aberto ? 'mt-3 text-sm text-noturno/75' : 'hidden'}
      >
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-t border-linha bg-papel py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-clinico text-clinico">Dúvidas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            O que quem está avaliando um procedimento costuma perguntar
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
