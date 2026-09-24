// Cria um site novo a partir de um template e de um briefing (ver docs/gerador.md).
// Node puro, sem dependências. Não faz deploy, push nem commit.
//   npm run new-site
//   npm run new-site -- --template restaurante --project meu-bistro --brand "Bistrô Aurora" \
//       --description "..." [--worker meu-bistro] [--whatsapp "11 91234-5678"] [--instalar] [--com-deps]
//   npm run new-site -- --briefing briefing.json   (modelo: scripts/briefing.exemplo.json)
// Sem campos de contato/identidade extras, o comportamento é o da versão anterior.
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import { crc32, deflateSync } from 'node:zlib'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const templates = JSON.parse(readFileSync(join(raiz, 'scripts', 'templates.json'), 'utf8'))
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/
const RESERVADOS = new Set(['docs', 'scripts', 'madolio', 'node_modules', 'leads'])

const falha = (msg) => {
  console.error(`\nErro: ${msg}\nNada foi criado.`)
  process.exit(1)
}

// --- Argumentos e briefing -------------------------------------------------
// Precedência de cada campo: flag > arquivo --briefing > pergunta (só no modo interativo).
const args = process.argv.slice(2)
const FLAGS_BOOL = ['instalar', 'com-deps']
const FLAGS_VALOR = [
  'template', 'project', 'brand', 'description', 'worker', 'briefing',
  'descriptor', 'tagline', 'initial', 'title', 'seo-description', 'url',
  'whatsapp', 'wa-message', 'phone', 'email', 'instagram', 'address1', 'address2', 'zip', 'horario',
]
for (const a of args.filter((x) => x.startsWith('--'))) {
  if (![...FLAGS_BOOL, ...FLAGS_VALOR].includes(a.slice(2))) falha(`opção desconhecida: ${a}.`)
}
const flag = (nome) => args.includes(`--${nome}`)
const valorFlag = (nome) => {
  const i = args.indexOf(`--${nome}`)
  return i >= 0 ? args[i + 1] : undefined
}

/** Formato do briefing.json: seção → campo → nome interno (o mesmo das flags). */
const ESQUEMA = {
  identidade: { marca: 'brand', inicial: 'initial', descritor: 'descriptor', frase: 'tagline', descricao: 'description' },
  contato: {
    whatsapp: 'whatsapp',
    mensagemWhatsapp: 'wa-message',
    telefone: 'phone',
    email: 'email',
    instagram: 'instagram',
    endereco: { linha1: 'address1', linha2: 'address2', cep: 'zip' },
    horarios: 'hours',
  },
  seo: { titulo: 'title', descricao: 'seo-description', url: 'url' },
}

function horariosDoBriefing(v, rota) {
  if (!Array.isArray(v)) falha(`briefing: "${rota}" precisa ser uma lista de { "dias": "...", "horario": "..." }.`)
  return v.map((h, i) => {
    if (!h || typeof h.dias !== 'string' || typeof h.horario !== 'string') falha(`briefing: "${rota}[${i}]" precisa ter "dias" e "horario" (texto).`)
    return { days: h.dias.trim(), time: h.horario.trim() }
  })
}

