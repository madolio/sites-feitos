# Gerador `npm run new-site`

Cria um site novo copiando um template. Node puro, sem dependências novas; roda na raiz de `sites-feitos/`. **Não faz deploy, push nem commit** e não altera nenhum projeto existente.

## Como usar

```bash
npm run new-site
```

Pergunta: template → nome do projeto (pasta) → nome da marca → descrição (SEO) → nome do Worker (Enter = igual ao projeto). Também aceita argumentos (sem perguntas):

```bash
npm run new-site -- --template restaurante --project meu-bistro --brand "Bistrô Aurora" \
  --description "Bistrô Aurora: cozinha de bairro." [--worker meu-bistro] [--instalar] [--com-deps]
```

Por padrão o projeto nasce **sem `node_modules`** (2 MB em vez de ~285 MB) e o gerador não instala nada: rode `cd <projeto> && npm install && npm run build`. `--instalar` faz o `npm install` e o build por você; `--com-deps` copia o `node_modules` do template (só para uso offline/rápido).

## Templates (`scripts/templates.json`)

| id | Pasta | Categoria |
| --- | --- | --- |
| `clinica` | `clinica-template` | saude |
| `restaurante` | `restaurante-template` | gastronomia |
| `academia` | `academia-template` | fitness |
| `sebo` | `sebo-template` | comercio |

Campos por template: `name`, `category`, `path` (pasta dentro de `sites-feitos/`), `description`, `brand` (nome de demonstração, usado só para avisar o que sobrou), `ogImage` (o template tem `og:image` próprio), `omit` (arquivos que não são copiados, por carregarem a marca do template).

## O que o gerador faz

1. Valida tudo **antes** de criar qualquer coisa.
2. Copia o template (sem `dist`, `.wrangler`; sem `node_modules`).
3. Em `src/config/site.ts`, troca **só as linhas marcadas** com `// @gen:*`: `name`, `initial` (1ª letra da marca), `seo-url` (`https://<worker>.sneakpeek.workers.dev`), `seo-title` (`marca — descritor`), `seo-description` e, se o template tem, `og-image` (limpo, pois a imagem de compartilhamento do template leva a marca dele). Falha alto se um marcador sumir.
4. `name` em `wrangler.jsonc` (Worker), `package.json` e `package-lock.json`, via JSON/regex ancorada, sem replace global.
5. Gera `public/apple-touch-icon.png` (180×180) com as cores do favicon.
6. Escreve um `README.md` próprio no projeto.
7. **Trava de identidade:** confere Worker, `package.json` e as duas ocorrências do `package-lock.json`; se algum ainda tiver o nome do template (ou não for o esperado), sai com código 3 e manda não fazer deploy.
8. Confere arquivos essenciais e avisa se sobrou referência ao nome do template (só conta código e dados, não os comentários do template). Com `--instalar`, roda `npm install` e `npm run build` (erro: o projeto é mantido).

## Segurança

Nome do projeto e do Worker: `^[a-z0-9]+(-[a-z0-9]+)*$` (sem espaço, `/`, `\`, `..`, caminho absoluto ou maiúscula); nomes reservados (`docs`, `scripts`, `madolio`, `node_modules`, `leads`); o destino precisa ser filho direto de `sites-feitos/` (checado após `resolve`); destino existente é **recusado** (a cópia ainda usa `errorOnExist`); template inexistente é recusado; Worker não pode ter nome de template. Não apaga nada, sem `git`. O Worker também não pode ser o de um template nem o de qualquer Worker já existente no monorepo (lido de `*/wrangler.jsonc`), porque o deploy sobrescreveria aquele site.

## O que cada template deixa configurável (além do comum)

- **clinica:** serviços, método, equipe, relatos, FAQ.
- **restaurante:** destaques, cardápio por categorias (preço e marcas opcionais), história, equipe, ambiente, reserva.
- **academia:** modalidades, planos (destaque e preço opcionais), estrutura, etapas do método, professores (registro opcional), aula experimental. Cores próprias (grafite e lima, com seção de planos clara).
- **sebo:** acervo de livros (preço opcional), ficha em destaque, etapas de avaliação de acervo, FAQ, contato com extras; as "orelhas" de navegação vêm de `nav`. Cores próprias (pano verde e papel, com `accent` e `accent-text` separados). Sem fotos.

Só `site.ts` (nome, inicial, URL, título, descrição, `og:image`) é comum e marcado com `@gen`; o resto é conteúdo do nicho e fica no template.

## Convenção de cor

Não foi padronizada: a clínica usa `forest`/`clay`, o restaurante e a academia usam funções (`background`, `accent`...). O gerador **não mexe em cores**; a marca copia a paleta do template e as cores são trocadas à mão no `@theme`. Migração futura possível: adotar as funções semânticas nos dois templates e um único `--color-brand` que o gerador possa trocar.

## Apple touch icon

Gerado com `zlib` do Node (sem biblioteca): fundo `faviconBg` com um anel `faviconFg`. **Sem letra** (não há renderização de fonte sem dependência). Serve para não herdar a marca do template; troque pelo ícone real do cliente.

## Imagens

Preservadas como demonstração (restaurante e academia: `public/demo/`; sebo: só `public/demo/og.jpg`, sem fotos; clínica: URLs do Pexels em `images.ts`). Nada é baixado nem criado. `public/demo/og.jpg` do restaurante, da academia e do sebo não é copiado e `seo.ogImage` fica vazio.

## Limitações (manual depois de gerar)

- Todo `src/data/conteudo.ts` é texto de demonstração (no restaurante cita "Cumaru" na academia "Vértice" e no sebo "Iara Bastos" (a curadora fictícia; o nome "Folha Solta" só aparece em comentários e em `site.ts`); o gerador avisa quais arquivos contêm o nome do template).
- Descritor, contatos, endereço, horários e redes ficam com valores de exemplo em `site.ts`.
- Cores e fontes do template; ícone real; fotos do cliente.
- Comentários de cabeçalho de `site.ts` ainda citam o nome de demonstração.
- O `README.md` gerado aponta para `../<template>/README.md` por design.
- O `npm run dev` pode não funcionar em máquinas sem VC++ Redistributable atualizado (plugin da Cloudflare); `npm run build` funciona.

## Adicionar um template novo

1. Seguir [contrato-de-template.md](contrato-de-template.md): `site.ts`, `conteudo.ts`, `images.ts`, `@theme`, `wrangler.jsonc`.
2. Em `site.ts`, pôr os marcadores `// @gen:name`, `initial`, `seo-url`, `seo-title`, `seo-description` (um literal `'...'` por linha, com vírgula antes do comentário) e `og-image` se houver.
3. Registrar em `scripts/templates.json`.
4. Testar: gerar um projeto descartável, `npm run build`, conferir `dist/`, apagar o descartável.
