# Pulso (conceito)

Site-conceito da Madolio pro nicho de personal training. **Negócio fictício** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Um dos 6 conceitos feitos após o usuário pedir mais templates com estilo E estrutura próprios (não só reskin) — ver também Focinho, Corte, Chave, Revelar, Passaporte.

## Deploy (Cloudflare Workers)

Worker `pulso`, em `https://pulso.fenoninho-max.workers.dev`. `npm run deploy`.

## Vibe — "Raia"

- **Lugar/objeto:** pista de atletismo — raias pintadas, placas de distância, painel de cronômetro.
- **Colisão:** personal training × sinalização de pista de atletismo.
- **Nunca parecer:** academia preto+vermelho com ícone de haltere.
- **Wildcard:** `RepCounter.tsx` no Hero — contador de repetições que sobe de 0 até o total quando entra na tela (feito na mão com `requestAnimationFrame`, sem lib).

Paleta: pista quase-preta `#171614` (track), giz `#f4f0e6` (chalk). Fontes: **Anton** (display, cartaz de estádio) + **Karla** (corpo).

## Arquitetura — sem nav horizontal

`Rail.tsx` substitui a barra de navegação por uma **raia vertical fixa à esquerda** (desktop): uma régua com marcações de distância (0M/25M/60M/100M) em vez de links de menu — a marcação acende com scroll-spy (`IntersectionObserver`) conforme você "corre" a página. No celular vira uma barra fina no topo (fallback, não a identidade principal). Todo o conteúdo (`Hero`, `Programas`, `Resultados`, `Agendar`) tem `lg:pl-16` pra não ficar embaixo da raia.

`Programas.tsx` reaproveita a metáfora de distância: os 4 programas (sequência real de evolução do treino) viram trechos de uma barra de progresso 0M→100M, não uma lista numerada comum.

## Gotcha de contraste — duas tonalidades da cor de marca

`--color-lane` (`#e8482f`, vermelho-laranja vívido) **não tem contraste suficiente pra texto sobre o fundo claro** (`--chalk`) — dá ~3.4:1, abaixo do mínimo de 4.5:1. Só é seguro como texto quando o fundo já é escuro (`--track`, onde dá ~4.66:1) ou como elemento decorativo não-textual (barra de progresso, bordas, pontos — que só precisam de 3:1).

Pra texto/botões sobre o fundo claro, usar **`--color-lane-ink`** (`#a83321`, mesma família mas escurecida — dá ~5.84:1 contra `--chalk`) e seu hover `--color-lane-ink-hover` (`#8c2a1b`). Resumindo:
- Fundo claro (`chalk`) + texto/botão na cor de marca → `lane-ink`.
- Fundo escuro (`track`) + texto/número na cor de marca → `lane` (o vívido).
- Elemento decorativo puro (barra, ponto, borda) em qualquer fundo → `lane` (o vívido) está liberado, não precisa de `-ink`.

Esse foi um erro real cometido nesta sessão (o primeiro rascunho usava `lane` vívido como `bg`/`text` em cima do `chalk` em vários lugares) — testado com a fórmula de contraste do WCAG e corrigido antes do deploy. Se adicionar um novo elemento com a cor de marca, aplicar essa regra antes de testar visualmente.
