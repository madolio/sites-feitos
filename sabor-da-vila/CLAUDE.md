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

## Gotchas

- TypeScript reclama de comparar `string !== false` porque o filter encadeado misturava tipos — a linha de observação (`obs.trim() && ...`) some do array sem cast; resolvido filtrando só por `l !== false` já tipado como união.
- Mesmo cuidado de overflow mobile do Estúdio Alma: qualquer `sr-only`/absolute dentro de container com `overflow-x-auto` precisa de um ancestral `relative`.
