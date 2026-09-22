import { useId, useState } from 'react'
import Reveal from './Reveal'

// Perguntas de quem está decidindo fechar com a Cerne, não genéricas: cada
// resposta reflete uma política fictícia mas coerente com o resto do site
// (material antes de planta, de Processo.tsx; orçamento fechado, sem hora
// avulsa inventada).
const perguntas = [
  {
    pergunta: 'Como funciona a primeira conversa, antes de fechar qualquer coisa?',
    resposta:
      'A gente vai até o espaço, se for Grande São Paulo, ou faz uma chamada de vídeo com você mostrando o ambiente pelo celular. A ideia é a mesma da planta: entender a rotina antes de falar de material ou layout. Dura cerca de uma hora e não cobra nada.',
  },
  {
    pergunta: 'Vocês atendem fora de São Paulo?',
    resposta:
      'Presencial é só Grande SP. Fora disso o projeto roda por vídeo: você manda fotos e medidas, fechamos a paleta de material por chamada e enviamos amostra física pelo correio antes de bater o martelo. Já fizemos assim pra Belo Horizonte e Florianópolis.',
  },
  {
    pergunta: 'Depois que a planta fica pronta, dá pra trocar um material no meio da obra?',
    resposta:
      'Dá, com uma ressalva: como a planta nasce em função do material, trocar uma bancada de freijó por outra coisa pode exigir reabrir uma parede que só existe por causa daquela madeira. Troca de acabamento simples, cor de tinta por exemplo, não mexe em nada.',
  },
  {
    pergunta: 'Vocês reaproveitam móveis que eu já tenho?',
    resposta:
      'Sim, e preferimos assim. Antes de especificar peça nova, olhamos o que você já tem e decidimos o que entra na paleta. Isso também baixa o orçamento.',
  },
  {
    pergunta: 'Como funciona o orçamento, fechado ou por hora?',
    resposta:
      'Fechado, por projeto. Depois da primeira conversa e de andar pelo espaço, mandamos um valor único que cobre da observação da rotina até o acompanhamento da obra. Não tem hora avulsa.',
  },
  {
    pergunta: 'Quanto tempo demora do primeiro papo até a planta pronta?',
    resposta:
      'Entre três e cinco semanas, dependendo do tamanho do espaço. A paleta de material costuma fechar na segunda semana; a planta só começa a ser desenhada depois disso.',
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
        <span className="font-medium text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-xl text-pine transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-ink/70' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="border-t border-line px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="text-sm font-medium text-pine">Antes de fechar</span>
          <h2 className="mt-2 text-3xl text-ink sm:text-4xl">Perguntas de quem está decidindo</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 border-t border-line">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
