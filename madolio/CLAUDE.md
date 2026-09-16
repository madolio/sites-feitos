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

**Ajuste seguinte (revertido depois — ver abaixo):** o usuário reportou não conseguir "acessar" o site — achava que estava saindo dele ao usar `/projetos`. Tentei unificar `/projetos` com a lista mestre-detalhe da home (`ProjectShowcase.tsx`), mas o usuário pediu pra desfazer: a home devia continuar com hover, e só `/projetos` devia virar uma grade estática. Estado final, com os dois divergindo de novo:

- **`Trabalhos.tsx` (home):** voltou a ser dono da própria lista mestre-detalhe com hover debounced (`HOVER_DELAY`), estado ocioso vazio e `LivePreview.tsx` (prévia da página inteira, encolhida) — a versão que já estava funcionando bem antes de qualquer coisa ser extraída. `ProjectShowcase.tsx` foi removido (voltou a não ser compartilhado).
- **`pages/Projetos.tsx`:** virou uma grade estática de 3 colunas (`sm:grid-cols-2 lg:grid-cols-3`, como a versão beeem mais antiga) — sem interação nenhuma, cada card inteiro é um `<a target="_blank">` que já era a "organização que era" original. A imagem de cada card usa `HeroPreview.tsx` (novo): mesmo princípio de iframe real do `LivePreview`, mas recorta só os primeiros `HERO_HEIGHT = 760px` (virtuais, numa largura de 1280) da página de verdade — a primeira seção/hero — em vez de encolher a página inteira até virar ilegível. Cada card carrega seu próprio iframe (`loading="lazy"`); num teste de screenshot automatizado que redimensiona a viewport só no instante da captura, alguns pareceram "travados" no skeleton — não é bug, é só o navegador não ter tido tempo de completar o carregamento antes do clique do obturador; confirmado via script separado que os 8 iframes chegam a `opacity: 1` normalmente.
- Ou seja: **hover só na home, grade estática (sem interação) em `/projetos`.** Se pedirem pra unificar de novo no futuro, checar primeiro se realmente é isso que querem — já foi tentado e revertido uma vez.
- **Benefits (`Benefits.tsx`) não é mais grid de cards com ícone em caixa.** Virou uma lista corrida estilo ficha técnica — dado (incluindo o `PercentCounter`/NumberFlow) alinhado à esquerda, texto corrido à direita, divisores horizontais, sem bordas nem ícones SVG genéricos. **Revertido depois:** o usuário achou essa lista fraca ("não curti muito, reformule 100%") e pediu pra usar as técnicas dos links que já tinha mandado. Virou um **bento grid** (`BentoCard.tsx`, novo): um tile grande (100% responsivo) + três menores, cada um com o "Card Spotlight" da Aceternity UI (brilho radial seguindo o cursor, `--mx`/`--my` em `index.css`) somado ao "Tilted Card" do React Bits (inclinação 3D leve, `--rx`/`--ry`, calculada no `onMouseMove` e resetada no `onMouseLeave`; `@media (hover: none)` desliga o brilho no touch). `PercentCounter.tsx` virou `StatCounter.tsx` (mesmo NumberFlow, mas genérico com `suffix` opcional, não só `%`) — usado nos 4 números do bento, incluindo o "5–15" como dois contadores separados.
- **Footer (`Footer.tsx`) minimizado.** Sem o bloco escuro "bora conversar" (que se repetia em quase todo projeto) — como o CTA já é permanente (`Chrome.tsx`), o rodapé é só copyright + e-mail, uma linha.
- `src/data/projetos.ts` (novo) — lista de projetos compartilhada entre `Trabalhos.tsx` (home) e `pages/Projetos.tsx` (grid completo, mantido como página secundária pra quem quer ver todos com mais detalhe). `pages/Projetos.tsx` ganhou um link "← madolio" no topo já que não há mais nav global pra voltar.

**Escopo desta reestruturação:** só a home. NBJ Systems, Sabor da Vila, Traço, Âncora, Doce Ateliê e Estúdio Alma foram propositalmente deixados como estão. Bastos Advocacia e Torre serão reestruturados depois, um de cada vez (pedido explícito do usuário: "vamos pág a pág").

## Diretrizes de design (histórico, ainda válido)

O usuário já deu feedback de que o visual "hand-rolled Tailwind" (card arredondado + ícone em quadradinho colorido + badge em pill + faixa de CTA em gradiente liso) lê como "AI slop" — genérico demais, e depois que reskinar sozinho não é suficiente: a estrutura da página em si pode virar uma fórmula reconhecível mesmo com decoração diferente. Ao redesenhar uma seção, considerar não só cor/tipografia mas a composição (nav, ordem de seções, grid vs. lista, onde fica o CTA).

