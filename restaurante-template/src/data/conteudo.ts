// Conteúdo textual das seções. Tudo fictício e genérico: substitua pelo texto
// real do cliente. Os componentes só leem daqui: a estrutura de cada lista é
// reaproveitada, então acrescentar/remover itens não exige mexer neles.
import { images } from '../config/images'

type Imagem = { src: string; alt: string }

export const hero = {
  eyebrow: 'Cozinha brasileira autoral',
  // As palavras entre asteriscos saem em itálico com a cor de destaque.
  title: 'Brasil de ponta a ponta, *no fogo baixo* de uma cozinha aberta.',
  text: 'Um menu que muda com a estação, feito com ingredientes de pequenos produtores. Mesa acolhedora, cozinha à vista e tempo para conversar.',
  primary: 'Reservar mesa',
  secondary: 'Ver o cardápio',
  /** Linha pequena abaixo dos botões. Pode ficar '' para esconder. */
  note: 'Terça a domingo · Reservas pelo WhatsApp',
  image: images.hero,
}

export const apresentacao = {
  eyebrow: 'O restaurante',
  title: 'Uma casa pequena, com a *cozinha à vista*.',
  text: [
    'O Cumaru serve um menu curto e sazonal, com base em ingredientes brasileiros pouco vistos em restaurante: raízes, frutos do cerrado, peixes de rio e queijos artesanais.',
    'A carta muda quando o produtor muda. Por isso, o que você come hoje pode não estar no menu do mês que vem.',
  ],
  // Números FICTÍCIOS de exemplo: troque pelos dados reais ou remova a lista.
  numeros: [
    { valor: '32', rotulo: 'lugares no salão' },
    { valor: '14', rotulo: 'produtores parceiros' },
    { valor: '4', rotulo: 'meses por menu' },
  ],
  image: images.cozinha,
}

/** Destaques da casa: 3 ou 4 itens funcionam melhor. `preco` é opcional. */
export const destaques = {
  eyebrow: 'Da estação',
  title: 'Pratos que *contam* a casa.',
  intro: 'Uma seleção do menu atual. O cardápio completo está logo abaixo.',
  itens: [
    {
      categoria: 'Principal',
      nome: 'Costela de fogo, purê de baroa e farofa de castanha',
      descricao: 'Doze horas de cocção lenta, finalizada na brasa.',
      preco: 'R$ 96',
      image: images.pratoCarne,
    },
    {
      categoria: 'Massa',
      nome: 'Talharim de mandioca, ragu de cogumelos e ervas',
      descricao: 'Massa feita na casa, molho reduzido por quatro horas.',
      preco: 'R$ 68',
      image: images.pratoMassa,
    },
    {
      categoria: 'Sobremesa',
      nome: 'Panqueca de tapioca, frutas vermelhas e calda de cumaru',
      descricao: 'Servida morna, com creme de leite fresco.',
      preco: 'R$ 34',
      image: images.pratoSobremesa,
    },
    {
      categoria: 'Entrada',
      nome: 'Torrada de fermentação natural, ovo mole e ervas',
      descricao: 'Pão da casa, ovos caipiras e azeite de castanha.',
      preco: 'R$ 32',
      image: images.pratoEntrada,
    },
  ],
}

export type ItemCardapio = {
  nome: string
  descricao: string
  /** Opcional. Deixe '' para não mostrar preço. */
  preco?: string
  /** Chaves de `cardapio.legenda`. */
  marcas?: string[]
}
export type CategoriaCardapio = { nome: string; nota?: string; itens: ItemCardapio[] }

