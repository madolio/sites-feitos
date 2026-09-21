// Depoimentos fictícios, escritos pra este conceito de site: não
// correspondem a clientes reais. Nome de primeiro nome + inicial do
// sobrenome, casos concretos, nunca elogio genérico.

export type Depoimento = {
  autor: string
  texto: string
}

export const depoimentos: Depoimento[] = [
  {
    autor: 'Fernanda O.',
    texto:
      'Fiquei trancada do lado de fora às 23h de uma sexta, com o bebê dormindo lá dentro no carrinho na garagem fechada. Chegaram em pouco mais de vinte minutos e abriram sem quebrar nada. Não sabia que existia esse plantão de madrugada.',
  },
  {
    autor: 'Marcelo T.',
    texto:
      'Pedi uma grade pra três janelas e o portão da garagem. Vieram medir antes de cortar qualquer coisa, o orçamento bateu com o que ficou pronto, e o acabamento ficou melhor do que eu esperava pelo preço.',
  },
  {
    autor: 'Juliana P.',
    texto:
      'Troquei o segredo de casa assim que devolvi as chaves do aluguel anterior, porque não sabia quem mais tinha cópia. Foi rápido e resolveu uma preocupação boba que eu vinha adiando há meses.',
  },
]
