import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso de encaminhamento médico pra começar?',
    resposta:
      'Não é obrigatório na maioria dos casos: você pode marcar a avaliação inicial direto conosco. Se já tiver diagnóstico ou orientação médica, traga o laudo ou o encaminhamento, porque isso ajuda a montar o plano com mais precisão. Em alguns casos pós-cirúrgicos o cirurgião exige liberação médica antes do início, e aí seguimos essa orientação.',
  },
  {
    pergunta: 'Quantas sessões dura um tratamento?',
    resposta:
      'Varia com a lesão e a fase de recuperação, não existe um número que sirva pra todo mundo. Como referência geral, não uma promessa: o percurso mostrado no mapa da trilha costuma ir de semanas iniciais de controle da dor até meses de fortalecimento e retorno funcional, dependendo do caso. O número exato de sessões sai da avaliação, depois de examinar sua condição.',
  },
  {
    pergunta: 'Vocês atendem por convênio ou é só particular?',
    resposta:
      'Atendemos particular. Não somos credenciados a convênios no momento. Se seu plano tiver reembolso pra fisioterapia, emitimos nota fiscal e recibo pra você pedir o reembolso direto com a operadora.',
  },
  {
    pergunta: 'O que eu preciso levar ou vestir na primeira sessão?',
    resposta:
      'Vista roupa confortável que permita movimento, como shorts ou legging pra avaliação de membros inferiores. Traga exames de imagem recentes (raio-x, ressonância, ultrassom) se tiver, e qualquer laudo relacionado à queixa. Toalha e tênis específico não são necessários, a clínica fornece o resto.',
  },
  {
    pergunta: 'Vocês fazem atendimento domiciliar?',
    resposta:
      'Não no momento. Os atendimentos acontecem na clínica em Gramado, onde ficam os equipamentos de eletroterapia, mobilização e fortalecimento usados no plano de tratamento.',
  },
  {
    pergunta: 'Vai doer durante as sessões?',
    resposta:
      'Depende da fase e da técnica. Na fase de controle da dor, o objetivo é reduzir o desconforto, então os exercícios ficam dentro do limite tolerável. Na fase de fortalecimento, é esperado algum desconforto muscular parecido com o de um treino com carga. Dor aguda ou que piora depois da sessão não é esperada, e se acontecer, é importante avisar pra ajustar o plano.',
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
          className="dado-mapa shrink-0 text-altitude transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={aberto ? 'mt-3 text-sm text-tinta/75' : 'hidden'}
      >
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
          <p className="dado-mapa text-altitude">Dúvidas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            O que quem está avaliando começar o tratamento costuma perguntar
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
