// Conteúdo textual das seções. Tudo fictício e genérico: substitua pelo texto
// real do cliente. Os componentes só leem daqui: a estrutura de cada lista é
// reaproveitada, então acrescentar/remover itens não exige mexer neles.

/** Um exemplar do acervo. Cada livro de sebo é único: descreva a condição concreta
 *  (página, marca, dedicatória), não um adjetivo. `preco` é opcional (esconde o carimbo). */
export type Livro = {
  titulo: string
  autor: string
  edicao: string
  estado: string
  preco?: number
  nota: string
}

// Exemplares de EXEMPLO (títulos de domínio público; edições, estados, notas e
// preços são inventados). Troque pelo acervo real do cliente.
export const livros: Livro[] = [
  {
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    edicao: 'Edição de bolso, 1990',
    estado: 'com grifos a lápis',
    preco: 24,
    nota: 'Grifos a lápis do capítulo 30 ao 60, letra pequena e cuidadosa. Lombada reforçada com fita kraft, discreta.',
  },
  {
    titulo: 'O Cortiço',
    autor: 'Aluísio Azevedo',
    edicao: 'Edição escolar, 1996',
    estado: 'com dedicatória',
    preco: 30,
    nota: '"Para o Beto, que gosta de ler no ônibus — 2001." na folha de guarda. Capa levemente desbotada na lombada.',
  },
  {
    titulo: 'Iracema',
    autor: 'José de Alencar',
    edicao: 'Edição comentada, 1988',
    estado: 'seminovo',
    preco: 18,
    nota: 'Sem grifos, sem dobras. Uma mancha de chá discreta no canto da página 22, que não passa para o texto.',
  },
  {
    titulo: 'Memórias de um Sargento de Milícias',
    autor: 'Manuel Antônio de Almeida',
    edicao: 'Edição didática, com notas',
    estado: 'anotado por estudante',
    preco: 15,
    nota: 'Anotações de vestibular nas margens até o capítulo 12, depois limpo. Útil se você também for estudar pelo livro.',
  },
  {
    titulo: 'A Moreninha',
    autor: 'Joaquim Manuel de Macedo',
    edicao: 'Edição de bolso, 1994',
    estado: 'exemplar de sebo antigo',
    preco: 12,
    nota: 'Carimbo apagado de outra livraria na página de rosto: esta não é a primeira parada dele.',
  },
  {
    titulo: 'Lucíola',
    autor: 'José de Alencar',
    edicao: 'Edição de bolso, 2005',
    estado: 'seminovo',
    nota: 'Orelha da capa levemente dobrada de tanto ir na bolsa. Miolo impecável. Sem preço marcado ainda: consulte no balcão.',
  },
]

type Detalhe = { rotulo: string; texto: string }

export const hero = {
  /** Etiqueta pequena acima do título. Deixe '' para usar o nome do negócio. */
  rotulo: '',
  title: 'Livro usado não é livro velho.',
  text: 'É livro com história. Cada exemplar que passa pelo nosso balcão chega com o grifo, a dedicatória ou a orelha dobrada de quem leu antes: a gente não apaga isso, cataloga. E vende por um preço que cabe no bolso de quem vai continuar a história.',
  primary: 'Ver o acervo',
  secondary: 'Como avaliamos seu acervo',
  /** Ficha em destaque ao lado do título: um exemplar de `livros`. */
  ficha: {
    rotulo: 'Ficha de venda nº 0412',
    /** Posição do livro em `livros` (0 é o primeiro). */
    livro: 1,
    /** Frase manuscrita na ficha (uma anotação real do exemplar). `nota` do livro é longa demais para aqui. */
    citacao: '"Para o Beto, que gosta de ler no ônibus — 2001."',
    /** Legenda sob a frase. Pode ficar ''. */
    legenda: 'dedicatória na folha de guarda, encontrada intacta',
    estado: 'estado:',
  },
}

