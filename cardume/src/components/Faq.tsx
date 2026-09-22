import { useId, useState } from 'react'
import { naProfundidade } from './Pranchetas'

// Dúvidas de quem tá decidindo se fecha o curso, penduradas entre o Advanced
// (30 m) e o fundo (40 m) — mesmo vocabulário visual das pranchetas de curso,
// só que centralizadas e mais largas pra caber o acordeão.
const perguntas = [
  {
    pergunta: 'Preciso saber nadar bem pra fazer o Batismo?',
    resposta:
      'Precisa se sentir bem na água, não nadar como atleta. No Batismo o instrutor fica do seu lado o mergulho inteiro, no seu ritmo. Quem tem medo de água profunda de verdade costuma sofrer mais do que quem só nada mal.',
  },
  {
    pergunta: 'Quantos anos meu filho precisa ter pra mergulhar?',
    resposta:
      'Batismo a partir de 10 anos, com um dos pais junto no mergulho ou autorização assinada presencialmente. Open Water certificado só a partir de 12, na versão Junior, com profundidade máxima menor.',
  },
  {
    pergunta: 'E se eu tiver sinusite ou problema de ouvido?',
    resposta:
      'Sinusite ativa ou resfriado no dia cancela o mergulho — a pessoa não equaliza e machuca o ouvido. Se for uma condição crônica, tipo desvio de septo ou cirurgia antiga, pedimos liberação médica antes de marcar qualquer coisa.',
  },
  {
    pergunta: 'Vocês fornecem o equipamento todo?',
    resposta:
      'Sim: máscara, nadadeira, colete, regulador e roupa de neoprene entram no preço de todos os cursos. Se você já tem máscara própria e prefere a sua, pode trazer.',
  },
  {
    pergunta: 'E se o tempo virar ruim no dia marcado?',
    resposta:
      'Reagendamos sem custo. Mar agitado, água turva ou tempestade não valem o risco, então cancelamos com antecedência quando dá pra prever e no mesmo dia quando não dá.',
  },
  {
    pergunta: 'Preciso de atestado médico?',
    resposta:
      'Pro Batismo, um questionário de saúde resolve — coração, pulmão, pressão. Pra certificação (Open Water pra cima), pedimos declaração de aptidão pra mergulho, que qualquer clínico geral emite.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-espuma/15 py-4 last:border-b-0">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-semibold text-espuma">{pergunta}</span>
        <span
          aria-hidden="true"
          className="font-visor shrink-0 text-lanterna transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-espuma/75' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <div className="absolute inset-x-0 flex justify-center px-4 sm:px-[8%]" style={naProfundidade(37)}>
      <section aria-labelledby="faq-titulo" className="prancheta w-full max-w-2xl">
        <p className="font-visor text-xs text-lanterna">antes de marcar</p>
        <h2 id="faq-titulo" className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Perguntas de quem tá decidindo
        </h2>

        <div className="mt-6">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </div>
      </section>
    </div>
  )
}
