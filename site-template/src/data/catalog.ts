// Acervo da biblioteca jurídica — cada área de atuação é uma ficha de
// catálogo, com número de chamada real (CDU, a Classificação Decimal
// Universal usada em bibliotecas brasileiras — classe 34 é Direito) e uma
// localização de estante/gaveta coerente com o resto do esquema. `timeline`
// e `documents` são dado estruturado de verdade (etapas e documentos reais
// do atendimento), não enfeite: é isso que faz a ficha ser navegável de
// verdade, não só decorativa.
export type CatalogEntry = {
  slug: string
  callNumber: string
  shelf: string
  title: string
  summary: string
  scope: string
  timeline: { step: string; detail: string }[]
  documents: string[]
}

export const catalog: CatalogEntry[] = [
  {
    slug: 'contratual',
    callNumber: 'CDU 347.44',
    shelf: 'Estante B · Gaveta 3',
    title: 'Direito Contratual',
    summary: 'Contratos comerciais, prestação de serviços e parcerias.',
    scope:
      'Redação e revisão de contratos entre empresas, fornecedores e prestadores de serviço, com atenção a cláusulas de rescisão, multa e responsabilidade — o tipo de detalhe que só aparece quando já é tarde.',
    timeline: [
      { step: 'Leitura do contexto', detail: 'Entendemos o negócio antes de olhar a minuta.' },
      { step: 'Marcação de riscos', detail: 'Cada cláusula problemática é sinalizada com a alternativa.' },
      { step: 'Negociação de termos', detail: 'Ajustamos o texto direto com a outra parte, se preciso.' },
      { step: 'Versão final assinada', detail: 'Entrega do contrato pronto para assinatura das partes.' },
    ],
    documents: ['Minuta ou contrato vigente', 'Dados cadastrais das partes', 'Histórico da negociação, se houver'],
  },
  {
    slug: 'societario',
    callNumber: 'CDU 347.7',
    shelf: 'Estante B · Gaveta 5',
    title: 'Direito Societário',
    summary: 'Constituição de sociedades e acordos entre sócios.',
    scope:
      'Abertura de empresas, redação de acordos de sócios, alteração de contrato social e reorganizações societárias — inclusive as conversas difíceis sobre saída de sócio ou divisão de cotas.',
    timeline: [
      { step: 'Diagnóstico societário', detail: 'Mapeamos a estrutura atual e o que precisa mudar.' },
      { step: 'Minuta do acordo', detail: 'Regras de entrada, saída e divisão levadas ao papel.' },
      { step: 'Registro na Junta Comercial', detail: 'Protocolo e acompanhamento até o deferimento.' },
      { step: 'Entrega da documentação', detail: 'Contrato social atualizado e certidões em mãos.' },
    ],
    documents: ['Contrato social vigente', 'Documentos dos sócios', 'Última alteração registrada'],
  },
  {
    slug: 'consultivo',
    callNumber: 'CDU 346',
    shelf: 'Estante C · Gaveta 1',
    title: 'Consultivo Empresarial',
    summary: 'Orientação jurídica contínua para o dia a dia da empresa.',
    scope:
      'Acompanhamento permanente para decisões do cotidiano, como uma contratação ou uma cobrança que não deveria existir, resolvidas por telefone ou e-mail antes de virarem processo.',
    timeline: [
      { step: 'Abertura de canal direto', detail: 'Linha de contato para dúvidas pontuais, sem burocracia.' },
      { step: 'Resposta em até 24h', detail: 'Parecer objetivo sobre o que fazer e por quê.' },
      { step: 'Revisão periódica', detail: 'Checagem trimestral dos contratos e riscos em aberto.' },
    ],
    documents: ['Descrição da situação', 'Documentos relacionados, quando houver'],
  },
  {
    slug: 'contencioso',
    callNumber: 'CDU 347.9',
    shelf: 'Estante D · Gaveta 2',
    title: 'Contencioso Cível',
    summary: 'Defesa e representação em disputas cíveis e empresariais.',
    scope:
      'Quando o acordo não é mais possível: ações de cobrança, rescisão contratual e disputas societárias levadas à Justiça, com posição definida antes de entrar na sala de audiência.',
    timeline: [
      { step: 'Análise do processo', detail: 'Levantamento de provas, prazos e chances reais de êxito.' },
      { step: 'Estratégia definida', detail: 'Escolha entre acordo, defesa ou recurso, com o cliente ciente do custo de cada uma.' },
      { step: 'Acompanhamento processual', detail: 'Petições, audiências e atualizações a cada movimentação.' },
      { step: 'Decisão e cumprimento', detail: 'Execução da sentença ou do acordo até o fim.' },
    ],
    documents: ['Documentos do processo, se já houver', 'Provas e comunicações relevantes', 'Procuração assinada'],
  },
]
