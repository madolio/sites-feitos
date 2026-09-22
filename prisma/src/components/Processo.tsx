import Reveal from './Reveal'

const etapas = [
  {
    titulo: 'Escolha da gema',
    texto: 'Você define pedra, corte e engaste conosco — sempre com a certificação da procedência.',
  },
  {
    titulo: 'Desenho técnico',
    texto: 'A peça é desenhada em CAD antes de qualquer metal ser fundido, com as medidas exatas da sua mão.',
  },
  {
    titulo: 'Fundição e engaste',
    texto: 'Ourives de verdade funde o metal e finaliza o engaste manualmente, pedra por pedra.',
  },
  {
    titulo: 'Entrega',
    texto: 'Peça pronta, com certificado de gemologia e garantia de ajuste.',
  },
]

export default function Processo() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <Reveal as="h2" className="font-display text-3xl sm:text-4xl">
        Do desenho à peça
      </Reveal>

      <Reveal stagger={0.08} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map((e, i) => (
          <div key={e.titulo} className="rounded-2xl border border-fio bg-carvao/50 p-5">
            <p className="font-display text-3xl text-acento">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 font-display text-xl">{e.titulo}</h3>
            <p className="mt-2 text-sm text-fumo">{e.texto}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
