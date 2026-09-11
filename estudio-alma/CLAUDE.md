# Estúdio Alma (conceito)

Site-conceito da Madolio pro nicho de pilates. **Negócio fictício** — não é cliente (a instrutora "Helena Duarte" também é inventada). Vite + React 19 + TypeScript + Tailwind v4 + GSAP. Página única.

## Deploy (Cloudflare Workers)

Worker `estudio-alma`, em `https://estudio-alma.fenoninho-max.workers.dev`. `npm run deploy`.

## WhatsApp é demonstração

Mesmo esquema da Doce Ateliê: `sendToWhatsApp()` (`src/demo.ts`) abre o `DemoDialog.tsx` com a mensagem que seria enviada + o WhatsApp da Madolio. Nunca apontar pra um número inventado. O rodapé declara que o negócio é fictício.

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
