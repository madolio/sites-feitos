# Rota (conceito)

Site-conceito da Madolio pro nicho de software de roteirização/gestão de frota (SaaS B2B). **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Feito pra ter um **esqueleto de página** genuinamente diferente dos outros conceitos do portfólio — ver a instrução original do usuário: "mude o esqueleto da página, parece tudo a mesma coisa". Ver também Cerne (duas colunas fixas), Tinta (rolagem horizontal) e Balcão (catálogo sem hero), feitos na mesma leva.

## Deploy (Cloudflare Workers)

Worker `rota`, em `https://rota.fenoninho-max.workers.dev`. `npm run deploy`.

## O esqueleto — o site É a tela do software

Diferente de todo o resto do portfólio (que é sempre uma página institucional, mesmo quando bem diferente na forma), o Rota não vende o produto com texto de marketing — a página **é** o painel do software, com barra lateral fixa (`Sidebar.tsx`) + conteúdo principal (`Painel.tsx`): cartões de estatística (`StatGrid.tsx`, números em mono), um mapa de rotas ativas animado (`MapaRotas.tsx`) e uma tabela de entregas recentes (`TabelaEntregas.tsx`). Não existe hero, nem "sobre nós", nem seção de features — o pitch acontece dentro da própria interface (ex: "Otimizadas automaticamente conforme o trânsito..." como legenda do card do mapa, não como parágrafo de marketing separado).

Da barra lateral, só "Painel" é de fato navegável (é a única tela que existe); os outros itens (Rotas, Frota, Entregas, Configurações) têm a etiqueta "em breve" — evita a sensação de link quebrado sem fingir que o resto do produto existe.

`MapaRotas.tsx`: grade de ruas simplificada (SVG) com duas rotas (uma ativa sólida, uma secundária pontilhada) e um veículo que percorre a rota principal em loop, trecho a trecho — mesma técnica de animação por segmentos retos do `TreatmentDiagram.tsx` da Nascente, sem precisar de `MotionPathPlugin`.

**Mobile:** a barra lateral vira uma barra superior fina com botão de menu, que abre um drawer (`Sidebar.tsx`, estado `open`) deslizando por cima do conteúdo com overlay escuro — não é a barra lateral inteira encolhida, é outra composição.

**Gotcha de mobile (retrabalhado em set/2026):** a primeira correção escondia a coluna "Bairro" em telas pequenas + `mask-image` de fade sinalizando rolagem horizontal pra ver a ETA (mesmo truque das abas do Balcão). A auditoria visual mostrou que, numa tabela de dados, o fade não se lê como "arraste" — lê como coluna cortada de verdade (o dígito de "19 min" picotado na borda). Resolvido de raiz: `TabelaEntregas.tsx` agora renderiza duas versões — abaixo de `sm`, uma lista (`<ul>`) com cada entrega em duas linhas (pedido+status, depois motorista+bairro+ETA), sem coluna nenhuma escondida e sem rolagem horizontal; a partir de `sm`, a tabela completa de 5 colunas, sem fade nem `overflow-x-auto` (não precisa mais rolar).

**Gotcha de teste (vale pra todo projeto Cloudflare Vite deste repo):** depois de rebuildar, reiniciar o `vite preview` — ele não pega os novos hashes de asset sozinho, e o navegador recebe HTML no lugar do `.js` esperado.

## Referência visual

Paleta: `--color-canvas` #f2f3f5 (fundo do conteúdo, cinza-azulado neutro e frio — de propósito bem diferente do creme quente que domina o resto do portfólio), `--color-sidebar` #1b1d29 (barra lateral escura), `--color-accent` #5b4fe0 (índigo — validado ~5.2:1 sobre o canvas, mas só ~2.9:1 sobre o sidebar escuro, então usa `--color-accent-hero` #9b8fff, a variante clara, ~6.2:1 sobre o sidebar, pro ícone/destaque ali — mesmo padrão dual-tone já usado em outros projetos do portfólio). Fontes: **Plus Jakarta Sans** (interface) + **IBM Plex Mono** (números/dados nos cards e na tabela, pra reforçar a leitura de "painel técnico") — nenhuma das duas usada em outro projeto do repositório.

`Icone.tsx` tem os 5 glifos da navegação — nunca ícone de biblioteca de terceiros, sempre desenhado na mão, mesma linguagem de traço do resto do portfólio.

## FAQ + depoimentos (`Faq.tsx`, `Depoimentos.tsx`)

Adição pura ao final do `Painel.tsx`, depois da tabela de entregas. Decisão de enquadramento: em vez de virar seção de marketing bolada por cima da "tela de software", os dois viram mais dois cartões do próprio painel, no mesmo estilo visual de `StatGrid`/`MapaRotas`/`TabelaEntregas` (`rounded-xl border border-line bg-card p-5`).

O FAQ é rotulado "Central de ajuda" — um widget de ajuda contextual dentro do próprio painel, coisa comum em produto B2B de verdade (o item "Configurações" da sidebar continua "em breve", então isso não fica navegável por lá, só aparece rolando o painel). O accordion é `Faq.tsx`: botão com `aria-expanded`/`aria-controls`, região com `role="region"`, operável por teclado (Enter/Space nativos do `<button>`), sem transição de altura quando `prefers-reduced-motion` está ativo (troca `hidden`/visível direto, sem animação CSS).

Os depoimentos (`Depoimentos.tsx`) ficam com o rótulo "Avaliações de clientes" — ainda como cartão do painel, não como seção de prova social separada. Não tem estrela nem nota, só a citação e quem disse, pra não parecer widget de marketing importado de landing page.

Ambos usam `Reveal` (mesmo padrão de entrada por scroll do resto do painel) e as cores/fontes do `index.css` não foram tocadas.
