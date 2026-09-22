import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'O convênio cobre a consulta ou é só particular?',
    resposta:
      'Atendemos particular e alguns convênios odontológicos, confirme o seu antes de marcar. Sem convênio, parcelamos tratamentos mais longos (canal, implante) em até 6x no cartão, e a avaliação inicial tem preço fechado, informado por telefone antes de você vir até a clínica.',
  },
  {
    pergunta: 'O que acontece na primeira consulta?',
    resposta:
      'A Dra. Marina examina a arcada, tira uma radiografia se precisar enxergar algo que não dá pra ver a olho nu, e explica o que encontrou dente por dente. Você sai de lá com um plano por escrito, com prioridade (o que não pode esperar) e o que pode ficar pra depois.',
  },
  {
    pergunta: 'Quanto tempo de recuperação depois de uma extração ou canal?',
    resposta:
      'Extração simples: inchaço some em 2 a 3 dias, evite mastigar do lado por uma semana. Canal costuma levar 1 a 2 sessões de 60 a 90 minutos e não tem recuperação de repouso, só uma leve sensibilidade nos primeiros dias, tratável com o analgésico que passamos na receita.',
  },
  {
    pergunta: 'E se eu tiver uma dor forte fora do horário da clínica?',
    resposta:
      'Ligue pro número de emergência que fica no cartão de visita entregue na primeira consulta. Dor aguda, inchaço que cresce rápido ou trauma no dente têm prioridade de encaixe no mesmo dia útil seguinte. Não é preciso esperar a próxima consulta agendada.',
  },
  {
    pergunta: 'Como sei quanto vou pagar antes de fechar o tratamento?',
    resposta:
      'Todo procedimento acima de uma limpeza de rotina sai com orçamento por escrito antes de começar, dente por dente quando o plano envolve mais de um. Nada é feito sem você aprovar o valor primeiro. Se aparecer algo novo no meio do tratamento, avisamos e reorçamos antes de continuar.',
  },
  {
    pergunta: 'Sisos sempre precisam ser removidos?',
    resposta:
      'Não. Avaliamos por radiografia se o dente tem espaço pra erupcionar sem problema, muita gente carrega os quatro sisos a vida toda sem dor. Só indicamos extração cirúrgica quando há impactação real ou risco pros dentes vizinhos, nunca por padrão.',
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
        <span className="font-semibold text-tinta">{pergunta}</span>
        <span
          aria-hidden="true"
          className="rotulo-mono shrink-0 text-esmalte transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-tinta/75' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-b border-linha py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="rotulo-mono">Dúvidas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            O que quem está marcando a primeira consulta costuma perguntar
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
