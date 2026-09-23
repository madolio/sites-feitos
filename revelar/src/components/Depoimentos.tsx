import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Bruna S.',
    numero: '07A',
    texto:
      'Recebi a seleção prévia do casamento três dias depois, ainda de ressaca da festa. Deu pra escolher as fotos do álbum antes de voltar pro trabalho.',
  },
  {
    autor: 'Diego M.',
    numero: '08A',
    texto:
      'Pedi um still pro cardápio novo do restaurante. Chegaram no horário combinado, terminaram em quarenta minutos e o arquivo em alta já estava pronto pra impressão.',
  },
  {
    autor: 'Larissa F.',
    numero: '09A',
    texto:
      'No meu ensaio, duas fotos saíram com o fundo errado por causa da luz. Pedi pra revisar e voltou corrigido no mesmo dia, sem cobrar nada a mais.',
  },
]

// Depoimentos como quadros extras na folha de contato — mesma numeração de
// negativo do ContactSheet, texto em anotação de lápis de cera.
export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-t-2 border-ink bg-paper py-20 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <span className="font-display text-sm text-ink/50">quadros revelados</span>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Quem já saiu da folha de contato</h2>
        </Reveal>

        <Reveal
          as="div"
          stagger={0.08}
          className="mt-10 grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-3"
        >
          {depoimentos.map((d) => (
            <figure key={d.autor} className="bg-paper p-6">
              <span className="font-display text-sm text-ink/50">{d.numero}</span>
              <blockquote className="mt-4 text-sm text-ink/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="grease mt-4 text-amber-ink">{d.autor}</figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