export const cardapio = {
  eyebrow: 'Cardápio',
  title: 'O menu *desta estação*.',
  intro: 'Menu curto, feito para compartilhar. Avise a equipe sobre alergias ou restrições ao reservar.',
  /** Significado das marcas exibidas ao lado de cada prato. */
  legenda: { V: 'Vegetariano', VG: 'Vegano', SG: 'Sem glúten' } as Record<string, string>,
  /** Aviso no fim do cardápio. */
  nota: 'Preços e pratos de exemplo. Os valores incluem impostos; serviço opcional de 10%.',
  categorias: [
    {
      nome: 'Entradas',
      itens: [
        { nome: 'Torrada de fermentação natural', descricao: 'Ovo mole, ervas frescas e azeite de castanha.', preco: 'R$ 32', marcas: ['V'] },
        { nome: 'Pastel de queijo da serra', descricao: 'Massa fina, queijo curado e geleia de pimenta.', preco: 'R$ 28', marcas: ['V'] },
        { nome: 'Ceviche de peixe do dia', descricao: 'Leite de tigre com cupuaçu e coentro.', preco: 'R$ 44', marcas: ['SG'] },
        { nome: 'Salada de figo e castanhas', descricao: 'Folhas amargas, figo fresco e vinagrete de mel.', preco: 'R$ 36', marcas: ['V', 'SG'] },
      ],
    },
    {
      nome: 'Principais',
      itens: [
        { nome: 'Costela de fogo', descricao: 'Purê de baroa, farofa de castanha e couve na brasa.', preco: 'R$ 96' },
        { nome: 'Talharim de mandioca', descricao: 'Ragu de cogumelos, parmesão de castanha e ervas.', preco: 'R$ 68', marcas: ['VG'] },
        { nome: 'Frango caipira assado', descricao: 'Vagem, batata-doce assada e molho de ervas.', preco: 'R$ 72', marcas: ['SG'] },
        { nome: 'Legumes da horta na brasa', descricao: 'Cogumelos, cenoura e raízes com molho de tucupi.', preco: 'R$ 58', marcas: ['VG', 'SG'] },
      ],
    },
    {
      nome: 'Sobremesas',
      itens: [
        { nome: 'Panqueca de tapioca', descricao: 'Frutas vermelhas e calda de cumaru.', preco: 'R$ 34', marcas: ['V', 'SG'] },
        { nome: 'Doce de leite e queijo', descricao: 'Queijo minas curado e doce em calda.', preco: 'R$ 26', marcas: ['V', 'SG'] },
        { nome: 'Sorvete do dia', descricao: 'Pergunte pelo sabor da estação.', preco: 'R$ 22', marcas: ['V', 'SG'] },
      ],
    },
    {
      nome: 'Bebidas',
      itens: [
        { nome: 'Caipirinha da casa', descricao: 'Cachaça artesanal, limão e cana.', preco: 'R$ 30' },
        { nome: 'Suco de fruta da estação', descricao: 'Fruta fresca, sem açúcar adicionado.', preco: 'R$ 16', marcas: ['VG', 'SG'] },
        { nome: 'Vinhos por taça', descricao: 'Carta com rótulos nacionais, mudam a cada mês.', preco: 'a partir de R$ 28' },
        { nome: 'Café coado', descricao: 'Grãos de pequeno produtor.', preco: 'R$ 10', marcas: ['VG', 'SG'] },
      ],
    },
  ] as CategoriaCardapio[],
}

export const historia = {
  eyebrow: 'História',
  title: 'Da cozinha de casa para uma *mesa de todos*.',
  text: [
    'O Cumaru começou como um jantar mensal na casa da chef, com seis lugares e um único prato. Os convites viraram fila de espera, e a mesa ganhou endereço.',
    'A pergunta continua a mesma: o que o Brasil tem de bom para pôr no prato hoje? A resposta muda a cada colheita.',
  ],
  citacao: 'Cozinhar é reconhecer o lugar de onde o ingrediente vem.',
  autorCitacao: 'Chef fictícia, sobre o conceito da casa',
  image: images.ambienteMesa,
}

export const equipe = {
  eyebrow: 'Cozinha',
  title: 'Quem *está no fogo*.',
  pessoas: [
    {
      nome: 'Marina Albuquerque',
      papel: 'Chef e sócia',
      texto: 'Cozinha há vinte anos e há oito dedica o menu a ingredientes brasileiros de pequenos produtores.',
      image: images.chef,
    },
  ],
}

export const diferenciais = {
  eyebrow: 'Experiência',
  title: 'O que faz a *casa* ser a casa.',
  itens: [
    { titulo: 'Ingrediente conhecido', texto: 'Trabalhamos com produtores que conhecemos pelo nome. O menu nasce do que chega na semana.' },
    { titulo: 'Cozinha à vista', texto: 'Do balcão você acompanha o preparo e conversa com quem cozinha.' },
    { titulo: 'Menu que acompanha a estação', texto: 'Quatro menus por ano, e um prato do dia que só existe naquele dia.' },
    { titulo: 'Mesa sem pressa', texto: 'Cada mesa é servida sem tempo marcado de saída. Peça, converse, fique.' },
  ],
}

