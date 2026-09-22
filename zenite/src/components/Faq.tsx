import { useId, useState } from 'react'

const perguntas = [
  {
    pergunta: 'E se estiver nublado ou chovendo no dia?',
    resposta:
      'Reagendamos sem custo — céu fechado não depende de ninguém. Avisamos com a maior antecedência possível pela previsão de nebulosidade, mas a decisão final é tomada no início da noite, no local.',
  },
  {
    pergunta: 'Preciso levar alguma coisa?',
    resposta:
      'Agasalho pesado: a 1.100 m de altitude a temperatura de madrugada costuma ficar bem abaixo da cidade, mesmo no verão. Lanterna, se tiver, com luz vermelha — luz branca atrapalha a adaptação de todo o grupo ao escuro.',
  },
  {
    pergunta: 'Crianças pequenas conseguem acompanhar?',
    resposta:
      'A partir de 5 anos, na sessão infantil (1h, alvos brilhantes como Lua, Saturno e Júpiter). As sessões de céu profundo e as chuvas de meteoros de madrugada são melhores a partir de 10 anos, pela duração e pelo horário.',
  },
  {
    pergunta: 'O equipamento é fornecido?',
    resposta:
      'Sim, nas sessões guiadas o telescópio é do observatório, já calibrado. No aluguel de fim de semana, entregamos calibrado e colimado, com instrução de foco antes da retirada.',
  },
  {
    pergunta: 'Por que a fase da Lua muda o que dá pra ver?',
    resposta:
      'Luz de lua cheia ilumina a atmosfera e "lava" objetos fracos como nebulosas e aglomerados distantes — funciona quase como poluição luminosa natural. Por isso escolhemos o alvo da noite pela fase lunar real do calendário, não por hábito.',
  },
  {
    pergunta: 'Como faço para reservar?',
    resposta:
      'Pelo formulário de contato abaixo, com a sessão e a data de interesse — confirmamos disponibilidade e previsão do tempo pelo WhatsApp.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-latao-fundo/50 py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-display text-lg text-marfim">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-2xl text-fosforo transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-neblina' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Perguntas antes de agendar</h2>

      <div className="mt-10 max-w-2xl">
        {perguntas.map((p) => (
          <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
        ))}
      </div>
    </section>
  )
}
