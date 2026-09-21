// Notação FDI/ISO 3950 — o padrão internacional de numeração dentária usado
// pela Federação Dentária Internacional (por isso "FDI") e adotado no
// Brasil pelo CFO. Dois dígitos: o primeiro é o quadrante (1 = superior
// direito, 2 = superior esquerdo, 3 = inferior esquerdo, 4 = inferior
// direito, sempre da perspectiva do paciente, não de quem olha), o segundo
// é a posição do dente a partir da linha média (1 = incisivo central, até
// 8 = terceiro molar/siso).

export type TipoDente = 'incisivo' | 'canino' | 'premolar' | 'molar' | 'terceiro-molar'
export type Arco = 'superior' | 'inferior'

export interface Dente {
  fdi: string
  nome: string
  tipo: TipoDente
  arco: Arco
  /** Índice de posição no quadrante, 1 (linha média) a 8 (mais posterior). */
  posicao: number
  /** Largura relativa do dente na ilustração — incisivos são estreitos,
   * molares são largos, o que reflete a anatomia real da coroa. */
  largura: number
}

export interface InfoTipoDente {
  tipo: TipoDente
  titulo: string
  funcao: string
  procedimentos: { nome: string; descricao: string; duracao: string }[]
}

// Ordem visual convencional de um odontograma: vista pelo examinador de
// frente para o paciente, o quadrante 1 (superior direito do paciente) fica
// à ESQUERDA da tela, e o quadrante 4 (inferior direito) também à esquerda,
// embaixo — é assim que qualquer prontuário odontológico brasileiro é
// desenhado.

const NOMES_POSICAO: Record<number, { nome: string; tipo: TipoDente; largura: number }> = {
  1: { nome: 'Incisivo central', tipo: 'incisivo', largura: 0.8 },
  2: { nome: 'Incisivo lateral', tipo: 'incisivo', largura: 0.75 },
  3: { nome: 'Canino', tipo: 'canino', largura: 0.85 },
  4: { nome: 'Primeiro pré-molar', tipo: 'premolar', largura: 0.9 },
  5: { nome: 'Segundo pré-molar', tipo: 'premolar', largura: 0.9 },
  6: { nome: 'Primeiro molar', tipo: 'molar', largura: 1.1 },
  7: { nome: 'Segundo molar', tipo: 'molar', largura: 1.1 },
  8: { nome: 'Terceiro molar (siso)', tipo: 'terceiro-molar', largura: 1.05 },
}

function gerarQuadrante(prefixo: string, arco: Arco, decrescente: boolean): Dente[] {
  const posicoes = decrescente ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8]
  return posicoes.map((posicao) => {
    const info = NOMES_POSICAO[posicao]
    return {
      fdi: `${prefixo}${posicao}`,
      nome: info.nome,
      tipo: info.tipo,
      arco,
      posicao,
      largura: info.largura,
    }
  })
}

// Quadrante 1 (11-18) decresce da linha média (11) pra trás (18) indo pra
// esquerda da tela; quadrante 2 (21-28) cresce da linha média pra direita.
// Embaixo, quadrante 4 (41-48) decresce indo pra esquerda, quadrante 3
// (31-38) cresce indo pra direita — o mesmo espelhamento em X, mesmo par de
// quadrantes column-aligned com os de cima (1 sobre 4, 2 sobre 3).
export const DENTES_SUPERIORES: Dente[] = [
  ...gerarQuadrante('1', 'superior', true),
  ...gerarQuadrante('2', 'superior', false),
]

export const DENTES_INFERIORES: Dente[] = [
  ...gerarQuadrante('4', 'inferior', true),
  ...gerarQuadrante('3', 'inferior', false),
]

export const TODOS_DENTES: Dente[] = [...DENTES_SUPERIORES, ...DENTES_INFERIORES]

