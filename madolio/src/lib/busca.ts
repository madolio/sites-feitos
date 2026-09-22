import { type Projeto } from '../data/projetos'

// Busca por nicho/intenção: o visitante pesquisa um conceito amplo ("carro",
// "clínica", "pet") e precisa achar os projetos relacionados, não só os que
// contêm a palavra exata no nome. Os dados de cada projeto (`tag`,
// `category`, `keywords`, `description`) já carregam essa relação — aqui só
// normalizamos, comparamos por token e damos peso maior pra correspondências
// mais fortes. Nada de `if (query === 'carro')`: um termo novo só precisa
// virar `keywords` no projeto certo em projetos.ts.

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function tokenizar(texto: string): string[] {
  return normalizar(texto)
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

// Normalização de plural em português é irregular, mas as regras mais comuns
// cobrem a maioria dos casos que importam pra busca (clínica/clínicas,
// animal/animais, oficina/oficinas...).
function singularizar(palavra: string): string {
  if (palavra.length > 4 && palavra.endsWith('oes')) return palavra.slice(0, -3) + 'ao'
  if (palavra.length > 4 && palavra.endsWith('ais')) return palavra.slice(0, -3) + 'al'
  if (palavra.length > 4 && palavra.endsWith('eis')) return palavra.slice(0, -3) + 'el'
  if (palavra.length > 3 && palavra.endsWith('s')) return palavra.slice(0, -1)
  return palavra
}

function tokensNormalizados(texto: string): string[] {
  return tokenizar(texto).map(singularizar)
}

function tokensDeQuery(query: string): string[] {
  const brutos = tokenizar(query)
  const expandido = new Set<string>()
  for (const t of brutos) {
    expandido.add(t)
    expandido.add(singularizar(t))
  }
  return Array.from(expandido).filter((t) => t.length > 1)
}

// Pesos aproximam a ordem pedida: nicho/categoria exata > tag/keyword >
// nome > correspondência parcial > descrição.
const PESO_TAG = 40
const PESO_CATEGORIA_EXATA = 35
const PESO_KEYWORD = 30
const PESO_NOME_EXATO = 25
const PESO_CATEGORIA_PARCIAL = 15
const PESO_NOME_PARCIAL = 12
const PESO_DESCRICAO_EXATA = 10

// Abaixo disso o match é ruído demais (ex.: uma palavra solta perdida no meio
// da descrição, sem nenhuma relação com tag/categoria/keywords do projeto)
// pra valer a pena mostrar — evita resultado forçado. Fica acima do peso de
// uma correspondência isolada na descrição (10), que sozinha não basta.
const SCORE_MINIMO = 12

type CamposProjeto = {
  nome: string[]
  nomeTexto: string
  categoria: string[]
  categoriaTexto: string
  tag: string[]
  keywords: string[]
  descricao: string[]
}

function indexarProjeto(p: Projeto): CamposProjeto {
  return {
    nome: tokensNormalizados(p.name),
    nomeTexto: normalizar(p.name),
    categoria: tokensNormalizados(p.category),
    categoriaTexto: normalizar(p.category),
    tag: tokensNormalizados(p.tag),
    keywords: (p.keywords ?? []).flatMap((k) => tokensNormalizados(k)),
    descricao: tokensNormalizados(p.description),
  }
}

function scoreToken(token: string, campos: CamposProjeto): number {
  let score = 0
  if (campos.tag.includes(token)) score += PESO_TAG

  if (campos.categoria.includes(token)) score += PESO_CATEGORIA_EXATA
  else if (campos.categoriaTexto.includes(token)) score += PESO_CATEGORIA_PARCIAL

  if (campos.keywords.includes(token)) score += PESO_KEYWORD

  if (campos.nome.includes(token)) score += PESO_NOME_EXATO
  else if (campos.nomeTexto.includes(token)) score += PESO_NOME_PARCIAL

  if (campos.descricao.includes(token)) score += PESO_DESCRICAO_EXATA

  return score
}

/**
 * Busca projetos por nicho/intenção, ordenados por relevância (mais forte
 * primeiro). Query vazia devolve a lista original, na ordem original.
 */
export function buscarProjetos(query: string, lista: Projeto[]): Projeto[] {
  const termo = query.trim()
  if (!termo) return lista

  const queryTokens = tokensDeQuery(termo)
  if (queryTokens.length === 0) return lista

  const pontuados = lista
    .map((projeto) => {
      const campos = indexarProjeto(projeto)
      const score = queryTokens.reduce((soma, token) => soma + scoreToken(token, campos), 0)
      return { projeto, score }
    })
    .filter((r) => r.score >= SCORE_MINIMO)

  pontuados.sort((a, b) => b.score - a.score || a.projeto.name.localeCompare(b.projeto.name, 'pt-BR'))

  return pontuados.map((r) => r.projeto)
}
