export type FaqItem = {
  pergunta: string
  resposta: string
}

export const faq: FaqItem[] = [
  {
    pergunta: 'Vocês atendem emergência, tipo vazamento no meio da noite?',
    resposta:
      'Sim. Emergência de vazamento (água correndo sem parar, cano estourado, infiltração ativa) tem prioridade e é atendida fora do horário comercial. Situação que pode esperar até o dia seguinte, como um pingo isolado, entra na agenda normal.',
  },
  {
    pergunta: 'Vocês dão orçamento antes de fazer o serviço?',
    resposta:
      'Sempre. Depois de ver o problema (pessoalmente ou por foto/vídeo, quando dá pra avaliar assim), passamos o valor antes de começar qualquer coisa. Nenhum serviço é iniciado sem o cliente confirmar.',
  },
  {
    pergunta: 'Vocês mexem com hidráulica de apartamento ou só de casa?',
    resposta:
      'Os dois. Em apartamento e condomínio, a diferença prática é que às vezes o problema não é da unidade e sim de uma coluna ou ramal compartilhado, e isso muda quem paga o conserto. A gente avisa quando é esse o caso, antes de fechar o serviço.',
  },
  {
    pergunta: 'Quanto tempo leva um desentupimento típico?',
    resposta:
      'Ralo ou vaso sanitário, geralmente entre 30 minutos e 1 hora. Tubulação de esgoto mais comprida ou entupimento mais antigo pode passar disso, principalmente se precisar de mais de uma tentativa com equipamento diferente.',
  },
  {
    pergunta: 'O que eu faço enquanto o encanador não chega numa emergência de vazamento?',
    resposta:
      'Feche o registro geral da casa (geralmente perto do relógio ou da entrada de água) e, se der, desligue o chuveiro elétrico e qualquer aparelho perto da água. Isso não resolve o problema, mas reduz o estrago até alguém chegar.',
  },
]
