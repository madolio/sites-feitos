// Perguntas reais de quem está decidindo matricular um filho numa creche:
// adaptação, o que levar, alimentação, como emergência é tratada, visita e
// lista de espera. Sem número inventado de proporção adulto-criança (isso
// fica em Seguranca.tsx, com linguagem de referência geral).

export type PerguntaFrequente = {
  pergunta: string
  resposta: string
}

export const faq: PerguntaFrequente[] = [
  {
    pergunta: 'Como funciona o período de adaptação?',
    resposta:
      'A adaptação é gradual: nos primeiros dias a permanência é curta, com um responsável podendo ficar por perto, e o tempo na escola aumenta aos poucos conforme a criança se ajusta à rotina e aos educadores. O ritmo é individual, não existe um número fixo de dias que sirva pra toda criança.',
  },
  {
    pergunta: 'O que preciso levar no primeiro dia?',
    resposta:
      'Uma mochila com troca de roupa, itens de higiene pessoal (fralda e lenço umedecido, quando for o caso) e um objeto de apego, se a criança tiver algum, ajuda bastante na adaptação. A lista completa por faixa etária é entregue na matrícula.',
  },
  {
    pergunta: 'Como funciona a alimentação?',
    resposta:
      'O cardápio é elaborado por faixa etária e considera restrições alimentares informadas pela família na matrícula. Refeições e lanches acontecem em horário fixo, parte da rotina diária.',
  },
  {
    pergunta: 'E se a criança passar mal ou se machucar durante o dia?',
    resposta:
      'A família é contatada imediatamente em qualquer situação de febre, mal-estar ou pequeno acidente, com registro do ocorrido. Em caso de urgência, a escola aciona o serviço de emergência e comunica os responsáveis em paralelo.',
  },
  {
    pergunta: 'Posso visitar durante o horário de aula?',
    resposta:
      'Sim, com aviso prévio à coordenação pra não interromper as atividades da turma. Reuniões individuais com a coordenação pedagógica podem ser agendadas a qualquer momento.',
  },
  {
    pergunta: 'Como funciona a lista de espera?',
    resposta:
      'As vagas são limitadas por turma e faixa etária pra manter a proporção de adultos por criança. Quando não há vaga imediata, o nome entra numa lista de espera por ordem de inscrição, com contato assim que uma vaga abrir.',
  },
]
