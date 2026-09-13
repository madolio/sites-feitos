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
  /** Recorte curado pra home (Trabalhos.tsx) — a lista completa só aparece em /projetos. */
  destaque?: boolean
}

export const projetos: Projeto[] = [
  {
    name: 'Nascente',
    category: 'Equipamentos para tratamento de água',
    description:
      'O sistema de filtração vira um diagrama técnico de verdade no hero — a água escorre pelos canos até a osmose reversa, e cada impureza para exatamente na etapa que a retém.',
    bg: '#DCEFFB',
    accent: '#0E8FB2',
    url: 'https://nascente.fenoninho-max.workers.dev',
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
    destaque: true,
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
  {
    name: 'Pulso',
    category: 'Personal training',
    description:
      'Contador de repetições sobe sozinho no hero, navegação vira uma raia de atletismo com marcação de distância, e o processo é uma barra de progresso 0M–100M.',
    bg: '#F4F0E6',
    accent: '#E8482F',
    url: 'https://pulso.fenoninho-max.workers.dev',
  },
  {
    name: 'Focinho',
    category: 'Pet shop e veterinária',
    description:
      'A ficha de atendimento de um pet vira o hero, com carimbo de "vacina em dia" — navegação em abas de fichário em vez de barra de menu.',
    bg: '#FAF7F0',
    accent: '#B8432E',
    url: 'https://focinho.fenoninho-max.workers.dev',
  },
  {
    name: 'Corte',
    category: 'Salão de beleza e barbearia',
    description:
      'Painel de senha de atendimento em vez de nav — o número "atendendo agora" sobe sozinho, e o cardápio de preços vira um quadro pendurado na parede.',
    bg: '#F7EEE8',
    accent: '#146B62',
    url: 'https://corte.fenoninho-max.workers.dev',
  },
  {
    name: 'Chave',
    category: 'Imobiliária',
    description:
      'Página de classificados de jornal de verdade — cabeçalho não fixo, imóveis em colunas densas com filete entre elas, sem grade de cards.',
    bg: '#EFECE4',
    accent: '#3B5B70',
    url: 'https://chave.fenoninho-max.workers.dev',
  },
  {
    name: 'Revelar',
    category: 'Fotografia de casamento e ensaio',
    description:
      'Folha de contato de laboratório fotográfico: cada serviço é um quadro numerado de negativo com anotação de lápis de cera, sem fotos de verdade.',
    bg: '#EFE6D8',
    accent: '#D98C2B',
    url: 'https://revelar.fenoninho-max.workers.dev',
  },
  {
    name: 'Passaporte',
    category: 'Escola de idiomas',
    description:
      'Cada nível do curso (A1 a C2) carimba na página como um visto de verdade — sem barra de progresso de app gamificado, e sem nenhuma barra de navegação.',
    bg: '#F2EAD9',
    accent: '#5C1F2E',
    url: 'https://passaporte.fenoninho-max.workers.dev',
  },
  {
    name: 'Confete',
    category: 'Festa infantil',
    description:
      'Colagem de adesivos com contorno preto e cores saturadas — nav em pílula flutuante e uma fita ondulada de verdade atrás dos depoimentos.',
    bg: '#FFFAF0',
    accent: '#141414',
    url: 'https://confete.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Cerne',
    category: 'Design de interiores',
    description:
      'Sem hero, sem seções empilhadas: duas colunas fixas que rolam separado — os casos à esquerda, e um painel sticky à direita que troca de desenho técnico conforme o capítulo que você está lendo.',
    bg: '#EDE7DD',
    accent: '#4E6046',
    url: 'https://cerne.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Tinta',
    category: 'Estúdio de tatuagem',
    description:
      'A página inteira rola de lado, não de cima pra baixo — uma parede de flash sheet de verdade, com bolinhas de navegação em vez de barra de menu.',
    bg: '#121212',
    accent: '#FF3B3B',
    url: 'https://tinta.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Balcão',
    category: 'Lanchonete de autoatendimento',
    description:
      'Sem hero, sem "sobre nós" — abre direto no cardápio, com carrinho de verdade (adicionar, tirar, total) e pedido fechado pelo WhatsApp, como um totem de autoatendimento.',
    bg: '#FFF6E1',
    accent: '#257A40',
    url: 'https://balcao.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Rota',
    category: 'Software de logística',
    description:
      'Não é uma página institucional — é a própria tela do software: barra lateral, mapa de rotas animado e tabela de entregas, como se fosse um print do produto de verdade.',
    bg: '#F2F3F5',
    accent: '#5B4FE0',
    url: 'https://rota.fenoninho-max.workers.dev',
    destaque: true,
  },
]
