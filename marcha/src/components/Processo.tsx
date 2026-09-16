import Reveal from './Reveal'

const etapas = [
  { titulo: 'Test-drive', texto: 'Agenda pelo WhatsApp e dirige o carro antes de decidir qualquer coisa.' },
  { titulo: 'Avaliação do seu usado', texto: 'Se for dar entrada com seu carro atual, avaliamos na hora, com laudo.' },
  { titulo: 'Simulação de financiamento', texto: 'A mesma calculadora acima, ajustada com sua entrada real.' },
  { titulo: 'Vistoria e documentação', texto: 'Checagem completa e transferência já sai daqui assinada.' },
  { titulo: 'Entrega', texto: 'Carro emplacado, com tanque cheio e revisão em dia.' },
]

export function Processo() {
  return (
    <section id="processo" className="bg-carvao px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Processo</p>
          <h2 className="mt-3 text-3xl text-marfim sm:text-4xl">Do test-drive até a entrega</h2>
        </Reveal>

        <Reveal as="ol" className="mt-8 flex flex-col gap-6" stagger={0.08}>
          {etapas.map((e, i) => (
            <li key={e.titulo} className="flex gap-4">
              <span className="tabular font-mono text-acento">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-lg text-marfim">{e.titulo}</h3>
                <p className="mt-1 text-sm text-fumo">{e.texto}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
