# Cerne (conceito)

Site-conceito da Madolio pro nicho de design de interiores. **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

**Refeito em set/2026** — a primeira versão (duas colunas fixas com painel sticky trocando de ilustração via scroll) não agradou: nem o esqueleto, nem a execução visual. Reconstruído do zero mantendo só o nicho. Ver também Tinta (rolagem horizontal), Balcão (catálogo sem hero) e Rota (layout de dashboard), feitos na mesma leva de "esqueletos diferentes".

## Deploy (Cloudflare Workers)

Worker `cerne`, em `https://cerne.sneakpeek.workers.dev`. `npm run deploy`.

## O esqueleto — planta baixa interativa, sem scroll controlando nada

`Explorador.tsx` é a página inteira: uma coluna só, sem hero, sem duas colunas, sem `IntersectionObserver`. A planta baixa (`Planta.tsx`) é a própria navegação — cada cômodo é um `<rect>` clicável (`data/casos.ts` guarda a geometria de cada sala no mesmo `viewBox="0 0 480 320"` pra todos os 4 casos); clicar num cômodo troca o conteúdo de `DetalheSala.tsx` logo abaixo, sem depender de rolagem. Trocar de caso (`Seletor.tsx`, abas) reseta a sala selecionada pra primeira da planta nova.

Essa foi a correção direta do que não funcionou na v1: o usuário rejeitou especificamente o esqueleto de duas colunas com painel sticky — aqui não existe coluna fixa nem estado amarrado a scroll, é 100% clique.

## Reformulação — efeitos (nível de ousadia da Realce)

O esqueleto já estava certo, mas era 100% estático: trocar de cômodo cortava o conteúdo sem transição nenhuma. Pedido do usuário: mesmo nível de efeitos/fluidez da Realce.

- **`DetalheSala.tsx`** agora remonta com `key={sala.id}` e a classe `.sala-entrar` — fade + leve subida ao trocar de cômodo, em vez do corte seco.
- **`Planta.tsx`**: o cômodo selecionado ganha um contorno que pulsa de leve (`.sala-marcada`, stroke-opacity em loop) — um "marca-texto" que chama atenção sem imitar o efeito de traçado se desenhando, que já é a assinatura do **Traço** (outro projeto deste repositório). Colisão evitada de propósito.

Ambas respeitam `prefers-reduced-motion: reduce`.

## Reformulação 2 — profundidade de conteúdo, não só efeito

Feedback direto: "se aprofunde mais no design de interior" — a página inteira era planta interativa + formulário de contato, sem nada que mostrasse profissionalismo/metodologia real de design de interiores.

- **`Materiais.tsx`** (novo): uma materioteca de verdade — cada amostra é textura CSS (não foto) do material que já aparece em `data/casos.ts`, deduplicado (freijó, concreto aparente, linho cru, cabo de aço, etc.), com a legenda dizendo em qual cômodo/casa cada um foi usado. Não é uma seção nova de conteúdo inventado: é o mesmo dado que já existia nas salas, só exposto como catálogo de especificação.
- **`Processo.tsx`** (novo): metodologia específica de design de interiores (observar rotina → fechar paleta de material → só então desenhar a planta → acompanhar execução), não o "conversa → orçamento → entrega" genérico que serviria pra qualquer prestador. A ordem em si é o argumento: **material antes de planta**, coerente com o próprio esqueleto do site (a planta baixa é literalmente construída a partir dos materiais mostrados).

## Referência visual (trocada na v2)

Paleta: `--color-paper` #faf7f2 (branco quente), `--color-panel` #f1ece3 (fundo da moldura da planta), `--color-ink` #221f1c, `--color-pine` #2f4a3e (verde-pinheiro, mais frio/escuro que o musgo da v1 — validado ~9:1 sobre o paper, bem confortável como texto). Fontes: **DM Serif Display** (títulos) + **DM Sans** (corpo) — nenhuma das duas usada em outro projeto do repositório (a v1 usava Petrona/Sora, agora livres pra outro projeto).

Antes eram 4 tipos de ilustração diferentes (planta/corte/axonometria/paleta de material) — um sistema visual disperso. Agora é **um sistema só**: a planta baixa, sempre. Mais coerente e mais forte como identidade.