Tipografia: **IBM Plex Serif** (títulos) + **IBM Plex Sans** (corpo). Paleta navy/azul (`--color-ink` #0F1C33, `--color-paper` #F7F9FC, `--color-accent` #1D4FD1). Tokens centralizados em `src/index.css` (`@theme`).

## Gotcha real: `position: fixed` + `transition` no `transform` quebra no Safari/iOS

O botão flutuante de WhatsApp (`Chrome.tsx`) usava `translate-y-*` com `transition-all` **no mesmo elemento** que tinha `fixed`. No iPhone (Safari), isso fazia o botão "descolar" do canto da tela durante o scroll e passar a rolar junto com o conteúdo, aparecendo no meio da página em vez de fixo — reportado pelo usuário com print. Esse ambiente de teste só tem Chrome headless, que **não reproduz** esse bug (por isso passou despercebido) — não dá pra confiar só no Chrome pra validar `position: fixed` com transição de `transform`.

**Fix:** separar em dois elementos — um `<div className="fixed ...">` sem nenhum transform/transition (só fixa a posição), e dentro dele o `<a>` que recebe a transição de opacity/translate-y. O elemento fixo nunca anima; o elemento que anima nunca é fixo.

## Gotcha de teste: Chrome headless não respeita `--window-size` abaixo de ~484px

Ver histórico anterior deste arquivo — usar Puppeteer com `isMobile: true`/`hasTouch: true` no viewport, ou o truque do iframe same-origin, nunca confiar em `--window-size` pequeno sozinho passado direto pro `chrome --headless`.

## Gotcha: GSAP + Tailwind `transition` quebra animações de entrada

Ver `src/components/Reveal.tsx` — não colocar a classe `transition`/`duration-*` genérica do Tailwind no mesmo elemento que o GSAP anima em opacity/transform.

## `/reels` — o portfólio em clipes curtos

Feature nova, rota separada. Pedido do usuário foi só "feature nova, tipo reels" — perguntei o que exatamente antes de construir (AskUserQuestion: vitrine tipo Instagram vs. clipes da interação de cada site vs. outro conceito) e a resposta foi **clipes curtos da interação de assinatura de cada site**, não uma galeria genérica.

- `pages/Reels.tsx` — rolagem vertical com `snap-y snap-mandatory`, uma tela cheia (`100svh`) por projeto, sem paginação/botão de "próximo": rolar É a navegação, igual ao formato real. Fica **fora do `<Layout>`** de propósito (ver `App.tsx`) — sem o `Chrome` fixo nem o `Footer` do resto do site, pra parecer abrir um app separado, não mais uma página institucional.
- `data/reels.ts` — um `Reel` por projeto: `slug` (bate com o nome do arquivo em `public/reels/`), `projeto`/`categoria`/`legenda`/`url`.
- **Os clipes são capturados do site ao vivo, não são mockup nem posed screenshot.** Cada `public/reels/<slug>.gif` veio de um script Puppeteer que abre o Worker publicado de verdade, executa o gesto de assinatura daquele projeto (clicar na roda de aromas do Taça, puxar a senha do Corte, escolher esmalte e levar ao forno no Torno, etc.) e tira uma sequência de screenshots recortados (`page.screenshot({clip})`) num elemento/área específica — não a tela inteira. Os PNGs viram GIF animado via `gifenc` + `pngjs` (decodifica cada PNG pra pixels crus, quantiza, codifica) — **sem depender de ffmpeg**, que não está instalado neste ambiente. O script de captura ficou no scratchpad da sessão, não faz parte do repo (é uma ferramenta de geração de asset, não código de produção).
- `<slug>.png` (o último quadro de cada captura) é o poster: `index.css` esconde `.clipe-anim` e mostra `.clipe-poster` sob `@media (prefers-reduced-motion: reduce)` — não dá pra pausar a animação nativa de um GIF via CSS, então a saída é nunca carregar a versão animada nesse caso.
- **Curadoria, não os 31 projetos do portfólio.** Primeira leva com 8: Taça, Torno, Cerne, Calibre, Corte, Tinta, Ferro, Pulso — escolhidos por terem um gesto único, determinístico e fácil de disparar por script (clique simples ou sequência curta). Cardume (scroll 3D) e Marcha (scroll profundo + fotos reais) ficaram de fora dessa leva por precisarem de mais engenharia de captura; qualquer projeto novo com interação de assinatura clara é candidato a entrar depois, bastando gerar o par `.gif`+`.png` e adicionar uma entrada em `reels.ts`.
- Descoberto e corrigido durante a geração: o primeiro seletor usado pra recortar o relógio do Calibre (`.aspect-square`) casava com DOIS elementos (um ícone de 40px E o relógio de verdade) — `querySelector` pegava o primeiro (o ícone), gerando um GIF 80×80 todo preto. Corrigido mirando `.aspect-square.w-full` (classe exclusiva do relógio). Vale de lição pra qualquer seletor de recorte por classe genérica: conferir com um `querySelectorAll` quantos elementos batem antes de confiar no primeiro.
- Torno (cena 3D) gerava um GIF de ~2,8 MB com o recorte/contagem de quadros iniciais — cena rica em cor comprime mal em GIF (paleta de 256 cores). Resolvido recortando mais apertado ao redor do vaso (não a tela inteira) e reduzindo de 30 pra 10 quadros — caiu pra ~470 KB, ainda o mais pesado da leva mas dentro do razoável.
- Links de entrada: "Ver em Reels" em `Trabalhos.tsx` (home) e "Prefere ver em Reels?" em `pages/Projetos.tsx` — o link de volta de dentro do Reels leva pra `/projetos`, não pra `/`.
- Listado em `public/sitemap.xml` (prioridade 0.6, mais baixa que `/` e `/projetos` — é uma forma alternativa de navegar o mesmo conteúdo, não conteúdo novo).

## SEO básico

`index.html` tem meta description, canonical, Open Graph e Twitter Card. `public/robots.txt` e `public/sitemap.xml` existem — o sitemap lista `/` e `/projetos`.
