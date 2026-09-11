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
      'Monte o bolo numa cartela de sabores estilo leque de cores, veja o corte mudando em tempo real e mande a encomenda pelo WhatsApp.',
    bg: '#FFFCF7',
    accent: '#C4213A',
    url: 'https://doce-atelie.fenoninho-max.workers.dev',
  },
  {
    name: 'Estúdio Alma',
    category: 'Pilates',
    description:
      'Boneco animado troca de pose conforme você rola a página, grade de horários e pedido de aula experimental pelo WhatsApp.',
    bg: '#E9E8E4',
    accent: '#2C4FA3',
    url: 'https://estudio-alma.fenoninho-max.workers.dev',
  },
  {
    name: 'Sabor da Vila',
    category: 'Hamburgueria',
    description:
      'Cardápio com comanda flutuante, hambúrguer ilustrado em risografia e pedido fechado direto pelo WhatsApp.',
    bg: '#FBFAF5',
    accent: '#3255A4',
    url: 'https://sabor-da-vila.fenoninho-max.workers.dev',
  },
  {
    name: 'Bastos Advocacia',
    category: 'Advocacia empresarial e civil',
    description:
      'Página única pra um escritório de advocacia: áreas de atuação, processo de atendimento e agendamento direto — sem o kit visual de card e ícone que a maioria usa.',
    bg: '#F5F1E8',
    accent: '#7A2E3A',
    url: 'https://site-template.fenoninho-max.workers.dev',
  },
  {
    name: 'Torre',
    category: 'SaaS de agendamento',
    description:
      'Software fictício com a agenda do dia numa tela de radar de verdade — cada agendamento é um blip, com varredura e confirmação automática.',
    bg: '#0B1417',
    accent: '#35D6C9',
    url: 'https://torre.fenoninho-max.workers.dev',
  },
  {
    name: 'Traço',
    category: 'Arquitetura e interiores',
    description:
      'Portfólio de um escritório de arquitetura: a planta baixa do hero se desenha sozinha, e cada projeto é representado pelo próprio esquema, sem fotos.',
    bg: '#F6F4EF',
    accent: '#C9962D',
    url: 'https://traco.fenoninho-max.workers.dev',
  },
  {
    name: 'Âncora',
    category: 'Consultoria financeira',
    description:
      'Consultoria de patrimônio com um extrato ilustrativo que soma linha a linha na tela — sóbrio, sem gráfico de bolsa nem verde/vermelho de day trade.',
    bg: '#F3EDE0',
    accent: '#AB8A53',
    url: 'https://ancora.fenoninho-max.workers.dev',
  },
]

export default function Projetos() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Seo
        title="Projetos — Sites reais e conceitos | Madolio"
        description="Veja o redesign do site institucional da NBJ Systems e conceitos de sites para confeitaria, pilates, hamburgueria, advocacia, SaaS, arquitetura e consultoria financeira — exemplos do que a Madolio pode criar pro seu negócio."
        path="/projetos"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-ink md:text-5xl">
            O que eu posso criar pro seu negócio
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            A NBJ Systems é um cliente real. Os outros são conceitos — cada
            um pensado do zero pro nicho que representa, sem reaproveitar a
            cara de nenhum dos outros.
          </p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                    <span className="text-sm text-ink/65">
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
