// Estrutura real de rotina diária de Educação Infantil: acolhida, refeições
// em horário fixo, atividades pedagógicas, momento de descanso e saída:
// prática amplamente documentada em propostas pedagógicas de creches e
// pré-escolas brasileiras. Horários fictícios (da escola inventada), mas a
// sequência e a lógica são reais.

export type ItemRotina = {
  horario: string
  titulo: string
  descricao: string
}

export const rotina: ItemRotina[] = [
  {
    horario: '7h00',
    titulo: 'Acolhida',
    descricao: 'Recepção individual na porta da sala, com registro de humor e de como a criança chegou naquele dia.',
  },
  {
    horario: '8h00',
    titulo: 'Café da manhã',
    descricao: 'Primeira refeição do dia, no mesmo horário todos os dias, pra criança construir previsibilidade.',
  },
  {
    horario: '8h30',
    titulo: 'Atividade pedagógica dirigida',
    descricao: 'Proposta ligada ao planejamento da faixa etária: linguagem, coordenação motora, artes ou exploração sensorial.',
  },
  {
    horario: '10h00',
    titulo: 'Parque e brincadeira livre',
    descricao: 'Tempo ao ar livre, brincar sem roteiro fixo, essencial pro desenvolvimento motor e social.',
  },
  {
    horario: '11h30',
    titulo: 'Almoço',
    descricao: 'Refeição servida por faixa etária, com cardápio que considera restrições informadas pela família.',
  },
  {
    horario: '12h30',
    titulo: 'Descanso',
    descricao: 'Momento de sono ou repouso, com colchonete individual e ambiente com luz reduzida.',
  },
  {
    horario: '14h30',
    titulo: 'Lanche da tarde',
    descricao: 'Segunda refeição da tarde, antes do bloco final de atividades.',
  },
  {
    horario: '15h00',
    titulo: 'Atividade livre e contação de histórias',
    descricao: 'Roda de conversa, leitura em voz alta e brincadeira em pequenos grupos.',
  },
  {
    horario: '16h30',
    titulo: 'Higiene e preparo pra saída',
    descricao: 'Organização de pertences e higiene antes da chegada das famílias.',
  },
  {
    horario: '17h00',
    titulo: 'Saída',
    descricao: 'Entrega só a responsáveis cadastrados, com registro de horário de saída.',
  },
]
