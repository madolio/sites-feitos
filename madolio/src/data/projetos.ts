// Lista compartilhada entre a seção "Trabalhos" da home e a página /projetos —
// mesma fonte, duas apresentações diferentes (a home mostra em lista com
// preview; /projetos mostra em grade com mais detalhe).
export type Tag =
  | 'Alimentação'
  | 'Saúde & Bem-estar'
  | 'Beleza'
  | 'Casa & Design'
  | 'Serviços profissionais'
  | 'Tecnologia'
  | 'Moda & Acessórios'
  | 'Automotivo'
  | 'Educação'
  | 'Eventos'
  | 'Pets'

export type Projeto = {
  name: string
  category: string
  /** Agrupamento amplo pro filtro de /projetos — não substitui `category` (texto livre e específico de cada projeto). */
  tag: Tag
  description: string
  bg: string
  accent: string
  url?: string
  /** Recorte curado pra home (Trabalhos.tsx) — a lista completa só aparece em /projetos. */
  destaque?: boolean
  /** Rota interna pra página de "making of" deste projeto, quando existe uma. */
  estudoDeCaso?: string
}

export const projetos: Projeto[] = [
  {
    name: 'Adriano Souza Passos',
    category: 'Tratamento de água e serviços elétricos',
    tag: 'Casa & Design',
    description:
      'Site real, sem modo demonstração: cada ofício é desenhado na notação técnica de verdade do próprio ofício — P&ID pra água, diagrama unifilar pra elétrica — e a navegação é um painel de instrumentos, com manômetro na água e amperímetro na elétrica. Uma cor por ofício, nunca misturadas.',
    bg: '#e3f0f5',
    accent: '#0a6b87',
    url: 'https://adriano.fenoninho-max.workers.dev',
  },
  {
    name: 'Doce Ateliê',
    category: 'Confeitaria',
    tag: 'Alimentação',
    description:
      'Monte o bolo numa cartela de sabores estilo leque de cores, veja o corte mudando em tempo real e mande a encomenda pelo WhatsApp.',
    bg: '#FFFCF7',
    accent: '#C4213A',
    url: 'https://doce-atelie.fenoninho-max.workers.dev',
  },
  {
    name: 'Estúdio Alma',
    category: 'Pilates',
    tag: 'Saúde & Bem-estar',
    description:
      'Boneco animado troca de pose conforme você rola a página, grade de horários e pedido de aula experimental pelo WhatsApp.',
    bg: '#E9E8E4',
    accent: '#2C4FA3',
    url: 'https://estudio-alma.fenoninho-max.workers.dev',
  },
  {
    name: 'Sabor da Vila',
    category: 'Hamburgueria',
    tag: 'Alimentação',
    description:
      'Cardápio com comanda flutuante, hambúrguer ilustrado em risografia e pedido fechado direto pelo WhatsApp.',
    bg: '#FBFAF5',
    accent: '#3255A4',
    url: 'https://sabor-da-vila.fenoninho-max.workers.dev',
  },
  {
    name: 'Bastos Advocacia',
    category: 'Advocacia empresarial e civil',
    tag: 'Serviços profissionais',
    description:
      'Página única pra um escritório de advocacia: áreas de atuação, processo de atendimento e agendamento direto — sem o kit visual de card e ícone que a maioria usa.',
    bg: '#F5F1E8',
    accent: '#7A2E3A',
    url: 'https://site-template.fenoninho-max.workers.dev',
  },
  {
    name: 'Torre',
    category: 'SaaS de agendamento',
    tag: 'Tecnologia',
    description:
      'Software fictício com a agenda do dia numa tela de radar de verdade — cada agendamento é um blip, com varredura e confirmação automática.',
    bg: '#0B1417',
    accent: '#35D6C9',
    url: 'https://torre.fenoninho-max.workers.dev',
  },
  {
    name: 'Traço',
    category: 'Arquitetura e interiores',
    tag: 'Casa & Design',
    description:
      'Portfólio de um escritório de arquitetura: a planta baixa do hero se desenha sozinha, e cada projeto é representado pelo próprio esquema, sem fotos.',
    bg: '#F6F4EF',
    accent: '#C9962D',
    url: 'https://traco.fenoninho-max.workers.dev',
  },
  {
    name: 'Âncora',
    category: 'Consultoria financeira',
    tag: 'Serviços profissionais',
    description:
      'Consultoria de patrimônio com um extrato ilustrativo que soma linha a linha na tela — sóbrio, sem gráfico de bolsa nem verde/vermelho de day trade.',
    bg: '#F3EDE0',
    accent: '#AB8A53',
    url: 'https://ancora.fenoninho-max.workers.dev',
  },
  {
    name: 'Pulso',
    category: 'Personal training',
    tag: 'Saúde & Bem-estar',
    description:
      'Um traçado de monitor cardíaco corre sem parar no hero, navegação vira uma raia de atletismo com marcação de distância, e a barra de progresso 0M–100M agora é clicável: escolha o programa e veja o pulso bater na posição certa.',
    bg: '#F4F0E6',
    accent: '#E8482F',
    url: 'https://pulso.fenoninho-max.workers.dev',
  },
  {
    name: 'Focinho',
    category: 'Pet shop e veterinária',
    tag: 'Pets',
    description:
      'A ficha de atendimento de um pet vira o hero, com carimbo de "vacina em dia" — navegação em abas de fichário em vez de barra de menu.',
    bg: '#FAF7F0',
    accent: '#B8432E',
    url: 'https://focinho.fenoninho-max.workers.dev',
  },
  {
    name: 'Corte',
    category: 'Salão de beleza e barbearia',
    tag: 'Beleza',
    description:
      'Painel de senha de atendimento numa barbearia clássica de verdade — poste giratório, selo vintage e tesoura/navalha/pente marcando cada profissional pela especialidade.',
    bg: '#FAFAF7',
    accent: '#C8202F',
    url: 'https://corte.fenoninho-max.workers.dev',
  },
  {
    name: 'Chave',
    category: 'Imobiliária',
    tag: 'Serviços profissionais',
    description:
      'Página de classificados de jornal de verdade — cabeçalho não fixo, imóveis em colunas densas com filete entre elas, sem grade de cards.',
    bg: '#EFECE4',
    accent: '#3B5B70',
    url: 'https://chave.fenoninho-max.workers.dev',
  },
  {
    name: 'Revelar',
    category: 'Fotografia de casamento e ensaio',
    tag: 'Eventos',
    description:
      'Folha de contato de laboratório fotográfico: cada serviço é um quadro numerado de negativo com anotação de lápis de cera, sem fotos de verdade.',
    bg: '#EFE6D8',
    accent: '#D98C2B',
    url: 'https://revelar.fenoninho-max.workers.dev',
  },
  {
    name: 'Passaporte',
    category: 'Escola de idiomas',
    tag: 'Educação',
    description:
      'Cada nível do curso (A1 a C2) carimba na página como um visto de verdade — sem barra de progresso de app gamificado, e sem nenhuma barra de navegação.',
    bg: '#F2EAD9',
    accent: '#5C1F2E',
    url: 'https://passaporte.fenoninho-max.workers.dev',
  },
  {
    name: 'Confete',
    category: 'Festa infantil',
    tag: 'Eventos',
    description:
      'Colagem de adesivos com contorno preto e cores saturadas — nav em pílula flutuante e uma fita ondulada de verdade atrás dos depoimentos.',
    bg: '#FFFAF0',
    accent: '#141414',
    url: 'https://confete.fenoninho-max.workers.dev',
  },
  {
    name: 'Cerne',
    category: 'Design de interiores',
    tag: 'Casa & Design',
    description:
      'A navegação é a própria planta baixa — clique num cômodo pra ver o material por trás dele, e uma materioteca de verdade mostra a textura de cada acabamento usado nas quatro casas.',
    bg: '#FAF7F2',
    accent: '#2F4A3E',
    url: 'https://cerne.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Tinta',
    category: 'Estúdio de tatuagem',
    tag: 'Beleza',
    description:
      'A página rola de lado, e o catálogo é um provador: escolhe a zona num corpo de referência, escolhe o desenho, e ele é carimbado ali na hora, se desenhando sozinho.',
    bg: '#121212',
    accent: '#FF3B3B',
    url: 'https://tinta.fenoninho-max.workers.dev',
  },
  {
    name: 'Balcão',
    category: 'Lanchonete de autoatendimento',
    tag: 'Alimentação',
    description:
      'Sem hero, sem "sobre nós" — abre direto no cardápio, com carrinho de verdade (adicionar, tirar, total) e pedido fechado pelo WhatsApp, como um totem de autoatendimento.',
    bg: '#FFF6E1',
    accent: '#257A40',
    url: 'https://balcao.fenoninho-max.workers.dev',
  },
  {
    name: 'Rota',
    category: 'Software de logística',
    tag: 'Tecnologia',
    description:
      'Não é uma página institucional — é a própria tela do software: barra lateral, mapa de rotas animado e tabela de entregas, como se fosse um print do produto de verdade.',
    bg: '#F2F3F5',
    accent: '#5B4FE0',
    url: 'https://rota.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Torno',
    category: 'Ateliê de cerâmica',
    tag: 'Casa & Design',
    description:
      'O site é o torno: molde o barro girando em 3D arrastando a silhueta, escolha o esmalte e leve ao forno — a peça fica incandescente e sai vitrificada.',
    bg: '#E8E4DD',
    accent: '#1F3C88',
    url: 'https://torno.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/torno',
  },
  {
    name: 'Cardume',
    category: 'Escola de mergulho',
    tag: 'Educação',
    description:
      'Rolar a página é descer no oceano, de 0 a 40 m em 3D: um cardume que foge do cursor, luz que some com a profundidade e, lá embaixo, o cursor vira lanterna.',
    bg: '#04121F',
    accent: '#FFE2A1',
    url: 'https://cardume.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/cardume',
  },
  {
    name: 'Encaixe',
    category: 'Alfaiataria sob medida',
    tag: 'Moda & Acessórios',
    description:
      'Monte a peça num configurador de verdade — tecido, corte — e veja preço e prazo mudarem ao vivo, com o figurino técnico se ajustando junto. Nenhuma foto de manequim.',
    bg: '#EFE8D8',
    accent: '#34586C',
    url: 'https://encaixe.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/encaixe',
  },
  {
    name: 'Calibre',
    category: 'Relojoaria artesanal',
    tag: 'Moda & Acessórios',
    description:
      'O mostrador é a própria navegação: um relógio analógico de verdade, correndo no horário real — os números 12, 4 e 8 levam pras seções da página.',
    bg: '#120D08',
    accent: '#CAA25E',
    url: 'https://calibre.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/calibre',
  },
  {
    name: 'Taça',
    category: 'Vinícola de altitude',
    tag: 'Alimentação',
    description:
      'Uma roda de aromas de sommelier de verdade em vez de foto de vinhedo: toque numa fatia (fruta escura, cítrico, amadeirado...) e veja qual rótulo da casa entrega aquele gosto.',
    bg: '#241832',
    accent: '#7A1030',
    url: 'https://taca.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/taca',
  },
  {
    name: 'Ferro',
    category: 'Academia old school',
    tag: 'Saúde & Bem-estar',
    description:
      'Uma calculadora de carga máxima de verdade (fórmula de Epley) no lugar de qualquer enfeite — informe peso e repetições e veja sua estimativa de 1RM, com a tabela de intensidade pra força, hipertrofia e resistência.',
    bg: '#0A0A0A',
    accent: '#C6FF3D',
    url: 'https://ferro.fenoninho-max.workers.dev',
  },
  {
    name: 'Realce & Cia',
    category: 'Salão de beleza — redesenho conceitual',
    tag: 'Beleza',
    description:
      'A nav é um espelho de camarim: cada seção tem uma lâmpada que acende quando você chega nela. E em vez de lista de serviços, você monta a visita — escolhe na ordem, e a agenda fecha sozinha com hora de entrada, de saída e aviso se passar do fechamento.',
    bg: '#000000',
    accent: '#c59d5f',
    url: 'https://realce.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/realce',
  },
  {
    name: 'Fornada',
    category: 'Padaria artesanal',
    tag: 'Alimentação',
    description:
      'O quadro de horários do forno é o próprio conteúdo, escrito a giz — e o contador de pães do dia sobe sozinho no hero. Sem o clichê fofo-pastel de padaria.',
    bg: '#f7f1e4',
    accent: '#d97b29',
    url: 'https://fornada.fenoninho-max.workers.dev',
  },
  {
    name: 'Lúmen',
    category: 'Projeto luminotécnico',
    tag: 'Casa & Design',
    description:
      'Uma sala escura de verdade: o cursor é a única luz, revelando o hero um ponto por vez. A calculadora usa a fórmula real de projeto (lux × área ÷ lumens × fatores de utilização e manutenção), e cada luminária do catálogo tem seu cone desenhado pelo ângulo de feixe e pela temperatura de cor reais, convertida em RGB.',
    bg: '#0a0908',
    accent: '#ffb46b',
    url: 'https://lumen.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/lumen',
  },
  {
    name: 'Prisma',
    category: 'Joalheria sob medida',
    tag: 'Moda & Acessórios',
    description:
      'Configurador de verdade em WebGL: escolha a peça (anel, colar, pulseira) e a gema, e veja ela encaixada na peça — com o índice de refração real de cada pedra (2,417 do diamante, 1,762 do rubi/safira...), não um brilho decorativo.',
    bg: '#100c14',
    accent: '#b98cff',
    url: 'https://prisma.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/prisma',
  },
  {
    name: 'Marcha',
    category: 'Concessionária de esportivos',
    tag: 'Automotivo',
    description:
      'O único projeto do portfólio com fotografia de verdade — banco de imagens livre, sem inventar marca em nenhuma legenda. A calculadora de financiamento usa a tabela price de verdade (a mesma fórmula de qualquer financeira), nunca uma parcela solta.',
    bg: '#0b0b0c',
    accent: '#ff3b30',
    url: 'https://marcha.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/marcha',
  },
  {
    name: 'Bruma',
    category: 'Perfumaria artesanal',
    tag: 'Beleza',
    description:
      'Cada fragrância mostra a concentração real de óleo essencial (Extrait, EDP, EDT) e a pirâmide olfativa de verdade — topo, coração e fundo — não um rótulo bonito. Fundo em shader WebGL sedoso, cartão 3D que se endireita ao rolar a página.',
    bg: '#06120f',
    accent: '#3fae82',
    url: 'https://bruma.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/bruma',
  },
  {
    name: 'Estufa Cheia',
    category: 'Floricultura e paisagismo',
    tag: 'Casa & Design',
    description:
      'Cada arranjo vira uma ficha de espécime real de herbário — nome científico binomial, família, luz e época de floração de verdade — com ilustração técnica em traço, nunca foto de buquê de banco de imagem. Uma trepadeira se desenha sozinha ao rolar a página.',
    bg: '#f3efe1',
    accent: '#4c7a3f',
    url: 'https://estufa.fenoninho-max.workers.dev',
    destaque: true,
    estudoDeCaso: '/projetos/estufa',
  },
]
