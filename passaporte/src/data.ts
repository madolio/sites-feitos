// Passaporte é uma escola fictícia — conceito de site da Madolio pro nicho
// de curso de idiomas. Níveis seguem o quadro comum europeu (CEFR), mas
// turmas, horários e depoimentos são exemplos, não uma escola real.

export type Nivel = {
  sigla: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  nome: string
  pais: string
  texto: string
}

export const niveis: Nivel[] = [
  { sigla: 'A1', nome: 'Sobrevivência', pais: 'Primeira entrada', texto: 'Apresentar-se, pedir informação básica, entender frases simples do dia a dia.' },
  { sigla: 'A2', nome: 'Elementar', pais: 'Trânsito livre', texto: 'Conversar sobre rotina, família e trabalho, em situações previsíveis.' },
  { sigla: 'B1', nome: 'Intermediário', pais: 'Residente temporário', texto: 'Se virar sozinho em viagem, contar experiências e justificar opiniões.' },
  { sigla: 'B2', nome: 'Intermediário superior', pais: 'Residente', texto: 'Discutir temas complexos com fluência, sem esforço nítido pro interlocutor.' },
  { sigla: 'C1', nome: 'Avançado', pais: 'Residente permanente', texto: 'Usar a língua com flexibilidade em contexto acadêmico e profissional.' },
  { sigla: 'C2', nome: 'Proficiência', pais: 'Cidadania', texto: 'Entender praticamente tudo, com precisão de quem nasceu falando.' },
]

export const idiomas = ['Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano']

export const depoimentos = [
  { texto: 'Consegui a certificação B2 em 14 meses, sem trancar nenhum módulo.', autor: 'Renata Boaventura' },
  { texto: 'O professor corrige o sotaque desde a primeira aula, não só a gramática.', autor: 'Thiago Amâncio' },
]
