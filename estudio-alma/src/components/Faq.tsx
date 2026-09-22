import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso ter experiência prévia com Pilates pra começar?',
    resposta:
      'Não. A primeira aula, a experimental, é uma avaliação de postura com a Helena, e o plano de treino sai dali. Quem nunca fez nada começa nas aulas de Aparelhos com carga leve.',
  },
  {
    pergunta: 'Preciso levar tênis ou roupa específica?',
    resposta:
      'Roupa que deixe o movimento do quadril e do ombro visível pra correção, nada muito largo. Pilates se faz descalço ou de meia antiderrapante: meia comum escorrega no reformer e não deixamos usar.',
  },
  {
    pergunta: 'Quantas vezes por semana preciso ir pra ver resultado?',
    resposta:
      'Duas vezes por semana é o mínimo que recomendamos pra manter o corpo lembrando do movimento de uma aula pra outra. Uma vez só funciona pra manutenção de quem já tem uma base, não pra quem está começando.',
  },
  {
    pergunta: 'Posso trocar de horário quando quiser ou fico preso numa turma fixa?',
    resposta:
      'As turmas de Aparelhos são fixas porque o número de reformers no estúdio é limitado, então trocar de horário depende de vaga na turma nova. Aulas de Solo têm mais elasticidade porque não dependem do equipamento.',
  },
  {
    pergunta: 'O que acontece se eu faltar?',
    resposta:
      'Falta com aviso de até 4 horas antes libera reposição em outra turma com vaga, dentro do mês. Falta sem aviso não repõe, pra qualquer aluno, porque senão a vaga fica reservada sem ninguém usar.',
  },
  {
    pergunta: 'Vocês atendem quem tem dor crônica ou já fez cirurgia?',
    resposta:
      'A Helena é fisioterapeuta, então reabilitação pós-cirúrgica e dor crônica são bem-vindas. Pedimos o relatório do médico ou fisioterapeuta responsável antes da primeira aula pra saber o que evitar.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-line py-5">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-lg font-medium tracking-tight">{pergunta}</span>
        <span
          aria-hidden="true"
          className="font-mono shrink-0 text-xl text-ink/60 transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 max-w-xl text-ink/75' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-16 border-t-2 border-ink py-20 md:py-28 lg:scroll-mt-0">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <h2 className="display text-6xl md:text-8xl">Antes de marcar.</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-12">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
