import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Faltei numa aula. E agora?',
    resposta:
      'Sem multa nem desconto no pacote: é só avisar pelo WhatsApp com até 2h de antecedência e a gente reagenda pra outro horário na mesma semana. Falta sem aviso conta como aula usada, porque o personal já reservou aquele horário só pra você.',
  },
  {
    pergunta: 'Como funcionam os pacotes e o valor?',
    resposta:
      'Vende-se em blocos de 8 ou 12 aulas por mês, não avulso: o preço por aula cai conforme o bloco cresce, porque o personal fecha a agenda com você e não precisa ficar preenchendo horário vago. O valor exato depende do programa escolhido e sai na conversa da aula grátis.',
  },
  {
    pergunta: 'Preciso levar equipamento ou já tem tudo no espaço?',
    resposta:
      'O espaço tem barra, anilha, banco e o essencial de peso livre. Você só traz roupa de treino e tênis fechado. Se o programa pedir algo específico, como faixa elástica pra mobilidade, o personal avisa antes da primeira aula.',
  },
  {
    pergunta: 'Nunca levantei peso na vida. Dá pra começar assim?',
    resposta:
      'Dá, e é o caso mais comum. Todo aluno novo entra pela Base de força, onde o foco é aprender agachamento, terra e supino com carga baixa antes de qualquer coisa mais pesada. Ninguém pula pra Performance sem passar pelos outros três trechos da pista.',
  },
  {
    pergunta: 'E se eu quiser cancelar o pacote no meio do mês?',
    resposta:
      'Cancela quando quiser, sem fidelidade. As aulas já pagas e ainda não usadas ficam disponíveis por 30 dias, caso mude de ideia, e o que não foi usado depois disso não é cobrado no mês seguinte.',
  },
  {
    pergunta: 'Como vocês medem se o treino está funcionando?',
    resposta:
      'Reavaliação de carga a cada 4 semanas nos três movimentos principais, e ficha de repetição de cada aula fica registrada pra comparar mês a mês. Os números que aparecem na página de resultados (carga levantada, aulas concluídas) vêm dessas reavaliações, não são só uma promessa de propaganda.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b-2 border-line py-5">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-lg font-bold text-track">{pergunta}</span>
        <span
          aria-hidden="true"
          className="stopwatch shrink-0 text-2xl text-lane-ink transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-track/70' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-16 border-t-4 border-track py-20 md:py-28 lg:pl-16">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">Antes da largada</h2>
          <p className="mt-4 max-w-md text-lg text-track/70">
            As perguntas que mais aparecem antes de marcar a primeira aula.
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
