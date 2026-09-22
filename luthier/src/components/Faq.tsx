import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Quanto tempo leva pra construir um instrumento sob encomenda?',
    resposta:
      'Um violão clássico ou de aço leva de 60 a 90 dias, contados do primeiro corte de madeira até a entrega regulada. Viola caipira e ukulele costumam sair na ponta mais curta desse intervalo, porque têm menos superfície de tampo pra colar e menos trastes pra assentar. Se a fila de encomendas estiver cheia, o início pode atrasar alguns dias, e isso é avisado já na conversa inicial.',
  },
  {
    pergunta: 'Como escolho a madeira do meu instrumento?',
    resposta:
      'Tampo em abeto ou cedro, fundo e laterais em mogno, bordo ou jacarandá-da-índia: a escolha muda o timbre, não só a aparência. Abeto responde mais rápido e projeta mais. Cedro é mais quente e satura antes. Mostramos amostras e tocamos trechos curtos em cada madeira antes de fechar o pedido, porque descrição de timbre em texto convence pouco.',
  },
  {
    pergunta: 'Reparo é mais rápido que instrumento novo?',
    resposta:
      'Depende do reparo. Troca de trastes, colagem de rachadura no tampo ou ajuste de braço ficam prontos em 1 a 2 semanas. Reconstrução de estrutura interna, como leque harmônico ou bloco de cola solto, entra na mesma fila de bancada que instrumento novo, porque exige o mesmo tempo de colagem e secagem.',
  },
  {
    pergunta: 'Fazem regulagem de ação e afinação em instrumento que não foi feito aqui?',
    resposta:
      'Sim. Regulagem de ação (altura das cordas), oitavação e ajuste de tensor de braço são serviços avulsos e não exigem que o instrumento tenha saído da nossa bancada. Levam de 2 a 4 dias, dependendo da fila.',
  },
  {
    pergunta: 'Instrumento novo tem garantia?',
    resposta:
      'Um ano cobrindo defeito de construção: descolagem de tampo, problema no braço, traste solto. Não cobre desgaste natural de corda nem dano por queda. Variação brusca de umidade também fica fora, porque o instrumento sai de casa acostumado com a umidade da oficina, e mudança grande de clima pode rachar até madeira bem curada.',
  },
  {
    pergunta: 'Restauram instrumento antigo ou vintage?',
    resposta:
      'Fazemos restauro estrutural: leque harmônico, braço, verniz original quando dá pra recuperar. Não trabalhamos com instrumento de valor histórico ou colecionável que exija documentação de proveniência, porque isso é um mercado à parte do nosso, com regras próprias de conservação.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-neblina/25 py-4">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-display text-lg text-osso">{pergunta}</span>
        <span
          aria-hidden="true"
          className="rotulo-mono shrink-0 text-fosforo transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div
        id={id}
        role="region"
        className={aberto ? 'mt-3 text-sm text-osso/75' : 'hidden'}
      >
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="rotulo-mono">dúvidas frequentes</p>
        <h2 className="mt-2 font-display text-3xl sm:text-5xl">
          O que quem está encomendando um instrumento costuma perguntar.
        </h2>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        {perguntas.map((p) => (
          <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
        ))}
      </Reveal>
    </section>
  )
}
