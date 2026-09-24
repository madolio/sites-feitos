// Conteúdo textual das seções. Tudo fictício e genérico: substitua pelo texto
// real do cliente. Os componentes só leem daqui: a estrutura de cada lista é
// reaproveitada, então acrescentar/remover itens não exige mexer neles.
import { images } from '../config/images'

type Imagem = { src: string; alt: string }
type Numero = { valor: string; rotulo: string }

export const hero = {
  eyebrow: 'Academia & treino funcional',
  // As palavras entre asteriscos saem na cor de destaque.
  title: 'Treino com método, *resultado* que você mede.',
  text: 'Musculação, funcional, boxe e mobilidade com professores formados, avaliação no início e reavaliação a cada ciclo. Sem fidelidade e sem letra miúda.',
  primary: 'Agendar aula experimental',
  secondary: 'Ver planos',
  /** Linha pequena abaixo dos botões. Pode ficar '' para esconder. */
  note: 'Aula experimental sem custo · Segunda a sábado',
  image: images.hero,
}

export const apresentacao = {
  eyebrow: 'A academia',
  title: 'Menos improviso, *mais progresso*.',
  text: [
    'A Vértice nasceu para quem já cansou de treinar sem saber se está evoluindo. Cada aluno começa com uma avaliação e um plano por escrito, revisto pelo professor a cada ciclo.',
    'O salão é amplo, o número de alunos por professor é limitado e as turmas de aula em grupo têm vagas contadas.',
  ],
  // Números FICTÍCIOS de exemplo: troque pelos dados reais ou remova a lista.
  numeros: [
    { valor: '900 m²', rotulo: 'de área de treino' },
    { valor: '1:12', rotulo: 'professores por aluno no salão' },
    { valor: '6', rotulo: 'modalidades' },
  ] as Numero[],
  image: images.espacoSalao,
}

export const modalidades = {
  eyebrow: 'Modalidades',
  title: 'Escolha *como* treinar.',
  intro: 'Todas as modalidades entram no plano completo. Você pode combiná-las na mesma semana.',
  itens: [
    {
      nome: 'Musculação',
      descricao: 'Ficha individual, carga progressiva e acompanhamento no salão em todos os horários.',
      detalhe: 'Salão livre · ficha personalizada',
      image: images.modMusculacao,
    },
    {
      nome: 'Funcional',
      descricao: 'Circuitos com peso do corpo, kettlebell e corda para ganhar força, resistência e coordenação.',
      detalhe: 'Turmas de até 14 alunos',
      image: images.modFuncional,
    },
    {
      nome: 'Boxe',
      descricao: 'Técnica de base, saco e trabalho de manopla. Não exige experiência nem contato entre alunos.',
      detalhe: 'Turmas por nível',
      image: images.modBoxe,
    },
    {
      nome: 'Mobilidade',
      descricao: 'Aula guiada de alongamento e mobilidade articular, boa para recuperar entre os treinos.',
      detalhe: '45 minutos · todos os níveis',
      image: images.modMobilidade,
    },
  ],
}

/** Planos: quantos forem necessários. `destaque` marca o recomendado (só um). `preco` pode
 *  ser '' para mostrar apenas o botão de consulta. */
export const planos = {
  eyebrow: 'Planos',
  title: 'Mensalidade *sem fidelidade*.',
  intro: 'Valores de exemplo. Cancele quando quiser, sem multa e sem taxa de adesão.',
  itens: [
    {
      nome: 'Musculação',
      descricao: 'Para quem treina no salão, no seu ritmo.',
      preco: 'R$ 119',
      periodo: 'por mês',
      destaque: false,
      beneficios: ['Salão livre em todos os horários', 'Ficha individual e reavaliação a cada ciclo', 'Armário e vestiário'],
      botao: 'Quero este plano',
    },
    {
      nome: 'Completo',
      descricao: 'Salão e todas as aulas, sem limite de modalidades.',
      preco: 'R$ 169',
      periodo: 'por mês',
      destaque: true,
      beneficios: ['Tudo do plano Musculação', 'Funcional, boxe e mobilidade', 'Avaliação física inicial incluída', 'Traga um convidado uma vez por mês'],
      botao: 'Quero este plano',
    },
    {
      nome: 'Personal',
      descricao: 'Acompanhamento individual com professor dedicado.',
      preco: '',
      periodo: 'sob consulta',
      destaque: false,
      beneficios: ['Sessões individuais agendadas', 'Plano montado para o seu objetivo', 'Relatório de evolução mensal'],
      botao: 'Pedir proposta',
    },
  ],
  observacao: 'Preços fictícios, apenas para demonstração do layout.',
  /** Mensagem enviada pelo botão de cada plano (o nome do plano é acrescentado). */
  mensagem: 'Olá! Tenho interesse no plano',
}

export const estrutura = {
  eyebrow: 'Estrutura',
  title: 'Espaço para *treinar de verdade*.',
  text: 'Equipamentos revisados toda semana, ventilação forte e área livre para quem treina com peso e para quem faz aula.',
  fotos: [images.espacoSalao, images.espacoAnilhas, images.espacoHalteres, images.aulaGrupo] as Imagem[],
  // Lista de equipamentos e áreas (de exemplo).
  itens: [
    { nome: 'Área de força', detalhe: 'Racks, plataformas e halteres até 50 kg' },
    { nome: 'Cardio', detalhe: 'Esteiras, bicicletas e remo' },
    { nome: 'Estúdio de aulas', detalhe: 'Piso amortecido e espelhos' },
    { nome: 'Vestiários', detalhe: 'Armários com chave própria e chuveiros' },
  ],
}

