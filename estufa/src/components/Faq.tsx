import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Quanto tempo dura o arranjo depois da entrega?',
    resposta:
      'Depende da espécie: as tropicais como Strelitzia e Heliconia seguram de 10 a 14 dias com troca de água a cada 2 dias; orquídeas em vaso, bem mais — semanas, se a luz for indireta e não faltar água. Na ficha de cada espécie no catálogo já vem a durabilidade esperada e o cuidado específico.',
  },
  {
    pergunta: 'Vocês entregam fora de Nova Friburgo?',
    resposta:
      'Entregamos na região serrana toda (Nova Friburgo, Teresópolis, Petrópolis) em até 48h. Pra outras cidades do Rio, combinamos transporte próprio pra não arriscar a planta numa transportadora genérica — fala com a gente antes de fechar o pedido.',
  },
  {
    pergunta: 'Posso escolher uma espécie que não está no catálogo?',
    resposta:
      'Sim, o catálogo de 6 espécies é o que temos em cultivo garantido o ano todo. Fora dele, dependemos de disponibilidade de viveiro parceiro — pergunta pelo WhatsApp que a gente confere prazo e se entra na época de floração certa.',
  },
  {
    pergunta: 'O paisagismo é só plantio ou vocês cuidam da manutenção depois?',
    resposta:
      'O processo completo inclui leitura do local, escolha por espécie, plantio e uma ficha de cuidado entregue no fim. Manutenção periódica (poda, adubação, revisão de irrigação) é um serviço à parte, combinado conforme o tamanho do jardim.',
  },
  {
    pergunta: 'Dá pra encomendar pra uma data específica, tipo casamento?',
    resposta:
      'Dá, mas pede antecedência mínima de 3 semanas pra garantir a espécie na floração certa — a Cattleya, por exemplo, só floresce no outono. Quanto mais cedo você fala a data e a ocasião, mais opção de espécie sobra.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Pix ou cartão, metade na encomenda e metade na entrega. Pra projeto de paisagismo maior, o orçamento sai fechado por etapa antes de começar, sem sustos no meio do serviço.',
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
        <span className="font-semibold text-mata">{pergunta}</span>
        <span
          aria-hidden="true"
          className="dado-ficha shrink-0 text-terracota transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-mata/75' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-b border-linha bg-vidro py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-terracota">Perguntas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            O que quem vai encomendar costuma perguntar antes
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
