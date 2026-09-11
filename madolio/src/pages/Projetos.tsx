import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SiteMock from '../components/SiteMock'

const cases = [
  {
    name: 'NBJ Systems',
    category: 'Equipamentos para tratamento de água',
    description:
      'Redesign completo do site institucional: apresentação da empresa, setores atendidos e linha de produtos, com contato direto por WhatsApp.',
    bg: '#DCEFFB',
    accent: '#0E8FB2',
    url: 'https://nbj-systems.fenoninho-max.workers.dev',
    real: true,
  },
  {
    name: 'Doce Ateliê',
    category: 'Confeitaria',
    description:
      'Catálogo de bolos e docaria com fotos em destaque, horário de encomenda e pedidos direto pelo WhatsApp.',
    bg: '#F7D9E3',
    accent: '#E85D8A',
  },
  {
    name: 'Estúdio Alma',
    category: 'Pilates',
    description:
      'Página de aulas e turmas com apresentação da instrutora e agendamento de experimental pelo WhatsApp.',
    bg: '#DCEFE3',
    accent: '#4F9D77',
  },
  {
    name: 'Sabor da Vila',
    category: 'Hamburgueria',
    description:
      'Cardápio digital com fotos dos combos, promoções da semana e pedido rápido pelo WhatsApp.',
    bg: '#FBE3D3',
    accent: '#E2632F',
  },
  {
    name: 'Site Modelo',
    category: 'Modelo padrão Madolio',
    description:
      'O template que uso como ponto de partida pra cada cliente novo: hero com identidade visual própria, seção de benefícios e contato direto — pronto pra ganhar a cara do seu negócio.',
    bg: '#EDEDF0',
    accent: '#2F6FED',
    url: 'https://site-template.fenoninho-max.workers.dev',
  },
]

export default function Projetos() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Projetos — Sites reais e conceitos | Madolio"
        description="Veja o redesign do site institucional da NBJ Systems e conceitos de sites para confeitaria, pilates e hamburgueria — exemplos do que a Madolio pode criar pro seu negócio."
        path="/projetos"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-ink md:text-5xl">
            O que eu posso criar pro seu negócio
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            A NBJ Systems é um cliente real. Os conceitos mostram como um
            site simples e bem feito pode representar negócios diferentes,
            e o Site Modelo é o template que dá origem a cada um deles.
          </p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-14 grid gap-10 sm:grid-cols-2">
          {cases.map((project) => {
            const Wrapper = project.url ? 'a' : 'div'
            return (
              <Wrapper
                key={project.name}
                {...(project.url
                  ? { href: project.url, target: '_blank', rel: 'noreferrer' }
                  : {})}
                className="block"
              >
                <SiteMock bg={project.bg} accent={project.accent} />
                <div className="mt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold text-ink">{project.name}</h3>
                    <span className="text-sm text-ink/50">
                      {project.category} · {project.real ? 'cliente real' : 'conceito'}
                    </span>
                  </div>
                  <p className="mt-2 text-ink/65">{project.description}</p>
                  {project.url && (
                    <span className="mt-3 inline-block font-semibold text-accent underline decoration-accent/30 underline-offset-4">
                      Ver site
                    </span>
                  )}
                </div>
              </Wrapper>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
