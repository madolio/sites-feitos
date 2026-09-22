# Doce Ateliê (conceito)

Site-conceito da Madolio pro nicho de confeitaria de encomenda. **Negócio fictício** — não é cliente. Vite + React 19 + TypeScript + Tailwind v4 + GSAP + Motion. Página única.

## Deploy (Cloudflare Workers)

Worker `doce-atelie`, em `https://doce-atelie.fenoninho-max.workers.dev`. Deploy manual:

```
npm run deploy   # = npm run build && wrangler deploy
```

## Por ser conceito: o WhatsApp é demonstração

Nenhum botão abre o WhatsApp de um número inventado (poderia ser de alguém de verdade). `sendToWhatsApp()` (`src/demo.ts`) dispara um evento que abre `DemoDialog.tsx`: mostra a mensagem que seria enviada e oferece o WhatsApp da Madolio ("Quero um site assim"). Se um dia virar cliente real, trocar `sendToWhatsApp` por `window.open('https://wa.me/NUMERO?text=' + encodeURIComponent(msg))`. O rodapé também declara que o negócio é fictício — não remover.

**Atualização (2026-09-22):** JSON-LD de `Bakery` foi adicionado ao `index.html`, alinhando com o padrão já usado em ~20 outros conceitos fictícios do repositório (Torque, Corte, Escuta etc.) — a ressalva acima ficou desatualizada e não reflete mais a prática do monorepo.

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

## Polimento visual de set/2026 — mesma ideia, mais vida e mais craft

Depois da reestruturação da navegação (seção acima), o usuário pediu pra "reformular sem mudar a ideia": o site seguia visualmente datado perto de conceitos mais recentes do portfólio (Cardume, Bruma, Lúmen), sem que o mecanismo da cartela de sabores precisasse mudar. Não mexeu em paleta, tipografia (continua só Bricolage Grotesque, por escolha documentada no Vibe Discovery) nem no leque — só na execução.

- **"Muito morta, sem vida" — padrão de queixa de outros projetos, checado aqui também:** `Docinhos.tsx` e `Prazos.tsx` estavam dentro de um `<Reveal as="div">` genérico no `App.tsx` (o bloco inteiro entrava junto, sem stagger). Movido o `Reveal` pra dentro de cada componente, direto no título/parágrafo e na lista/grid (`as="ul"`/`as="dl"` com `stagger`), pra cada docinho e cada prazo entrar em sequência, não em bloco. `App.tsx` não embrulha mais essas seções.
- **Hero estático no load:** `FanDeck` já tinha entrada elástica própria (GSAP), mas o título/texto/CTAs ao lado ficavam parados. Envolvidos num `Reveal` com `stagger`, mesmo padrão usado no resto do site — sem competir com a animação do leque, que continua intacta.
- **Corte do bolo (`CakeSlice.tsx`) mais de verdade:** era um empilhado de retângulos sólidos. Adicionado gradiente sutil de sombra na cobertura lateral (dá volume à parede do bolo), uma tira de brilho no topo de cada camada (recheio/massa deixam de parecer chapados), sombra de contato elíptica sob o prato, e uma borda ondulada de cobertura no topo (só aparece com massa escolhida) — sugere a cobertura "derramando" sem virar ilustração fofa de cupcake (o que o Vibe Discovery já proibia).
- **Docinhos com mais profundidade no hover:** além do giro que já existia, ganharam `drop-shadow` e um leve levantar (`-translate-y-1`) — reforça que são objetos numa forminha, não figuras planas.
- Nada de card+badge+CTA-gradiente genérico foi adicionado; os componentes usados (`Reveal`, gradientes SVG) já existiam no vocabulário do projeto ou do repositório.

## Depoimentos e FAQ (set/2026) — padrão do repositório, vocabulário próprio

Adicionado o par depoimentos+FAQ que já existia em outros 9 conceitos do repositório (ver `razao/src/components/Faq.tsx` e `Depoimentos.tsx` como referência de forma). Sem mexer no Hero, no leque (`FanDeck.tsx`) nem nos tokens de `index.css` — só reaproveitou o que já existia.

- `Depoimentos.tsx` — cards com o mesmo `rounded-xl border border-line bg-card` dos outros blocos do site, fundo da seção em `bg-frosting/60` (token que já existia, sem uso até então). No lugar do selo "confere" do Razão, cada card tem um código no estilo cartela (`DA 202`, `Docinhos`) com a mesma tipografia de `.fan-code`/`FlavorOption` (`text-xs font-semibold tabular-nums text-ink/50`) — reforça a metáfora de catálogo de cores sem inventar vocabulário novo.
- `Faq.tsx` — acordeão acessível (`useId`/`useState`, `aria-expanded`, `aria-controls`, `role="region"`, `<button>` nativo), com uma tira de cor (`swatch`) ao lado de cada pergunta em vez de um ícone genérico, puxando das cores dos sabores em `data.ts`. Perguntas cobrem prazo de encomenda, restrição alimentar, combinação de sabores, pagamento, entrega/retirada e escrita no bolo, com respostas consistentes com o que `Prazos.tsx` e `Encomenda.tsx` já afirmavam (3/7 dias, 50% de sinal, retirada na Vila Mariana, 40 caracteres na escrita).
- Posicionados em `App.tsx` depois de `Prazos` (fim do conteúdo principal) e antes do rodapé, sem tocar `Hero`, `Encomenda` ou o mecanismo de leque.

## Testes visuais

O `vite preview` com o plugin da Cloudflare guarda a lista de assets de quando subiu — depois de um novo build ele devolve HTML no lugar do JS novo (tela branca). Pra revisar, servir o `dist` com um servidor estático (`npx serve -s dist`) ou reiniciar o preview a cada build.
