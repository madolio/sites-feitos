import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso agendar consulta ou dá pra chegar direto?',
    resposta:
      'Pra consulta e exame, agenda pelo WhatsApp — garante horário com o veterinário certo. Banho e tosa aceita encaixe na hora se tiver vaga livre no dia, mas não garantimos sem reserva prévia.',
  },
  {
    pergunta: 'Como funciona a carteirinha de vacinação?',
    resposta:
      'Toda vacina aplicada aqui entra na ficha do pet na hora, com carimbo e data da próxima dose. Se o pet já tem carteirinha de outro lugar, traga na primeira consulta pra gente atualizar o histórico completo.',
  },
  {
    pergunta: 'E se for uma emergência fora do horário de vocês?',
    resposta:
      'Fora do horário comercial, o plantão 24h fica na Clínica Central, a 800m daqui. Deixamos o endereço e telefone na recepção e no rodapé do site — não atrase o atendimento tentando nos chamar fora de expediente.',
  },
  {
    pergunta: 'Precisa levar o pet em jejum pra exame de sangue?',
    resposta:
      'Sim, jejum de 8 a 12 horas pra exame de sangue, com água liberada. Pra exame de imagem geralmente não precisa, mas confirmamos na hora de marcar porque depende do tipo de exame pedido.',
  },
  {
    pergunta: 'O banho e tosa serve pra qualquer porte e pelagem?',
    resposta:
      'Sim, do porte pequeno ao grande, com produto hipoalergênico padrão em todos os banhos. Pelagem que exige tosa técnica (poodle, lhasa) tem valor à parte — avisamos o acréscimo antes de confirmar o agendamento.',
  },
  {
    pergunta: 'Posso trocar ou cancelar um horário marcado?',
    resposta:
      'Pode, com pelo menos 3 horas de antecedência pelo WhatsApp, sem custo. Cancelamento em cima da hora ou falta sem aviso pode pedir confirmação de pagamento pra reagendar depois.',
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
          className="stamp flex h-7 w-7 shrink-0 items-center justify-center text-sm text-accent transition-transform motion-reduce:transition-none"
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
    <section id="duvidas" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal as="h2" className="text-3xl sm:text-4xl">
          Perguntas antes de marcar
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