export const resultados = {
  eyebrow: 'Como trabalhamos',
  title: 'O treino *tem começo, meio e medida*.',
  itens: [
    { titulo: 'Avaliação', texto: 'Medidas, histórico e objetivo registrados antes da primeira série.' },
    { titulo: 'Plano por escrito', texto: 'Você sabe o que vai fazer em cada dia e por quê.' },
    { titulo: 'Ajuste de carga', texto: 'O professor revê a ficha a cada ciclo, com base no que você realmente fez.' },
    { titulo: 'Reavaliação', texto: 'A cada ciclo, comparamos com o ponto de partida e definimos o próximo passo.' },
  ],
}

export const equipe = {
  eyebrow: 'Professores',
  title: 'Quem *conduz* o treino.',
  intro: 'Todos formados em Educação Física, com registro ativo no conselho.',
  pessoas: [
    {
      nome: 'Rafael Monteiro',
      funcao: 'Coordenação e musculação',
      bio: 'Foca em força e técnica de execução. Conduz as avaliações iniciais.',
      registro: 'CREF 000000-G/UF',
      image: images.prof1,
    },
    {
      nome: 'Camila Duarte',
      funcao: 'Funcional e mobilidade',
      bio: 'Monta circuitos por nível e acompanha a evolução das turmas.',
      registro: 'CREF 000000-G/UF',
      image: images.prof2,
    },
    {
      nome: 'Diego Aranha',
      funcao: 'Boxe e condicionamento',
      bio: 'Ensina a técnica do zero, com ritmo adaptado a cada aluno.',
      registro: 'CREF 000000-G/UF',
      image: images.prof3,
    },
  ],
}

// Depoimentos de EXEMPLO: substitua por relatos reais e autorizados.
export const depoimentos = {
  eyebrow: 'Alunos',
  title: 'O que *dizem* quem treina aqui.',
  destaque: {
    texto: 'Treinei anos sem saber se estava evoluindo. Aqui eu tenho a ficha, a reavaliação e um professor que ajusta a carga comigo.',
    autor: 'Aluno A.',
    detalhe: 'Depoimento de exemplo',
  },
  outros: [
    { texto: 'A turma de funcional tem vaga contada, e isso muda tudo: o professor corrige cada um.', autor: 'Aluna B.' },
    { texto: 'Comecei do zero no boxe, sem vergonha nenhuma. O ritmo respeitou o meu nível.', autor: 'Aluno C.' },
  ],
}

export const cta = {
  eyebrow: 'Aula experimental',
  title: 'Venha treinar *uma vez* e decida depois.',
  text: 'Agende pelo WhatsApp: você conhece o espaço, faz uma aula e conversa com um professor. Sem custo e sem compromisso.',
  botao: 'Agendar pelo WhatsApp',
  /** Mensagem enviada pelo botão. */
  mensagem: 'Olá! Quero agendar uma aula experimental. Dia: __ · Horário: __ · Modalidade: __',
  detalhes: [
    { rotulo: 'Duração', texto: 'Cerca de uma hora, com visita ao espaço.' },
    { rotulo: 'O que levar', texto: 'Roupa de treino, tênis e uma toalha.' },
    { rotulo: 'Idade mínima', texto: '16 anos (menores com autorização).' },
  ],
  image: images.cta,
}

export const contato = {
  eyebrow: 'Como chegar',
  title: 'Venha *nos visitar*.',
  /** Texto pequeno ao lado do mapa. Pode ficar ''. */
  observacao: 'Estacionamento conveniado ao lado. Acesso para cadeira de rodas pela entrada principal.',
}

export const faq = {
  eyebrow: 'Perguntas frequentes',
  title: 'Antes de *começar*, tire suas dúvidas.',
  text: 'Se a sua pergunta não estiver aqui, escreva pelo WhatsApp.',
  itens: [
    {
      pergunta: 'Preciso de avaliação para começar?',
      resposta: 'Sim, e ela já vem incluída no plano Completo. É rápida e serve de base para a sua ficha.',
    },
    {
      pergunta: 'Existe fidelidade ou taxa de adesão?',
      resposta: 'Não. A mensalidade é recorrente e você cancela quando quiser, sem multa.',
    },
    {
      pergunta: 'Nunca treinei. Posso começar?',
      resposta: 'Pode. A primeira semana é de adaptação, com um professor acompanhando a execução dos exercícios.',
    },
    {
      pergunta: 'Posso levar um convidado?',
      resposta: 'No plano Completo, uma vez por mês. Nos demais, o convidado faz uma aula experimental.',
    },
    {
      pergunta: 'Tem horário mais vazio?',
      resposta: 'Costuma ser das 9h às 11h e das 14h às 16h. O movimento maior fica entre 18h e 20h.',
    },
    {
      pergunta: 'Quais são os horários?',
      resposta: 'Estão na seção de contato e no rodapé. Feriados podem ter horário diferente e são avisados no Instagram.',
    },
  ],
}

// Rótulos de interface e mensagens automáticas (troque para mudar tom ou idioma).
export const rotulos = {
  matricula: 'Aula experimental',
  /** Versão curta do botão do header no celular. */
  matriculaCurto: 'Agendar',
  abrirMapa: 'Abrir no mapa',
  perguntarWhatsapp: 'Perguntar no WhatsApp',
  irParaConteudo: 'Ir para o conteúdo',
  menuAbrir: 'Abrir menu',
  menuFechar: 'Fechar menu',
  inicio: 'Início',
  planos: { recomendado: 'Mais escolhido' },
  contato: { whatsapp: 'WhatsApp', telefone: 'Telefone', email: 'E-mail', horarios: 'Horários', endereco: 'Endereço' },
  rodape: { navegacao: 'Navegação', contato: 'Contato' },
  mensagemDuvida: 'Olá! Tenho uma dúvida.',
}
