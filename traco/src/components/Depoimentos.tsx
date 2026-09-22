import Reveal from './Reveal'

const depoimentos = [
  {
    nome: 'Renata M.',
    texto:
      'A visita técnica pegou um problema de circulação de ar na planta original que eu não tinha percebido — o projeto executivo já saiu resolvendo isso, sem custo extra.',
  },
  {
    nome: 'Thiago B.',
    texto:
      'Mudei o revestimento do banheiro no meio do projeto e entrou sem reorçamento, como combinado. Só paguei separado quando decidi aumentar a área da reforma.',
  },
  {
    nome: 'Camila F.',
    texto:
      'Levei fotos de referência sem noção nenhuma de orçamento e a primeira reunião serviu pra alinhar isso antes de qualquer desenho — evitou um projeto bonito que eu não ia conseguir pagar.',
  },
]

export default function Depoimentos() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="dim-line">
            <span>QUEM JÁ PROJETOU COM A GENTE</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl">Antes de fechar, veja como foi pra outros clientes</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid gap-6 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <div key={d.nome} className="border border-line p-6">
              <p className="text-sm text-ink/70">{d.texto}</p>
              <p className="mt-4 text-sm font-medium text-ochre">{d.nome}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