export const ambiente = {
  eyebrow: 'Ambiente',
  title: 'Um *salão* pequeno, feito para conversa.',
  fotos: [
    { ...images.ambienteSalao, legenda: 'Salão e cozinha aberta' },
    { ...images.ambienteServico, legenda: 'Serviço à mesa' },
    { ...images.ambienteMesas, legenda: 'Mesas junto às janelas' },
    { ...images.pratoVegetariano, legenda: 'Do prato' },
  ] as (Imagem & { legenda: string })[],
}

// Depoimentos de EXEMPLO: substitua por relatos reais e autorizados.
export const depoimentos = {
  eyebrow: 'Relatos',
  title: 'O que *dizem* na saída.',
  destaque: {
    texto: 'Comi um prato com um ingrediente que eu nunca tinha visto, e a equipe explicou de onde vinha. Voltei na semana seguinte.',
    autor: 'Cliente A.',
    detalhe: 'Depoimento de exemplo',
  },
  outros: [
    { texto: 'Cozinha aberta, serviço atento, ninguém tem pressa. Do jeito que deveria ser.', autor: 'Cliente B.' },
    { texto: 'Levei minha mãe para o aniversário dela e o cardápio tinha opção para todo mundo.', autor: 'Cliente C.' },
  ],
}

export const reserva = {
  eyebrow: 'Reservas',
  title: 'Reserve *sua mesa*.',
  text: 'Reservas pelo WhatsApp, com resposta no mesmo dia. Informe a data, o número de pessoas e alergias ou restrições.',
  botao: 'Reservar pelo WhatsApp',
  /** Mensagem enviada pelo botão. */
  mensagem: 'Olá! Quero reservar uma mesa. Data: __ · Horário: __ · Pessoas: __',
  detalhes: [
    { rotulo: 'Grupos', texto: 'Até 8 pessoas sem custo adicional.' },
    { rotulo: 'Tolerância', texto: 'A mesa é mantida por 15 minutos.' },
    { rotulo: 'Eventos', texto: 'Jantares fechados sob consulta.' },
  ],
}

export const contato = {
  eyebrow: 'Como chegar',
  title: 'Venha *nos visitar*.',
  /** Texto pequeno ao lado do mapa. Pode ficar ''. */
  observacao: 'Estacionamento com manobrista na rua. Acesso para cadeira de rodas pelo lado direito.',
}

export const faq = {
  eyebrow: 'Perguntas frequentes',
  title: 'Antes de *vir*, tire suas dúvidas.',
  text: 'Se a sua pergunta não estiver aqui, escreva pelo WhatsApp.',
  itens: [
    {
      pergunta: 'Preciso reservar?',
      resposta: 'Recomendamos, principalmente de sexta a domingo. Sem reserva, atendemos por ordem de chegada, conforme a disponibilidade.',
    },
    {
      pergunta: 'Vocês aceitam crianças?',
      resposta: 'Sim. Temos cadeirão e porções menores sob pedido. O menu não tem versão infantil dedicada.',
    },
    {
      pergunta: 'Há opções vegetarianas ou veganas?',
      resposta: 'Sim, marcadas no cardápio com V (vegetariano) e VG (vegano). Também adaptamos alguns pratos sob pedido.',
    },
    {
      pergunta: 'Tem estacionamento?',
      resposta: 'Há manobrista na porta durante o jantar. Confira o valor no local.',
    },
    {
      pergunta: 'Aceitam eventos e grupos?',
      resposta: 'Sim, com reserva antecipada. Para grupos grandes ou jantar fechado, envie a data e o número de pessoas pelo WhatsApp.',
    },
    {
      pergunta: 'Quais são os horários?',
      resposta: 'Estão na seção de contato e no rodapé. Feriados podem ter horário diferente e são avisados no Instagram.',
    },
  ],
}

// Rótulos de interface e mensagens automáticas (troque para mudar tom ou idioma).
export const rotulos = {
  reservar: 'Reservar',
  abrirMapa: 'Abrir no mapa',
  perguntarWhatsapp: 'Perguntar no WhatsApp',
  irParaConteudo: 'Ir para o conteúdo',
  menuAbrir: 'Abrir menu',
  menuFechar: 'Fechar menu',
  inicio: 'Início',
  contato: { whatsapp: 'WhatsApp', telefone: 'Telefone', email: 'E-mail', horarios: 'Horários', endereco: 'Endereço' },
  rodape: { navegacao: 'Navegação', contato: 'Contato' },
  cardapio: { marcas: 'Marcas' },
  mensagemDuvida: 'Olá! Tenho uma dúvida.',
}
