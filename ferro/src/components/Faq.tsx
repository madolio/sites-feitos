import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso fazer avaliação física antes de treinar?',
    resposta:
      'Sim. A primeira semana é avaliação: composição corporal, mobilidade e, se você já levanta peso, uma bateria pra estimar seu 1RM nos básicos. Sem isso, a carga inicial é chute — e aqui a gente não chuta.',
  },
  {
    pergunta: 'Qual o horário de funcionamento?',
    resposta:
      'Segunda a sábado, 6h às 22h. Domingo fechado. Pico de sábado de manhã costuma lotar a área de agachamento; se quiser espaço livre, cedo no dia útil é o horário mais tranquilo.',
  },
  {
    pergunta: 'Como funciona o cancelamento do plano?',
    resposta:
      'Aviso com 30 dias de antecedência, sem multa. Cancelamento no meio do ciclo mensal não gera reembolso proporcional — o mês já pago vale até o fim.',
  },
  {
    pergunta: 'Vocês têm personal trainer ou é só musculação livre?',
    resposta:
      'Os dois. O plano padrão dá acesso livre com acompanhamento geral da equipe; personal individual é contratado à parte, com sessões marcadas e revisão de carga a cada 4 semanas, junto com sua reavaliação física.',
  },
  {
    pergunta: 'Preciso saber usar a calculadora de 1RM pra treinar aqui?',
    resposta:
      'Não, é uma ferramenta a mais, não pré-requisito. Ela usa a fórmula de Epley pra estimar sua carga máxima a partir de peso e repetições — útil pra montar percentual de treino, mas a equipe ajusta sua carga de qualquer forma na avaliação.',
  },
  {
    pergunta: 'Tem trava de fidelidade ou dá pra pagar mês a mês?',
    resposta:
      'Mês a mês, sem fidelidade. Quem fecha trimestre ou semestre paga menos por mês, mas isso é opção, não obrigação — ninguém é obrigado a travar plano longo pra treinar aqui.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b-2 border-preto/15 py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-preto">{pergunta}</span>
        <span
          aria-hidden="true"
          className="rotulo shrink-0 text-lima-escuro transition-transform motion-reduce:transition-none"
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

export default function Faq() {
  return (
    <section id="duvidas" className="border-b-2 border-preto bg-branco py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="rotulo text-lima-escuro">Antes de fechar</p>
          <h2 className="mt-2 text-3xl md:text-4xl">Perguntas que a gente ouve toda semana</h2>
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
