export type FaqItem = {
  pergunta: string
  resposta: string
}

export const faq: FaqItem[] = [
  {
    pergunta: 'Preciso agendar antes ou posso só aparecer?',
    resposta:
      'Pode aparecer sem avisar. Só que sem hora marcada você entra na fila do dia, então pode ter espera. Se já sabe o que precisa (troca de óleo, revisão, barulho estranho no motor), manda mensagem antes que a gente já separa um horário pra você.',
  },
  {
    pergunta: 'Vocês passam orçamento antes de mexer no carro?',
    resposta:
      'Sempre. Orçamento por escrito antes de qualquer serviço, sem exceção. Nada é trocado ou consertado sem sua aprovação. Se no meio do conserto aparecer outro problema, paramos e ligamos antes de seguir.',
  },
  {
    pergunta: 'Vocês guardam a peça velha pra eu ver?',
    resposta:
      'Guardamos. Toda peça trocada fica separada com seu nome até você buscar o carro, pra conferir que o que foi cobrado é o que realmente saiu do carro.',
  },
  {
    pergunta: 'Tem garantia na peça e na mão de obra?',
    resposta:
      'Tem: 90 dias de garantia na mão de obra em qualquer serviço. Na peça, vale a garantia do fabricante dela, que muda de peça pra peça, e a gente informa o prazo de cada uma no orçamento.',
  },
  {
    pergunta: 'Vocês mexem em qualquer marca de carro ou só algumas?',
    resposta:
      'Carro de passeio nacional e importado popular: VW, Fiat, Chevrolet, Ford, Toyota, Honda, Hyundai. Carro de luxo ou marca rara a gente não pega, porque não tem peça nem ferramenta específica pra isso, e prefere dizer não a enrolar.',
  },
  {
    pergunta: 'Quais formas de pagamento vocês aceitam?',
    resposta:
      'Dinheiro, PIX, débito e crédito em até 3x sem juros. Em serviço maior dá pra combinar entrada e o resto na entrega do carro.',
  },
]
