import BentoCard from './BentoCard'
import Reveal from './Reveal'
import SectionNumber from './SectionNumber'

// Três blocos qualitativos (o "porquê" por trás dos números do Benefits) —
// mesmo cartão bento (spotlight + tilt) do resto do site, mas sem ícone em
// caixinha: o índice grande em font-poster faz esse papel sem cair na
// fórmula "card + ícone colorido" já rejeitada (ver CLAUDE.md).
const itens = [
  {
    numero: '01',
    titulo: 'Um endereço que é seu',
    texto:
      'Seu negócio não fica só na bio do Instagram. Um site com domínio próprio é seu — não da rede social que pode mudar as regras quando quiser.',
  },
  {
    numero: '02',
    titulo: 'Menos mensagem repetida',
    texto:
      'Horário, endereço, o que você faz — tudo já na página, antes da pessoa mandar mensagem perguntando o que já podia ver.',
  },
  {
    numero: '03',
    titulo: 'Comparado pelo trabalho',
    texto:
      'Quem clica no seu site já decidiu que quer saber mais. Ele não está competindo com o story do concorrente do lado.',
  },
]

export default function Diferenciais() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionNumber n="01" label="Por que ter um site" />
          <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">
            Presença que não depende de rede social
          </h2>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-5 sm:grid-cols-3">
          {itens.map((item) => (
            <BentoCard key={item.numero}>
              <span className="font-poster text-3xl text-accent">{item.numero}</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{item.titulo}</h3>
              <p className="mt-2 text-ink/70">{item.texto}</p>
            </BentoCard>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
