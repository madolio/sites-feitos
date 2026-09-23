import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso fazer teste de nivelamento antes de começar?',
    resposta:
      'Sim, é o mesmo teste gratuito de 20 minutos da matrícula. Ele decide em qual carimbo você entra, para não começar do zero se já sabe alguma coisa nem cair numa turma avançada demais.',
  },
  {
    pergunta: 'Quantos alunos tem em cada turma?',
    resposta:
      'Até 8 alunos por turma, em qualquer nível. Turma pequena é o que deixa o professor corrigir a pronúncia de cada aluno, toda aula, não só na prova.',
  },
  {
    pergunta: 'As aulas são online, presenciais ou as duas?',
    resposta:
      'As duas. Turmas com o mesmo professor e o mesmo carimbo acontecem ao vivo por vídeo e presencial na unidade. Você escolhe o formato na matrícula e pode trocar de um pro outro se mudar de rotina.',
  },
  {
    pergunta: 'Se eu faltar, tem aula de reposição?',
    resposta:
      'Sim. Cada turma tem duas aulas de reposição por mês, gravadas ou com outro grupo do mesmo nível no mesmo horário da semana. Falta avisada com um dia de antecedência garante a vaga na reposição.',
  },
  {
    pergunta: 'Qual o tempo mínimo de compromisso? Tem contrato de fidelidade?',
    resposta:
      'Não tem fidelidade. O compromisso é mês a mês, renovado automaticamente até você decidir parar ou subir de nível. Quem cancela no meio do módulo termina as aulas já pagas.',
  },
  {
    pergunta: 'Vocês preparam para provas oficiais como Cambridge, TOEFL ou DELE?',
    resposta:
      'Sim, para quem já está em B2 ou C1. Preparamos para Cambridge (FCE, CAE), TOEFL, DELE e DELF/DALF, com simulados nas últimas semanas antes da data oficial da prova.',
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
          className="stamp-number shrink-0 text-teal text-lg transition-transform motion-reduce:transition-none"
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
    <section id="duvidas" className="scroll-mt-16 border-t border-line py-20 md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="stamp-number text-sm tracking-widest text-teal uppercase">Perguntas frequentes</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Antes de carimbar o passaporte</h2>
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
