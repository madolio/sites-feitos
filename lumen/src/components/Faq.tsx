import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'Vocês vêm até o local medir ou eu passo as medidas?',
    resposta:
      'Sempre visitamos o local antes de fechar o projeto. Pé-direito, aberturas e obstáculos mudam o cálculo de lux, e medida passada por telefone erra demais pra confiar num orçamento de luminárias.',
  },
  {
    pergunta: 'O projeto inclui a instalação elétrica ou só o desenho do layout?',
    resposta:
      'Entregamos o layout completo com posição de cada ponto, e a execução elétrica também, com eletricista da nossa equipe. Se você já tem eletricista de confiança, entregamos só o projeto e as especificações técnicas pra ele seguir.',
  },
  {
    pergunta: 'Depois de instalado, dá pra mudar a temperatura de cor?',
    resposta:
      'Só se a luminária for regulável (algumas linhas do catálogo têm essa opção, marcada na ficha técnica). Luminária de Kelvin fixo vem fixa — por isso a escolha da cor é uma etapa separada do processo, antes da compra.',
  },
  {
    pergunta: 'Quanto tempo leva do orçamento até a luz acesa?',
    resposta:
      'Pra um ambiente único, cerca de duas semanas: uma pra projeto e aprovação, outra pra instalação. Projeto de casa inteira costuma levar de quatro a seis semanas, dependendo de quantos pontos elétricos precisam ser abertos.',
  },
  {
    pergunta: 'Vocês projetam só residência ou também loja e escritório?',
    resposta:
      'Os dois. A calculadora e o catálogo do site cobrem os dois casos, mas ambiente comercial costuma exigir mais luz de tarefa (NBR 5413 pede lux mais alto pra área de trabalho do que pra sala de estar).',
  },
  {
    pergunta: 'E se eu não gostar do resultado depois de instalado?',
    resposta:
      'Fazemos um ajuste fino sem custo até 15 dias depois da instalação — mudança de mira dos spots ou de dimerização entra nesse prazo. Trocar a luminária em si por outro modelo já é orçado à parte.',
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
          className="font-mono shrink-0 text-acento transition-transform motion-reduce:transition-none"
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

export function Faq() {
  return (
    <section id="duvidas" className="border-t border-fio bg-carvao px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Dúvidas frequentes</p>
          <h2 className="mt-3 text-3xl">Antes de fechar o projeto</h2>
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
