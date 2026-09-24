# restaurante-template

Template comercial reutilizável para **restaurantes e gastronomia** (autoral, bistrô, pizzaria, casa de bairro).

**"Cumaru — Cozinha brasileira autoral" é só conteúdo de demonstração.** Nome, textos, pratos, preços, depoimentos, contatos e endereço são fictícios, e as fotos são de banco de imagens (Pexels, licença livre). Tudo isso fica em 4 arquivos de configuração: nenhum componente precisa ser editado para trocar de cliente.

Vite + React 19 + TypeScript + Tailwind v4, publicado como Cloudflare Worker. A única dependência de runtime é o React (sem GSAP, Motion ou 3D).

É o segundo template do monorepo, feito para validar a arquitetura do `clinica-template` em outro nicho. Convenções em [`../docs/arquitetura-de-templates.md`](../docs/arquitetura-de-templates.md).

## Onde personalizar

| Item | Arquivo |
| --- | --- |
| Identidade (nome, descritor, slogan, logo) | `src/config/site.ts` |
| Contatos, endereço, horários, mapa, redes | `src/config/site.ts` |
| SEO (título, descrição, URL, `og:image`, cor do navegador, favicon) | `src/config/site.ts` → `seo` |
| Fontes (link do Google Fonts) | `src/config/site.ts` → `fonts` + `--font-*` em `src/index.css` |
| Menu de navegação | `src/config/site.ts` → `nav` |
| Textos, pratos, cardápio, história, equipe, FAQ, CTAs, rótulos | `src/data/conteudo.ts` |
| Imagens | `src/config/images.ts` (arquivos em `public/`) |
| Cores | `src/index.css` → bloco `@theme` |

Nos títulos, `*palavra*` vira o itálico colorido de destaque.

### O que é gerado sozinho a partir de `site.ts`

No build, o plugin de `vite.config.ts` cria o `<head>` do `index.html` (title, description, canonical, Open Graph, Twitter, theme-color, link das fontes), `robots.txt`, `sitemap.xml` e `favicon.svg` (letra + cores). **Não edite esses arquivos à mão**: mude `site.ts` e rode o build.

### Como o tema funciona

As cores têm **função**, não nome de cor: `background`, `surface`, `foreground`, `muted`, `accent`, `accent-hover`, `accent-foreground`, `border`. Os componentes só usam essas funções (`bg-background`, `text-muted`, `bg-accent`...), então trocar a paleta é trocar 8 valores. O conjunto `inverse-*` alimenta as seções com classe `tema-claro` (o cardápio): elas redefinem as funções de cor por dentro, sem trocar nenhuma classe. Um template escuro vira um cardápio "papel claro" e um template claro vira um cardápio escuro, só mudando os valores. O comentário no início do `@theme` traz os contrastes mínimos (≥ 4,5:1).

## Como criar uma versão para cliente

1. Copie a pasta (sem `node_modules`, `dist`, `.wrangler`) para `nome-do-cliente/`.
2. Troque `name` em `wrangler.jsonc` e `package.json` (é o nome do Worker; vira `https://<name>.sneakpeek.workers.dev`).
3. `src/config/site.ts`: nome, WhatsApp (`5511999999999`), telefone, e-mail, endereço, horários, Instagram, `seo.url`, `title`, `description`, `themeColor` (igual ao `--color-background`) e cores do favicon. **Endereço e horário só se o cliente informou.**
4. `src/index.css`: as cores do `@theme` (as funções descritas acima) e, se trocar de fonte, `fonts` em `site.ts` + `--font-display`/`--font-body`.
5. `src/config/images.ts`: aponte para as fotos do cliente em `public/fotos/` e escreva o `alt` de cada uma.
6. `src/data/conteudo.ts`: hero, apresentação, destaques, cardápio (categorias e pratos), história, equipe, diferenciais, depoimentos, reserva, FAQ.
7. Apague `public/demo/` (fotos e imagem de compartilhamento de demonstração) e substitua `public/apple-touch-icon.png` (180×180). Defina `seo.ogImage` para uma imagem 1200×630 do cliente em `public/`, ou deixe `''` para não usar.
8. `footerNote: ''` para remover o aviso de demonstração.
9. Rode a checklist no fim deste arquivo.

## O que trocar (resumo)

Marca · textos · pratos e preços · fotos · contatos · redes · cores e fontes · SEO · Worker.

## O que NÃO precisa ser alterado

