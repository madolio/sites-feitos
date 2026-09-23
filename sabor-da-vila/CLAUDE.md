# Sabor da Vila (conceito)

Site-conceito da Madolio pro nicho de hamburgueria de bairro. **Negócio fictício** — não é cliente. Vite + React 19 + TypeScript + Tailwind v4 + GSAP + Motion + `@number-flow/react`. Página única.

## Deploy (Cloudflare Workers)

Worker `sabor-da-vila`, em `https://sabor-da-vila.fenoninho-max.workers.dev`. `npm run deploy`.

## WhatsApp é demonstração

Mesmo esquema dos outros conceitos (Doce Ateliê, Estúdio Alma): `sendToWhatsApp()` (`src/demo.ts`) abre `DemoDialog.tsx` com a mensagem que seria enviada + o WhatsApp da Madolio. Nunca apontar pra um número inventado. O rodapé declara que o negócio é fictício.

## Vibe Discovery — "Lambe-lambe"

- **Lugar/objeto:** cartaz de risografia colado em poste — o "lambe-lambe" de banda/evento de bairro.
- **Emoção:** fome, irreverência de esquina.
- **Colisão:** hamburgueria × impressão em risografia (Riso). Cada tinta é uma camada separada com `mix-blend-mode: multiply`, registro levemente desalinhado de propósito, e retícula (halftone) em vez de gradiente.
- **Nunca parecer:** hamburgueria "gourmet" preta e madeira com foto grande de prato.
- **Wildcard:** o adesivo de promoção (`StickerPeel`) que a pessoa descola/arrasta no hero.

Três tintas reais de risografia: Medium Blue `#3255a4`, Fluorescent Pink `#ff48b0`, Yellow `#ffe800`. Fundo "papel" `#fbfaf5`. Onde as tintas se sobrepõem aparecem outras cores (ex: azul+amarelo = o verde da alface), igual na impressão de verdade — **não adicionar essas cores como token**, elas são um efeito, não uma paleta. Fonte de título: **Bungee** (pôster/rótulo). Fonte de texto: **Barlow**. `.riso-type` imprime o título duas vezes (azul base + rosa por cima, `mix-blend-mode: multiply`, leve deslocamento) pra simular o registro torto.

## Reestruturação de set/2026 — a navegação virou o varal de pedidos

Era um dos 5 projetos deliberadamente deixados com o nav genérico (barra fixa full-width, logo + lista de links + botão) enquanto outros conceitos do repositório já tinham ganhado arquitetura própria (Nascente reformado antes deste, com a navegação virando o painel de instrumento do próprio diagrama técnico) — ver o `CLAUDE.md` do `madolio`. Reestruturado "página a página" a pedido do usuário.

`Nav.tsx` (removido, não deixado como código morto) virou `Varal.tsx`: em qualquer chapeiro de hamburgueria de verdade, os pedidos ficam pendurados num arame esticado (o "varal"/"espeto de comanda"), cada papel preso por um clipe, balançando um pouco. A navegação virou esse objeto literal do balcão em vez de uma lista de links soltos — é só a navegação, não duplica a função do carrinho/comanda que já existe em `Comanda.tsx`.

- **Estrutura:** header fixo de duas fileiras. A primeira tem só a marca e o CTA "Fazer pedido" (`btn-blue`), igual ao nav antigo. A segunda é o varal em si: um arame (`Fio`, SVG com leve caimento) do qual pendem as comandas (`Cardápio`, `Onde e horário`), cada uma presa por um clipe (`Clipe`, SVG simples de prendedor) e com uma leve rotação de repouso (`--rot`, alternando o sentido por item pra não parecer simétrico/artificial demais).
- **Balanço:** cada comanda balança sozinha (`@keyframes varal-sway` em `index.css`, delay diferente por item via `--rot`) até alguém passar o mouse (pausa) ou a seção virar a ativa. Respeita `prefers-reduced-motion` (desliga a animação, mantém a rotação de repouso estática) e a página inteira já usa `MotionConfig reducedMotion="user"` em outros componentes — aqui é CSS puro, então o desligamento é via media query mesmo.
- **Estado ativo:** por scroll-spy (`IntersectionObserver`, `useSecaoAtiva`, mesmo padrão do Nascente) — a comanda da seção em viewport fica "espetada" reta (sem balanço, preenchida em `blue`), como se tivesse acabado de ser pendurada, enquanto as outras continuam balançando em `outline`.
- Como o header cresceu de uma fileira pra duas, o padding-top que compensava a barra mudou: `pt-36 md:pt-44` no lugar de `pt-24 md:pt-32` em `Hero.tsx`, e `scroll-mt-28` (no lugar de `scroll-mt-16`/nenhum) em `Cardapio.tsx` e `Onde.tsx` pra âncoras de `#cardapio`/`#onde` pararem no lugar certo.
- `Mark` (o logo) passou a ser exportado de `Varal.tsx` em vez de `Nav.tsx` — `Footer.tsx` importa de lá.

