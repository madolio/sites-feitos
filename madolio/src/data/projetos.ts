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
  /** Rota interna pra página de "making of" deste projeto, quando existe uma. */
  estudoDeCaso?: string
}

export const projetos: Projeto[] = [
  {
    name: 'Adriano Souza Passos',
    category: 'Tratamento de água e serviços elétricos',
    description:
      'Site real, sem modo demonstração: um anel de pureza enche até 100% no hero — o selo visual da especialidade dele em água de altíssima pureza, do tipo que hemodiálise exige — e cada ofício (água, elétrica) tem sua própria cor, nunca misturadas.',
    bg: '#eaf4fb',
    accent: '#0e6ba8',
    url: 'https://adriano.fenoninho-max.workers.dev',
  },
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
      'Um traçado de monitor cardíaco corre sem parar no hero, navegação vira uma raia de atletismo com marcação de distância, e a barra de progresso 0M–100M agora é clicável: escolha o programa e veja o pulso bater na posição certa.',
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
      'Painel de senha de atendimento numa barbearia clássica de verdade — poste giratório, selo vintage e tesoura/navalha/pente marcando cada profissional pela especialidade.',
    bg: '#FAFAF7',
    accent: '#C8202F',
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
  },
  {
    name: 'Cerne',
    category: 'Design de interiores',
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
    description:
      'A página rola de lado, e o catálogo é um provador: escolhe a zona num corpo de referência, escolhe o desenho, e ele é carimbado ali na hora, se desenhando sozinho.',
    bg: '#121212',
    accent: '#FF3B3B',
    url: 'https://tinta.fenoninho-max.workers.dev',
  },
  {
    name: 'Balcão',
    category: 'Lanchonete de autoatendimento',
    description:
      'Sem hero, sem "sobre nós" — abre direto no cardápio, com carrinho de verdade (adicionar, tirar, total) e pedido fechado pelo WhatsApp, como um totem de autoatendimento.',
    bg: '#FFF6E1',
    accent: '#257A40',
    url: 'https://balcao.fenoninho-max.workers.dev',
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
  {
    name: 'Torno',
    category: 'Ateliê de cerâmica',
    description:
      'O site é o torno: molde o barro girando em 3D arrastando a silhueta, escolha o esmalte e leve ao forno — a peça fica incandescente e sai vitrificada.',
    bg: '#E8E4DD',
    accent: '#1F3C88',
    url: 'https://torno.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Cardume',
    category: 'Escola de mergulho',
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
    description:
      'Monte a peça num configurador de verdade — tecido, corte — e veja preço e prazo mudarem ao vivo, com o figurino técnico se ajustando junto. Nenhuma foto de manequim.',
    bg: '#EFE8D8',
    accent: '#34586C',
    url: 'https://encaixe.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Calibre',
    category: 'Relojoaria artesanal',
    description:
      'O mostrador é a própria navegação: um relógio analógico de verdade, correndo no horário real — os números 12, 4 e 8 levam pras seções da página.',
    bg: '#120D08',
    accent: '#CAA25E',
    url: 'https://calibre.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Taça',
    category: 'Vinícola de altitude',
    description:
      'Uma roda de aromas de sommelier de verdade em vez de foto de vinhedo: toque numa fatia (fruta escura, cítrico, amadeirado...) e veja qual rótulo da casa entrega aquele gosto.',
    bg: '#241832',
    accent: '#7A1030',
    url: 'https://taca.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Ferro',
    category: 'Academia old school',
    description:
      'Uma calculadora de carga máxima de verdade (fórmula de Epley) no lugar de qualquer enfeite — informe peso e repetições e veja sua estimativa de 1RM, com a tabela de intensidade pra força, hipertrofia e resistência.',
    bg: '#0A0A0A',
    accent: '#C6FF3D',
    url: 'https://ferro.fenoninho-max.workers.dev',
  },
  {
    name: 'Realce & Cia',
    category: 'Salão de beleza — redesenho conceitual',
    description:
      'A nav é um espelho de camarim: cada seção tem uma lâmpada que acende quando você chega nela. E em vez de lista de serviços, você monta a visita — escolhe na ordem, e a agenda fecha sozinha com hora de entrada, de saída e aviso se passar do fechamento.',
    bg: '#000000',
    accent: '#c59d5f',
    url: 'https://realce.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Fornada',
    category: 'Padaria artesanal',
    description:
      'O quadro de horários do forno é o próprio conteúdo, escrito a giz — e o contador de pães do dia sobe sozinho no hero. Sem o clichê fofo-pastel de padaria.',
    bg: '#f7f1e4',
    accent: '#d97b29',
    url: 'https://fornada.fenoninho-max.workers.dev',
  },
  {
    name: 'Lúmen',
    category: 'Projeto luminotécnico',
    description:
      'Uma sala escura de verdade: o cursor é a única luz, revelando o hero um ponto por vez. A calculadora usa a fórmula real de projeto (lux × área ÷ lumens × fatores de utilização e manutenção), e cada luminária do catálogo tem seu cone desenhado pelo ângulo de feixe e pela temperatura de cor reais, convertida em RGB.',
    bg: '#0a0908',
    accent: '#ffb46b',
    url: 'https://lumen.fenoninho-max.workers.dev',
    destaque: true,
  },
  {
    name: 'Marcha',
    category: 'Concessionária de esportivos',
    description:
      'O único projeto do portfólio com fotografia de verdade — banco de imagens livre, sem inventar marca em nenhuma legenda. A calculadora de financiamento usa a tabela price de verdade (a mesma fórmula de qualquer financeira), nunca uma parcela solta.',
    bg: '#0b0b0c',
    accent: '#ff3b30',
    url: 'https://marcha.fenoninho-max.workers.dev',
    destaque: true,
  },
]
