# Guia de uso: criar template, criar site de cliente, publicar

Escrito para uso real. Os comandos assumem a pasta raiz do monorepo (`sites-feitos/`). O `clinica-template` é a referência; os passos valem para qualquer template que siga `arquitetura-de-templates.md`.

## Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Nome, contatos, redes, endereço, horários, SEO, menu | `src/config/site.ts` |
| Textos das seções, serviços, equipe, FAQ, CTAs, rótulos | `src/data/conteudo.ts` |
| Imagens (URL ou arquivo) e o `alt` de cada uma | `src/config/images.ts`; arquivos em `public/` |
| Cores e fontes | `src/index.css` (`@theme`) + link do Google Fonts no `index.html` |
| Favicon, `robots.txt`, `sitemap.xml`, `<head>` | **gerados** no build a partir de `site.ts` (não editar) |
| Ícone do iOS | `public/apple-touch-icon.png` (180×180, manual) |
| Nome do Worker | `wrangler.jsonc` → `name` (e `package.json` → `name`) |

## A. Criar um site de cliente a partir de um template

1. **Copie a pasta** do template (sem `node_modules`, `dist`, `.wrangler`):
   ```bash
   cp -r clinica-template nome-do-cliente
   rm -rf nome-do-cliente/node_modules nome-do-cliente/dist nome-do-cliente/.wrangler
   ```
2. **Renomeie**: `name` em `wrangler.jsonc` e em `package.json` (minúsculas e hífen; vira `https://<name>.sneakpeek.workers.dev`).
3. **Preencha `site.ts`**: nome, WhatsApp (formato `5511999999999`), telefone, e-mail, redes, `seo.url` (o endereço final), `seo.title`, `seo.description`. Endereço e horário: **só se o cliente informou**; senão apague o bloco. Nunca invente.
4. **Preencha `conteudo.ts`**: serviços, equipe, FAQ, CTAs. Depoimentos: só relatos reais e autorizados; se não houver, remova a seção de `App.tsx` e do `nav`.
5. **Cores e fontes** em `index.css`. Mantenha contraste ≥ 4,5:1 para texto (o comentário do `@theme` indica os pares). Atualize `seo.themeColor` (= cor de fundo).
6. **Imagens**: coloque as do cliente em `public/fotos/` e aponte em `images.ts`, com `alt` descritivo. Troque as fotos de banco de imagens.
7. **Limpe as marcas de demonstração**: `footerNote: ''`, e-mails e telefones de exemplo, registro profissional preenchido ou removido.
8. **Ícone do iOS**: substitua `public/apple-touch-icon.png`.
9. Rode a checklist do README do template (resumo no fim deste guia).

## B. Criar um template novo (novo nicho)

1. Copie o `clinica-template` para `<nicho>-template/`. Mantenha `config/`, `data/`, `vite.config.ts` (plugin de marca), `ui.tsx` e o esqueleto de `App.tsx`.
2. Troque **conteúdo e seções** pelas do nicho (por exemplo, `Cardapio` no lugar de `Servicos`). O padrão é: *uma seção = um componente que lê um bloco de `conteudo.ts`*.
3. Escolha o tema em `index.css`, com o papel de cada cor comentado. Defina uma assinatura visual própria; não reaproveite o visual do template de origem.
4. Dependências extras (gsap, motion, three) só se o nicho pedir, e justificadas no README do template.
5. Escreva o README do template com a tabela "o que trocar e onde" e a checklist de entrega (modelo: `clinica-template/README.md`).
6. Adicione uma linha em `docs/inventario-e-catalogo.md`.

## C. Testar

```bash
cd nome-do-cliente
npm install
npm run dev          # desenvolvimento
npm run build        # tsc -b + vite build; deve terminar sem erro
npm run lint         # oxlint (se o template tiver)
```

Depois do build, confira em `dist/`: `index.html` (título, canonical, `og:url` com o domínio final), `robots.txt`, `sitemap.xml` e `favicon.svg`.

Teste visual em **320, 375, 390, 768, 1024 e 1280 px** (Playwright ou DevTools):

- sem barra de rolagem horizontal;
- nenhuma imagem quebrada;
- console sem erros;
- menu móvel abre, fecha e mostra o CTA;
- links de WhatsApp, telefone e e-mail abrem certo;
- conteúdo visível sem depender de rolagem/animação.

## D. Publicar

O deploy é sempre **por projeto** e só quando você decidir:

```bash
npx wrangler whoami   # confirme a conta esperada (subdomínio sneakpeek)
npm run deploy        # build + wrangler deploy
```

- Nunca rode deploy na raiz do monorepo nem em outra pasta sem querer.
- Não use o subdomínio antigo `fenoninho-max.workers.dev`.
- Depois de publicar, abra a URL, recarregue sem cache e repita o teste de 320/390/1280. Um certificado novo pode levar alguns minutos.
- Domínio próprio do cliente: configure no painel da Cloudflare e atualize `seo.url` antes do próximo build.

## E. Checklist de entrega (resumo)

```text
[ ] Nome, logo, favicon, apple-touch-icon
[ ] Cores e fontes
[ ] Fotos do cliente (com alt)
[ ] Serviços, equipe, FAQ
[ ] Depoimentos reais ou seção removida
[ ] WhatsApp, telefone, e-mail, redes
[ ] Endereço e horários só se informados
[ ] seo.url, title, description
[ ] dist/robots.txt e dist/sitemap.xml com o domínio certo
[ ] footerNote de demonstração removido
[ ] Sem texto de exemplo ("Lorem", "exemplo", "0000") no site
[ ] Build sem erro
[ ] 320/375/390/768/1024/1280 sem overflow e sem erros no console
```

## Armadilhas já vividas

- `canonical` e `og:url` apontando para outro site (por isso o SEO é gerado a partir de `site.ts`).
- `og:image` apontando para arquivo que não existia (`bruma`): só declare `og:image` se o arquivo estiver em `public/`.
- Conteúdo que nasce invisível e depende de JS para aparecer.
- `npm uninstall` reordena o `package.json`: confira o `git diff` antes de commitar.
- Build em pasta temporária (`vite build --outDir <tmp>`) para não sobrescrever o `dist` de outra sessão.
