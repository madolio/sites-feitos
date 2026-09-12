// Lista compartilhada entre a seção "Trabalhos" da home e a página /projetos —
// mesma fonte, duas apresentações diferentes (a home mostra em lista com
// preview; /projetos mostra em grade com mais detalhe).
export type Projeto = {
  name: string
  category: string
  description: string
  bg: string
  accent: string
  url?: string
  real?: boolean
}

export const projetos: Projeto[] = [
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
