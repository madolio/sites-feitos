# Estúdio Alma (conceito)

Site-conceito da Madolio pro nicho de pilates. **Negócio fictício** — não é cliente (a instrutora "Helena Duarte" também é inventada). Vite + React 19 + TypeScript + Tailwind v4 + GSAP. Página única.

## Deploy (Cloudflare Workers)

Worker `estudio-alma`, em `https://estudio-alma.fenoninho-max.workers.dev`. `npm run deploy`.

## WhatsApp é demonstração

Mesmo esquema da Doce Ateliê: `sendToWhatsApp()` (`src/demo.ts`) abre o `DemoDialog.tsx` com a mensagem que seria enviada + o WhatsApp da Madolio. Nunca apontar pra um número inventado. O rodapé declara que o negócio é fictício.

## Reestruturação de set/2026 — a navegação virou o trilho do reformer

Era um dos 5 projetos deliberadamente deixados com o nav genérico (barra fixa full-width, logo + lista de links âncora + botão CTA) enquanto outros conceitos do repositório (Torre, Calibre, Cerne, Nascente...) já tinham ganhado arquitetura própria — ver o `CLAUDE.md` do `madolio`, que documentava essa lista. Reestruturado "página a página" a pedido do usuário, usando a reforma do Nascente (`Painel.tsx`) como referência de método.

`Nav.tsx` (removido, não deixado como código morto) virou `Trilho.tsx`: em vez de uma barra de links soltos, a navegação é o próprio aparelho mais característico do pilates — o reformer, o carrinho (carriage) que desliza sobre um trilho preso por molas de tensão. Literaliza o equipamento, não um ícone genérico de "boneco fazendo pose" (esse já é o assunto do `Figure.tsx` no Hero — não duplicar).

- Cada seção (Início/Aulas/Horários/Instrutora/Experimental) é um "ponto de tensão" ao longo do trilho, marcado por uma mola (`Mola`, zigue-zague em SVG) nas mesmas quatro cores das molas do reformer já usadas no resto do site (Aulas.tsx, Instrutora.tsx). A mola "comprime" (traço mais grosso, opacidade cheia) na seção ativa.
- O `Carrinho` é a barra que desliza até a parada ativa — não é medido via DOM/ResizeObserver: como o ritmo vertical das paradas é fixo em CSS (`PASSO = 4.75rem` por item), a posição é só `indice * PASSO`, mais simples e sem layout thrashing.
- **Desktop:** coluna fixa `w-56` à esquerda (mesmo padrão do Torre/Nascente), sempre visível. O CTA "Aula experimental" fixo no pé da coluna é estilizado como o footbar do reformer — a barra onde se apoia o pé.
- **Mobile:** vira uma barra fina no topo (marca + CTA + botão de menu) — as paradas ficam atrás de um menu que abre embaixo, não escondidas sem pista nenhuma.
- **Parada ativa:** por scroll-spy (`IntersectionObserver`, `useParadaAtiva`), igual ao padrão do Nascente (`rootMargin` assimétrico pra disparar a troca antes da seção tomar a tela toda).
- Extraído `Mark` de `Nav.tsx` pra `Mark.tsx` — o `Footer.tsx` também usa a marca, não fazia sentido ela morar dentro do componente de navegação.
- Como a coluna deixou de ser uma barra fixa no TOPO (no desktop), o padding-top do Hero mudou de "espaço pra header full-width" pra um respiro simétrico (`lg:pt-10 lg:pb-10` no lugar de `lg:pt-20 lg:pb-8`), e o `scroll-mt-16` das outras seções (usado pra âncora não ficar atrás da barra fixa) ganhou `lg:scroll-mt-0`, já que no desktop não há mais barra no topo.
- Deslizar do carrinho e trocar a espessura/opacidade da mola usam `motion-safe:transition-*` do Tailwind — sem JS extra pra checar `prefers-reduced-motion`, já cai pra instantâneo.

## Refino visual de set/2026 — mesma ideia, mais acabamento

Estúdio Alma é um dos mais antigos do repositório e ficou pra trás em acabamento visual em relação aos conceitos mais recentes (Torno, Cardume, Bruma), mesmo já tendo passado pela reestruturação do trilho (ver seção acima). Pedido explícito do usuário: "reformula mas sem mudar a ideia" — nada de conceito, categoria de negócio ou mecânica mudou aqui, só o grau de acabamento. **Não mexi** no boneco geométrico em si (`data.ts`, os ângulos de pose) nem no fato de ele ser feito de formas primárias — isso é a citação ao Balé Triádico de Oskar Schlemmer do Vibe Discovery, não uma "gambiarra de bonequinho de palito" a corrigir.