## Componentes e de onde vieram

- `RisoBurger.tsx` — hambúrguer 100% ilustrado (sem foto), com uma camada SVG por tinta (`ink-yellow`, `ink-pink`, `ink-blue`). Na entrada, o GSAP anima cada camada "passando pela máquina" e parando com o registro desalinhado; depois o mouse baila um pouco cada camada (`gsap.quickTo`). Os ângulos/posições de registro (`registration`) são fixos por design, não aleatórios.
- `StickerPeel.tsx` — **copiado quase igual do React Bits** (reactbits.dev/animations/sticker-peel): um adesivo arrastável que descola a ponta no hover/toque, com iluminação SVG (`fePointLight`) seguindo o mouse. Só adiciona `alt` e registra o `InertiaPlugin` do GSAP (o original usa `inertia: true` sem registrar o plugin, o que falha silenciosamente). O SVG do adesivo (`public/adesivo-terca.svg`) foi gerado programaticamente (estrela + texto da promoção de terça).
- `Grain.tsx` — **adaptado do "Noise" do React Bits**: mesmo grão de ruído aleatório, mas desenhado uma vez num tile de 180×180 (não redesenhado a cada 2 frames) e aplicado como `background-image` do `body::after` — bem mais leve que um canvas full-screen redesenhando sempre.
- `Cardapio.tsx` / `Comanda.tsx` — cardápio com contador +/− por item; a comanda flutuante (estilo carrinho) mostra o total com `@number-flow/react` (NumberFlow, pacote real) e abre um modal de "comanda" com forma de retirada/entrega, pagamento e observação, que vira a mensagem do WhatsApp.

## Polimento visual de set/2026 — "reformula mas sem mudar a ideia"

Este era um dos projetos mais antigos do portfólio, agrupado (junto com Doce Ateliê e Estúdio Alma) num CLAUDE.md de projeto irmão como "uma vertente só — todos artesanais/ilustrados, pequeno negócio local", enquanto conceitos mais novos (Torre, Traço, Âncora) existem pra provar variação de estilo além desse olhar. O usuário achou o site datado/plano perto do resto do portfólio, mas pediu explicitamente pra **não mudar a ideia** — o mecanismo wildcard do Varal (recém-reestruturado, ver seção acima) e a ilustração em risografia continuam exatamente como estavam. O que mudou foi só execução/craft, comparando com o nível de polimento de Cardume/Fornada/Corte:

- **Hero deixou de "aparecer pronta":** título, texto e botões agora entram em `Reveal` escalonado (`stagger={0.12}`, `delay={0.15}`) em vez de renderizar tudo de uma vez — o resto da página já usava `Reveal` (Cardápio, Onde, Rodapé), só o hero (acima da dobra, sem scroll trigger) tinha ficado de fora.
- **Item de cardápio ganhou uma interação própria** (`menu-item`/`menu-item-ghost` em `index.css`, usado em `Cardapio.tsx`): no hover/foco, o nome do item "sai de registro" — a mesma camada fantasma rosa em `mix-blend-mode: multiply` do título e do hambúrguer, só que em repouso invisível e revelada no hover — em vez de um hover genérico de sombra/fundo escurecendo. A borda também vira rosa. Reduced-motion desliga a transição.
- **"Onde e quando" ganhou um "HOJE"** ao lado do dia da semana corrente (calculado no cliente com `Date().getDay()`, sem tocar no build), com o mesmo bloco sólido/picotado do resto do site (fundo amarelo, `mix-blend-mode: multiply`) em vez de um badge arredondado genérico.

Não mexido de propósito: `Varal.tsx` (nav/wildcard, com o fix de scroll-spy de fim de página de 17/set intacto), `RisoBurger.tsx` (já tinha craft — animação de registro entrando em camadas + parallax de mouse), `StickerPeel.tsx`, paleta e tipografia (Bungee/Barlow, as três tintas de risografia).

