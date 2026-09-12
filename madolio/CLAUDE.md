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
- **Trabalhos (`Trabalhos.tsx`).** Passou por 3 versões nesta sessão: (1) lista mestre-detalhe com mockup abstrato (`SiteMock`) no painel; (2) usuário preferiu a grade estática de `/projetos` — trocada por `ProjectsGrid.tsx` compartilhado; (3) usuário viu a grade e pediu de volta o formato de lista, mas com o painel mostrando uma **prévia de verdade do site** (não mais um mockup abstrato) e vazio até interagir. Versão final: `LivePreview.tsx` (novo) — um `<iframe>` de verdade carregando a URL do projeto numa largura virtual de 1280px, encolhido via `transform: scale()` calculado por `ResizeObserver` pra caber na moldura (mesmo truque de ferramentas de screenshot). `pointer-events-none` no iframe (é prévia, não o site navegável); barra de endereço falsa mostra o host real (`new URL(url).host`). Estado ocioso (nada em hover/foco) é literalmente vazio — uma caixa tracejada com "Passe o mouse num nome pra ver o site", sem ilustração nenhuma. Mobile: toque abre a prévia embaixo do item (o `onClick` seta `active` pro índice, nunca alterna pra `null` — touch dispara um `mouseenter` sintético antes do click, e um toggle baseado em `active === i` abriria e fecharia no mesmo toque). `ProjectsGrid.tsx` continua existindo e é usado só em `pages/Projetos.tsx` (grade estática com `SiteMock`, pra quem quer ver todos de uma vez sem interagir).
- Todos os 8 projetos em `data/projetos.ts` têm Workers ao vivo, então o iframe sempre tem o que carregar. Se um projeto novo for adicionado sem deploy ainda, ele vai quebrar o preview (iframe de URL inexistente) — confirmar que a URL está no ar antes de adicionar à lista.

**Ajuste seguinte:** o usuário reportou dois problemas: (1) o link "ver todos os projetos" embaixo descia de posição ao passar o mouse — a coluna da direita tinha alturas diferentes ocioso vs. ativo (o ocioso era só uma caixa tracejada sem a barra de endereço nem o texto do card embaixo); (2) queria a troca de prévia mais fluida. Resolvido:

- `LivePreview.tsx` agora aceita `projeto: Projeto | null` e renderiza **sempre a mesma moldura** (mesma barra de endereço com 3 pontos, mesmo `aspect-[4/3]`) — ocioso é só o conteúdo vazio (fundo `surface-alt`, texto "nenhum site selecionado" na barra), não uma caixa diferente.
- `ProjetoInfo` (em `Trabalhos.tsx`) também é sempre renderizado (nunca condicional), com `lg:min-h-[8.5rem]` reservando a altura máxima realista (título + descrição em até 2 linhas via `line-clamp-2` + link) — testado e ajustado até o deslocamento do link "ver todos" ser 0px entre ocioso e o projeto de descrição mais longa (Sabor da Vila). Se adicionar um projeto com descrição bem mais longa que as atuais, reconferir esse número.
- O link "Abrir site completo" fica sempre no DOM (com `href={projeto?.url}`, que fica `undefined` quando ocioso) e vira invisível via `opacity-0 pointer-events-none` em vez de sumir do layout — outra fonte do salto de altura.
- Hover ganhou um atraso de 150ms (`HOVER_DELAY` em `Trabalhos.tsx`) antes de trocar o preview ativo — evita disparar um iframe novo a cada nome que o mouse atravessa rapidamente ao descer a lista. Clique/foco (`onClick`/`onFocus`) continuam imediatos, sem atraso — só o `onMouseEnter` é debounced.
- `LivePreview.tsx` ganhou um fade-in: o iframe começa `opacity: 0` e um skeleton pulsante cobre a área até o evento `onLoad` disparar, escondendo o "flash" de branco/conteúdo quebrado enquanto a página de destino carrega.
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
