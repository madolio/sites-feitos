import Reveal from './Reveal'

const etapas = [
  {
    numero: '01',
    titulo: 'Conversa inicial',
    texto: 'Você conta o negócio pelo WhatsApp, alinhamos escopo e prazo.',
  },
  {
    numero: '02',
    titulo: 'Materiais',
    texto: 'Você manda textos, fotos e referências que gosta — ou eu ajudo a organizar.',
  },
  {
    numero: '03',
    titulo: 'Design e desenvolvimento',
    texto: 'O site é construído do zero, sob medida pro seu negócio.',
  },
  {
    numero: '04',
    titulo: 'Revisão e publicação',
    texto: 'Você revisa, ajustamos o que precisar, e o site vai ao ar.',
  },
]

export default function Processo() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">Como funciona</h2>
        </Reveal>

        <Reveal
          as="ol"
          stagger={0.08}
          className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {etapas.map((etapa) => (
            <li key={etapa.numero}>
              <span className="font-poster text-3xl text-accent">{etapa.numero}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{etapa.titulo}</h3>
              <p className="mt-1.5 text-ink/70">{etapa.texto}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
