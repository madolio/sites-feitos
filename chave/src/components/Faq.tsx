import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Como eu agendo uma visita a um imóvel do classificado?',
    resposta:
      'Chama no WhatsApp com o código do anúncio (tipo CH-1042) e a gente combina um horário com o corretor responsável, geralmente pro mesmo dia ou o seguinte. Fim de semana também tem visita, só avisar com um dia de antecedência.',
  },
  {
    pergunta: 'O imóvel que apareceu aqui ainda está disponível?',
    resposta:
      'Os classificados são atualizados toda semana, mas imóvel vende ou aluga rápido. Se o anúncio que você quer visitar já saiu do ar, é porque fechou negócio: mandamos opções parecidas na mesma faixa de preço e bairro.',
  },
  {
    pergunta: 'Vocês cobram comissão de quem está procurando um imóvel, ou só de quem anuncia?',
    resposta:
      'Comissão é só de quem vende ou aluga, no fechamento do contrato. Pra quem procura, todo o acompanhamento até a assinatura é sem custo.',
  },
  {
    pergunta: 'Quais documentos preciso separar pra alugar ou comprar?',
    resposta:
      'Pra alugar: RG, CPF, comprovante de renda dos últimos três meses e comprovante de endereço, mais um fiador ou seguro-fiança. Pra comprar: os mesmos documentos pessoais e, se for financiar, também extrato do FGTS e simulação prévia do banco.',
  },
  {
    pergunta: 'Trabalham com financiamento ou só venda à vista?',
    resposta:
      'Trabalhamos com os dois. Se for financiar, ajudamos a simular em mais de um banco antes de fechar proposta, pra você comparar taxa e entrada.',
  },
  {
    pergunta: 'O que quer dizer o selo "Novo" que aparece em alguns anúncios?',
    resposta:
      'É um imóvel que entrou no classificado nos últimos 7 dias. Depois desse prazo o selo some, mas o anúncio continua valendo até vender ou alugar.',
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
        <span className="font-bold text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-xl leading-none text-steel transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-ink/80' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-b border-line py-14">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-xs tracking-[0.2em] text-ink/65 uppercase">Perguntas frequentes</p>
          <h2 className="mt-2 max-w-xl text-3xl">O que quem tá de olho num anúncio costuma perguntar</h2>
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