function lerBriefing(arq) {
  let json
  try {
    json = JSON.parse(readFileSync(resolve(arq), 'utf8'))
  } catch (e) {
    falha(`não consegui ler o briefing "${arq}": ${e.message}`)
  }
  const eObjeto = (v) => v && typeof v === 'object' && !Array.isArray(v)
  if (!eObjeto(json)) falha('briefing: a raiz precisa ser um objeto.')
  const plano = {}
  const percorrer = (obj, esquema, caminho) => {
    if (!eObjeto(obj)) falha(`briefing: "${caminho}" precisa ser um objeto.`)
    for (const [k, v] of Object.entries(obj)) {
      const rota = `${caminho}.${k}`
      const destino = esquema[k]
      if (destino === undefined) {
        falha(`briefing: o campo "${rota}" não existe. Nenhum template atual tem esse campo (não há "nome curto", por exemplo: só "marca" e "inicial").`)
      }
      if (typeof destino === 'object') percorrer(v, destino, rota)
      else if (destino === 'hours') plano.hours = horariosDoBriefing(v, rota)
      else if (typeof v !== 'string') falha(`briefing: "${rota}" precisa ser texto.`)
      else plano[destino] = v.trim()
    }
  }
  const { template: _t, projeto: _p, worker: _w, ...secoes } = json
  for (const [k, destino] of [['template', 'template'], ['projeto', 'project'], ['worker', 'worker']]) {
    const v = json[k]
    if (v === undefined) continue
    if (typeof v !== 'string') falha(`briefing: "${k}" precisa ser texto.`)
    plano[destino] = v.trim()
  }
  for (const k of Object.keys(secoes)) {
    if (!ESQUEMA[k]) falha(`briefing: a seção "${k}" não existe. Use template, projeto, worker, identidade, contato, seo.`)
    percorrer(secoes[k], ESQUEMA[k], k)
  }
  return plano
}

const arqBriefing = valorFlag('briefing')
if (flag('briefing') && !arqBriefing) falha('--briefing precisa do caminho de um arquivo JSON.')
const briefing = arqBriefing ? lerBriefing(arqBriefing) : {}

const valor = (nome) => valorFlag(nome) ?? briefing[nome]
/** --horario "Terça a sábado=10h às 19h" (repetível); substitui os horários do briefing. */
const horariosDados = () => {
  const dosFlags = args.flatMap((a, i) => (a === '--horario' ? [args[i + 1] ?? ''] : []))
  if (!dosFlags.length) return briefing.hours
  return dosFlags.map((t) => {
    const [dias, ...resto] = t.split('=')
    return { days: dias.trim(), time: resto.join('=').trim() }
  })
}
// Os campos opcionais só são perguntados no modo totalmente interativo.
const interativo = !flag('project') && !arqBriefing

const rl = createInterface({ input: process.stdin, output: process.stdout })
const perguntar = async (texto) => (await rl.question(texto)).trim()

// --- Validações ------------------------------------------------------------
function validarSlug(v, rotulo, max) {
  if (!v) return `${rotulo} vazio.`
  if (v.length > max) return `${rotulo} passa de ${max} caracteres.`
  if (!SLUG.test(v)) return `${rotulo} inválido: use só letras minúsculas, números e hífens (ex.: meu-restaurante), sem espaços, "/" ou "..".`
  return ''
}

function validarProjeto(nome) {
  const erro = validarSlug(nome, 'Nome do projeto', 40)
  if (erro) return erro
  if (RESERVADOS.has(nome)) return `"${nome}" é nome reservado do monorepo.`
  const destino = resolve(raiz, nome)
  if (dirname(destino) !== raiz) return 'O destino precisa ficar diretamente dentro de sites-feitos/.'
  if (existsSync(destino)) return `sites-feitos/${nome} já existe. O gerador nunca sobrescreve um projeto.`
  return ''
}

function validarTexto(v, rotulo, max) {
  if (!v) return `${rotulo} vazio.`
  if (v.length > max) return `${rotulo} passa de ${max} caracteres.`
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f]/.test(v)) return `${rotulo} tem caracteres de controle.`
  return ''
}

/** Nomes de Worker já usados por projetos do monorepo: reusar um deles faria o deploy sobrescrever o site publicado. */
function workersExistentes() {
  const nomes = new Map()
  for (const e of readdirSync(raiz, { withFileTypes: true })) {
    const arq = join(raiz, e.name, 'wrangler.jsonc')
    if (!e.isDirectory() || !existsSync(arq)) continue
    const n = readFileSync(arq, 'utf8').match(/"name"\s*:\s*"([^"]*)"/)?.[1]
    if (n) nomes.set(n, e.name)
  }
  return nomes
}

