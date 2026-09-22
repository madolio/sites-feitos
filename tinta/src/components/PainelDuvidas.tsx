import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Dói muito?',
    resposta:
      'Dói, é agulha. Varia com a zona: pulso e peito do pé ardem mais, ombro e panturrilha costumam doer menos. Se é sua primeira, comece por uma zona mais tranquila — a gente indica na hora.',
  },
  {
    pergunta: 'O preço do flash é fechado ou muda?',
    resposta:
      'Fechado. O valor que aparece no provador é o valor final pra aquele desenho naquele tamanho — sem "depende do dia" nem taxa surpresa no balcão.',
  },
  {
    pergunta: 'Preciso agendar ou dá pra chegar e tatuar na hora?',
    resposta:
      'Os dois funcionam. Flash de mostruário costuma ter vaga de walk-in em dia de semana; sábado lota rápido e vale mandar mensagem antes pra garantir horário.',
  },
  {
    pergunta: 'Qual a idade mínima?',
    resposta:
      '18 anos, com documento com foto na mão. Não tatuamos menor de idade nem com autorização de responsável — sem exceção.',
  },
  {
    pergunta: 'E se eu enjoar do desenho depois?',
    resposta:
      'É tinta permanente, não tem "modo de tirar fácil" — decida no provador com calma antes de marcar, sem pressa. Se quiser, a gente refaz o carimbo em outra zona quantas vezes precisar até você ter certeza.',
  },
  {
    pergunta: 'Como cuido da pele depois?',
    resposta:
      'Filme de proteção por 2h, depois lava com sabonete neutro e sem esfregar. Hidratante sem perfume 2-3x ao dia por 10 dias, sem sol direto, sem piscina nem mar até fechar a casquinha. A gente manda esse resumo por escrito junto com a marcação.',
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
        <span className="font-semibold text-paper uppercase tracking-wide text-sm">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 font-display text-xl text-ember transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-paper/70' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

const depoimentos = [
  {
    autor: 'Bia F.',
    texto: 'Provei a andorinha em três zonas diferentes no corpo antes de decidir. Marcou igualzinho o carimbo.',
  },
  {
    autor: 'Rafael N.',
    texto: 'Cheguei sem hora marcada numa terça e saí tatuado em 40 minutos. Raio no antebraço, ficou brutal.',
  },
]

export default function PainelDuvidas() {
  return (
    <section className="panel flex h-svh w-screen shrink-0 flex-col justify-center overflow-y-auto px-6 py-20 sm:px-10">
      <Reveal as="h2" className="font-display text-3xl tracking-widest text-paper uppercase sm:text-4xl">
        Antes de marcar
      </Reveal>

      <div className="mt-10 grid max-w-4xl gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal delay={0.05} className="max-w-xl">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>

        <Reveal delay={0.1} stagger={0.08} className="flex flex-col gap-4">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="border border-line p-5">
              <blockquote className="text-sm text-paper/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-3 font-display text-xs tracking-widest text-ember uppercase">
                {d.autor}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
