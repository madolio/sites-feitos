# academia-template

Template comercial reutilizável para **academias, boxes e estúdios de treino** (musculação, funcional, crossfit, boxe, mobilidade).

**"Vértice — Academia & Treino funcional" é só conteúdo de demonstração.** Nome, textos, modalidades, planos, preços, professores, depoimentos, contatos e endereço são fictícios; as fotos são de banco de imagens (Pexels, licença livre). Tudo isso fica em 4 arquivos de configuração: nenhum componente precisa ser editado para trocar de cliente.

Vite + React 19 + TypeScript + Tailwind v4, publicado como Cloudflare Worker. A única dependência de runtime é o React.

É o terceiro template do monorepo (depois de `clinica-template` e `restaurante-template`) e segue o mesmo contrato: [`../docs/contrato-de-template.md`](../docs/contrato-de-template.md). O visual é próprio (grafite com lima, tipografia condensada em caixa alta, cantos retos); as cores não são compartilhadas com os outros templates.

## Onde personalizar

| Item | Arquivo |
| --- | --- |
| Identidade (nome, descritor, slogan, logo) | `src/config/site.ts` |
| Contatos, endereço, horários, mapa, redes | `src/config/site.ts` |
| SEO (título, descrição, URL, `og:image`, cor do navegador, favicon) | `src/config/site.ts` → `seo` |
| Fontes (link do Google Fonts) | `src/config/site.ts` → `fonts` + `--font-*` em `src/index.css` |
| Menu de navegação | `src/config/site.ts` → `nav` |
| Textos, modalidades, planos, estrutura, professores, depoimentos, FAQ, CTAs, rótulos | `src/data/conteudo.ts` |
| Imagens | `src/config/images.ts` (arquivos em `public/`) |
| Cores | `src/index.css` → bloco `@theme` |

Nos títulos, `*palavra*` vira a palavra na cor de destaque.

### O que é gerado sozinho a partir de `site.ts`

No build, o plugin de `vite.config.ts` cria o `<head>` do `index.html` (title, description, canonical, Open Graph, Twitter, theme-color, fontes), `robots.txt`, `sitemap.xml` e `favicon.svg` (letra + cores). **Não edite esses arquivos à mão**: mude `site.ts` e rode o build.

### Como o tema funciona

As cores têm **função**: `background`, `surface`, `foreground`, `muted`, `accent`, `accent-hover`, `accent-foreground`, `border`. Os componentes só usam essas funções. O conjunto `inverse-*` alimenta as seções com classe `tema-claro` (os planos): elas redefinem as funções por dentro, sem trocar classes. Um template escuro ganha uma seção clara e vice-versa, só mudando os valores. Confira o contraste do `accent` e do `muted` **sobre `background` e sobre `surface`** (mínimo 4,5:1), nos dois conjuntos.

## Como criar uma versão para cliente

Prefira o gerador (`npm run new-site`, na raiz do monorepo; ver [`../docs/gerador.md`](../docs/gerador.md)): ele cria a pasta, troca nome, Worker, pacote, URL, SEO e gera um `apple-touch-icon` neutro. Depois:

1. `src/config/site.ts`: WhatsApp (`5511999999999`), telefone, e-mail, endereço, horários, Instagram, descritor. **Endereço e horário só se o cliente informou.**
2. `src/index.css`: cores do `@theme` (e `themeColor`/`faviconBg`/`faviconFg` em `site.ts`); se trocar de fonte, `fonts` em `site.ts` + `--font-*`.
3. `src/config/images.ts`: fotos do cliente em `public/fotos/`, com `alt` de cada uma. Apague `public/demo/`.
4. `src/data/conteudo.ts`: tudo o que é texto, modalidades, planos, professores (registro no CREF só se real), depoimentos autorizados, FAQ.
5. Substitua `public/apple-touch-icon.png` (180×180) e defina `seo.ogImage` (1200×630 em `public/`) ou deixe `''`.
6. `footerNote: ''` para remover o aviso de demonstração.

## O que NÃO precisa ser alterado

