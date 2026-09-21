// O wildcard: a mesma triagem de urgência que um chaveiro de verdade faz por
// telefone antes de despachar alguém. Cada situação aponta pra uma das três
// categorias reais do ofício (emergência 24h, agendado, sob medida), nunca
// um funil de venda genérico.

export type Situacao = {
  id: string
  pergunta: string
  categoria: 'emergencia' | 'agendado' | 'sob-medida'
  explicacao: string
}

export const situacoes: Situacao[] = [
  {
    id: 'trancado-fora',
    pergunta: 'Fiquei do lado de fora, a chave está do lado de dentro',
    categoria: 'emergencia',
    explicacao:
      'Caso clássico de emergência: não dá pra esperar. Um chaveiro avalia o modelo da fechadura por telefone e já sai com a ferramenta certa (gazua ou pistola de impressão) pra abrir sem arrombar.',
  },
  {
    id: 'chave-quebrada',
    pergunta: 'A chave quebrou dentro da fechadura',
    categoria: 'emergencia',
    explicacao:
      'Também é emergência: a fechadura fica inutilizável até remover o pedaço quebrado. Extração do pedaço e, se o cilindro tiver danificado, troca do segredo na mesma visita.',
  },
  {
    id: 'preciso-copia',
    pergunta: 'Preciso de cópia de uma chave (comum ou codificada)',
    categoria: 'agendado',
    explicacao:
      'Não costuma ser urgente: dá pra levar a chave original numa loja ou agendar visita. Chave codificada/eletrônica exige leitura e gravação do chip, então costuma levar um pouco mais de tempo que a cópia comum.',
  },
  {
    id: 'mudei-recente',
    pergunta: 'Acabei de me mudar ou terminei um aluguel',
    categoria: 'agendado',
    explicacao:
      'Recomendação padrão do ofício: trocar o segredo (ou a fechadura inteira) sempre que você não tem certeza de quem mais tem cópia da chave anterior. Não é emergência, mas vale agendar logo.',
  },
  {
    id: 'grade-portao',
    pergunta: 'Quero uma grade de proteção ou portão sob medida',
    categoria: 'sob-medida',
    explicacao:
      'Serviço de serralheria, não de chaveiro: precisa de medição no local, projeto e orçamento antes de qualquer corte de ferro. O prazo depende do tamanho e da complexidade do desenho.',
  },
]