/** Obrigatório: flag/briefing (validado, erro encerra) ou pergunta até valer. */
async function obter(nome, texto, validar, padrao) {
  let v = valor(nome)
  if (v !== undefined) {
    const erro = validar(v)
    if (erro) falha(erro)
    return v
  }
  if (padrao && !interativo) return padrao // modo por argumentos: sem perguntas
  for (;;) {
    v = (await perguntar(texto + (padrao ? ` [${padrao}]` : '') + ': ')) || padrao || ''
    const erro = validar(v)
    if (!erro) return v
    console.log(`  ${erro}`)
  }
}

/** Opcional: `undefined` = não informado (o valor do template fica); '' = limpar, se o template aceita. */
async function opcional(nome, texto, validar) {
  const dado = valor(nome)
  if (dado !== undefined) {
    const erro = validar(dado)
    if (erro) falha(erro)
    return dado
  }
  if (!interativo) return undefined
  for (;;) {
    const v = await perguntar(`${texto} (Enter = pular): `)
    if (!v) return undefined
    const erro = validar(v)
    if (!erro) return v
    console.log(`  ${erro}`)
  }
}

// Telefones: aceita "11 91234-5678", "(11) 1234-5678", "+55 11 91234-5678"...
const nacional = (v) => {
  let d = v.replace(/\D/g, '')
  if ((d.length === 12 || d.length === 13) && d.startsWith('55')) d = d.slice(2)
  return d.length === 10 || d.length === 11 ? d : null
}
const formatarFone = (d) => (d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`)

const EMAIL = /^[^\s@'"\\<>]+@[^\s@'"\\<>]+\.[^\s@'"\\<>]{2,}$/
const HANDLE = /^[A-Za-z0-9._]{1,30}$/
const handleInstagram = (v) => {
  const h = v.trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/+$/, '')
  return HANDLE.test(h) ? h : null
}

// --- Escrita estruturada ---------------------------------------------------
const lit = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

/** Troca o literal de string da linha marcada com `// @gen:<tag>`. */
function marcador(texto, tag, novo) {
  const re = new RegExp(`^(.*?:\\s*)'(?:[^'\\\\]|\\\\.)*'(,?\\s*// @gen:${tag})\\s*$`, 'm')
  if (!re.test(texto)) throw new Error(`marcador // @gen:${tag} não encontrado em site.ts`)
  return texto.replace(re, (_, a, b) => `${a}${lit(novo)}${b}`)
}

/** Troca o literal de uma chave de uma linha só (`chave: '...',`). Exige exatamente uma ocorrência. */
function campo(texto, chave, novo) {
  const re = new RegExp(`^(\\s*${chave}:\\s*)'(?:[^'\\\\]|\\\\.)*'(,?[ \\t]*(?://.*)?)$`, 'gm')
  const n = (texto.match(re) ?? []).length
  if (n !== 1) throw new Error(`o campo "${chave}" não foi encontrado em uma linha única de site.ts (${n} ocorrências): este template não suporta esse dado do briefing`)
  return texto.replace(re, (_, a, b) => `${a}${lit(novo)}${b}`)
}

function instagram(texto, handle) {
  const re = /^(\s*instagram:\s*)\{ handle: '(?:[^'\\]|\\.)*', url: '(?:[^'\\]|\\.)*' \}(,?[ \t]*)$/gm
  if ((texto.match(re) ?? []).length !== 1) throw new Error('a linha "instagram: { handle, url }" não foi encontrada em site.ts')
  const novo = handle ? `{ handle: ${lit('@' + handle)}, url: ${lit('https://instagram.com/' + handle)} }` : `{ handle: '', url: '' }`
  return texto.replace(re, (_, a, b) => `${a}${novo}${b}`)
}

function horarios(texto, lista) {
  const re = /^(\s*)hours:\s*\[\n[\s\S]*?\n\1\],/gm
  if ((texto.match(re) ?? []).length !== 1) throw new Error('o bloco "hours: [ ... ]" não foi encontrado em site.ts')
  return texto.replace(re, (_, ind) => `${ind}hours: [\n${lista.map((h) => `${ind}  { days: ${lit(h.days)}, time: ${lit(h.time)} },\n`).join('')}${ind}],`)
}

const lerLiteral = (texto, chave) => texto.match(new RegExp(`${chave}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1]

// --- apple-touch-icon: PNG 180x180 gerado sem dependências ----------------
// Círculo colorido sobre o fundo da marca (sem letra: não há fonte disponível
// sem dependência). Substitua por um ícone real do cliente na entrega.
function appleTouchIcon(bg, fg) {
  const cor = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const [b, f] = [cor(bg), cor(fg)]
  const N = 180
  const linhas = Buffer.alloc(N * (N * 3 + 1))
  for (let y = 0; y < N; y++) {
    linhas[y * (N * 3 + 1)] = 0
    for (let x = 0; x < N; x++) {
      const d = Math.hypot(x + 0.5 - N / 2, y + 0.5 - N / 2)
      const t = Math.min(1, Math.max(0, 62 - d + 0.5)) * Math.min(1, Math.max(0, d - 44 + 0.5)) // anel 44–62 px
      const o = y * (N * 3 + 1) + 1 + x * 3
      for (let c = 0; c < 3; c++) linhas[o + c] = Math.round(b[c] + (f[c] - b[c]) * t)
    }
  }
  const chunk = (tipo, dados) => {
    const corpo = Buffer.concat([Buffer.from(tipo), dados])
    const len = Buffer.alloc(4)
    len.writeUInt32BE(dados.length)
    const sum = Buffer.alloc(4)
    sum.writeUInt32BE(crc32(corpo) >>> 0)
    return Buffer.concat([len, corpo, sum])
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(N, 0)
  ihdr.writeUInt32BE(N, 4)
  ihdr[8] = 8
  ihdr[9] = 2
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(linhas)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function varrer(dir, achado = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.wrangler'].includes(e.name)) continue
    const p = join(dir, e.name)
    e.isDirectory() ? varrer(p, achado) : achado.push(p)
  }
  return achado
}

// --- Fluxo -----------------------------------------------------------------
const ids = Object.keys(templates)
let id = valor('template')
if (id === undefined) {
  console.log('\nTemplates disponíveis:\n')
  ids.forEach((k, i) => console.log(`  ${i + 1}. ${templates[k].name} — ${templates[k].description}`))
  const r = await perguntar('\nEscolha um template (número ou id): ')
  id = ids[Number(r) - 1] ?? r
}
const tpl = templates[id]
if (!Object.hasOwn(templates, id)) falha(`template "${id}" não existe. Disponíveis: ${ids.join(', ')}.`)
const origem = resolve(raiz, tpl.path)
if (dirname(origem) !== raiz || !existsSync(origem)) falha(`pasta do template inválida: ${tpl.path}`)
const aceitaVazio = (chave) => (tpl.vazio ?? []).includes(chave) // phone/email opcionais no template (sebo)

// Obrigatórios
const projeto = await obter('project', 'Nome do projeto (pasta, ex.: meu-restaurante)', validarProjeto)
const marca = await obter('brand', 'Nome da marca', (v) => validarTexto(v, 'Nome da marca', 60))
const descricao = await obter('description', 'Descrição (SEO, ~150 caracteres)', (v) => validarTexto(v, 'Descrição', 300))
const worker = await obter(
  'worker',
  'Nome do Worker',
  (v) => {
    const erro = validarSlug(v, 'Nome do Worker', 63)
    if (erro) return erro
    if (Object.values(templates).some((t) => t.path === v)) return 'O nome do Worker não pode ser o de um template.'
    const em = workersExistentes().get(v)
    return em ? `O Worker "${v}" já é usado por sites-feitos/${em}: o deploy sobrescreveria aquele site.` : ''
  },
  projeto,
)

// Opcionais (briefing): identidade, contato, SEO
const opc = {}
const vazioOu = (validar) => (v) => (v === '' ? '' : validar(v))
opc.descriptor = await opcional('descriptor', 'Descritor (ex.: Cozinha italiana)', (v) => validarTexto(v, 'Descritor', 60))
opc.tagline = await opcional('tagline', 'Frase curta da marca', (v) => validarTexto(v, 'Frase', 120))
opc.initial = await opcional('initial', 'Inicial do logo/favicon', (v) => ([...v].length === 1 && /[\p{L}\p{N}]/u.test(v) ? '' : 'Inicial: exatamente uma letra ou número.'))
opc.whatsapp = await opcional('whatsapp', 'WhatsApp (DDD + número)', (v) => (nacional(v) ? '' : 'WhatsApp inválido: use DDD + número (ex.: 11 91234-5678).'))
opc['wa-message'] = await opcional('wa-message', 'Mensagem inicial do WhatsApp', (v) => validarTexto(v, 'Mensagem do WhatsApp', 200))
opc.phone = await opcional('phone', 'Telefone', (v) => (v === '' ? (aceitaVazio('phone') ? '' : `O template ${id} sempre exibe o telefone: não pode ficar vazio.`) : nacional(v) ? '' : 'Telefone inválido: use DDD + número.'))
opc.email = await opcional('email', 'E-mail', (v) => (v === '' ? (aceitaVazio('email') ? '' : `O template ${id} sempre exibe o e-mail: não pode ficar vazio.`) : EMAIL.test(v) && v.length <= 80 ? '' : 'E-mail inválido.'))
opc.instagram = await opcional('instagram', 'Instagram (@usuario ou URL)', vazioOu((v) => (handleInstagram(v) ? '' : 'Instagram inválido: use @usuario ou https://instagram.com/usuario.')))
opc.address1 = await opcional('address1', 'Endereço (rua e número)', (v) => validarTexto(v, 'Endereço', 80))
opc.address2 = await opcional('address2', 'Bairro · Cidade — UF', (v) => validarTexto(v, 'Bairro/cidade', 80))
opc.zip = await opcional('zip', 'CEP', (v) => (/^\d{5}-?\d{3}$/.test(v) ? '' : 'CEP inválido: use 00000-000.'))

let listaHorarios = horariosDados()
if (listaHorarios !== undefined) {
  const erro = !listaHorarios.length
    ? 'Horários: informe ao menos um (o template sempre exibe o bloco).'
    : listaHorarios.length > 8
      ? 'Horários: no máximo 8 linhas.'
      : listaHorarios.map((h) => validarTexto(h.days, 'Horário (dias)', 60) || validarTexto(h.time, 'Horário (horas)', 60)).find(Boolean)
  if (erro) falha(erro)
} else if (interativo) {
  const lista = []
  console.log('Horários (formato "dias = horas", ex.: Segunda a sexta = 08h às 19h). Enter em branco encerra.')
  while (lista.length < 8) {
    const t = await perguntar('  Horário: ')
    if (!t) break
    const [dias, ...resto] = t.split('=')
    const h = { days: dias.trim(), time: resto.join('=').trim() }
    const erro = validarTexto(h.days, 'Horário (dias)', 60) || validarTexto(h.time, 'Horário (horas)', 60)
    if (erro) console.log(`  ${erro} (use "dias = horas")`)
    else lista.push(h)
  }
  if (lista.length) listaHorarios = lista
}
opc.title = await opcional('title', 'Título SEO (Enter = "marca — descritor")', (v) => validarTexto(v, 'Título SEO', 90))
opc['seo-description'] = await opcional('seo-description', 'Descrição SEO própria (Enter = usar a descrição acima)', (v) => validarTexto(v, 'Descrição SEO', 300))
opc.url = await opcional('url', 'URL pública própria (Enter = https://<worker>.sneakpeek.workers.dev)', (v) => (/^https:\/\/[a-z0-9]+([.-][a-z0-9]+)*\.[a-z]{2,}$/.test(v) ? '' : 'URL inválida: use https://dominio.com.br, sem barra final nem caminho.'))
rl.close()

const destino = resolve(raiz, projeto)

// 0. Pré-voo: calcula o novo site.ts a partir do template ANTES de criar qualquer coisa.
//    Se o template não suporta um campo pedido, sai sem criar nada (nunca gera código inválido).
const feito = [] // ✓ configurado
const pendente = [] // ainda com o valor de demonstração do template
let site
try {
  site = readFileSync(join(origem, 'src', 'config', 'site.ts'), 'utf8').replace(/\r\n/g, '\n')
  const descritor = opc.descriptor ?? lerLiteral(site, 'descriptor') ?? ''
  const inicial = opc.initial?.toUpperCase() ?? marca.normalize('NFD').replace(/[^A-Za-z0-9]/g, '')[0]?.toUpperCase() ?? '•'
  const urlSite = opc.url ?? `https://${worker}.sneakpeek.workers.dev`

  site = marcador(site, 'name', marca)
  site = marcador(site, 'initial', inicial)
  site = marcador(site, 'seo-url', urlSite)
  site = marcador(site, 'seo-title', opc.title ?? (descritor ? `${marca} — ${descritor}` : marca))
  site = marcador(site, 'seo-description', opc['seo-description'] ?? descricao)
  if (tpl.ogImage) site = marcador(site, 'og-image', '') // og:image do template leva a marca dele
  feito.push('identidade configurada', 'SEO configurado')

  if (opc.descriptor !== undefined) site = campo(site, 'descriptor', opc.descriptor)
  else pendente.push(`descritor (mantido do template: "${descritor}")`)
  if (opc.tagline !== undefined) site = campo(site, 'tagline', opc.tagline)
  else pendente.push('frase da marca (tagline)')

  if (opc.whatsapp !== undefined) {
    const d = nacional(opc.whatsapp)
    site = campo(site, 'whatsapp', `55${d}`)
    site = campo(site, 'whatsappLabel', formatarFone(d))
    feito.push('WhatsApp configurado')
  } else pendente.push('WhatsApp')
  if (opc['wa-message'] !== undefined) site = campo(site, 'whatsappMessage', opc['wa-message'])

  if (opc.phone !== undefined) {
    site = campo(site, 'phone', opc.phone === '' ? '' : formatarFone(nacional(opc.phone)))
    feito.push(opc.phone === '' ? 'telefone removido' : 'telefone configurado')
  } else if (opc.whatsapp !== undefined && !aceitaVazio('phone')) {
    // O template sempre exibe o telefone: sem um número informado, usa o do WhatsApp em vez de deixar (00) 0000-0000.
    site = campo(site, 'phone', formatarFone(nacional(opc.whatsapp)))
    feito.push('telefone = WhatsApp (o template exige telefone; informe outro se houver)')
  } else if (!aceitaVazio('phone')) pendente.push('telefone')

  if (opc.email !== undefined) {
    site = campo(site, 'email', opc.email)
    feito.push(opc.email === '' ? 'e-mail removido' : 'e-mail configurado')
  } else pendente.push('e-mail (mantido o de exemplo)')

  if (opc.instagram !== undefined) {
    site = instagram(site, opc.instagram === '' ? '' : handleInstagram(opc.instagram))
    feito.push(opc.instagram === '' ? 'Instagram removido do rodapé' : 'Instagram configurado')
  } else pendente.push('Instagram (mantido o de exemplo)')

  if (opc.address1 !== undefined) site = campo(site, 'line1', opc.address1)
  if (opc.address2 !== undefined) site = campo(site, 'line2', opc.address2)
  if (opc.zip !== undefined) site = campo(site, 'zip', opc.zip.replace(/^(\d{5})-?(\d{3})$/, '$1-$2'))
  if (opc.address1 !== undefined || opc.address2 !== undefined || opc.zip !== undefined) feito.push('endereço configurado')
  for (const [k, rotulo] of [['address1', 'endereço (rua e número)'], ['address2', 'bairro · cidade — UF'], ['zip', 'CEP']]) {
    if (opc[k] === undefined) pendente.push(`${rotulo} (mantido o de exemplo)`)
  }

  if (listaHorarios !== undefined) {
    site = horarios(site, listaHorarios)
    feito.push('horários configurados')
  } else pendente.push('horários (mantidos os de exemplo)')
} catch (e) {
  falha(`o template "${id}" não aceita o briefing: ${e.message}.`)
}

console.log(`\nCriando sites-feitos/${projeto} a partir de ${tpl.path}...`)

// 1. Copia (sem build antigo; node_modules só com --com-deps)
const omitir = new Set(tpl.omit.map((p) => resolve(origem, p)))
cpSync(origem, destino, {
  recursive: true,
  errorOnExist: true,
  force: false,
  filter: (src) => {
    const rel = relative(origem, src).split(sep)[0]
    if (rel === 'dist' || rel === '.wrangler') return false
    if (rel === 'node_modules' && !flag('com-deps')) return false
    return !omitir.has(src)
  },
})

// 2. site.ts (calculado no pré-voo)
const arqSite = join(destino, 'src', 'config', 'site.ts')
writeFileSync(arqSite, site)

// 3. Worker, pacote e lockfile (JSON/JSONC estruturado, sem replace global)
const arqWrangler = join(destino, 'wrangler.jsonc')
const wr = readFileSync(arqWrangler, 'utf8')
if ((wr.match(/"name"\s*:/g) ?? []).length !== 1) throw new Error('wrangler.jsonc: esperado exatamente um "name"')
writeFileSync(arqWrangler, wr.replace(/("name"\s*:\s*)"[^"]*"/, `$1"${worker}"`))

for (const arq of ['package.json', 'package-lock.json']) {
  const p = join(destino, arq)
  if (!existsSync(p)) continue
  const j = JSON.parse(readFileSync(p, 'utf8'))
  j.name = projeto
  if (j.packages?.['']) j.packages[''].name = projeto
  writeFileSync(p, JSON.stringify(j, null, 2) + '\n')
}

// 4. apple-touch-icon com as cores do favicon (não herda o ícone do template)
writeFileSync(
  join(destino, 'public', 'apple-touch-icon.png'),
  appleTouchIcon(lerLiteral(site, 'faviconBg'), lerLiteral(site, 'faviconFg')),
)

// 5. README próprio (o do template descreve o template) e o briefing usado
writeFileSync(
  join(destino, 'README.md'),
  `# ${projeto}

Site de **${marca}**, criado por \`npm run new-site\` a partir do template \`${id}\` (${tpl.name}).

Personalização: \`src/config/site.ts\`, \`src/data/conteudo.ts\`, \`src/config/images.ts\` e o bloco \`@theme\` de \`src/index.css\`.
O briefing usado na geração está em \`briefing.json\` (só registro; editar o arquivo não altera o site).
Guia completo do template em \`../${tpl.path}/README.md\` e do gerador em \`../docs/gerador.md\`.

Ainda com conteúdo de demonstração (ver checklist): textos e fotos do template, cores, \`apple-touch-icon.png\` (gerado sem letra)${pendente.length ? ' e os itens pendentes do briefing' : ''}.

\`\`\`bash
npm install
npm run build
npm run deploy   # só quando decidir publicar (Worker: ${worker})
\`\`\`
`,
)

const dados = { template: id, project: projeto, worker, brand: marca, description: descricao, ...Object.fromEntries(Object.entries(opc).filter(([, v]) => v !== undefined)), hours: listaHorarios }
const montar = (esquema) =>
  Object.fromEntries(
    Object.entries(esquema)
      .map(([k, d]) => [k, typeof d === 'object' ? montar(d) : d === 'hours' ? dados.hours?.map((h) => ({ dias: h.days, horario: h.time })) : dados[d]])
      .filter(([, v]) => v !== undefined && !(typeof v === 'object' && !Array.isArray(v) && !Object.keys(v).length)),
  )
writeFileSync(
  join(destino, 'briefing.json'),
  JSON.stringify({ template: id, projeto, worker, ...Object.fromEntries(Object.entries(ESQUEMA).map(([k, e]) => [k, montar(e)])) }, null, 2) + '\n',
)

// 6. Verificações
const essenciais = ['package.json', 'wrangler.jsonc', 'index.html', 'vite.config.ts', 'src/config/site.ts', 'src/config/images.ts', 'src/data/conteudo.ts', 'public/apple-touch-icon.png']
const faltando = essenciais.filter((p) => !existsSync(join(destino, p)))
if (faltando.length) console.error(`Aviso: arquivos essenciais ausentes: ${faltando.join(', ')}`)
const vestigios = varrer(destino).filter((p) => /\.(json|jsonc|ts|tsx|html|css)$/.test(p) && readFileSync(p, 'utf8').includes(tpl.path))
if (vestigios.length) console.error(`Aviso: referência a "${tpl.path}" em: ${vestigios.map((p) => relative(destino, p)).join(', ')}`)
// Os comentários do template citam a marca de demonstração; só conta o que aparece em código ou dados.
const marcaTpl = varrer(join(destino, 'src'))
  .filter((p) => readFileSync(p, 'utf8').split('\n').some((l) => l.includes(tpl.brand) && !/^\s*(\/\/|\/?\*)/.test(l)))
  .map((p) => relative(destino, p))

// Trava: o projeto novo não pode manter o Worker nem o pacote do template (o deploy sobrescreveria o template).
const lerJson = (arq) => JSON.parse(readFileSync(join(destino, arq), 'utf8'))
const conferidos = [
  ['wrangler.jsonc', readFileSync(arqWrangler, 'utf8').match(/"name"\s*:\s*"([^"]*)"/)?.[1], worker],
  ['package.json', lerJson('package.json').name, projeto],
]
if (existsSync(join(destino, 'package-lock.json'))) {
  const lock = lerJson('package-lock.json')
  conferidos.push(['package-lock.json', lock.name, projeto], ['package-lock.json packages[""]', lock.packages?.['']?.name, projeto])
}
const errados = conferidos.filter(([, atual, esperado]) => atual !== esperado || atual === tpl.path)
if (errados.length) {
  console.error(`\nERRO: a identidade do template não foi trocada: ${errados.map(([a, v, e]) => `${a}="${v}" (esperado "${e}")`).join('; ')}.`)
  console.error(`NÃO faça deploy de sites-feitos/${projeto}: apague a pasta e gere de novo.`)
  process.exit(3)
}

// 7. Instalação e build: só com --instalar (ou --com-deps, que já traz node_modules)
let buildOk = null
const npm = (...a) => spawnSync('npm', a, { cwd: destino, stdio: 'inherit', shell: true }).status === 0
if (flag('instalar') && !existsSync(join(destino, 'node_modules'))) {
  console.log('\nExecutando npm install...\n')
  if (!npm('install')) buildOk = false
}
if (buildOk === null && existsSync(join(destino, 'node_modules'))) {
  console.log('\nExecutando npm run build...\n')
  buildOk = npm('run', 'build')
}

console.log(`\n✓ projeto criado: sites-feitos/${projeto}  (Worker: ${worker})`)
for (const f of feito) console.log(`✓ ${f}`)
if (buildOk === true) console.log('✓ build: OK')
if (buildOk === false) console.log('✗ build FALHOU. O projeto foi mantido; corrija o erro acima e rode `npm run build` na pasta.')
if (buildOk === null) console.log(`\nPróximos passos:\n  cd ${projeto}\n  npm install\n  npm run build`)

console.log(`\nAinda é conteúdo de demonstração (troque à mão):
  - src/data/conteudo.ts: todos os textos${marcaTpl.length ? ` (o nome "${tpl.brand}" aparece em: ${marcaTpl.join(', ')})` : ''}
  - src/config/images.ts e public/: fotos do template (Pexels, demonstração)
  - src/index.css (@theme): cores e fontes; site.ts: cores do favicon
  - public/apple-touch-icon.png: gerado só com as cores; troque pelo ícone real`)
if (pendente.length) console.log(`Do briefing, não informado (fica o valor de exemplo do template):\n${pendente.map((p) => `  - ${p}`).join('\n')}`)
console.log('Nada foi enviado: sem commit, sem push, sem deploy.')
process.exit(buildOk === false ? 2 : 0)
