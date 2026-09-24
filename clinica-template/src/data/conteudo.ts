// Conteúdo textual das seções. Tudo fictício e genérico: substitua pelo texto
// real do cliente. A estrutura de cada lista é reaproveitada pelos componentes.
import { images } from '../config/images'

export const hero = {
  eyebrow: 'Saúde · Estética · Bem-estar',
  // As palavras entre asteriscos saem em itálico com a cor de destaque.
  title: 'Cuidar de você *sem pressa*, com método e presença.',
  text: 'Uma clínica onde a primeira consulta serve para ouvir. Depois, um plano claro, feito para o seu ritmo e revisado a cada etapa.',
  primary: 'Agendar avaliação',
  secondary: 'Conhecer os cuidados',
  note: 'Atendimento com hora marcada · Resposta no mesmo dia útil',
}

export const sobre = {
  eyebrow: 'Sobre a clínica',
  title: 'Um espaço pequeno de propósito, para você ser *vista de perto*.',
  text: [
    'Atendemos poucas pessoas por dia, para que cada consulta tenha tempo de escuta, exame e explicação. Você entende o que está sendo proposto antes de decidir qualquer coisa.',
    'Trabalhamos com protocolos baseados em evidência e revisamos cada plano junto com você, sem promessas fora da realidade.',
  ],
  // Números FICTÍCIOS de exemplo: troque pelos dados reais ou remova a lista.
  numeros: [
    { valor: '12', rotulo: 'anos de atuação' },
    { valor: '5 mil', rotulo: 'pacientes atendidos' },
    { valor: '8', rotulo: 'profissionais na equipe' },
  ],
  image: images.ambiente,
}

export const servicos = {
  eyebrow: 'Cuidados',
  title: 'Áreas de atuação, do *essencial* ao especializado.',
  intro: 'Cada área tem uma avaliação própria. Você pode começar por uma só e acrescentar outras quando fizer sentido.',
  itens: [
    {
      numero: '01',
      titulo: 'Avaliação e planejamento',
      texto: 'Consulta longa, exames quando necessários e um plano por escrito, com prioridades e prazos.',
      tags: ['Consulta inicial', 'Plano individual', 'Retorno'],
      image: images.cuidado1,
    },
    {
      numero: '02',
      titulo: 'Cuidados de rotina',
      texto: 'Protocolos de manutenção, com acompanhamento periódico e ajustes conforme a sua resposta.',
      tags: ['Manutenção', 'Acompanhamento', 'Orientação'],
      image: images.cuidado2,
    },
    {
      numero: '03',
      titulo: 'Procedimentos especializados',
      texto: 'Técnicas específicas indicadas após avaliação, com preparo, execução e pós descritos passo a passo.',
      tags: ['Sob indicação', 'Equipamentos', 'Pós-procedimento'],
      image: images.cuidado3,
    },
  ],
  extras: ['Atendimento online', 'Orientação nutricional', 'Programas em grupo', 'Convênios e reembolso'],
}

export const metodo = {
  eyebrow: 'Como cuidamos',
  title: 'Um caminho em *quatro passos*, sem surpresas.',
  passos: [
    { titulo: 'Escuta', texto: 'Conversamos sobre sua história, rotina e o que você espera. Sem pressa e sem roteiro pronto.' },
    { titulo: 'Avaliação', texto: 'Exame clínico e, se preciso, exames complementares para entender o ponto de partida.' },
    { titulo: 'Plano', texto: 'Você recebe as opções, os prazos e os cuidados de cada etapa por escrito, antes de decidir.' },
    { titulo: 'Acompanhamento', texto: 'Retornos marcados e canal aberto para dúvidas. O plano muda quando você muda.' },
  ],
}

export const equipe = {
  eyebrow: 'Equipe',
  title: 'Quem *cuida de você*.',
  pessoas: [
    {
      nome: 'Dra. Helena Duarte',
      papel: 'Diretora clínica',
      registro: 'Registro profissional 00000',
      texto: 'Conduz a avaliação inicial e o plano de cada paciente. Foco em escuta, clareza e resultados sustentáveis.',
      image: images.equipe1,
    },
    {
      nome: 'Dra. Camila Rocha',
      papel: 'Especialista em cuidados contínuos',
      registro: 'Registro profissional 00000',
      texto: 'Acompanha a rotina de cuidados e os retornos, ajustando o plano conforme a resposta de cada pessoa.',
      image: images.equipe2,
    },
  ],
}

// Depoimentos de EXEMPLO: substitua por relatos reais e autorizados.
export const depoimentos = {
  eyebrow: 'Relatos',
  title: 'O que dizem *quem já passou* por aqui.',
  destaque: {
    texto: 'Saí da primeira consulta entendendo tudo o que seria feito e por quê. Foi a primeira vez que não me senti apressada.',
    autor: 'Paciente A.',
    detalhe: 'Depoimento de exemplo',
  },
  outros: [
    { texto: 'Atendimento atencioso e pontual. O plano foi explicado com calma.', autor: 'Paciente B.' },
    { texto: 'Gostei de poder tirar dúvidas pelo WhatsApp entre uma consulta e outra.', autor: 'Paciente C.' },
  ],
}

export const galeria = {
  eyebrow: 'Ambiente e cuidado',
  title: 'Por dentro da *clínica*.',
  fotos: [
    { ...images.ambiente, legenda: 'Sala de atendimento' },
    { ...images.cuidado1, legenda: 'Cuidado facial' },
    { ...images.cuidado3, legenda: 'Procedimento com equipamento' },
    { ...images.cuidado2, legenda: 'Atenção às mãos e ao rosto' },
  ],
}

export const faq = {
  eyebrow: 'Perguntas frequentes',
  title: 'Antes de *marcar*, tire suas dúvidas.',
  text: 'Se a sua pergunta não estiver aqui, escreva pelo WhatsApp. Respondemos no mesmo dia útil.',
  itens: [
    {
      pergunta: 'Como funciona a primeira consulta?',
      resposta:
        'É uma conversa longa, com exame e explicação do que faz sentido no seu caso. Ao final você recebe as opções por escrito e decide sem pressa.',
    },
    {
      pergunta: 'Preciso ter um problema específico para agendar?',
      resposta: 'Não. Muita gente vem para prevenção, rotina ou apenas para conhecer a equipe antes de decidir por qualquer cuidado.',
    },
    {
      pergunta: 'Quanto tempo dura cada atendimento?',
      resposta: 'A avaliação inicial costuma levar de 45 a 60 minutos. Os retornos são mais curtos e informados no agendamento.',
    },
    {
      pergunta: 'Vocês atendem por convênio?',
      resposta: 'Informe seu convênio no contato e confirmamos a cobertura e as regras de reembolso antes da consulta.',
    },
    {
      pergunta: 'Posso remarcar ou cancelar?',
      resposta: 'Sim. Pedimos aviso com pelo menos 24 horas para liberar o horário para outra pessoa.',
    },
  ],
}

export const cta = {
  eyebrow: 'Vamos conversar',
  title: 'Agende sua *primeira avaliação*.',
  text: 'Escolha o melhor horário pelo WhatsApp. Retornamos no mesmo dia útil.',
  botao: 'Chamar no WhatsApp',
}

export const contato = {
  eyebrow: 'Contato',
  title: 'Como *chegar* e falar com a gente.',
}