export const acervo = {
  rotulo: 'acervo desta semana',
  title: 'Cada exemplar, uma história diferente.',
  intro: 'Nunca reimprimimos condição: o que está na ficha é exatamente o que chegou no balcão. Se sumir daqui, é porque alguém já levou aquele exemplar específico.',
  /** Texto do carimbo de preço (o valor vem de cada livro). */
  moeda: 'R$',
}

export const processo = {
  rotulo: 'como avaliamos um acervo',
  title: 'Da sua estante para o nosso balcão, em quatro carimbos.',
  intro: 'Curadoria de Iara Bastos, ex-bibliotecária: catalogou acervo de escola pública antes de abrir o sebo.',
  // O selo de cada etapa é um carimbo de tinta, como os de página de rosto.
  etapas: [
    {
      carimbo: 'RECEBIDO',
      titulo: 'Você traz a caixa, a gente abre na hora',
      texto: 'Sem agendar avaliação com uma semana de antecedência: trazendo até 3 caixas, a triagem acontece na hora, no balcão, na sua frente.',
    },
    {
      carimbo: 'AVALIADO',
      titulo: 'Cada exemplar é folheado, não só pesado',
      texto: 'Miolo, lombada, grifos, anotações: a condição real é o que define o preço, não uma tabela por editora. Livro com dedicatória de outra pessoa vale mais, não menos.',
    },
    {
      carimbo: 'CATALOGADO',
      titulo: 'A ficha registra o que faz aquele exemplar único',
      texto: 'Não escrevemos "bom estado": escrevemos "grifo a lápis até a página 114" ou "mancha de café no canto". Quem compra sabe exatamente o que está levando.',
    },
    {
      carimbo: 'À VENDA',
      titulo: 'No balcão, ou trocado no nosso sarau',
      texto: 'Uma vez por mês, o sarau de troca: você leva 3 livros que já leu e sai com 3 outros da nossa curadoria, sem dinheiro trocando de mão.',
    },
  ],
}

export const faq = {
  rotulo: 'dúvidas frequentes',
  title: 'Antes de vir, tire suas dúvidas.',
  text: 'Se a sua pergunta não estiver aqui, escreva pelo WhatsApp.',
  itens: [
    {
      pergunta: 'Vocês compram acervos?',
      resposta: 'Sim. Traga até 3 caixas para a triagem no balcão, ou mande fotos da estante pelo WhatsApp para uma estimativa antes de vir.',
    },
    {
      pergunta: 'Posso reservar um livro?',
      resposta: 'Pode. Mande o título pelo WhatsApp e separamos o exemplar no balcão por alguns dias, sem custo.',
    },
    {
      pergunta: 'A condição descrita na ficha é confiável?',
      resposta: 'É o que a ficha promete: registramos grifos, manchas e dobras reais de cada exemplar. Se algo não corresponder, você devolve.',
    },
    {
      pergunta: 'Vocês entregam?',
      resposta: 'Combinamos a retirada ou a entrega pelo WhatsApp, conforme o endereço e o número de livros.',
    },
    {
      pergunta: 'Como funciona o sarau de troca?',
      resposta: 'Uma vez por mês você leva 3 livros que já leu e sai com 3 da nossa curadoria. A data do próximo fica no Instagram.',
    },
  ],
}

export const contato = {
  rotulo: 'separe o que você quer',
  title: 'Manda a lista pelo WhatsApp',
  text: 'Separamos o exemplar no balcão e combinamos retirada ou entrega. Também compramos acervos: manda foto da estante que a gente já dá uma estimativa.',
  botao: 'Chamar no WhatsApp',
  /** Linhas extras na coluna de detalhes (eventos, regras, avisos). Pode ser vazio. */
  extras: [{ rotulo: 'Sarau de troca', texto: 'Última sexta do mês, 18h' }] as Detalhe[],
}

// Rótulos de interface e mensagens automáticas (troque para mudar tom ou idioma).
export const rotulos = {
  irParaConteudo: 'Ir para o conteúdo',
  navegacao: 'Navegação principal',
  irPara: 'Ir para',
  contato: { whatsapp: 'WhatsApp', telefone: 'Telefone', email: 'E-mail', endereco: 'Onde fica', horario: 'Horário' },
  seguir: 'Seguir no',
}