Os componentes em `src/components/`, `App.tsx` e `vite.config.ts`. Uma adaptação normal só edita `site.ts`, `conteudo.ts`, `images.ts` e o `@theme`. Isso foi testado: o template foi reconfigurado para uma pizzaria de identidade totalmente diferente (nome, cores claras, fontes, cardápio com 3 categorias, 1 preço vazio, 2 pessoas na equipe, sem `og:image`) mexendo só nesses arquivos, sem nenhum vazamento da marca original no build.

Casos previstos em `conteudo.ts` sem mexer nos componentes:

- **Preço opcional:** deixe `preco: ''` ou omita, e o prato aparece sem preço.
- **Marcas do cardápio** (V, VG, SG...): definidas em `cardapio.legenda`; cada prato usa as chaves em `marcas`. Sem legenda, a linha some.
- **Número de categorias, pratos, destaques e pessoas na equipe:** livre. O grid se ajusta.
- **Mapa:** `mapEmbedUrl` em `site.ts` (URL do "Incorporar mapa" do Google). Vazio: cartão com botão "Abrir no mapa".
- **Galeria do ambiente:** funciona melhor com 4 fotos (a 1ª grande, a última ocupa a linha).

Para **remover uma seção**: tire-a de `App.tsx` e o item correspondente de `nav` em `site.ts`. Para uma seção que o nicho precisa e não existe (por exemplo, eventos), crie um componente novo em `src/components/` lendo um bloco novo de `conteudo.ts`.

## Seções (ordem em `src/App.tsx`)

Header (menu móvel) · Hero · Apresentação · Destaques (pratos) · Cardápio · História · Equipe · Diferenciais · Ambiente (galeria) · Depoimentos · Reserva · FAQ · Contato e mapa · Footer.

## Build

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # tsc + vite build (gera dist/)
npm run lint      # oxlint
```

Confira em `dist/`: `index.html` (título, canonical e `og:url` com o domínio final), `robots.txt`, `sitemap.xml`, `favicon.svg`.

## Publicação

O deploy é por projeto e só quando você decidir:

```bash
npx wrangler whoami   # confirme a conta esperada
npm run deploy        # build + wrangler deploy (dentro desta pasta)
```

Depois de publicar, abra a URL, recarregue sem cache e repita o teste de 320, 390 e 1280 px. Domínio próprio: configure no painel da Cloudflare e atualize `seo.url` antes do próximo build. Fluxo completo em [`../docs/guia-de-uso.md`](../docs/guia-de-uso.md).

## Conteúdo fictício (demonstração)

São fictícios: o nome "Cumaru" e a chef "Marina Albuquerque", o slogan, todos os textos, pratos e preços, os números da apresentação, os depoimentos (marcados como exemplo), telefone, WhatsApp, e-mail, endereço e horários. As fotos são do Pexels (licença livre, sem atribuição obrigatória) e mostram estabelecimentos e pratos que não são o Cumaru. `public/demo/og.jpg` e `public/apple-touch-icon.png` também carregam a marca de demonstração.

## Acessibilidade incluída

Um `h1`, hierarquia de títulos, link "Ir para o conteúdo", `alt` em todas as imagens, foco visível, menu móvel com `aria-expanded`/`aria-controls` que fecha com Esc e devolve o foco, FAQ em botões com `aria-expanded`, áreas de toque ≥ 44 px, animações desligadas com `prefers-reduced-motion`, marcas do cardápio lidas por extenso para leitores de tela.

## Checklist de entrega

```text
[ ] Nome, logo, favicon e apple-touch-icon
[ ] Cores e fontes
[ ] Fotos do cliente (public/demo apagado)
[ ] Cardápio real (pratos, preços, marcas) ou sem preços
[ ] Chef / equipe
[ ] Depoimentos reais e autorizados (ou seção removida)
[ ] FAQ
[ ] WhatsApp, telefone, e-mail
[ ] Endereço e horários (só se informados) + mapa
[ ] Redes sociais
[ ] SEO: seo.url, title, description, ogImage
[ ] dist/robots.txt e dist/sitemap.xml com o domínio certo
[ ] footerNote de demonstração removido
[ ] Sem "Cumaru", "Marina", "exemplo" ou "0000" no site
[ ] Build sem erro
[ ] Teste em 320, 375, 390, 768, 1024, 1280 px
[ ] Teste de teclado (Tab, Enter, Espaço, Esc no menu)
```
