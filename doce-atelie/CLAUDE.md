# Doce Ateliê (conceito)

Site-conceito da Madolio pro nicho de confeitaria de encomenda. **Negócio fictício** — não é cliente. Vite + React 19 + TypeScript + Tailwind v4 + GSAP + Motion. Página única.

## Deploy (Cloudflare Workers)

Worker `doce-atelie`, em `https://doce-atelie.fenoninho-max.workers.dev`. Deploy manual:

```
npm run deploy   # = npm run build && wrangler deploy
```

## Por ser conceito: o WhatsApp é demonstração

Nenhum botão abre o WhatsApp de um número inventado (poderia ser de alguém de verdade). `sendToWhatsApp()` (`src/demo.ts`) dispara um evento que abre `DemoDialog.tsx`: mostra a mensagem que seria enviada e oferece o WhatsApp da Madolio ("Quero um site assim"). Se um dia virar cliente real, trocar `sendToWhatsApp` por `window.open('https://wa.me/NUMERO?text=' + encodeURIComponent(msg))`. O rodapé também declara que o negócio é fictício — não remover.

Sem JSON-LD de LocalBusiness de propósito (seria dado estruturado de uma empresa que não existe).

## Vibe Discovery — "Cartela de Sabores"

- **Lugar/objeto:** o leque de cores de loja de tinta (guia Pantone) + a vitrine da confeitaria de bairro.
- **Emoção:** água na boca, alegria de encomendar.
- **Colisão:** confeitaria × catálogo técnico de cores. Cada sabor é uma "cor" com código (`DA 201`), nome e ficha.
- **Nunca parecer:** confeitaria rosa-bebê com fonte cursiva e ícone de cupcake.
- **Wildcard:** granulado colorido saindo de qualquer clique na página.

Tokens em `src/index.css`: papel `#fffcf7`, cacau `#33190f`, cereja `#c4213a`. Fonte única: **Bricolage Grotesque** (eixos opsz/wdth/wght; títulos com `font-stretch: 80%` via `.display`). As cores dos sabores ficam em `src/data.ts` e são reusadas no leque, nas opções do montador e nas camadas do bolo.

## Reestruturação de set/2026 — a navegação virou a própria cartela de sabores

Era um dos 5 projetos deliberadamente deixados com o nav genérico (barra fixa full-width, logo + lista de links + botão) enquanto outros conceitos do repositório (Torre, Calibre, Cerne, Nascente...) já tinham ganhado arquitetura própria — ver o `CLAUDE.md` do `madolio`, que documentava essa lista. Reestruturado "página a página" a pedido do usuário, usando a reforma do Nascente (painel de instrumento) como referência de método.

`Nav.tsx` (removido, não deixado como código morto) virou `Cartela.tsx`: em vez de uma lista de links de texto, cada seção do site (Sabores/Encomenda/Docinhos/Prazos) é uma tira em miniatura do próprio leque de cores que já é o mecanismo do Hero (`FanDeck.tsx`) e o vocabulário da marca (`FanMark`, reaproveitado como logo). As tiras (`Tira`) ficam presas numa fileira, cada uma com um código no estilo Pantone (`DA 401`–`DA 404`) e uma cor — não as cores dos sabores de verdade (`data.ts`), mas uma paleta própria pra navegação, emprestada do mesmo trio do `FanMark` mais uma quarta cor. Levemente abertas em leque (`--tilt`, `rotate` por índice), a seção ativa (ou em hover) perde a inclinação e sobe — a mesma sensação de puxar uma tira pra fora do maço que já existe em `.fan-strip`, reaproveitada em `.cartela-tab` no `index.css`.

- **Desktop:** barra fixa no topo (não virou coluna lateral — a página é única e já usa `max-w-6xl` centralizado; sidebar exigiria replatformar todas as seções). As tiras ficam entre a marca e o CTA, alinhadas pela base (`items-end`) como um leque de verdade.
- **Mobile:** vira uma barra fina (marca + CTA + botão de menu). As tiras ficam atrás de um menu que abre embaixo, em duas colunas, com o mesmo layout de swatch+código+nome do `FlavorOption` do `Encomenda.tsx` — reaproveita um padrão visual que o site já tinha, em vez de inventar um novo.
- **Seção ativa:** por scroll-spy (`IntersectionObserver`, `useSecaoAtiva`) — como é página única (sem rotas), não precisa de fallback por rota+hash como o do Nascente.
- Como o header cresceu (as tiras precisam de espaço pra "abrir" acima da fileira), o `scroll-mt-16`/`pt-28 md:pt-36` das seções virou `scroll-mt-24`/`pt-24 md:pt-32` em `Hero.tsx`, `Encomenda.tsx`, `Docinhos.tsx` e `Prazos.tsx`.
- Cuidado com a palavra mais longa (`Encomenda`) estourando a largura da tira — ajustada pra `w-16` com `break-words` de segurança. Os códigos das tiras usam `text-ink/65` (não `/55`), pela mesma regra de contraste da seção abaixo.

## Componentes e de onde vieram

- `FanDeck.tsx` — **adaptado do Bounce Cards (React Bits)**: entrada elástica em stagger + "empurra os vizinhos" no hover, mas girando as tiras em volta de um rebite. O ângulo final é `--base`, `--open` (0→1) é animado pelo GSAP, `--push`/`--lift` vêm do hover (CSS em `index.css`, classe `.fan-strip`). Durante a entrada a classe `.is-opening` desliga a `transition` do CSS pra não brigar com o GSAP.
- `Stepper.tsx` — **adaptado do Stepper (React Bits)**: indicadores com variantes do Motion, linha de progresso, conteúdo deslizando com altura animada. Indicadores viraram `<button>`, "Continuar" trava até a etapa estar respondida.
- `Sprinkles.tsx` — **adaptado do Click Spark (React Bits)**: canvas fixo do tamanho da tela, loop só roda enquanto tem granulado (o original desenha a cada frame pra sempre). Desliga com reduced motion e ignora clique vindo do teclado.
- `CakeSlice.tsx` — corte do bolo em SVG; camadas mudam de cor e a largura acompanha o tamanho (transições em CSS).
- `Docinho.tsx` — docinhos vistos de cima em SVG, com a cobertura gerada por aleatório de semente fixa.

## Contraste

Em fundo `card`, texto pequeno precisa de pelo menos `text-ink/65` (`/60` dá 4.3:1 e reprova). Em fundo `ink`, pelo menos `text-card/60`. No rodapé cereja, `text-white/90` no mínimo.

## Testes visuais

O `vite preview` com o plugin da Cloudflare guarda a lista de assets de quando subiu — depois de um novo build ele devolve HTML no lugar do JS novo (tela branca). Pra revisar, servir o `dist` com um servidor estático (`npx serve -s dist`) ou reiniciar o preview a cada build.