Os componentes em `src/components/`, `App.tsx` e `vite.config.ts`. Isto foi testado: o template virou um box de crossfit de identidade totalmente diferente (tema claro, outras fontes, 3 modalidades em vez de 4, 2 planos, um sem preço, 2 professores, sem números, sem `og:image`) mexendo só nos 4 arquivos, sem vestígio da marca original no build.

Casos previstos em `conteudo.ts`:

- **Preço opcional:** `preco: ''` mostra só o período/rótulo (ex.: "sob consulta").
- **Plano destacado:** `destaque: true` em um plano (o "recomendado").
- **Quantidades livres:** modalidades, planos, professores, benefícios, itens da estrutura e FAQ.
- **Números da apresentação:** `numeros: []` remove o bloco (a lista precisa estar tipada, como está no template).
- **Registro do professor:** `registro: ''` esconde a linha.
- **Mapa:** `mapEmbedUrl` em `site.ts`; vazio, mostra um cartão com "Abrir no mapa".
- **Galeria da estrutura:** a 1ª foto é grande; funciona melhor com 3 ou 4.

Para **remover uma seção**: tire-a de `App.tsx` e o item de `nav`. Para uma seção que o nicho precisa e não existe (grade de horários, por exemplo), crie um componente em `src/components/` lendo um bloco novo de `conteudo.ts`.

## Seções (ordem em `src/App.tsx`)

Header (menu móvel) · Hero · Apresentação · Modalidades · Planos (tema claro) · Estrutura (galeria) · Como trabalhamos · Professores · Alunos (depoimentos) · FAQ · CTA final (aula experimental) · Contato e mapa · Footer.

## Build

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # tsc + vite build (gera dist/)
npm run lint      # oxlint
```

Confira em `dist/`: `index.html` (título, canonical, `og:url`), `robots.txt`, `sitemap.xml`, `favicon.svg`. O deploy é por projeto e só quando você decidir (`npx wrangler whoami`, `npm run deploy`).

## Conteúdo fictício (demonstração)

São fictícios: o nome "Vértice", os professores "Rafael Monteiro", "Camila Duarte" e "Diego Aranha", registros "CREF 000000", todos os textos, planos e preços, os números da apresentação, os depoimentos (marcados como exemplo), telefone, WhatsApp, e-mail, endereço e horários. As fotos são do Pexels (licença livre) e mostram pessoas e lugares que não são a Vértice. **Assets de marca que o gerador não parametriza:** `public/demo/og.jpg` (removido pelo gerador) e `public/apple-touch-icon.png` (substituído por um ícone neutro).

## Acessibilidade incluída

Um `h1`, hierarquia de títulos, link "Ir para o conteúdo", `alt` em todas as imagens, foco visível, menu móvel com `aria-expanded`/`aria-controls` que fecha com Esc e devolve o foco, FAQ em botões com `aria-expanded`, áreas de toque ≥ 44 px, animações desligadas com `prefers-reduced-motion`, texto sobre foto com película escura.

## Checklist de entrega

```text
[ ] Nome, logo, favicon e apple-touch-icon
[ ] Cores e fontes (contraste ≥ 4,5:1 sobre background e surface)
[ ] Fotos do cliente (public/demo apagado)
[ ] Modalidades e planos reais (preços só se informados)
[ ] Professores e registro profissional (só se real)
[ ] Depoimentos reais e autorizados (ou seção removida)
[ ] FAQ
[ ] WhatsApp, telefone, e-mail
[ ] Endereço e horários (só se informados) + mapa
[ ] Redes sociais
[ ] SEO: seo.url, title, description, ogImage
[ ] dist/robots.txt e dist/sitemap.xml com o domínio certo
[ ] footerNote de demonstração removido
[ ] Sem "Vértice", "Rafael", "CREF 000000" ou "exemplo" no site
[ ] Build sem erro
[ ] Teste em 320, 375, 390, 768, 1024, 1280 px
[ ] Teste de teclado (Tab, Enter, Espaço, Esc no menu)
```
