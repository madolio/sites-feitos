# Madolio

Landing page da Madolio (serviço de criação de sites pra pequenos negócios). Vite + React + TypeScript + Tailwind v4.

## Deploy (Cloudflare Workers — desde 11/set/2026)

Migrou do Netlify pro Cloudflare Workers (assets estáticos) no mesmo dia. **Não há mais deploy automático em push** — cada mudança precisa de um deploy manual:

```
npm run build
npx wrangler deploy
```

`wrangler.toml` já aponta pro Worker existente chamado `madolio` (mesmo nome, `[assets] directory = "./dist"`, `not_found_handling = "single-page-application"` pra rotas do react-router funcionarem). O domínio `madolio.com.br` está vinculado a esse Worker (Custom Domain no Cloudflare) — não precisa tocar em DNS pra deploys normais. Sem esse domínio, a URL seria `https://madolio.fenoninho-max.workers.dev`.

Autenticação: `wrangler login` já foi feito nesta máquina (token OAuth salvo em `~/.wrangler`, conta `fenoninho.max@gmail.com`). Se expirar, roda `wrangler login` de novo (abre navegador).

O `netlify.toml` ainda existe no repo (resquício da hospedagem antiga) — não é mais usado pra nada, mas não faz mal manter por enquanto. O site antigo na Netlify pode ainda estar no ar (não foi apagado); não é a fonte de verdade.

## Diretrizes de design

O usuário já deu feedback de que o visual "hand-rolled Tailwind" (card arredondado + ícone em quadradinho colorido + badge em pill + faixa de CTA em gradiente liso) lê como "AI slop" — genérico demais. Ao adicionar/redesenhar seções:

- Não repetir a fórmula card+badge+gradiente-liso em toda seção nova. Variar a composição.
- Preferir componentes reais de bibliotecas (shadcn/ui, Aceternity UI, Magic UI, HeroUI) a inventar divs com classes soltas, quando fizer sentido para o projeto.
- Motion de verdade (GSAP, Motion) em vez de seções estáticas — mas ver a gotcha abaixo antes de usar GSAP com Tailwind.

Redesign de set/2026 (2ª passada, pós-catálogo `design-resources`): trocou Sora/Inter + azul corporativo + CTA em gradiente+glow pelo seguinte, para fugir de vez do kit genérico de SaaS:

- **Momento principal:** `src/components/SketchToSite.tsx` — a janela de navegador do Hero começa como rascunho desenhado à mão (linhas soltas, tortas) e se resolve num site colorido de verdade, com um cursor "publicando" no fim. Único motion "não pedido" do site — não espalhar fade-in a esmo em outras seções (Reveal já cobre isso com stagger sutil).
- `src/components/Reveal.tsx` (usado em várias páginas) agora respeita `prefers-reduced-motion` via `gsap.matchMedia` — qualquer novo componente de motion deve seguir o mesmo padrão (ver gotcha abaixo).
- **SiteMock:** virou um "recorte de papel" — borda grossa (`border-2 border-ink`) com sombra dura deslocada (`shadow-[6px_6px_0_0_...]`) em vez do `shadow-xl` suave genérico.
- **Botões:** pill (`rounded-full`) em ambos os projetos-irmãos, mas cores/tom diferentes — o Madolio é o lado "pessoal/artesanal" da dupla; o `nbj-systems` (ver CLAUDE.md dele) é o lado "técnico/industrial" (Archivo, botões retos, diagrama de engenharia). Não convergir os dois visuais.
- Contato/CTA virou parte do rodapé (`Footer.tsx`, fundo `ink`), sem `CTA.tsx` separado — mesmo padrão adotado no `nbj-systems`.
- Existe um arquivo solto em `public/Gemini_Generated_Image_do52gjdo52gjdo52.jfif` não referenciado em nenhum componente — parece resquício de um teste anterior. Não foi removido por não ter sido criado nesta sessão; confirmar com o usuário antes de apagar.

Redesign de set/2026 (3ª passada — pedido explícito do usuário: "mude as fontes, quero algo mais profissional, nas paletas da cor azul"):

