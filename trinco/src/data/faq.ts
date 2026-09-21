// Perguntas reais de quem está prestes a ligar pro chaveiro, respondidas de
// forma específica e sem inventar preço ou prazo que varie caso a caso.

export type PerguntaFrequente = {
  pergunta: string
  resposta: string
}

export const faq: PerguntaFrequente[] = [
  {
    pergunta: 'Vocês atendem emergência fora do horário comercial?',
    resposta:
      'Sim, abertura de porta trancada e chave quebrada são atendidas em regime de plantão 24h, todos os dias, inclusive madrugada e feriado. Os demais serviços (troca de segredo, cópia, grades) seguem o horário comercial normal, salvo combinação em contrário.',
  },
  {
    pergunta: 'Quanto tempo leva pra chegar?',
    resposta:
      'Em emergência, o tempo de deslocamento depende da região da cidade e do trânsito no momento da chamada, então a gente informa uma estimativa por telefone antes de sair. Serviço agendado tem horário marcado com antecedência.',
  },
  {
    pergunta: 'Fazem cópia de chave com trava ou codificada?',
    resposta:
      'Sim. Chave comum é copiada por duplicação mecânica na hora. Chave codificada/eletrônica (transponder), comum em carros mais novos, exige leitura e gravação do chip com equipamento próprio, então costuma ser agendada em vez de feita na hora.',
  },
  {
    pergunta: 'Dão orçamento antes de fazer o serviço?',
    resposta:
      'Sempre. Serviço de emergência tem o valor da visita informado por telefone antes de você confirmar. Grade e portão sob medida sempre passam por medição no local e orçamento por escrito antes de qualquer corte de ferro.',
  },
  {
    pergunta: 'Atendem residência e comércio?',
    resposta:
      'Sim, os dois. A única diferença prática costuma ser o tipo de fechadura ou porta (comercial em geral é mais robusta) e, no caso de grades e portões, o tamanho do vão a ser fechado.',
  },
]
