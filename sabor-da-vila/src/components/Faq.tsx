import { useId, useState } from 'react'
import Reveal from './Reveal'
import StickerPeel from './StickerPeel'
import { sendToWhatsApp } from '../demo'

const perguntas = [
  {
    pergunta: 'Até onde vocês entregam e quanto tempo leva?',
    resposta:
      'Entregamos num raio de 3 km a partir da Vila Pompeia (a taxa é calculada no fechamento do pedido). Em dia de movimento normal, o pedido chega em 40 a 50 minutos; sexta e sábado à noite pode passar de uma hora.',
  },
  {
    pergunta: 'Dá pra tirar cebola, pedir ponto diferente ou colocar carne extra?',
    resposta:
      'Dá sim. Trocas simples, como sem cebola, sem picles ou molho à parte, não têm custo. Carne extra ou bacon a mais entram como adicional: é só falar na hora de montar a comanda ou avisar no campo de observação.',
  },
  {
    pergunta: 'Tem opção vegetariana?',
    resposta:
      'Tem o Veggie da feira: burger de grão-de-bico, queijo coalho e rúcula. Ainda não temos versão vegana porque o pão e o queijo da casa levam laticínio, mas já está no radar.',
  },
  {
    pergunta: 'Tem valor mínimo pra pedir entrega?',
    resposta:
      'Pedido de entrega precisa fechar pelo menos R$ 35 em lanches, sem contar a taxa. Abaixo disso, só balcão ou retirada.',
  },
  {
    pergunta: 'Quais formas de pagamento vocês aceitam?',
    resposta:
      'Pix, cartão de débito e crédito no balcão e na entrega, e dinheiro só no balcão (o entregador não carrega troco).',
  },
  {
    pergunta: 'Vocês fazem hambúrguer pra festa ou evento?',
    resposta:
      'Fazemos, com mínimo de 15 lanches e pelo menos 3 dias de antecedência. Dá pra montar um combo fechado (um sabor só) ou deixar cada convidado escolher. Manda mensagem pelo WhatsApp que a gente monta o orçamento.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-t-[3px] border-blue/80 py-5">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-lg font-bold">{pergunta}</span>
        <span
          aria-hidden="true"
          className="poster shrink-0 text-2xl text-blue transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 max-w-2xl text-ink/80' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-36 border-t-[6px] border-blue py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="poster text-blue">
          <span className="riso-type riso-heading">
            <span>Dúvidas</span>
            <span className="riso-pink" aria-hidden="true">
              Dúvidas
            </span>
          </span>
        </h2>
        <p className="mt-4 max-w-sm text-lg font-medium">O que quem tá pra pedir pela primeira vez costuma perguntar.</p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start lg:gap-16">
          <Reveal as="div" stagger={0.06}>
            {perguntas.map((p) => (
              <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
            ))}
          </Reveal>

          {/* Preenche o vão que sobrava à direita do acordeão: em vez de um
              card genérico, um "quadro de recado" de chapeiro — mesma borda
              picotada da comanda/depoimentos — com o adesivo (StickerPeel,
              reaproveitado do Hero) como selo descolável e um CTA de
              WhatsApp pra quem não achou a resposta na lista. */}
          <Reveal as="div" delay={0.1} className="hidden md:block">
            <div className="picote relative overflow-hidden border-[3px] border-blue bg-blue/5 px-8 pt-10 pb-8 text-center">
              <p className="poster text-2xl text-blue">
                Ainda ficou
                <br />
                com dúvida?
              </p>
              <p className="mt-2 text-sm font-medium text-ink/75">
                Chama a gente no zap que a comanda responde rapidinho.
              </p>

              <div className="relative mx-auto mt-6 h-44 w-44">
                <StickerPeel
                  imageSrc="/adesivo-duvida.svg"
                  alt="Selo: não achou sua dúvida? Chama no zap"
                  width={168}
                  rotate={-10}
                  peelBackHoverPct={26}
                  peelBackActivePct={38}
                  shadowIntensity={0.35}
                  lightingIntensity={0.08}
                  initialPosition={{ x: 12, y: 8 }}
                />
              </div>

              <button
                type="button"
                onClick={() => sendToWhatsApp('Olá, Sabor da Vila! Tenho uma dúvida que não vi na lista do site.')}
                className="btn-blue mt-2 w-full"
              >
                Falar no WhatsApp
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