- **Tipografia:** IBM Plex Serif (títulos) + IBM Plex Sans (corpo) — no lugar de Fraunces + Inter. Família única (duas variantes do mesmo sistema Plex), lê como mais corporativo/confiável.
- **Paleta:** navy/azul (`--color-ink` #0F1C33, `--color-paper` #F7F9FC, `--color-accent` #1D4FD1) — no lugar de papel/tinta quente + azul-violeta. `src/components/SketchToSite.tsx` foi atualizado junto: o bloco de "site pronto" no hero usa o accent azul do próprio Madolio (`#1D4FD1`), não mais rosa de cliente fictício.
- Se o usuário pedir pra mudar fonte/paleta de novo, esses tokens ficam centralizados em `src/index.css` (`@theme`) + o link de fonte em `index.html` — não é preciso tocar em componentes, exceto o `SketchToSite.tsx` que tem cores do "site pronto" hardcoded (não usa var CSS, porque representa uma prévia visual, não a UI real).

**Página Projetos (`src/pages/Projetos.tsx`):** só a NBJ Systems é cliente real (tem `real: true` + `url`); Doce Ateliê, Estúdio Alma e Sabor da Vila são conceitos/exemplos de estilo, não clientes reais. Isso é intencional e já foi corrigido na copy (h1, subtítulo e rótulo "cliente real"/"conceito" em cada card) — cuidado pra não reintroduzir uma copy que implique portfólio 100% real sem também ajustar/remover os conceitos fictícios, ou trocá-los por clientes de verdade conforme surgirem.

## SEO básico

`index.html` tem meta description, canonical, Open Graph e Twitter Card apontando pra `https://madolio.com.br/og-image.png` (1200×630, gerado via screenshot headless de um HTML standalone — não há fonte editável do design do OG image no repo; se for atualizar, recriar do zero seguindo a paleta/tipografia atuais). `public/robots.txt` e `public/sitemap.xml` também existem — o sitemap lista `/` e `/projetos`; adicionar rotas novas lá se a navegação crescer.

## Gotcha de teste: Chrome headless não respeita `--window-size` abaixo de ~484px

Ao tirar screenshot mobile via `chrome --headless=new --window-size=390,ALTURA --screenshot=...` **direto numa URL top-level**, o Chrome nesta máquina ignora a largura pedida e renderiza a página com `window.innerWidth` de **484px** (provável mínimo interno de janela), mas ainda assim salva o PNG cortado nas dimensões pedidas (390px) — ou seja, a página renderiza mais larga do que a imagem, cortando ~94px do lado direito. Isso parece com um bug de overflow horizontal (texto cortado no meio da palavra, botão sumindo da borda) mas não é: a página está correta, só a screenshot está enganando.

**Como confirmar de verdade:** nunca confiar em `--window-size` pequeno sozinho. Ou (a) medir via `window.innerWidth`/`document.documentElement.scrollWidth` injetando um script temporário, ou (b) — mais simples e já testado — carregar a página **dentro de um `<iframe>` same-origin** com `width: 390px` fixo via CSS, dentro de uma janela headless bem mais larga (ex. `--window-size=820,2000`). O iframe respeita a largura CSS de verdade porque a restrição de mínimo do Chrome se aplica à janela externa, não ao iframe. Esse HTML auxiliar pode ser salvo temporariamente em `dist/__frame.html` (git-ignorado, servido pelo `vite preview`) e apagado depois do teste.

## Gotcha: GSAP + Tailwind `transition` quebra animações de entrada

Se um elemento é alvo direto de uma animação GSAP de opacity/transform (ex: `gsap.from(el.children, { opacity: 0, y, stagger, scrollTrigger })`), **não** coloque a classe `transition` (ou `duration-*`) genérica do Tailwind nesse mesmo elemento. A utility `transition` do Tailwind inclui `opacity` e `transform` na lista padrão de `transition-property`, e isso compete com o GSAP escrevendo essas mesmas propriedades — o GSAP reporta `onComplete` normalmente, mas o navegador nunca aplica o valor final, deixando o elemento com `opacity: 0` permanente.

Fix: escopar a transição explicitamente excluindo `opacity`, ex: `transition-[transform,box-shadow,border-color]`. Ver `src/components/Reveal.tsx` (o wrapper de scroll-reveal) e como `src/components/Benefits.tsx`/`src/pages/Projetos.tsx` escopam a transição dos cards.

Componente de entrada reutilizável: `src/components/Reveal.tsx` (usa `useGSAP` do `@gsap/react` — necessário para funcionar corretamente com o StrictMode do React; `useLayoutEffect` puro deixa a animação instável).
