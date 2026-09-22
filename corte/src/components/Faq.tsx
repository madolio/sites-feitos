import { useId, useState } from 'react'

// Perguntas de quem ainda não é cliente e está decidindo se marca ou não.
// Políticas fictícias, mas consistentes com o resto do site (senha, fila,
// profissionais em data.ts).
const perguntas = [
  {
    pergunta: 'Preciso marcar horário ou posso só chegar e pegar uma senha?',
    resposta:
      'As duas coisas funcionam. Marcando pelo site, você já sai de casa sabendo mais ou menos sua senha e o tempo de espera. Chegando sem marcar, pega a próxima senha disponível na hora, do jeito que sempre foi aqui.',
  },
  {
    pergunta: 'A senha que aparece no site é a mesma de quando eu chego?',
    resposta:
      'É a mesma fila. O número que o site mostra quando você marca é uma estimativa, calculada por quem já marcou na sua frente. Ao chegar, a senha real sai no painel e costuma bater certinho com o que o site tinha mostrado.',
  },
  {
    pergunta: 'Se eu atrasar, perco minha vez?',
    resposta:
      'Até 10 minutos a gente segura sua vaga sem problema. Passou disso, sua senha volta pro fim da fila e você pega uma nova ao chegar. Não tem multa, só reorganiza a ordem.',
  },
  {
    pergunta: 'Quais as formas de pagamento?',
    resposta: 'Dinheiro, cartão (débito e crédito) e Pix. Não trabalhamos com fiado nem parcelamento de serviço.',
  },
  {
    pergunta: 'Vocês atendem criança?',
    resposta:
      'Atendemos a partir dos 5 anos. Pra menores disso, costumamos sugerir um horário mais tranquilo, porque a cadeira e as máquinas assustam os pequenos quando o salão está cheio.',
  },
  {
    pergunta: 'Não gostei do corte, o que eu faço?',
    resposta:
      'Fala com a gente em até 3 dias e ajustamos sem cobrar de novo. Depois desse prazo, o cabelo já mudou de forma sozinho e aí entendemos que é um novo agendamento.',
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
        <span className="font-semibold text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="ticket shrink-0 text-lg text-vermelho transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-3 text-sm text-ink/70' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-16 border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl">Perguntas antes de marcar</h2>
        <p className="mt-3 max-w-md text-ink/70">O que a galera pergunta mais antes de pegar a primeira senha.</p>

        <div className="mt-10 border-t border-line">
          {perguntas.map((p) => (
            <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
          ))}
        </div>
      </div>
    </section>
  )
}
