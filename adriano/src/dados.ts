// Todo o texto factual do site mora neste arquivo.
//
// Regra do projeto (ver CLAUDE.md): nada neste arquivo pode ser inventado.
// Cada linha abaixo veio de um fato confirmado pelo cliente — nome, 22 anos
// de experiência, os dois ofícios e o que cada um cobre, quem ele atende e a
// região. Não existe preço, certificação, nome fantasia, depoimento nem
// número de clientes porque nada disso foi confirmado.
//
// O endereço completo NÃO aparece aqui nem em lugar nenhum: foi decisão
// explícita do cliente (atendimento a domicílio, não ponto comercial).

export const PROFISSIONAL = {
  nome: 'Adriano Souza Passos',
  anos: '22 anos',
  regiao: 'São Paulo e região',
  atendimento: 'Residências e clínicas',
  oficios: 'Tratamento de água · Serviços elétricos',
} as const

export type Glifo = 'osmose' | 'filtro' | 'registro' | 'quadro' | 'disjuntor'

export type Servico = {
  titulo: string
  detalhe?: string
  glifo: Glifo
}

// "Água de alta pureza — o padrão que tratamento de hemodiálise exige",
// "tratamento de água em geral, residencial e comercial" e "manutenção de
// sistemas já instalados": as mesmas três frases confirmadas, só separadas
// em título e complemento pra caberem na ficha.
export const servicosAgua: Servico[] = [
  {
    titulo: 'Água de alta pureza',
    detalhe: 'O padrão que tratamento de hemodiálise exige.',
    glifo: 'osmose',
  },
  {
    titulo: 'Tratamento de água em geral',
    detalhe: 'Residencial e comercial.',
    glifo: 'filtro',
  },
  {
    titulo: 'Manutenção de sistemas já instalados',
    glifo: 'registro',
  },
]

// "Instalação e manutenção elétrica residencial e comercial" — a mesma frase
// confirmada, aberta nas duas coisas que ela afirma.
export const servicosEletrica: Servico[] = [
  {
    titulo: 'Instalação elétrica',
    detalhe: 'Residencial e comercial.',
    glifo: 'quadro',
  },
  {
    titulo: 'Manutenção elétrica',
    detalhe: 'Residencial e comercial.',
    glifo: 'disjuntor',
  },
]
