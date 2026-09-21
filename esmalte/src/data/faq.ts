// Perguntas reais de quem nunca fez unha em gel/BIAB na Renata Bastos —
// cobrindo as dúvidas que mais pesam na hora de decidir marcar horário:
// durabilidade, remoção de trabalho de outro salão, custo de nail art,
// antecedência de agendamento, o que fazer se lascar, e higiene.

export type FaqItem = {
  id: string
  pergunta: string
  resposta: string
}

export const faq: FaqItem[] = [
  {
    id: 'durabilidade',
    pergunta: 'Quanto tempo dura o esmalte em gel ou o gel de construção (BIAB) antes de precisar de manutenção?',
    resposta:
      'O esmalte em gel dura de 15 a 21 dias sem lascar, dependendo do quanto suas unhas crescem e do tipo de trabalho que você faz com as mãos. O BIAB aguenta um pouco mais, de 3 a 4 semanas, porque a camada de construção protege a unha natural. Depois desse prazo o esmalte não estraga, mas o crescimento da unha cria um degrau na base que fica visível: é aí que vale fazer a manutenção (preenchimento), não uma remoção completa.',
  },
  {
    id: 'remocao',
    pergunta: 'Vocês removem esmalte em gel feito em outro salão?',
    resposta:
      'Sim, removemos gel de qualquer salão, desde que tenha sido aplicado sobre a unha natural (unha postiça ou alongamento de outro material passa por uma avaliação antes). Usamos lixa e acetona em papel filme, nunca arrancamos nem fazemos alavanca com o alicate. Arrancar descama a unha natural, e é o principal motivo de unha fina e fraca depois de meses trocando de salão.',
  },
  {
    id: 'nail-art',
    pergunta: 'Nail art (desenho, pedraria, francesinha) custa mais caro que o procedimento normal?',
    resposta:
      'Sim, cobramos à parte, porque é tempo de trabalho manual além da manicure em si. Uma francesinha simples ou glitter em unha acrescenta só um valor pequeno. Desenho à mão livre ou pedraria em todas as unhas custa mais e varia pela unha; a Renata sempre informa o valor antes de começar, olhando as referências que a cliente trouxer.',
  },
  {
    id: 'agendamento',
    pergunta: 'Com quanto tempo de antecedência preciso agendar?',
    resposta:
      'Pra sábado, o ideal é marcar com 3 a 4 dias de antecedência, porque é o dia mais concorrido. Durante a semana, geralmente dá pra conseguir horário de um dia pro outro. Pra noivas e eventos, o recomendado é agendar com pelo menos 2 semanas, porque nesses casos costuma ter um teste antes da data final.',
  },
  {
    id: 'garantia',
    pergunta: 'Uma unha lascou ou quebrou poucos dias depois do procedimento. O que eu faço?',
    resposta:
      'Isso entra na garantia de 7 dias: se alguma unha lascar, descolar ou quebrar dentro de uma semana do procedimento, a Renata conserta sem cobrar, só a unha afetada. Depois desse prazo já é considerado desgaste do dia a dia e o reparo é cobrado à parte, mas costuma sair bem mais barato que o procedimento completo.',
  },
  {
    id: 'higiene',
    pergunta: 'Como funciona a esterilização dos instrumentos?',
    resposta:
      'Cada cliente tem um kit de alicate, espátula e lixa de cutícula esterilizados em autoclave, guardados em embalagem selada que só é aberta na hora do seu atendimento. Lixas de unha e buffers são de uso único e descartados depois de cada cliente. As cubas de manicure são lavadas com detergente e desinfetadas entre um atendimento e outro.',
  },
]
