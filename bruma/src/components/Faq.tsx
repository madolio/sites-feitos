import { useId, useState } from 'react'

const perguntas = [
  {
    pergunta: 'Quanto tempo leva do primeiro contato até o frasco pronto?',
    resposta:
      'A maceração sozinha já pede algumas semanas pros óleos se estabilizarem, então contamos de quatro a seis semanas do dia da conversa olfativa até a entrega. Fragrância sob medida não é coisa que se apressa sem perder qualidade.',
  },
  {
    pergunta: 'Posso pedir ajuste se o resultado não ficar do jeito que eu imaginei?',
    resposta:
      'Sim, uma rodada de ajuste está incluída. Se a concentração ficou forte demais ou uma nota de fundo não combinou com o esperado, reformulamos essa parte específica sem recomeçar o processo inteiro.',
  },
  {
    pergunta: 'Qual a diferença entre pedir um Eau de Toilette e um Extrait?',
    resposta:
      'É a concentração de óleo essencial: EDT fica entre 5% e 15% e dura de três a cinco horas, já pensada pra reaplicar ao longo do dia. Extrait vai de 20% a 30%, quase sem álcool, e segura de dez a doze horas na pele. Na conversa inicial ajudamos a escolher conforme o seu jeito de usar.',
  },
  {
    pergunta: 'Dá pra reencomendar a mesma fragrância depois que o frasco acabar?',
    resposta:
      'Cada composição fica registrada com a ficha técnica dela, então sim: é só avisar o nome ou o código do frasco numerado e recriamos exatamente a mesma pirâmide olfativa.',
  },
  {
    pergunta: 'Como funciona o pagamento?',
    resposta:
      'Metade na aprovação da composição, depois da conversa olfativa, e o restante na entrega do frasco. Aceitamos Pix e cartão.',
  },
  {
    pergunta: 'Vocês entregam em outras cidades ou só atendem local?',
    resposta:
      'A conversa olfativa e os testes são presenciais, mas o frasco final pode ser enviado por transportadora pra qualquer lugar do Brasil depois de pronto.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-fio py-4">
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
          className="shrink-0 text-2xl text-acento transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-fumo' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

// Painel ao lado do FAQ. Os dados vem da propria resposta sobre EDT x Extrait
// (concentracao de oleo e duracao na pele) — nada foi acrescentado. O nivel do
// liquido vai da concentracao minima (solido) a maxima (translucido), numa
// escala de 0 a 30%.
const ESCALA = 30
const CORPO_TOPO = 64
const CORPO_BASE = 208
const ALTURA_UTIL = CORPO_BASE - CORPO_TOPO

const FRASCOS = [
  { nome: 'Eau de Toilette', min: 5, max: 15, duracao: '3 a 5 horas' },
  { nome: 'Extrait', min: 20, max: 30, duracao: '10 a 12 horas' },
] as const

function Frasco({ id, min, max }: { id: string; min: number; max: number }) {
  const yMax = CORPO_BASE - (max / ESCALA) * ALTURA_UTIL
  const yMin = CORPO_BASE - (min / ESCALA) * ALTURA_UTIL
  const corpo = 'M30 64 Q30 44 50 40 H70 Q90 44 90 64 V190 Q90 208 72 208 H48 Q30 208 30 190 Z'
  return (
    <svg viewBox="0 0 120 220" className="h-auto w-24" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <path d={corpo} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y={yMax} width="120" height={CORPO_BASE - yMax} fill="var(--color-essencia)" opacity="0.3" />
        <rect x="0" y={yMin} width="120" height={CORPO_BASE - yMin} fill="var(--color-essencia)" opacity="0.9" />
      </g>
      <path d={corpo} fill="none" stroke="var(--color-fumo)" strokeWidth="1.6" />
      <rect x="44" y="14" width="32" height="14" rx="3" fill="var(--color-fio)" stroke="var(--color-fumo)" strokeWidth="1.4" />
      <rect x="52" y="28" width="16" height="12" fill="none" stroke="var(--color-fumo)" strokeWidth="1.4" />
    </svg>
  )
}

function PainelConcentracao() {
  return (
    <aside className="sticky top-28 border border-fio bg-carvao/60 p-8" aria-label="Concentração de óleo essencial: Eau de Toilette e Extrait">
      <p className="font-display text-sm tracking-wide text-acento">Concentração de óleo essencial</p>
      <div className="mt-6 flex items-end justify-around gap-6">
        {FRASCOS.map((f) => (
          <figure key={f.nome} className="flex flex-col items-center text-center">
            <Frasco id={`nivel-${f.nome.replace(/\s/g, '-').toLowerCase()}`} min={f.min} max={f.max} />
            <figcaption className="mt-4">
              <span className="block font-display text-lg text-marfim">{f.nome}</span>
              <span className="mt-1 block text-sm text-fumo">
                {f.min}% a {f.max}% de óleo
              </span>
              <span className="block text-sm text-fumo">dura {f.duracao}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 border-t border-fio pt-4 text-xs text-fumo">
        Cor cheia = concentração mínima da faixa · cor fraca = até o máximo. Na conversa inicial a gente ajuda a
        escolher conforme o seu jeito de usar.
      </p>
    </aside>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="font-display text-3xl sm:text-4xl">Perguntas antes de encomendar</h2>

      <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div>
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </div>
        <div className="hidden lg:block lg:max-w-md">
          <PainelConcentracao />
        </div>
      </div>
    </section>
  )
}
