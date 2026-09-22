import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Quanto tempo dura um projeto, da primeira reunião até a obra pronta?',
    resposta:
      'Um apartamento de médio porte costuma levar de 6 a 8 semanas só na fase de projeto (levantamento, estudo preliminar, projeto executivo) e de 2 a 4 meses de obra, dependendo do escopo. Prazo exato sai depois do levantamento inicial, nunca antes.',
  },
  {
    pergunta: 'A visita técnica inicial é cobrada?',
    resposta:
      'Não. A primeira visita, pra medir o espaço e entender o programa de necessidades, é sem custo e sem compromisso de fechar contrato.',
  },
  {
    pergunta: 'Vocês acompanham a obra ou só entregam o projeto?',
    resposta:
      'Depende do contrato: oferecemos projeto executivo isolado (você contrata a obra por conta própria) ou projeto com acompanhamento de obra incluso, com visitas quinzenais e aprovação de cada etapa antes de liberar a próxima.',
  },
  {
    pergunta: 'O que eu preciso levar pra primeira reunião?',
    resposta:
      'Planta do imóvel se você tiver (não é obrigatório, medimos in loco), referências visuais que você goste ou não goste, e uma ideia de faixa de orçamento — isso evita desenhar um projeto que não cabe no seu bolso.',
  },
  {
    pergunta: 'E se eu quiser mudar algo no meio do projeto?',
    resposta:
      'Mudanças de acabamento ou layout dentro do escopo original entram sem custo extra até a versão final do executivo. Mudanças de escopo (aumentar a área do projeto, trocar de imóvel) são reorçadas à parte, sempre combinado antes de começar.',
  },
  {
    pergunta: 'Como funcionam os honorários?',
    resposta:
      'Cobramos por metro quadrado projetado na fase de projeto, com o valor fechado na proposta antes de você assinar. Acompanhamento de obra, quando contratado, é uma taxa mensal separada, proporcional à duração real da obra.',
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
        <span className="font-medium text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-lg text-ochre transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-ink/70' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <div className="dim-line">
            <span>PERGUNTAS FREQUENTES</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl">O que perguntam antes de fechar o projeto</h2>
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
