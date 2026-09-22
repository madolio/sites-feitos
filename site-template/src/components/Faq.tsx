import { useId, useState } from 'react'
import Reveal from './Reveal'

// Índice de consultas frequentes — mesma lógica de índice clicável do
// `Catalog.tsx` (código + título), só que aqui cada código abre a própria
// resposta embaixo dele em vez de trocar um painel de detalhe ao lado.
// Continua um acordeão de verdade (button + aria-expanded/aria-controls),
// não um `<details>` estilizado escondido atrás de CSS.
const consultas = [
  {
    codigo: 'C.01',
    pergunta: 'Quanto custa a primeira consulta?',
    resposta:
      'A primeira consulta é sem custo. Serve pra entender o caso e dizer com clareza se faz sentido seguir — e, se fizer, qual área do acervo cuida disso e qual o valor do trabalho a partir daí.',
  },
  {
    codigo: 'C.02',
    pergunta: 'Como funciona a cobrança depois disso?',
    resposta:
      'Consultivo empresarial (canal direto pra dúvidas do dia a dia) tem mensalidade fixa. Trabalho pontual — um contrato, uma abertura de sociedade, um processo — é orçado à parte, com valor fechado antes de começar, sem cobrança por hora surpresa.',
  },
  {
    codigo: 'C.03',
    pergunta: 'Quanto tempo demora um caso?',
    resposta:
      'Contrato e questão societária costumam fechar em 2 a 4 semanas, contando negociação com a outra parte. Contencioso cível depende do andamento na Justiça — nesses casos, damos uma estimativa realista já na primeira consulta, não uma data genérica.',
  },
  {
    codigo: 'C.04',
    pergunta: 'Que documentos preciso levar na primeira conversa?',
    resposta:
      'Nenhum é obrigatório pra marcar. Se já tiver o contrato, contrato social ou qualquer papel relacionado ao caso, traz — ajuda a dar uma resposta mais precisa de cara. Se não tiver nada em mãos ainda, a gente lista o que falta na própria consulta.',
  },
  {
    codigo: 'C.05',
    pergunta: 'O que eu conto fica em sigilo?',
    resposta:
      'Sim, integralmente — é sigilo profissional previsto no Estatuto da OAB, não uma cortesia. Vale desde a primeira consulta, mesmo que o caso não siga adiante depois.',
  },
  {
    codigo: 'C.06',
    pergunta: 'E se meu caso não for nenhuma das áreas do acervo?',
    resposta:
      'Dizemos com honestidade na primeira consulta e, quando possível, indicamos um colega de confiança pra área certa — não seguramos um caso fora do que efetivamente dominamos.',
  },
]

function ItemConsulta({
  codigo,
  pergunta,
  resposta,
}: {
  codigo: string
  pergunta: string
  resposta: string
}) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-ink/15 py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-start gap-4 text-left"
      >
        <span className="catalog-code mt-0.5 shrink-0 text-xs text-accent-hover">{codigo}</span>
        <span className="flex-1 font-heading text-lg text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="catalog-code shrink-0 text-ink/50 transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={aberto ? 'mt-3 pl-[3.25rem] text-sm text-ink/70' : 'hidden'}
      >
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="consultas" className="scroll-mt-20 border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="catalog-code text-xs tracking-[0.14em] text-accent-hover uppercase">
            Consultas ao balcão
          </p>
          <h2 className="mt-3 text-3xl text-ink md:text-4xl">
            Perguntas de quem está pensando em marcar
          </h2>
          <p className="mt-4 max-w-xl text-ink/70">
            As dúvidas que mais chegam antes de alguém pedir a primeira consulta —
            organizadas como um índice, uma pergunta por vez.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          {consultas.map((c) => (
            <ItemConsulta key={c.codigo} codigo={c.codigo} pergunta={c.pergunta} resposta={c.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
