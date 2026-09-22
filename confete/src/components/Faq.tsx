import { useId, useState } from 'react'

const perguntas = [
  {
    pergunta: 'Com quanto tempo de antecedência preciso fechar a festa?',
    resposta:
      'Pelo menos 15 dias, pra garantir a data e o tema escolhido. Em cima da hora — menos de 7 dias — a gente até tenta encaixar, mas só confirma depois de checar a agenda dos monitores.',
  },
  {
    pergunta: 'Vocês atendem em qualquer bairro? Tem taxa de deslocamento?',
    resposta:
      'Até 20 km da nossa base não cobramos nada. Passou disso, é R$ 3 por km excedente, e isso já vem calculado no orçamento antes de você fechar.',
  },
  {
    pergunta: 'E se a festa for ao ar livre e chover no dia?',
    resposta:
      'Se o espaço não tiver cobertura, remarcamos sem custo com até 24h de aviso. Se preferir arriscar a data mesmo assim, levamos uma tenda extra por R$ 350.',
  },
  {
    pergunta: 'Dá pra mudar o número de convidados depois de fechado?',
    resposta:
      'Pra cima, sim, até 5 dias antes, e a gente ajusta o buffet proporcionalmente. Pra baixo, o valor do pacote já contratado não muda, porque o buffet e os monitores já foram reservados pra aquele número.',
  },
  {
    pergunta: 'Tem opção pra criança com alergia ou restrição alimentar?',
    resposta:
      'Tem. Avisando com 3 dias de antecedência, a gente prepara prato sem lactose, sem glúten ou vegano de graça pros dois primeiros convidados nessa condição. Do terceiro em diante, cobramos o adicional do prato individual.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Sinal de 40% pra reservar a data, e o restante até 3 dias antes da festa. Parcelamos em até 3x no cartão sem juros.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-carbon/20 py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-display font-bold text-carbon">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 font-display text-xl font-bold text-ember transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 max-w-xl text-carbon/80' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-24 border-t-[1.5px] border-carbon py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-4xl sm:text-5xl">Perguntas antes de fechar</h2>
        <p className="mt-3 max-w-md text-lg text-carbon/80">
          O que os pais mais perguntam antes de reservar a data.
        </p>

        <div className="mt-10">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </div>
      </div>
    </section>
  )
}