## Dúvidas e Depoimentos (set/2026) — adição pura

Duas seções novas entre `Onde` e `Footer`, no mesmo padrão de outros irmãos do repositório (`razao/src/components/Faq.tsx`/`Depoimentos.tsx`), mas adaptadas ao próprio registro do site (título `poster`/`riso-type`, `Reveal`, borda azul de 6px separando seções):

- `Faq.tsx` (`#duvidas`): acordeão acessível com 6 perguntas de pré-compra (raio/tempo de entrega, troca de ingrediente, opção vegetariana, pedido mínimo, formas de pagamento, encomenda pra evento). Cada item é `<button aria-expanded aria-controls>` + `<div role="region">`, operável por teclado, com o "+" girando 45° ao abrir (`motion-reduce:transition-none` desliga a transição).
- `Depoimentos.tsx` (`#depoimentos`): 3 depoimentos fictícios (nome + inicial do sobrenome), cada um citando um item real do cardápio. Usa `.picote` (a borda picotada que já existia pro bloco de comanda) em vez de inventar um novo estilo de card.
- Nenhuma das duas entrou no varal (`Varal.tsx` não foi tocado) — dá pra chegar nelas só rolando a página, entre "Onde e horário" e o rodapé.

## Selo de dúvida no FAQ (set/2026)

`Faq.tsx` (`#duvidas`) tinha um vão vazio à direita do acordeão em desktop (a lista de perguntas só ocupava uma fração da largura de `max-w-6xl`). Em vez de um card genérico, virou um grid de duas colunas (`md:grid-cols-[1.2fr_0.8fr]`): a segunda coluna é um "quadro de recado" de chapeiro — mesma borda picotada (`.picote`) da comanda/depoimentos, com o `StickerPeel` (reaproveitado do Hero, mesmo componente/mecânica de arrastar e descolar) usando um selo novo (`public/adesivo-duvida.svg`, gerado no mesmo molde do `adesivo-terca.svg` — estrela + texto, só recolorido: estrela amarela, retícula rosa) com o texto "Não achou sua dúvida? Chama no zap", e um botão que chama `sendToWhatsApp` (mesmo padrão do Footer/Comanda). Só aparece a partir de `md` (`hidden md:block`) — no mobile o FAQ já ocupa a largura toda, sem vão pra preencher. O card tem `overflow-hidden` pra conter o `StickerPeel` (absolutamente posicionado) dentro do próprio bloco.

O overflow horizontal de mobile (~109px) relatado numa auditoria anterior já estava corrigido pelo `.riso-heading` (ver Gotchas) — confirmado com `document.documentElement.scrollWidth` vs `clientWidth` (diff 0 em 320/360/375/390/414px, antes e depois desta mudança) via Playwright.

## Gotchas

- TypeScript reclama de comparar `string !== false` porque o filter encadeado misturava tipos — a linha de observação (`obs.trim() && ...`) some do array sem cast; resolvido filtrando só por `l !== false` já tipado como união.
- Mesmo cuidado de overflow mobile do Estúdio Alma: qualquer `sr-only`/absolute dentro de container com `overflow-x-auto` precisa de um ancestral `relative`.
- **Overflow de 109px no mobile (set/2026):** `.riso-type` é `display: inline-grid`, que nunca encolhe abaixo do `max-content` do texto (o bug clássico de `min-width: auto` em grid item). "Depoimentos" é uma palavra única, sem espaço pra quebrar — em `text-6xl` (60px) fixo, ela desenhava ~461px de largura numa viewport de 375px. Corrigido trocando o degrau fixo `text-6xl md:text-8xl` por uma classe nova, `.riso-heading` (`index.css`), com `font-size: clamp(1.9rem, 11vw, 3.75rem)` no mobile e `var(--text-8xl)` a partir de `md`. Aplicada nos 4 títulos que usam `riso-type` em bloco (`Cardapio.tsx`, `Depoimentos.tsx`, `Faq.tsx`, `Onde.tsx`) — o hero (`Hero.tsx`) já usa um tamanho fluido próprio e não foi tocado. Nada mudou visualmente a partir de ~545px de largura (onde o clamp já batia no teto de 60px, igual ao valor antigo).
