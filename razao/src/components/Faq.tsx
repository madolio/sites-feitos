import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Quais documentos preciso levar pra virar cliente?',
    resposta:
      'Pra abrir MEI: RG, CPF e comprovante de endereço. Pra quem já tem CNPJ no Simples Nacional: contrato social, cartão CNPJ e o último balancete ou movimento, se já tiver contador anterior. Pra profissional liberal: RG, CPF, comprovante de endereço e os recibos do que já recebeu no ano, se estiver no meio do exercício fiscal.',
  },
  {
    pergunta: 'Vocês só calculam a guia ou também cuidam do pagamento?',
    resposta:
      'Calculamos e emitimos a guia (DAS, Carnê-Leão) e avisamos o vencimento com antecedência. O pagamento você faz, porque a guia sai no seu CPF ou CNPJ, mas mandamos ela pronta com dias de folga antes do prazo.',
  },
  {
    pergunta: 'E se eu perder um prazo mesmo assim?',
    resposta:
      'Avisamos assim que percebemos o atraso e calculamos a multa e os juros atualizados pra regularizar o quanto antes. Quanto mais rápido resolve, menor o acréscimo.',
  },
  {
    pergunta: 'Como funciona a cobrança: mensalidade fixa ou por serviço?',
    resposta:
      'A rotina fiscal mensal (MEI, Simples, Carnê-Leão) tem mensalidade fixa. Serviço pontual, como abertura de CNPJ ou consultoria de enquadramento, é orçado à parte, e você sabe o valor antes de fechar.',
  },
  {
    pergunta: 'Vocês ajudam a formalizar um MEI do zero, sem eu entender nada do processo?',
    resposta:
      'Sim. A abertura é feita pelo Portal do Empreendedor e conduzimos do início ao fim: verificamos se sua atividade entra no MEI, montamos o cadastro e conferimos se saiu certo. Você só passa os dados.',
  },
  {
    pergunta: 'Quanto tempo vocês demoram pra responder uma dúvida?',
    resposta:
      'Em dia útil, respondemos pelo WhatsApp em até um dia. Pergunta urgente de prazo vencendo tem prioridade e costuma ser mais rápida que isso.',
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
          className="dado-fiscal shrink-0 text-selo transition-transform motion-reduce:transition-none"
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
          <p className="dado-fiscal text-selo">Dúvidas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            O que quem está pensando em fechar contrato costuma perguntar
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
