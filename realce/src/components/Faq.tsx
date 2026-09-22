import { useId, useState } from 'react'

const perguntas = [
  {
    pergunta: 'Preciso agendar com quanto tempo de antecedência?',
    resposta:
      'Quanto antes, melhor, principalmente pra sábado e pra serviços de noiva. O jeito mais rápido de garantir horário é montar sua visita aqui embaixo e mandar pelo WhatsApp: a gente confirma o horário real na conversa.',
  },
  {
    pergunta: 'O site mostra o valor dos serviços?',
    resposta:
      'Não. O orçamento certo depende do seu cabelo e do que você quer fazer no dia, então preferimos combinar pelo WhatsApp em vez de publicar um preço genérico que pode não bater com o seu caso.',
  },
  {
    pergunta: 'Dá pra remarcar ou cancelar um horário já confirmado?',
    resposta:
      'Dá, sim. Confirmação de horário é sempre pelo WhatsApp, então remarcação e cancelamento também: é só avisar por lá com a maior antecedência possível pra abrir o horário pra outra pessoa.',
  },
  {
    pergunta: 'Vocês atendem cabelo cacheado e cabelo com química anterior?',
    resposta:
      'Sim, atendemos os dois. Pra química anterior (progressiva, coloração, alisamento), é bom avisar no WhatsApp antes da visita pra combinar o procedimento certo pro estado atual do seu cabelo.',
  },
  {
    pergunta: 'O salão também é escola de cabeleireiros. Isso muda o atendimento?',
    resposta:
      'Não pro cliente: quem atende no salão é equipe do salão. A escola funciona à parte, formando profissionais — não é aula acontecendo na sua cadeira.',
  },
  {
    pergunta: 'Segunda-feira funciona?',
    resposta: 'Não, segunda é o único dia fechado. Terça a sábado, das 9h às 19h.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-preto/10 py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-medium text-preto">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-dourado-escuro transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-grafite' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="bg-branco py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="revelar">
          <p className="rotulo text-dourado-escuro">Perguntas frequentes</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Antes de marcar seu horário</h2>
        </div>

        <div className="revelar mt-8">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </div>
      </div>
    </section>
  )
}
