import Reveal from './Reveal'

const itens = [
  {
    titulo: 'Pagamento dividido',
    texto: 'Metade no início, metade na entrega — nada de pagar tudo adiantado sem ver nada.',
  },
  {
    titulo: 'Revisão inclusa',
    texto: 'Se algo não ficar do jeito que você imaginou, ajustamos sem custo extra.',
  },
  {
    titulo: 'Depois que o site vai ao ar',
    texto: 'Tem plano de manutenção disponível pra quem quiser — é só perguntar.',
  },
]

export default function Confianca() {
  return (
    <section className="bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">
            Sem risco pra você
          </h2>
        </Reveal>

        <Reveal
          stagger={0.1}
          className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-10"
        >
          {itens.map((item) => (
            <div key={item.titulo}>
              <h3 className="text-lg font-semibold text-ink">{item.titulo}</h3>
              <p className="mt-2 text-ink/70">{item.texto}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
