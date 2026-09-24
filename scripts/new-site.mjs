// Cria um site novo a partir de um template (ver docs/gerador.md).
// Node puro, sem dependências. Não faz deploy, push nem commit.
//   npm run new-site
//   npm run new-site -- --template restaurante --project meu-bistro --brand "Bistrô Aurora" \
//       --description "..." [--worker meu-bistro] [--sem-deps] [--sem-build]
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

// --- Argumentos ------------------------------------------------------------
const args = process.argv.slice(2)
const flag = (nome) => args.includes(`--${nome}`)
const valor = (nome) => {
  const i = args.indexOf(`--${nome}`)
  return i >= 0 ? args[i + 1] : undefined
}

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

async function obter(nome, texto, validar, padrao) {
  let v = valor(nome)
  if (v !== undefined) {
    const erro = validar(v)
    if (erro) falha(erro)
    return v
  }
  if (padrao && flag('project')) return padrao // modo por argumentos: sem perguntas
  for (;;) {
    v = (await perguntar(texto + (padrao ? ` [${padrao}]` : '') + ': ')) || padrao || ''
    const erro = validar(v)
    if (!erro) return v
    console.log(`  ${erro}`)
  }
}

// --- Escrita estruturada ---------------------------------------------------
const lit = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

/** Troca o literal de string da linha marcada com `// @gen:<tag>`. */
function marcador(texto, tag, novo) {
  const re = new RegExp(`^(.*?:\\s*)'(?:[^'\\\\]|\\\\.)*'(,?\\s*// @gen:${tag})\\s*$`, 'm')
  if (!re.test(texto)) throw new Error(`marcador // @gen:${tag} não encontrado em site.ts`)
  return texto.replace(re, (_, a, b) => `${a}${lit(novo)}${b}`)
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

const projeto = await obter('project', 'Nome do projeto (pasta, ex.: meu-restaurante)', validarProjeto)
const marca = await obter('brand', 'Nome da marca', (v) => validarTexto(v, 'Nome da marca', 60))
const descricao = await obter('description', 'Descrição (SEO, ~150 caracteres)', (v) => validarTexto(v, 'Descrição', 300))
const worker = await obter(
  'worker',
  'Nome do Worker',
  (v) => validarSlug(v, 'Nome do Worker', 63) || (Object.values(templates).some((t) => t.path === v) ? 'O nome do Worker não pode ser o de um template.' : ''),
  projeto,
)
rl.close()

const destino = resolve(raiz, projeto)
console.log(`\nCriando sites-feitos/${projeto} a partir de ${tpl.path}...`)

// 1. Copia (sem build antigo; node_modules só se não houver --sem-deps)
const omitir = new Set(tpl.omit.map((p) => resolve(origem, p)))
cpSync(origem, destino, {
  recursive: true,
  errorOnExist: true,
  force: false,
  filter: (src) => {
    const rel = relative(origem, src).split(sep)[0]
    if (rel === 'dist' || rel === '.wrangler') return false
    if (rel === 'node_modules' && flag('sem-deps')) return false
    return !omitir.has(src)
  },
})

// 2. site.ts: só as linhas marcadas com @gen
const arqSite = join(destino, 'src', 'config', 'site.ts')
let site = readFileSync(arqSite, 'utf8')
const descritor = lerLiteral(site, 'descriptor') ?? ''
const inicial = marca.normalize('NFD').replace(/[^A-Za-z0-9]/g, '')[0]?.toUpperCase() ?? '•'
site = marcador(site, 'name', marca)
site = marcador(site, 'initial', inicial)
site = marcador(site, 'seo-url', `https://${worker}.sneakpeek.workers.dev`)
site = marcador(site, 'seo-title', descritor ? `${marca} — ${descritor}` : marca)
site = marcador(site, 'seo-description', descricao)
if (tpl.ogImage) site = marcador(site, 'og-image', '') // og:image do template leva a marca dele
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

// 5. README próprio (o do template descreve o template)
writeFileSync(
  join(destino, 'README.md'),
  `# ${projeto}

Site de **${marca}**, criado por \`npm run new-site\` a partir do template \`${id}\` (${tpl.name}).

Personalização: \`src/config/site.ts\`, \`src/data/conteudo.ts\`, \`src/config/images.ts\` e o bloco \`@theme\` de \`src/index.css\`.
Guia completo do template em \`../${tpl.path}/README.md\` e do gerador em \`../docs/gerador.md\`.

Ainda com conteúdo de demonstração (ver checklist): textos e fotos do template, cores, contatos, \`apple-touch-icon.png\` (gerado sem letra).

\`\`\`bash
npm install   # se o projeto foi criado com --sem-deps
npm run build
npm run deploy   # só quando decidir publicar (Worker: ${worker})
\`\`\`
`,
)

// 6. Verificações
const essenciais = ['package.json', 'wrangler.jsonc', 'index.html', 'vite.config.ts', 'src/config/site.ts', 'src/config/images.ts', 'src/data/conteudo.ts', 'public/apple-touch-icon.png']
const faltando = essenciais.filter((p) => !existsSync(join(destino, p)))
if (faltando.length) console.error(`Aviso: arquivos essenciais ausentes: ${faltando.join(', ')}`)
const vestigios = varrer(destino).filter((p) => /\.(json|jsonc|ts|tsx|html|css)$/.test(p) && readFileSync(p, 'utf8').includes(tpl.path))
if (vestigios.length) console.error(`Aviso: referência a "${tpl.path}" em: ${vestigios.map((p) => relative(destino, p)).join(', ')}`)
const marcaTpl = varrer(join(destino, 'src')).filter((p) => readFileSync(p, 'utf8').includes(tpl.brand)).map((p) => relative(destino, p))

// 7. Build
let buildOk = null
if (!flag('sem-build')) {
  if (!existsSync(join(destino, 'node_modules'))) {
    console.log('\nSem node_modules: build pulado. Rode `npm install` e `npm run build` no projeto.')
  } else {
    console.log('\nExecutando npm run build...\n')
    buildOk = spawnSync('npm', ['run', 'build'], { cwd: destino, stdio: 'inherit', shell: true }).status === 0
  }
}

console.log(`\nProjeto criado: sites-feitos/${projeto}  (Worker: ${worker})`)
if (buildOk === true) console.log('Build: OK.')
if (buildOk === false) console.log('Build: FALHOU. O projeto foi mantido; corrija o erro acima e rode `npm run build` na pasta.')
console.log(`\nAinda é conteúdo de demonstração (troque à mão):
  - src/data/conteudo.ts: todos os textos${marcaTpl.length ? ` (o nome "${tpl.brand}" aparece em: ${marcaTpl.join(', ')})` : ''}
  - src/config/images.ts e public/: fotos do template (Pexels, demonstração)
  - src/config/site.ts: contatos, endereço, horários, redes, descritor, cores do favicon
  - src/index.css (@theme): cores e fontes
  - public/apple-touch-icon.png: gerado só com as cores; troque pelo ícone real
Nada foi enviado: sem commit, sem push, sem deploy.`)
process.exit(buildOk === false ? 2 : 0)
