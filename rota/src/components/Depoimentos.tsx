import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata Dutra',
    cargo: 'Gestora de operações, Transportes Vale Norte',
    texto:
      'Testávamos rota manualmente numa planilha e perdíamos janela de entrega quase toda semana. Depois de três meses com a Rota, caímos de 22% pra 6% de entregas fora da janela combinada.',
  },
  {
    autor: 'Eduardo Salgado',
    cargo: 'Distribuição LogFácil',
    texto:
      'O planejamento de rota do dia levava quase duas horas de manhã. Hoje o sistema monta a rota otimizada em minutos e o time só ajusta exceção. Sobrou tempo pra cuidar de cliente reclamando, não de mapa.',
  },
  {
    autor: 'Camila Ferraz',
    cargo: 'Expressa Sul Transportes',
    texto:
      'Rastreava a frota por grupo de WhatsApp antes. Com o painel dá pra ver atraso antes do cliente ligar reclamando, isso sozinho já pagou a assinatura no primeiro mês.',
  },
]

export default function Depoimentos() {
  return (
    <Reveal className="mt-4 rounded-xl border border-line bg-card p-5" as="section" aria-labelledby="avaliacoes-titulo" stagger={0.08}>
      <div className="flex items-center justify-between">
        <h2 id="avaliacoes-titulo" className="font-semibold text-ink">
          Avaliações de clientes
        </h2>
        <span className="text-xs text-ink/45">frotas que já usam a Rota</span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {depoimentos.map((d) => (
          <figure key={d.autor} className="rounded-lg border border-line bg-canvas p-4">
            <blockquote className="text-sm text-ink/75">&ldquo;{d.texto}&rdquo;</blockquote>
            <figcaption className="mt-3 text-xs text-ink/50">
              <span className="font-medium text-ink/70">{d.autor}</span> · {d.cargo}
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  )
}
