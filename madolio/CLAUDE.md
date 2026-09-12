# Madolio

Landing page da Madolio (serviço de criação de sites pra pequenos negócios). Vite + React + TypeScript + Tailwind v4.

## Deploy (Cloudflare Workers — desde 11/set/2026)

```
npm run build
npx wrangler deploy
```

`wrangler.jsonc` aponta pro Worker `madolio`, com `madolio.com.br`/`www.madolio.com.br` vinculados como Custom Domain.

## Reestruturação de set/2026 — não é só reskin, é a arquitetura da página

Feedback do usuário depois de ver Torre/Traço/Âncora: mesmo com paletas e tipografias diferentes, todos os sites (inclusive esta home, que é a origem do molde) seguiam a **mesma fórmula estrutural** — nav fixo com logo+links+botão, hero em duas colunas (texto esquerda, visual direita), seção de cards, rodapé escuro "vamos conversar". Trocar só cor/fonte/ícone não resolve isso; é a "home com produto trocado".

A home foi reestruturada primeiro (é o molde de origem). Mudanças de **arquitetura**, não de decoração:

- **Sem barra de navegação horizontal.** `Chrome.tsx` substitui `Nav.tsx` (removido): só a marca fixa no canto superior esquerdo (link pra `/`) e um botão de WhatsApp flutuante no canto inferior direito que só aparece depois que a pessoa rola mais de 60% da altura da tela — não compete com o gesto de abertura do Hero. Sem menu de âncoras (`#beneficios`, `#contato`).
- **Hero não é mais duas colunas.** `Hero.tsx` agora é uma tela cheia (`min-h-[100svh]`) com o Scene3D ocupando o fundo inteiro e o texto centralizado por cima, como uma capa — não texto-esquerda/ilustração-direita. As stats viraram uma barra fina horizontal na base do hero, não um grid de 3 colunas dentro da coluna de texto.
- **Trabalhos (`Trabalhos.tsx`, novo).** Primeira versão era uma lista mestre-detalhe (nomes à esquerda, preview sticky que trocava no hover/foco). O usuário viu a grade de prévias de `/projetos` (a mesma que já existia) e pediu pra trazer exatamente essa grade pra home — sem exigir hover/toque pra aparecer. Trocado: `ProjectsGrid.tsx` (novo) é o componente compartilhado com a grade de `SiteMock`, usado tanto em `Trabalhos.tsx` (home) quanto em `pages/Projetos.tsx`. O `Reveal` com stagger fica *dentro* do `ProjectsGrid`, não no componente pai — senão o stagger anima o grid inteiro de uma vez em vez de cada card.
- **Benefits (`Benefits.tsx`) não é mais grid de cards com ícone em caixa.** Virou uma lista corrida estilo ficha técnica — dado (incluindo o `PercentCounter`/NumberFlow) alinhado à esquerda, texto corrido à direita, divisores horizontais, sem bordas nem ícones SVG genéricos.
- **Footer (`Footer.tsx`) minimizado.** Sem o bloco escuro "bora conversar" (que se repetia em quase todo projeto) — como o CTA já é permanente (`Chrome.tsx`), o rodapé é só copyright + e-mail, uma linha.
- `src/data/projetos.ts` (novo) — lista de projetos compartilhada entre `Trabalhos.tsx` (home) e `pages/Projetos.tsx` (grid completo, mantido como página secundária pra quem quer ver todos com mais detalhe). `pages/Projetos.tsx` ganhou um link "← madolio" no topo já que não há mais nav global pra voltar.

**Escopo desta reestruturação:** só a home. NBJ Systems, Sabor da Vila, Traço, Âncora, Doce Ateliê e Estúdio Alma foram propositalmente deixados como estão. Bastos Advocacia e Torre serão reestruturados depois, um de cada vez (pedido explícito do usuário: "vamos pág a pág").

## Diretrizes de design (histórico, ainda válido)

O usuário já deu feedback de que o visual "hand-rolled Tailwind" (card arredondado + ícone em quadradinho colorido + badge em pill + faixa de CTA em gradiente liso) lê como "AI slop" — genérico demais, e depois que reskinar sozinho não é suficiente: a estrutura da página em si pode virar uma fórmula reconhecível mesmo com decoração diferente. Ao redesenhar uma seção, considerar não só cor/tipografia mas a composição (nav, ordem de seções, grid vs. lista, onde fica o CTA).

Tipografia: **IBM Plex Serif** (títulos) + **IBM Plex Sans** (corpo). Paleta navy/azul (`--color-ink` #0F1C33, `--color-paper` #F7F9FC, `--color-accent` #1D4FD1). Tokens centralizados em `src/index.css` (`@theme`).

## Gotcha de teste: Chrome headless não respeita `--window-size` abaixo de ~484px

Ver histórico anterior deste arquivo — usar Puppeteer com `isMobile: true`/`hasTouch: true` no viewport, ou o truque do iframe same-origin, nunca confiar em `--window-size` pequeno sozinho passado direto pro `chrome --headless`.

## Gotcha: GSAP + Tailwind `transition` quebra animações de entrada

Ver `src/components/Reveal.tsx` — não colocar a classe `transition`/`duration-*` genérica do Tailwind no mesmo elemento que o GSAP anima em opacity/transform.

## SEO básico

`index.html` tem meta description, canonical, Open Graph e Twitter Card. `public/robots.txt` e `public/sitemap.xml` existem — o sitemap lista `/` e `/projetos`.
