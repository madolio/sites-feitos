# NBJ Systems

Landing page da NBJ Systems (equipamentos para filtração e tratamento de água). Vite + React + TypeScript + Tailwind v4.

## Deploy (Cloudflare Workers — desde 11/set/2026)

Migrou do Netlify pro Cloudflare Workers (assets estáticos) no mesmo dia. **Sem domínio próprio ainda** — vive em `https://nbj-systems.fenoninho-max.workers.dev`. Se a NBJ comprar um domínio, atualizar canonical/OG/sitemap/robots.txt (hoje hardcoded pro subdomínio `.workers.dev`) e vincular o domínio ao Worker no Cloudflare.

Deploy manual (sem auto-deploy em push):

```
npm run build
npx wrangler deploy
```

`wrangler.toml` aponta pro Worker `nbj-systems` (`[assets] directory = "./dist"`, `not_found_handling = "single-page-application"`). Autenticação wrangler já feita nesta máquina (conta `fenoninho.max@gmail.com`); ver CLAUDE.md do `madolio` pra detalhes.

O `netlify.toml` e o site antigo em `nbj-systems.netlify.app` ainda existem mas não são mais a fonte de verdade.

Conteúdo baseado no rascunho real da empresa em GreatPages (https://app.greatpages.com.br/pages/2554928/preview — conteúdo real, mas página nunca publicada). Endereço, WhatsApp e descrições de produto em `src/constants.ts` e `src/data/products.ts` vêm de lá. Se o usuário mandar fotos reais dos produtos/instalações (links ou arquivos), elas devem substituir os ícones/mocks abstratos atuais — confirmar direito de uso se a origem não for clara.

## Diretrizes de design

Ver o CLAUDE.md do projeto irmão `madolio` (mesmo usuário, mesmo stack) para a diretriz completa sobre evitar visual "AI slop" e a gotcha de GSAP + Tailwind `transition` (não pôr a classe `transition` genérica em elemento que o GSAP anima em opacity/transform).

Direção visual atual (redesign de set/2026), feita para fugir do kit "card + ícone em quadradinho + badge em pill + gradiente":

- **Momento principal:** `src/components/TreatmentDiagram.tsx` — esquema técnico (estilo P&ID) das etapas reais de um sistema NBJ-OR: entrada → polipropileno → carvão ativado → osmose reversa → água desmineralizada. GSAP desenha os canos (DrawSVGPlugin), faz a água fluir e as impurezas pararem na etapa que as retém. É a única animação "não pedida" do site; não espalhar fade-in em todas as seções.
- **Tipografia:** Archivo (uma família só), títulos com `font-stretch: 116%` (eixo de largura).
- **Produtos** como ficha técnica em linhas (`SpecList`), não grid de cards. **Osmose** comparada por vazão em barras (`OsmosisScale`) — a vazão de cada modelo foi deduzida do nome (NBJ-OR-15L = 15 L/h etc.; só o 250L tem a vazão confirmada no texto original). Confirmar com o cliente.
- O rodapé é o bloco de contato (fundo `ink`, telefones grandes), presente em todas as páginas.
- Chrome headless não avança o relógio do GSAP (lagSmoothing), então screenshots headless mostram a intro no começo. Para revisar layout, usar `--force-prefers-reduced-motion` (estado final estático).
- Ver também o CLAUDE.md do `madolio` — gotcha de teste sobre `chrome --headless --window-size` pequeno (abaixo de ~484px) não refletir a largura real da página; usar o truque do iframe same-origin pra testar mobile de verdade.

## SEO básico

`index.html` tem meta description, canonical, Open Graph e Twitter Card apontando pra `https://nbj-systems.netlify.app/og-image.png` (1200×630, mesmo processo do `madolio`: screenshot headless de um HTML standalone, sem fonte editável no repo). `public/robots.txt` e `public/sitemap.xml` existem, apontando pro domínio `.netlify.app` atual — **se o cliente comprar um domínio próprio, atualizar as 3 URLs de canonical/OG/sitemap/robots** (hoje hardcoded pro subdomínio do Netlify).
