export type PerguntaFrequente = {
  pergunta: string
  resposta: string
}

export const faq: PerguntaFrequente[] = [
  {
    pergunta: 'Com que frequência devo levar meu pet pro banho e tosa?',
    resposta:
      'Depende do tipo de pelo: pelagem curta aguenta 4 a 6 semanas entre banhos, pelagem crespa (que não para de crescer) costuma precisar de tosa a cada 4 a 6 semanas também. Dá pra ver a recomendação completa por tipo de pelagem no guia acima.',
  },
  {
    pergunta: 'Dói ou estressa o animal?',
    resposta:
      'Banho e tosa bem feitos não doem. A tesoura e a máquina são usadas com o pelo afastado da pele, e a unha é cortada só até onde não tem vaso. Ansiedade existe em alguns pets, principalmente na primeira vez, e é justamente o que a próxima pergunta explica como a gente trata.',
  },
  {
    pergunta: 'Atendem pet agitado, medroso ou que já mordeu antes?',
    resposta:
      'Sim, com ritmo mais devagar: pausas, sem contenção forçada, e conversa prévia com o tutor sobre o histórico do pet antes de começar. Em casos de reatividade forte, pode ser recomendado o uso de focinheira de proteção só durante o corte de unha, pelo bem-estar de todos.',
  },
  {
    pergunta: 'E se meu pet tiver alguma alergia ou irritação na pele?',
    resposta:
      'Avisar antes do banho é essencial: usamos shampoo neutro ou hipoalergênico conforme o caso, e se a pele estiver muito inflamada ou com ferida aberta, o ideal é primeiro passar num veterinário. A gente não trata condição de pele, só adapta o produto do banho.',
  },
  {
    pergunta: 'Posso deixar e buscar depois, ou preciso esperar no local?',
    resposta:
      'As duas opções existem. Se preferir esperar, tem uma área de espera com Wi-Fi; se preferir deixar, o tempo médio de banho e tosa completo é de 1h30 a 2h30, dependendo do porte e do serviço.',
  },
  {
    pergunta: 'Tosam gato também, ou só cachorro?',
    resposta:
      'Atendemos gatos também, principalmente banho, tosa higiênica e de-shedding, procedimento mais buscado em raças de pelo longo como o Persa.',
  },
]
