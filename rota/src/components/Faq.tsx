import { useId, useState } from 'react'
import Reveal from './Reveal'

const perguntas = [
  {
    pergunta: 'A Rota funciona com os rastreadores que já tenho na frota?',
    resposta:
      'Sim. A Rota lê sinal de GPS de rastreadores veiculares por OBD ou instalação fixa, além do app do motorista no celular. Se o seu já usa um protocolo aberto (JT808, TCP genérico), a integração costuma ficar pronta em poucos dias; hardware proprietário depende do fabricante liberar o acesso aos dados.',
  },
  {
    pergunta: 'Como é cobrado: por motorista, por veículo ou por entrega?',
    resposta:
      'Por veículo ativo no mês. Motorista sem veículo vinculado não conta, e frota parada (manutenção, entressafra) você pausa e não paga. Não cobramos por entrega nem por usuário administrativo.',
  },
  {
    pergunta: 'Dá pra exportar os dados ou existe uma API?',
    resposta:
      'Tem exportação em CSV de qualquer tabela do painel e uma API REST com os mesmos dados (rotas, entregas, posição da frota) pra quem já tem um ERP ou BI rodando e não quer trocar de ferramenta.',
  },
  {
    pergunta: 'Quanto tempo leva pra colocar a frota rodando?',
    resposta:
      'Frotas de até 20 veículos costumam sair do zero pro primeiro dia de operação em uma semana. A maior parte do tempo vai pra cadastrar motoristas e importar o histórico de endereços, não pra configurar o sistema. Frota maior, combinamos um cronograma junto.',
  },
  {
    pergunta: 'E se o motorista ficar sem sinal numa área rural?',
    resposta:
      'O app do motorista guarda a rota e os checkpoints localmente e sincroniza assim que o sinal volta. Nada se perde, só atrasa a atualização no painel de quem está acompanhando.',
  },
  {
    pergunta: 'Qual o SLA de suporte se algo parar no meio de uma entrega?',
    resposta:
      'Prioridade alta (frota parada, rota não carrega) tem resposta em até 30 minutos em horário comercial. Fora isso, retorno em até 4 horas úteis.',
  },
]

function ItemFaq({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-line py-3 last:border-b-0">
      <button
        type="button"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-medium text-ink">{pergunta}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-lg text-ink/40 transition-transform motion-reduce:transition-none"
          style={{ transform: aberto ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <div id={id} role="region" className={aberto ? 'mt-2 pr-6 text-sm text-ink/60' : 'hidden'}>
        {resposta}
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <Reveal className="mt-4 rounded-xl border border-line bg-card p-5" as="section" aria-labelledby="central-ajuda-titulo">
      <div className="flex items-center justify-between">
        <h2 id="central-ajuda-titulo" className="font-semibold text-ink">
          Central de ajuda
        </h2>
        <span className="text-xs text-ink/45">perguntas frequentes</span>
      </div>
      <p className="mt-1 text-sm text-ink/55">
        O que os gestores de frota mais perguntam antes de colocar a operação pra rodar na Rota.
      </p>
      <div className="mt-4">
        {perguntas.map((p) => (
          <ItemFaq key={p.pergunta} pergunta={p.pergunta} resposta={p.resposta} />
        ))}
      </div>
    </Reveal>
  )
}
