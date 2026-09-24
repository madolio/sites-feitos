# Lúmen (conceito)

Site-conceito da Madolio pro nicho de **projeto luminotécnico** (estúdio de iluminação). **Empresa fictícia** — não existe. Vite + React 19 + TypeScript + Tailwind v4. Página única.

Pedido: "seja ousado que nem a Cardume" — mas sem entrar em WebGL/three.js (esse orçamento de complexidade ficou reservado pra Cardume/Torno). A ousadia aqui é 100% CSS/DOM: a "sala escura" e o cursor-luminária.

## Deploy (Cloudflare Workers)

Worker `lumen`, em `https://lumen.sneakpeek.workers.dev`. `npm run deploy`.

## O momento ousado: cursor como luminária (`Hero.tsx`)

Só ativa em telas com mouse de verdade (`matchMedia('(hover: hover) and (pointer: fine)')` — sem isso, toque não tem "posição do cursor" antes do clique, então mobile já recebe o conteúdo visível sem o efeito, por acessibilidade). Uma camada preta cobre o hero com `mask-image: radial-gradient(circle at var(--mx) var(--my), transparent..., black 420px)` — as variáveis `--mx`/`--my` são escritas direto no DOM por um loop `requestAnimationFrame` (mutável, fora do React, no mesmo espírito do `useMotor` da Cardume), não por `setState`, pra não re-renderizar a árvore inteira a cada movimento do mouse.

## Nada de cor decorativa — tudo derivado de dado real

- **`cor.ts`** (`kelvinParaRgb`): aproximação de Tanner Helland do espectro de corpo negro — a mesma conta usada em software de iluminação de palco/estúdio pra converter Kelvin em RGB. A cor de cada luminária no catálogo (`Catalogo.tsx`) vem sempre dali, nunca escolhida no olho.
- **Cone de feixe do catálogo**: o ângulo de abertura do triângulo SVG é literalmente `luminaria.anguloFeixe` (graus reais de catálogo) convertido por trigonometria (`altura * tan(ângulo/2)`), não um cone genérico.
- **Calculadora (`Calculadora.tsx`)**: fórmula real de projeto luminotécnico — `N = (E × A) / (F × UF × MF)` (iluminância desejada × área ÷ fluxo da luminária × fator de utilização × fator de manutenção). `data/ambientes.ts` usa lux de referência de norma (NBR 5413/prática de mercado), `data/luminarias.ts` usa watts/lumens/ângulo/Kelvin de catálogo comercial real de LED. Mesmo padrão já usado no repo (Ferro/1RM, Encaixe/preço, Realce/agenda): número ao vivo, nunca solto.

## Referência visual

Paleta: `--color-noite` #0a0908 (fundo, quase preto), `--color-acento` #ffb46b (um âmbar de luz quente, próximo — mas não idêntico — ao que `kelvinParaRgb(2700)` devolve, que é #ffa757; 11,36:1 sobre `--color-noite`, medido em 18/09/2026). Fontes: **Fraunces** (títulos, serifada — tom de estúdio de design) + **Inter** (corpo) + **IBM Plex Mono** (rótulos técnicos: "PROJETO LUMINOTÉCNICO", especificações do catálogo).

## FAQ e depoimentos (`Faq.tsx`, `Depoimentos.tsx`)

Adição pura pra reforçar prova social e reduzir objeção pré-compra, sem mexer no Hero, no mecanismo do cursor-luminária ou nos tokens de `index.css` — pedido explícito do responsável ("sem perder o design"). Seguem o mesmo padrão de accordion acessível e cards de depoimento já usado em outros sites do portfólio (ver `razao/src/components/Faq.tsx` e `Depoimentos.tsx`), mas reescritos com os próprios tokens do Lúmen (`--color-carvao`, `--color-fio`, `--color-acento`, `font-mono`/`font-display`) e perguntas específicas de projeto luminotécnico (visita técnica, instalação elétrica, troca de Kelvin, prazo, residencial x comercial, ajuste fino pós-instalação). Accordion: `<button aria-expanded>` controlando `role="region"`, sem JS de teclado customizado (o `<button>` nativo já cobre isso), com `motion-reduce:transition-none` na seta. Posicionados entre `Processo` e `Contato`.

## Gotchas

- TypeScript não estreita `ref.current` dentro de `function` declarada no mesmo closure mesmo depois de um guard `if (!x) return` — precisou de anotação de tipo explícita + `!` em vez de confiar no narrowing (ver `Hero.tsx`).
- Depois de rebuildar, reiniciar o `vite preview` — não pega os novos hashes de asset sozinho.
