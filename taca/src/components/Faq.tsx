import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Preciso reservar a degustação com antecedência?',
    resposta:
      'Sim. A sala de degustação tem lugar pra no máximo 14 pessoas por horário, e os fins de semana costumam fechar com uma a duas semanas de antecedência. Dias de semana geralmente têm vaga com 2-3 dias.',
  },
  {
    pergunta: 'Quem vai dirigir pode participar da degustação?',
    resposta:
      'O motorista da vez fica com a taça de suco de uva integral da casa, sem custo, e prova as mesmas notas de aroma na roda — só sem álcool. Não liberamos degustação completa pra quem confirma que vai dirigir na volta.',
  },
  {
    pergunta: 'A estrada de subida é boa pra qualquer carro?',
    resposta:
      'É pavimentada até o portão, com uma última subida de terra batida de cerca de 800 m. Passa tranquilo de carro baixo em dia seco; depois de chuva forte recomendamos SUV ou 4x4 — avisamos por WhatsApp se a estrada estiver comprometida no dia da sua visita.',
  },
  {
    pergunta: 'Dá pra levar criança ou pet?',
    resposta:
      'Crianças sim, com valor reduzido no passeio pela vinícola e sem cobrança na degustação (elas não bebem, claro). Pets de porte pequeno a médio, na coleira, são bem-vindos na área externa; não entram na sala de degustação por questão de espaço.',
  },
  {
    pergunta: 'Posso comprar os rótulos que eu provar e levar pra casa?',
    resposta:
      'Sim, vendemos direto na vinícola com todos os rótulos disponíveis no estoque do dia, e despachamos caixa fechada (6 ou 12 garrafas) pra qualquer endereço do país via transportadora especializada em vinho.',
  },
  {
    pergunta: 'E se eu quiser levar um grupo grande, tipo 20 pessoas?',
    resposta:
      'Grupos acima de 14 pessoas dividimos em duas degustações consecutivas na mesma sala, ou agendamos a área externa coberta com roda de aromas ampliada, dependendo da época do ano. É melhor combinar direto pelo WhatsApp pra achar o formato certo.',
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
        <span className="font-heading text-lg text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 font-heading text-xl text-garnet transition-transform motion-reduce:transition-none"
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
    <section id="duvidas" className="border-b border-line bg-parchment-deep/50 py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="font-heading text-sm tracking-wide text-garnet uppercase">Perguntas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">O que quem vem visitar costuma perguntar antes</h2>
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