// Função e procedimentos por TIPO de dente — pesquisado a partir de
// anatomia e clínica odontológica geral real, não inventado. A lógica:
// incisivos têm borda incisal fina pra cortar o alimento e ficam na "vitrine"
// estética do sorriso; caninos têm cúspide única e raiz longa pra rasgar e
// guiar o movimento lateral da mandíbula (guia canina); pré-molares têm
// cúspides vestibular e lingual pra começar a triturar; molares têm coroa
// larga com múltiplas cúspides e sulcos profundos pra moer o bolo alimentar,
// e por isso acumulam mais placa e têm mais raízes (o que torna o canal
// mais complexo); terceiros molares (sisos) erupcionam por último
// (tipicamente entre 17 e 25 anos) e frequentemente não têm espaço
// suficiente na arcada, causando impactação — por isso a extração
// profilática é uma conduta comum, embora não universal.
export const INFO_POR_TIPO: Record<TipoDente, InfoTipoDente> = {
  incisivo: {
    tipo: 'incisivo',
    titulo: 'Incisivos — cortam',
    funcao:
      'Borda incisal fina, em forma de talhadeira: a primeira função é cortar o alimento. São os dentes mais visíveis ao sorrir e falar, por isso concentram a maior parte da demanda estética da clínica.',
    procedimentos: [
      {
        nome: 'Clareamento dental',
        descricao:
          'Agente clareador (peróxido de carbamida ou de hidrogênio) em consultório ou moldeira caseira supervisionada. Como os incisivos são a área de maior exposição ao sorrir, costumam ser a referência de cor de todo o tratamento.',
        duracao: 'sessão em consultório: ~1h; manutenção caseira: 1–3 semanas',
      },
      {
        nome: 'Faceta (porcelana ou resina)',
        descricao:
          'Lâmina fina cimentada sobre a face vestibular pra corrigir cor, forma ou pequenas fraturas — muito comum em incisivo por ser área estética, raramente indicada em dente posterior.',
        duracao: '2–3 sessões (moldagem, prova, cimentação), quando em porcelana',
      },
      {
        nome: 'Restauração de fratura',
        descricao:
          'Incisivo é o dente mais exposto a trauma (queda, impacto), então lascas de borda incisal são a restauração mais comum nesse grupo, geralmente em resina composta direta.',
        duracao: '30–45 min por dente',
      },
    ],
  },
  canino: {
    tipo: 'canino',
    titulo: 'Caninos — rasgam',
    funcao:
      'Cúspide única e pontiaguda, a raiz mais longa da arcada. Além de rasgar alimentos mais firmes, o canino guia o deslizamento lateral da mandíbula durante a mastigação (a chamada "guia canina"), protegendo os dentes posteriores de contato excessivo nesse movimento.',
    procedimentos: [
      {
        nome: 'Restauração de desgaste por guia canina',
        descricao:
          'Por assumir o contato nos movimentos laterais da mandíbula, o canino é um dos dentes mais afetados pelo desgaste do bruxismo — o desgaste da cúspide é tratado com resina composta ou, em casos avançados, coroa.',
        duracao: '30–60 min por dente',
      },
      {
        nome: 'Tratamento de canal',
        descricao:
          'Raiz longa e canal único, geralmente reto — anatomia relativamente favorável à endodontia quando a polpa é comprometida por cárie profunda ou trauma.',
        duracao: '1–2 sessões de ~60 min',
      },
      {
        nome: 'Coroa protética',
        descricao:
          'Quando o desgaste ou a perda de estrutura é extensa, a coroa devolve a função de guia lateral sem a qual os molares tendem a sofrer mais atrito.',
        duracao: '2 sessões (preparo + cimentação)',
      },
    ],
  },
  premolar: {
    tipo: 'premolar',
    titulo: 'Pré-molares — começam a triturar',
    funcao:
      'Fazem a transição entre corte e trituração: duas cúspides (vestibular e lingual/palatina) numa coroa mais larga que a dos caninos, mas ainda menor que a dos molares.',
    procedimentos: [
      {
        nome: 'Restauração',
        descricao:
          'Os sulcos entre as duas cúspides retêm placa e são um sítio comum de cárie oclusal, tratada com resina composta.',
        duracao: '30–45 min por dente',
      },
      {
        nome: 'Tratamento de canal',
        descricao:
          'Geralmente 1 a 2 canais (o segundo pré-molar inferior costuma ter só um; o primeiro pré-molar superior frequentemente tem dois) — endodontia de complexidade intermediária.',
        duracao: '1–2 sessões de ~60–75 min',
      },
      {
        nome: 'Extração para tratamento ortodôntico',
        descricao:
          'Quando falta espaço na arcada pra alinhar os demais dentes, o pré-molar é o mais comumente escolhido pra extração planejada, por ocupar posição intermediária sem comprometer a estética frontal nem a função mastigatória principal dos molares.',
        duracao: '20–30 min por dente',
      },
    ],
  },
  molar: {
    tipo: 'molar',
    titulo: 'Molares — trituram',
    funcao:
      'Coroa larga, múltiplas cúspides e sulcos profundos: a superfície de trabalho principal da mastigação, onde o alimento é efetivamente moído antes de ser engolido. Têm 2 a 3 raízes, o que torna a anatomia do canal mais complexa que a dos dentes anteriores.',
    procedimentos: [
      {
        nome: 'Restauração extensa',
        descricao:
          'A área de maior contato oclusal e sulcos profundos concentra a maioria das cáries por acúmulo de placa — restaurações em molar tendem a ser maiores que nos demais grupos.',
        duracao: '45–75 min por dente',
      },
      {
        nome: 'Tratamento de canal',
        descricao:
          'Com 2 a 4 canais por dente (o primeiro molar inferior costuma ter 3, o superior costuma ter 3 raízes), é a endodontia mais demorada da arcada.',
        duracao: '2 sessões de ~90 min',
      },
      {
        nome: 'Coroa ou prótese',
        descricao:
          'Depois de canal ou fratura extensa, o molar costuma precisar de cobertura total pra resistir à carga mastigatória mais alta que recebe.',
        duracao: '2 sessões (preparo + cimentação)',
      },
      {
        nome: 'Limpeza e profilaxia',
        descricao:
          'Os sulcos oclusais profundos do molar são o alvo típico da aplicação de selante em pacientes jovens, prevenindo a cárie antes que ela comece.',
        duracao: '30–45 min (arcada completa)',
      },
    ],
  },
  'terceiro-molar': {
    tipo: 'terceiro-molar',
    titulo: 'Terceiros molares — os sisos',
    funcao:
      'Últimos a erupcionar, tipicamente entre os 17 e os 25 anos — daí o apelido popular. A arcada humana moderna raramente tem espaço suficiente pra acomodá-los corretamente, o que faz da impactação (dente que não irrompe na posição correta) um achado comum, não uma exceção.',
    procedimentos: [
      {
        nome: 'Avaliação radiográfica',
        descricao:
          'Radiografia panorâmica acompanha o posicionamento do siso antes de qualquer decisão — nem todo terceiro molar precisa ser removido; alguns erupcionam de forma funcional e assintomática.',
        duracao: 'consulta de avaliação: ~30 min',
      },
      {
        nome: 'Extração',
        descricao:
          'Quando impactado ou causando dor, infecção recorrente ou pressão sobre o segundo molar vizinho, a extração costuma ser cirúrgica (envolve remoção de osso ou secção do dente), diferente da extração simples de um dente já erupcionado.',
        duracao: '30–60 min por dente, cirúrgica quando impactado',
      },
      {
        nome: 'Acompanhamento pós-eruptivo',
        descricao:
          'Sisos parcialmente erupcionados formam um espaço (capuz gengival) de difícil higienização, propenso a inflamação (pericoronarite) — acompanhamento e higiene reforçada evitam a maioria dos episódios agudos.',
        duracao: 'retorno semestral',
      },
    ],
  },
}