- **Segunda fonte, só pra leitura de instrumento**: o site inteiro rodava só em Jost (título e corpo). Adicionada **Space Mono** (geométrica, "leitura de painel") pra números que funcionam como mostrador — contador de movimento no Hero (agora `01/06` em vez de "1 de 6"), horas da grade em Horários, contagem de ciclo em Respira. Mesma lógica da Bruma/Torno/Cardume, que sempre têm uma segunda fonte pra dado técnico — aqui o "dado técnico" é o mostrador de carga do reformer.
- **`Figure.tsx` ganhou peso e chão**: uma sombra de contato elíptica (`shadow`) acompanha o eixo X do quadril a cada frame do GSAP — mesma cadeia de refs do resto do boneco, sem estado React novo — e encolhe um pouco quando a pose se afasta do centro (sombra vista de perto perde área). Antes o boneco parecia flutuar sobre a barra do chão. O sol (`sun`) ganhou um glow radial atrás (`radialGradient`) que se move junto — profundidade de pôster Bauhaus, não brilho decorativo solto.
- **Micro-interação nos cartões de Aulas**: os ícones de forma (círculo/quadrado/triângulo) agora inclinam e sobem levemente no hover do cartão (`group-hover`, `motion-safe`) — o site tinha ficado "morto" nesses cartões, sem nenhuma resposta a interação fora do Hero/Trilho/Respira.
- **Células da grade de Horários** ganharam um hover sutil (`scale-[1.04]`, `motion-safe`) nas pílulas de Aparelhos/Solo — mesmo espírito, sem mudar a grade em si.
- Tudo respeitando `motion-safe:`/`prefers-reduced-motion` como o resto do projeto já fazia — nenhuma animação nova é obrigatória pra entender a página.

## Vibe Discovery — "Contrologia"

- **Lugar/objeto:** o estúdio de Joseph Pilates nos anos 1920 — molas, madeira e metal do reformer.
- **Emoção:** leveza com controle.
- **Colisão:** pilates × Bauhaus (o Balé Triádico de Oskar Schlemmer: corpo como geometria). Pilates chamava o método de "Contrology" e desenvolveu na Alemanha, na mesma época da Bauhaus.
- **Nunca parecer:** spa "wellness" verde-sálvia com folhinha e fonte fina.
- **Wildcard:** guia de respiração (`Respira.tsx`) que só começa quando a pessoa aperta o botão.

Paleta: gesso `#e9e8e4`, grafite `#1d1b26` e as quatro cores das molas do reformer (amarela `#f2b300`, verde `#2f8f5b`, azul `#2c4fa3`, vermelha `#d63c3c`). A página não diz qual cor é qual carga porque isso muda de fabricante pra fabricante. Fonte: **Jost** (geométrica, parente da Futura). Títulos `.display` em caixa baixa, como a tipografia da Bauhaus. Botões retos, sem raio — formas primárias só nos elementos gráficos.

## O boneco (`Figure.tsx` + `data.ts`)

Cadeia de grupos SVG aninhados: quadril → perna / tronco → braço e cabeça. Cada pose tem posição do quadril, ângulo da perna e do tronco (absolutos), ângulo do braço e do pescoço (relativos ao tronco) e a posição do "sol" amarelo. O GSAP interpola esses números e reescreve os `transform` a cada frame. **Os ângulos não estão normalizados de propósito** (ex: perna `-182` no Swan em vez de `178`) — isso define por onde o membro passa na transição. Mudar pra 0–360 faz a perna atravessar o chão.

`Hero.tsx`: em tela ≥1024px (sem reduced motion) a seção fica presa (ScrollTrigger `pin`) e a rolagem escolhe o movimento. Em telas menores o boneco troca sozinho a cada 2,8 s enquanto está visível e para quando a pessoa toca num movimento. Com reduced motion, nada automático: as abas trocam a pose na hora.

## Gotchas

- `sr-only` (position:absolute) dentro de um container `overflow-x-auto` **escapa do recorte** se nenhum ancestral for posicionado — no celular isso alargou a página inteira pra 525px. Por isso o wrapper da tabela em `Horarios.tsx` tem `relative`. O teste que pega isso é emular celular de verdade (`isMobile: true` no Puppeteer) e conferir `innerWidth`.
- No Tailwind v4, `scale-*` usa a propriedade CSS `scale`, que se soma ao `transform` do GSAP. Em elemento animado pelo GSAP, definir a escala inicial em `style={{ transform }}`, não com classe.
- Contraste: em fundo gesso, texto pequeno com pelo menos `text-ink/70`. Não usar texto sobre o verde (nem branco nem grafite passam 4.5:1).
