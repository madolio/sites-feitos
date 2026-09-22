import { useEffect, useId, useRef, useState } from 'react'

const perguntas = [
  {
    pergunta: 'Preciso saber fazer alguma coisa antes de vir?',
    resposta:
      'Não. As turmas são pra iniciante — o torno segura o barro pra você, e a primeira meia hora de qualquer turma é só sentir a argila girando antes de tentar moldar algo.',
  },
  {
    pergunta: 'Quando eu levo minha peça pra casa?',
    resposta:
      'Não no mesmo dia. Depois de moldada, a peça seca por cerca de uma semana, leva a primeira queima (biscoito), recebe o esmalte e volta ao forno pra queima final — o ciclo completo leva de 3 a 4 semanas. A gente avisa por WhatsApp quando está pronta pra retirar.',
  },
  {
    pergunta: 'O que eu visto pra vir ao ateliê?',
    resposta:
      'Roupa que possa sujar de barro — temos avental, mas a barbotina espirra na manga e no joelho. Sapato fechado é recomendado; o chão perto do torno fica escorregadio com água de moldagem.',
  },
  {
    pergunta: 'Posso escolher outro esmalte além dos que aparecem na tela?',
    resposta:
      'Nas turmas fixas, escolhe entre os cinco esmaltes do ateliê (cobalto, celadon, tenmoku, shino, óxido) — são os que temos testados e prontos pro forno da casa. Esmalte próprio só em turmas avançadas, sob combinação prévia.',
  },
  {
    pergunta: 'Criança pode participar?',
    resposta:
      'A partir de 10 anos, acompanhada de responsável na sala. O torno elétrico exige um pouco de força no pé e atenção — turmas infantis menores fazem modelagem manual em vez de torno, sem prensagem no pedal.',
  },
  {
    pergunta: 'E se a peça quebrar ou rachar no forno?',
    resposta:
      'Acontece, faz parte de cerâmica — costuma ser por bolha de ar ou parede fina demais. Quando quebra na queima, remarcamos uma nova sessão de moldagem sem custo extra; você só paga a turma original.',
  },
]

const depoimentos = [
  {
    autor: 'Juliana P.',
    texto: 'Fiz uma tigela torta na primeira tentativa e ri à toa a aula inteira. Na segunda semana já saiu redonda.',
  },
  {
    autor: 'Marcelo T.',
    texto: 'Escolhi o esmalte tenmoku sem saber como ficaria — a cor real só apareceu depois do forno e foi bem melhor do que eu esperava.',
  },
  {
    autor: 'Ana Luiza R.',
    texto: 'Levei minha filha de 12 anos numa turma de sábado. Ela guarda a caneca dela na mesa do café até hoje.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-line py-3">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-semibold text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-lg text-ink/60 transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-2 text-sm text-ink/65' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

// Segue o mesmo padrão de dialog nativo do Turmas.tsx: a página do Torno é
// tela cheia e sem rolagem (a cena 3D preenche tudo), então dúvidas e
// depoimentos vivem num modal acessível pelo header, não numa seção que
// exigiria rolagem.
export default function FaqDepoimentos({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (aberto && !d.open) d.showModal()
    if (!aberto && d.open) d.close()
  }, [aberto])

  return (
    <dialog
      ref={ref}
      aria-labelledby="duvidas-title"
      onClose={onFechar}
      onClick={(e) => {
        if (e.target === ref.current) onFechar()
      }}
      className="m-auto w-[min(34rem,calc(100%-1.5rem))] max-h-[85svh] overflow-y-auto rounded-[28px] border border-line bg-folha p-0 text-ink backdrop:bg-ink/45"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="duvidas-title" className="text-3xl">
            Dúvidas
          </h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="rounded-full px-2 text-2xl leading-none text-ink/60 hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="mt-4">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </div>

        <h3 className="mt-8 text-lg">Quem já fez turma aqui</h3>
        <div className="mt-3 flex flex-col gap-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-2xl border border-line p-4">
              <blockquote className="text-sm text-ink/75">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-2 text-xs font-semibold text-ink/60">{d.autor}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </dialog>
  )
}
